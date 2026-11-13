// MOTORA - envia documentos/planilhas para o Google Drive e lê documentos/vistorias com IA (Gemini)
import { createClient } from "npm:@supabase/supabase-js@2.45.4";
import { encodeBase64 } from "jsr:@std/encoding@1/base64";

function serviceKey() {
  const legacy = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY");
  if (legacy) return legacy;
  try { const keys = JSON.parse(Deno.env.get("SUPABASE_SECRET_KEYS") || "{}"); return keys.default || Object.values(keys)[0]; } catch { return ""; }
}
const admin = createClient(Deno.env.get("SUPABASE_URL")!, serviceKey() as string, { auth: { persistSession: false } });
const BUCKET = "docs";
const cors = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type, x-cron-token",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
};
const json = (b: unknown, s = 200) => new Response(JSON.stringify(b), { status: s, headers: { ...cors, "Content-Type": "application/json" } });

async function secret(key: string) {
  const { data } = await admin.from("app_secrets").select("value").eq("key", key).maybeSingle();
  return data?.value ?? null;
}

async function readFile(path: string) {
  const { data, error } = await admin.storage.from(BUCKET).download(path);
  if (error || !data) throw new Error("arquivo não encontrado: " + path);
  const bytes = new Uint8Array(await data.arrayBuffer());
  let mime = data.type || "";
  if (!mime || mime === "application/octet-stream") mime = /\.pdf$/i.test(path) ? "application/pdf" : "image/jpeg";
  return { base64: encodeBase64(bytes), mime, ext: (path.split(".").pop() || "bin").toLowerCase() };
}

async function drive(payload: Record<string, unknown>) {
  const url = await secret("drive_url");
  if (!url) return { ok: false, error: "Google Drive não configurado" };
  const r = await fetch(url, { method: "POST", headers: { "Content-Type": "text/plain;charset=utf-8" }, body: JSON.stringify(payload), redirect: "follow" });
  const t = await r.text();
  try { return JSON.parse(t); } catch { return { ok: false, error: "resposta inválida do Google: " + t.slice(0, 200) }; }
}

const DOC_LABEL: Record<string, string> = { cnh_path: "CNH", address_path: "Comprovante de endereço", contract_path: "Contrato", inspection_term_path: "Termo de vistoria" };
const stamp = (iso?: string) => new Date(iso || Date.now()).toLocaleString("sv-SE", { timeZone: "America/Sao_Paulo" }).slice(0, 16).replace(" ", "_").replace(":", "h");

async function driverInfo(id: string) {
  const { data } = await admin.from("profiles").select("*").eq("id", id).maybeSingle();
  if (!data) throw new Error("motorista não encontrado");
  return data;
}

async function syncDoc(driverId: string, col: string) {
  const d = await driverInfo(driverId);
  const path = d[col];
  if (!path) return { ok: true, skipped: true };
  const f = await readFile(path);
  return await drive({ action: "file", driverId, driverName: d.name, folder: "Documentos", fileName: `${DOC_LABEL[col] || col} - ${stamp()}.${f.ext}`, mimeType: f.mime, base64: f.base64 });
}

async function uploadReceipt(receiptId: string) {
  const { data: r } = await admin.from("receipts").select("*").eq("id", receiptId).maybeSingle();
  if (!r) throw new Error("comprovante não encontrado");
  const d = await driverInfo(r.driver_id);
  const f = await readFile(r.file_path);
  return await drive({ action: "file", driverId: d.id, driverName: d.name, folder: "Comprovantes", fileName: `Comprovante - ${stamp(r.created_at)}.${f.ext}`, mimeType: f.mime, base64: f.base64 });
}

async function syncPix(historyId: string) {
  const { data: h } = await admin.from("pix_history").select("*").eq("id", historyId).maybeSingle();
  if (!h) throw new Error("histórico não encontrado");
  const d = await driverInfo(h.driver_id);
  let receiptUrl = "";
  if (h.receipt_id) {
    const up = await uploadReceipt(h.receipt_id);
    receiptUrl = up.url || "";
  }
  return await drive({ action: "pix_row", driverId: d.id, driverName: d.name, id: h.id, sentAt: h.sent_at, dueAt: h.due_at, amount: h.amount, paidAt: h.paid_at, receiptUrl });
}

async function syncExpense(expenseId: string) {
  const { data: e } = await admin.from("vehicle_expenses").select("*, vehicles(model, plate), expense_types(name)").eq("id", expenseId).maybeSingle();
  if (!e) throw new Error("despesa não encontrada");
  let fileUrl = "";
  const vehicleName = `${e.vehicles?.model || "Veículo"} - ${e.vehicles?.plate || ""}`.trim();
  if (e.file_path) {
    const f = await readFile(e.file_path);
    const up = await drive({ action: "file", vehicleId: e.vehicle_id, vehicleName, folder: "Despesas", fileName: `${e.expense_types?.name || "Despesa"} - ${e.expense_date}.${f.ext}`, mimeType: f.mime, base64: f.base64 });
    fileUrl = up.url || "";
  }
  return await drive({ action: "expense_row", id: e.id, date: e.expense_date, vehicle: e.vehicles?.model || "", plate: e.vehicles?.plate || "", type: e.expense_types?.name || "", amount: e.amount, description: e.description || "", fileUrl });
}

// ---------------- DOCUMENTOS DO VEÍCULO, VISTORIA E TERMOS (envio automático ao Drive) ----------------
async function vehicleInfo(id: string) {
  const { data } = await admin.from("vehicles").select("*").eq("id", id).maybeSingle();
  if (!data) throw new Error("veículo não encontrado");
  return { v: data, name: `${data.model || "Veículo"} - ${data.plate || ""}`.trim() };
}

async function syncVehicleDoc(vehicleId: string) {
  const { v, name } = await vehicleInfo(vehicleId);
  if (!v.crlv_path) return { ok: true, skipped: true };
  const f = await readFile(v.crlv_path);
  return await drive({ action: "file", vehicleId: v.id, vehicleName: name, folder: "Documentos", fileName: `CRLV-e - ${v.plate || ""} - ${stamp()}.${f.ext}`, mimeType: f.mime, base64: f.base64 });
}

async function syncInspection(photoId: string) {
  const { data: p } = await admin.from("inspection_photos").select("*").eq("id", photoId).maybeSingle();
  if (!p || !p.file_path) return { ok: true, skipped: true };
  const { v, name } = await vehicleInfo(p.vehicle_id);
  const f = await readFile(p.file_path);
  return await drive({ action: "file", vehicleId: v.id, vehicleName: name, folder: "Vistoria", fileName: `${p.label || p.slot || "Foto"} - ${stamp(p.created_at)}.${f.ext}`, mimeType: f.mime, base64: f.base64 });
}

const escHtml = (s: unknown) => String(s ?? "").replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c] as string));
async function syncTerms(acceptanceId: string) {
  const { data: a } = await admin.from("terms_acceptances").select("*").eq("id", acceptanceId).maybeSingle();
  if (!a) return { ok: false, error: "aceite não encontrado" };
  const { data: d } = await admin.from("profiles").select("id, name").eq("id", a.driver_id).maybeSingle();
  const itens = Array.isArray(a.accepted_items) ? a.accepted_items : [];
  const quando = new Date(a.accepted_at || Date.now()).toLocaleString("pt-BR", { timeZone: "America/Sao_Paulo" });
  const html = `<!doctype html><html lang="pt-BR"><head><meta charset="utf-8"><title>Termos aceitos</title></head><body style="font-family:sans-serif">
<h1>MOTORA – Aceite dos termos de uso</h1>
<p><b>Motorista:</b> ${escHtml(a.driver_name || d?.name)}<br><b>Login:</b> ${escHtml(a.driver_login)}<br><b>CPF:</b> ${escHtml(a.driver_cpf)}</p>
<p><b>Aceito em:</b> ${escHtml(quando)}<br><b>Versão dos termos:</b> ${escHtml(a.terms_version)}<br><b>Código de conferência:</b> ${escHtml(a.terms_hash)}</p>
<p><b>Itens marcados:</b></p><ul>${itens.map((i: unknown) => `<li>${escHtml(i)}</li>`).join("")}</ul>
<p style="color:#666;font-size:12px">Aparelho: ${escHtml(a.user_agent)}${a.ip ? " · IP: " + escHtml(a.ip) : ""}</p>
</body></html>`;
  return await drive({ action: "file", driverId: a.driver_id, driverName: a.driver_name || d?.name || "Motorista", folder: "Documentos", fileName: `Termos aceitos - ${stamp(a.accepted_at)}.html`, mimeType: "text/html", base64: encodeBase64(new TextEncoder().encode(html)) });
}
// ---------------- fim ----------------

// ---------------- E-MAIL: a IA escreve, o dono confere no app e confirma o envio ----------------
async function regrasDono() {
  const { data } = await admin.from("app_settings").select("value").eq("key", "ia_regras").maybeSingle();
  const list = (data?.value as { regras?: unknown } | null)?.regras;
  return Array.isArray(list) ? list.filter((t) => typeof t === "string" && t.trim()).slice(0, 40) as string[] : [];
}
async function emailDraft(kind: unknown, name: unknown, content: unknown) {
  const texto = String(content || "").slice(0, 8000);
  if (!texto.trim()) return { ok: false, error: "nada para escrever" };
  const first = String(name || "").trim().split(/\s+/)[0] || "";
  const regras = await regrasDono();
  const prompt = `Você escreve e-mails de um dono de locadora de carros (MOTORA) para o motorista que aluga o carro${first ? ", chamado " + first : ""}.
Tipo: ${String(kind || "mensagem")}. Escreva um e-mail curto, educado e simples em português do Brasil.
O CONTEÚDO abaixo deve aparecer no e-mail EXATAMENTE como está (valores, datas, chaves Pix, linhas do recibo): não mude nenhum número nem palavra dele.
${regras.length ? "Regras do dono (siga sempre):\n" + regras.map((r, i) => `${i + 1}. ${r}`).join("\n") + "\n" : ""}CONTEÚDO:
${texto}
Devolva SOMENTE um JSON: {"assunto": string, "mensagem": string (o e-mail completo, já com o CONTEÚDO dentro)}`;
  const ai = await callGemini([{ text: prompt }]);
  if (!ai.ok) return { ok: false, error: ai.error };
  const f = ai.fields as Record<string, unknown>;
  let body = String(f.mensagem || "").trim();
  if (!body || !body.replace(/\s/g, "").includes(texto.replace(/\s/g, ""))) body = (body ? body + "\n\n" : "") + texto;
  return { ok: true, subject: String(f.assunto || "").trim().slice(0, 150), body };
}
async function sendEmail(to: unknown, subject: unknown, body: unknown) {
  const t = String(to || "").trim().toLowerCase();
  if (!/^[^\s@,;]+@[^\s@,;]+\.[^\s@,;]+$/.test(t)) return { ok: false, error: "e-mail inválido" };
  const sub = String(subject || "").trim().slice(0, 200), txt = String(body || "").trim().slice(0, 20000);
  if (!sub || !txt) return { ok: false, error: "assunto e mensagem são obrigatórios" };
  const out = await drive({ action: "email", to: t, subject: sub, body: txt });
  return out && out.ok === false ? out : { ok: true };
}
// ---------------- fim do e-mail ----------------

// ===== LEITURA DE DOCUMENTOS E VISTORIA COM IA (Gemini) =====
const GEMINI_FALLBACKS = ["gemini-flash-latest", "gemini-flash-lite-latest", "gemini-2.5-flash", "gemini-2.5-flash-lite"];

async function modelosGemini(key: string, configurado: string) {
  let doGoogle: string[] = [];
  try {
    const r = await fetch("https://generativelanguage.googleapis.com/v1beta/models?pageSize=200", { headers: { "x-goog-api-key": key }, signal: AbortSignal.timeout(8000) });
    if (r.ok) {
      const j = await r.json();
      doGoogle = (j?.models ?? [])
        .filter((m: { name?: string; supportedGenerationMethods?: string[] }) => m.supportedGenerationMethods?.includes("generateContent"))
        .map((m: { name: string }) => m.name.replace(/^models\//, ""))
        .filter((n: string) => /^gemini/.test(n) && !/image|tts|audio|live|embedding|robotics|computer|learn|guard/i.test(n));
    }
  } catch { /* sem a lista, usa só os conhecidos */ }
  const flash = doGoogle.filter((n) => /flash/.test(n)), outros = doGoogle.filter((n) => !/flash/.test(n));
  return [...new Set([configurado, ...GEMINI_FALLBACKS, ...flash, ...outros])].filter(Boolean);
}

async function callGemini(parts: unknown[], limiteMs = 90000) {
  const key = await secret("gemini_key");
  if (!key) return { ok: false, error: "Chave do Gemini não configurada. Vá em Configurações." };
  const configuredModel = (await secret("gemini_model")) || "";
  const inicio = Date.now();
  const models = await modelosGemini(key, configuredModel);
  const body = JSON.stringify({ contents: [{ role: "user", parts }], generationConfig: { responseMimeType: "application/json", temperature: 0 } });
  let lastErr = "";
  let tentados = 0;
  for (const model of models) {
    if (Date.now() - inicio > limiteMs) break;
    tentados++;
    let r: Response;
    try {
      r = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent`, {
        method: "POST",
        headers: { "Content-Type": "application/json", "x-goog-api-key": key },
        body,
        signal: AbortSignal.timeout(22000),
      });
    } catch (e) {
      lastErr = `${model}: sem resposta (${(e as Error)?.name || e})`;
      continue;
    }
    const j = await r.json().catch(() => ({}));
    if (!r.ok) {
      lastErr = `${model}: ${j?.error?.message || "erro " + r.status}`;
      console.log("gemini falhou", r.status, lastErr.slice(0, 200));
      if (r.status === 401) {
        return { ok: false, error: "Gemini recusou a chave: " + (j?.error?.message || r.status) };
      }
      continue;
    }
    const responseText = j?.candidates?.[0]?.content?.parts?.map((p: { text?: string }) => p.text || "").join("") || "";
    try {
      const m = responseText.match(/\{[\s\S]*\}/);
      return { ok: true, model, fields: JSON.parse(m ? m[0] : responseText) };
    } catch {
      lastErr = `${model}: a IA não devolveu dados legíveis`;
    }
  }
  return { ok: false, error: `Gemini (${tentados} modelos tentados): ` + (lastErr || "nenhum modelo respondeu") };
}

const AI_PROMPT = `Você vai receber documentos brasileiros de um motorista (CNH e/ou comprovante de endereço).
Leia com atenção e devolva SOMENTE um JSON com estes campos (use null quando não encontrar):
{"nome": string, "cpf": "000.000.000-00", "rg": string, "data_nascimento": "AAAA-MM-DD", "cnh_numero": string (número de registro da CNH), "cnh_categoria": string (ex: "B", "AB"), "cnh_validade": "AAAA-MM-DD", "endereco": string (endereço completo com rua, número, bairro, cidade, UF e CEP, do comprovante de endereço), "telefone": string}
Não invente dados.`;

const CRLV_PROMPT = `Você vai receber o CRLV-e (documento de veículo brasileiro).
Leia com atenção e devolva SOMENTE um JSON com estes campos (use null quando não encontrar):
{"placa": "ABC1D23" (sem traço nem espaço), "marca_modelo": string (exatamente como em MARCA/MODELO/VERSÃO, ex: "HYUNDAI/HB20S 1.0M"), "marca": string (fabricante/marca do veículo, ex: "Hyundai"), "versao": string (versão do modelo se identificável, ex: "10M Comfort"), "ano_fabricacao": number, "ano_modelo": number, "cor": string, "renavam": string, "chassi": string, "combustivel": string (exatamente como no campo COMBUSTÍVEL, ex: "Alcool / Gasolina", "Flex", "Elétrico", "Híbrido")}
Não invente dados.`;

function expensePrompt(types: unknown) {
  const list = (Array.isArray(types) ? types : []).filter((t) => typeof t === "string" && t.trim()).slice(0, 60) as string[];
  return `Você vai receber uma nota fiscal, cupom fiscal, recibo, boleto pago ou comprovante de uma DESPESA de um veículo (ex.: combustível, peça, oficina/mão de obra, pneu, lavagem, seguro, IPVA, licenciamento, multa, estacionamento, pedágio).
Leia com atenção e devolva SOMENTE um JSON com estes campos (use null quando não encontrar):
{"tipo": string (o tipo de despesa; ${list.length ? "escolha EXATAMENTE um destes se algum servir: " + JSON.stringify(list) + "; se nenhum servir, escreva um nome curto em português, ex: \"Pneu\"" : "um nome curto em português, ex: \"Combustível\""}), "valor": number (VALOR TOTAL pago em reais, ex: 250.90), "data": "AAAA-MM-DD" (data da compra ou do pagamento), "descricao": string (resumo curto do que foi comprado ou feito, ex: "Troca de óleo e filtro" ou "40 litros de gasolina"), "estabelecimento": string (nome da loja/posto/oficina), "placa": string (placa do veículo se aparecer, sem traço)}
Não invente dados.`;
}

function earningPrompt() {
  const hoje = new Date(Date.now() - 3 * 3600 * 1000).toISOString().slice(0, 10);
  return `Você vai receber o print (captura de tela) da tela de GANHOS de um aplicativo de corridas brasileiro (Uber, 99, inDrive ou outro).
Hoje é ${hoje}. Quando a tela não mostrar o ano, use o ano mais provável em relação a hoje (nunca uma data no futuro distante).
Leia com atenção e devolva SOMENTE um JSON com estes campos (use null quando não encontrar):
{"app": "Uber" | "99" | "inDrive" | "Outro" (reconheça pelo visual, cores e textos; a Uber usa fundo preto e termos como "Ganhos totais", "Preço líquido", "Promoções", "Pontos"), "valor_total": number (o GANHO TOTAL mostrado em destaque, em reais, ex: 268.79), "periodo_inicio": "AAAA-MM-DD", "periodo_fim": "AAAA-MM-DD" (o período da tela; se for um dia só, as duas datas iguais), "dias_com_ganho": ["AAAA-MM-DD"] (os dias do gráfico que têm barra/valor maior que zero), "viagens": number, "horas_online": string (ex: "8 h 45 m"), "valor_liquido": number, "promocoes": number}
Não invente dados.`;
}

const FOTO_PROMPT = `
Inclua também no MESMO JSON o campo "foto_cnh": {"documento": número do documento que é a CNH (1 = o primeiro enviado), "caixa": [ymin, xmin, ymax, xmax]} com a posição da FOTO DO ROSTO do motorista impressa na CNH, em escala de 0 a 1000 em relação à imagem inteira (ou à primeira página, se for PDF). A caixa deve cobrir só a foto 3x4. Use null se não houver CNH com foto.`;

const callGeminiDriver = (parts: unknown[]) => callGemini(parts, 60000);

async function aiReadFiles(paths: unknown, kind: string, types?: unknown) {
  const list = (Array.isArray(paths) ? paths : []).filter((p) => typeof p === "string" && p && !p.includes("..")).slice(0, 4) as string[];
  if (!list.length) return { ok: false, error: "Nenhum documento enviado." };
  const prompt = kind === "vehicle" ? CRLV_PROMPT : kind === "expense" ? expensePrompt(types) : kind === "earning" ? earningPrompt() : AI_PROMPT + FOTO_PROMPT;
  const parts: unknown[] = [{ text: prompt }];
  for (const p of list) {
    const f = await readFile(p);
    parts.push({ inline_data: { mime_type: f.mime, data: f.base64 } });
  }
  return kind === "driver" ? await callGeminiDriver(parts) : await callGemini(parts);
}

// Análise em lote de fotos de vistoria veicular (entrega ao motorista ou devolução pelo motorista)
async function aiAnalyzeInspection(paths: unknown, phaseRaw: unknown, baselineRaw: unknown) {
  const list = (Array.isArray(paths) ? paths : [])
    .filter((p) => typeof p === "string" && p && !p.includes("..") && !p.startsWith("/"))
    .slice(0, 6) as string[];
  if (!list.length) return { ok: false, error: "Nenhuma foto enviada para análise." };
  const phase = String(phaseRaw || "entrega") === "devolucao" ? "devolucao" : "entrega";
  const baseline = Array.isArray(baselineRaw)
    ? baselineRaw.slice(0, 30).map((b: { label?: string; slot?: string; damage_note?: string }) => ({
        label: String(b?.label || b?.slot || "").slice(0, 80),
        damage_note: b?.damage_note ? String(b.damage_note).slice(0, 140) : null,
      }))
    : [];

  const prompt = `Você é um vistoriador automotivo técnico imparcial auxiliando o proprietário e o motorista em uma vistoria veicular brasileira (${phase === "devolucao" ? "DEVOLUÇÃO DO VEÍCULO PELO MOTORISTA ao final da locação" : "ENTREGA INICIAL DO VEÍCULO AO MOTORISTA"}).
Você vai receber ${list.length} imagem(ns) numeradas de 0 a ${list.length - 1} na ordem abaixo.
${phase === "devolucao" && baseline.length ? "Avarias/registros já existentes na Vistoria de Entrega Inicial (use como referência para não confundir dano preexistente com dano novo):\n" + JSON.stringify(baseline) + "\n" : ""}
Regras obrigatórias de isenção e precisão:
1. Classifique cada foto em um "slot" dentre: "dianteira", "traseira", "lateral_esquerda", "lateral_direita", "painel", "pneu_roda", "interior", "porta_malas", "motor", "avaria", "documento", "outro".
2. Em "titulo_sugerido", dê um nome curto e claro em português identificando o ângulo ou parte fotografada (ex: "Dianteira", "Traseira", "Lateral esquerda", "Lateral direita", "Painel e hodômetro", "Pneu dianteiro esquerdo", "Detalhe para-choque dianteiro"). NÃO inclua conclusão de culpa ou acusação no título base.
3. Se for foto do painel/hodômetro, extraia "hodometro_km" (apenas número inteiro, ou null) e "combustivel_nivel" (ex: "Reserva", "1/4", "1/2", "3/4", "Cheio", ou porcentagem da bateria, ou null).
4. Examine com atenção se há possível avaria/dano visível (risco/arranhão, amassado, trinca em vidro/farol/para-choque, peça quebrada ou faltante, pneu rasgado/careca/bolha, luz de alerta grave no painel).
   - Atenção: reflexos de luz, nuvens, poeira, gotas de chuva e sujeira leve NÃO são danos. Se tiver dúvida, indique em "observacao_ia" ("possível reflexo ou sujeira — conferir visualmente") e defina "confianca": "baixa" ou "media".
   - Se "tem_dano" for true, descreva de forma estritamente objetiva o que foi observado e em qual peça/lado em "dano_observado" (sem jamais atribuir culpa a ninguém — o dono confirmará presencialmente antes de nomear).
5. ${phase === "devolucao" ? 'Em "comparacao_entrega", informe "compativel_com_preexistente" se o dano bater claramente com um item preexistente da entrega inicial, "possivel_dano_novo" se parecer dano novo ou agravado, ou "sem_dano".' : 'Em "comparacao_entrega", use "sem_dano" quando íntegro ou "preexistente_a_confirmar" quando observar possível dano para o dono confirmar.'}

Devolva SOMENTE um JSON neste formato:
{"items": [{"index": 0, "slot": string, "titulo_sugerido": string, "hodometro_km": number | null, "combustivel_nivel": string | null, "tem_dano": boolean, "dano_observado": string | null, "comparacao_entrega": string, "confianca": "alta" | "media" | "baixa", "observacao_ia": string | null}]}`;

  const parts: unknown[] = [{ text: prompt }];
  for (let i = 0; i < list.length; i++) {
    const f = await readFile(list[i]);
    parts.push({ text: `Foto index ${i} (${list[i].split("/").pop()}):` });
    parts.push({ inline_data: { mime_type: f.mime, data: f.base64 } });
  }
  const ai = await callGemini(parts, 75000);
  if (!ai.ok) return ai;
  const f = ai.fields as { items?: unknown[] };
  return { ok: true, model: ai.model, items: Array.isArray(f?.items) ? f.items : [] };
}

// E-mail para o(s) master(s) com o usuário e a senha do motorista novo
async function driverWelcome(driverId: string, password: string) {
  const { data: d } = await admin.from("profiles").select("name, username").eq("id", driverId).maybeSingle();
  if (!d) return { ok: false, error: "motorista não encontrado" };
  const { data: masters } = await admin.from("profiles").select("username").eq("role", "master");
  const to = (masters ?? []).map((m) => m.username).filter((e) => e && e.includes("@") && !e.endsWith("@motora.app")).join(",");
  if (!to) return { ok: false, error: "e-mail do master não encontrado" };
  const login = String(d.username).replace("@motora.app", "");
  const body =
    `Novo motorista cadastrado no MOTORA.\n\n` +
    `Nome: ${d.name}\nUsuário: ${login}\nSenha: ${password}\n\n` +
    `Endereço do app: https://motora-frota.netlify.app\n\n` +
    `O motorista pode trocar a senha dentro do app, em "Trocar minha senha".`;
  return await drive({ action: "email", to, subject: `MOTORA – Novo motorista: ${d.name}`, body });
}

// ---------------- CONFERÊNCIA DE COMPROVANTE COM IA ----------------
const RECEIPT_PROMPT = `Você vai receber um comprovante brasileiro de Pix ou transferência.
Leia com atenção e devolva SOMENTE um JSON com estes campos (use null quando não encontrar):
{"recebedor_nome": string (nome de quem RECEBEU o dinheiro), "recebedor_documento": string (CPF/CNPJ do recebedor, como aparece), "recebedor_instituicao": string, "pagador_nome": string, "valor": number (em reais, ex: 650.00), "data_hora": "AAAA-MM-DDTHH:MM" (data e hora da transação), "situacao": "realizado" | "agendado" | "cancelado" | "desconhecido", "data_agendada": "AAAA-MM-DD", "id_transacao": string, "parece_comprovante": boolean}
Se aparecer "agendamento", "agendado", "pagamento agendado" ou "será efetivado", a situação é "agendado".
Não invente dados.`;

async function geminiOnFiles(prompt: string, paths: string[]) {
  const parts: unknown[] = [{ text: prompt }];
  for (const p of paths) {
    const f = await readFile(p);
    parts.push({ inline_data: { mime_type: f.mime, data: f.base64 } });
  }
  return await callGemini(parts);
}

const NAME_SKIP = ["DE", "DA", "DO", "DAS", "DOS", "E"];
function nameWords(s: unknown) {
  return String(s || "").normalize("NFD").replace(/[\u0300-\u036f]/g, "").toUpperCase()
    .replace(/[^A-Z ]/g, " ").split(/\s+/).filter((w) => w.length > 1 && !NAME_SKIP.includes(w));
}
const brl = (v: number) => Number(v).toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
const dBR = (v: string) => { const d = new Date(v.length === 10 ? v + "T12:00:00-03:00" : v); return isNaN(d.getTime()) ? v : d.toLocaleDateString("pt-BR", { timeZone: "America/Sao_Paulo" }); };

async function pushAlert(payload: Record<string, unknown>) {
  try {
    await fetch(`${Deno.env.get("SUPABASE_URL")}/functions/v1/motora-push`, {
      method: "POST",
      headers: { "Content-Type": "application/json", "x-cron-token": (await secret("cron_token")) || "" },
      body: JSON.stringify(payload),
    });
  } catch (_) { /* o aviso nunca pode travar a conferência */ }
}
const notifyMasters = (title: string, body: string) => pushAlert({ type: "master_alert", title, body });
const notifyDriver = (driverId: string, title: string, body: string) => pushAlert({ type: "driver_alert", driver_id: driverId, title, body });

async function verifyReceipt(receiptId: string) {
  const { data: r } = await admin.from("receipts").select("*").eq("id", receiptId).maybeSingle();
  if (!r) return { ok: false, error: "comprovante não encontrado" };
  const eraErro = r.ai_status === "erro";
  const { data: d } = await admin.from("profiles").select("id, name, pix_amount, pix_sent_at").eq("id", r.driver_id).maybeSingle();
  const { data: cfg } = await admin.from("app_settings").select("value").eq("key", "receipt_check").maybeSingle();
  const expectedName = (cfg?.value as Record<string, string> | null)?.nome || "THIAGO GOMES BORGES";
  const save = (status: string, result: unknown) =>
    admin.from("receipts").update({ ai_status: status, ai_result: result, ai_checked_at: new Date().toISOString() }).eq("id", receiptId);

  let ai: { ok: boolean; error?: string; model?: string; fields?: unknown };
  try { ai = await geminiOnFiles(RECEIPT_PROMPT, [r.file_path]); } catch (e) { ai = { ok: false, error: String((e as Error)?.message || e) }; }
  if (!ai.ok) {
    await save("erro", { error: ai.error });
    if (!eraErro) await notifyMasters(`Comprovante de ${d?.name || "motorista"}: confira à mão`, `A IA não conseguiu ler o comprovante (${ai.error}).`);
    return { ok: false, error: ai.error };
  }
  const f = ai.fields as Record<string, unknown>;
  const problems: string[] = [];

  if (f.parece_comprovante === false) problems.push("O arquivo não parece um comprovante de pagamento.");

  const want = nameWords(expectedName), got = nameWords(f.recebedor_nome);
  const nameOk = got.length > 0 && got.includes(want[0]) && want.slice(1).some((w) => got.includes(w));
  if (!f.recebedor_nome) problems.push("Não deu para ler o nome de quem recebeu.");
  else if (!nameOk) problems.push(`Pagamento foi para ${f.recebedor_nome}, não para ${expectedName}.`);

  const expected = d?.pix_amount != null ? Number(d.pix_amount) : null;
  if (expected != null) {
    if (f.valor == null) problems.push("Não deu para ler o valor.");
    else if (Math.abs(Number(f.valor) - expected) > 0.01) problems.push(`Valor ${brl(Number(f.valor))} (esperado ${brl(expected)}).`);
  }

  if (f.situacao === "agendado") problems.push(`Pagamento AGENDADO${f.data_agendada ? " para " + dBR(String(f.data_agendada)) : ""}: ainda não caiu na conta.`);
  else if (f.situacao === "cancelado") problems.push("O comprovante mostra pagamento CANCELADO.");
  else if (f.situacao !== "realizado") problems.push("Não deu para confirmar se o pagamento foi realizado.");

  if (d?.pix_sent_at && f.data_hora) {
    const s = String(f.data_hora);
    const dt = new Date(s.length <= 16 ? s + ":00-03:00" : s);
    if (!isNaN(dt.getTime()) && dt.getTime() < new Date(d.pix_sent_at).getTime() - 24 * 3600 * 1000) {
      problems.push(`Data ${dBR(s)} é anterior ao Pix desta semana (comprovante antigo?).`);
    }
  }

  const status = problems.length ? "alerta" : "ok";
  await save(status, { ...f, problemas: problems, nome_esperado: expectedName, valor_esperado: expected, modelo: ai.model });
  if (eraErro && !r.confirmed_at && !r.rejected_at) {
    await notifyMasters(`IA leu o comprovante de ${d?.name || "motorista"}`, `Valor: ${f.valor != null ? brl(Number(f.valor)) : "não lido"}. ${problems.length ? "Problemas: " + problems.join(" ") : "Os dados batem."}`);
  } else if (problems.length) {
    await notifyMasters(`Comprovante de ${d?.name || "motorista"}: confira!`, problems.join(" "));
  }
  if (problems.length && d?.id && !r.confirmed_at && !r.rejected_at) await notifyDriver(d.id, "Problema no seu comprovante", problems.join(" ") + " Confira e envie o comprovante correto pelo app.");
  return { ok: true, status, problems };
}

async function checkDriverCnh(driverId: string) {
  const { data: d } = await admin.from("profiles").select("id, name, cpf, cnh_pending_path").eq("id", driverId).maybeSingle();
  if (!d || !d.cnh_pending_path) return { ok: false, error: "nenhuma CNH nova para conferir" };
  const nome = d.name || "Motorista";
  let ai: { ok: boolean; error?: string; model?: string; fields?: unknown };
  try { ai = await geminiOnFiles(AI_PROMPT, [d.cnh_pending_path]); } catch (e) { ai = { ok: false, error: String((e as Error)?.message || e) }; }
  const now = new Date().toISOString();
  if (!ai.ok) {
    await admin.from("profiles").update({ cnh_checked_at: now, cnh_check_note: "A IA não conseguiu ler. O dono vai conferir." }).eq("id", driverId);
    await notifyMasters(`${nome} enviou uma CNH nova`, `A IA não conseguiu ler (${ai.error}). Abra o app e confira.`);
    return { ok: false, error: ai.error };
  }
  const f = ai.fields as Record<string, unknown>;
  const hoje = new Date(Date.now() - 3 * 3600 * 1000).toISOString().slice(0, 10);
  const exp = /^\d{4}-\d{2}-\d{2}$/.test(String(f.cnh_validade || "")) ? String(f.cnh_validade) : null;
  const dig = (v: unknown) => String(v || "").replace(/\D/g, "");
  const cpfOk = !d.cpf || !f.cpf || dig(d.cpf) === dig(f.cpf);
  let problema = "";
  if (!cpfOk) problema = "O CPF da CNH enviada não é o seu.";
  else if (!exp) problema = "Não deu para ler a validade da CNH. Envie uma foto mais nítida, com a CNH inteira.";
  else if (exp < hoje) problema = `A CNH enviada também está vencida (${dBR(exp)}).`;
  if (problema) {
    await admin.from("profiles").update({ cnh_checked_at: now, cnh_check_note: problema }).eq("id", driverId);
    await notifyMasters(`CNH nova de ${nome}: confira`, problema);
    await notifyDriver(driverId, "Problema na CNH enviada", problema + " Envie a CNH válida pelo app.");
    return { ok: true, status: "alerta", problema };
  }
  const upd: Record<string, unknown> = { cnh_path: d.cnh_pending_path, cnh_expiry: exp, cnh_pending_path: null, cnh_checked_at: now, cnh_check_note: null };
  if (f.cnh_numero) upd.cnh_number = String(f.cnh_numero);
  if (f.cnh_categoria) upd.cnh_category = String(f.cnh_categoria);
  await admin.from("profiles").update(upd).eq("id", driverId);
  await notifyMasters(`${nome} atualizou a CNH`, `CNH nova válida até ${dBR(exp!)}. Já está na ficha.`);
  await notifyDriver(driverId, "CNH atualizada", `Recebemos sua CNH nova, válida até ${dBR(exp!)}. Obrigado!`);
  return { ok: true, status: "ok", validade: exp };
}

async function driverCnhCheck(userId: string, path: unknown) {
  const p = String(path || "");
  if (!p.startsWith(userId + "/") || p.includes("..")) return { ok: false, error: "arquivo inválido" };
  const { data: d } = await admin.from("profiles").select("id, name, cpf, birth_date").eq("id", userId).maybeSingle();
  if (!d) return { ok: false, error: "cadastro não encontrado" };
  let ai: { ok: boolean; error?: string; model?: string; fields?: unknown };
  try { ai = await geminiOnFiles(AI_PROMPT + FOTO_PROMPT, [p]); } catch (e) { ai = { ok: false, error: String((e as Error)?.message || e) }; }
  if (!ai.ok) return { ok: false, error: ai.error };
  const f = ai.fields as Record<string, unknown>;
  const problems: string[] = [];
  const dig = (v: unknown) => String(v || "").replace(/\D/g, "");
  if (d.cpf) {
    if (!f.cpf) problems.push("Não deu para ler o CPF na CNH.");
    else if (dig(f.cpf) !== dig(d.cpf)) problems.push("O CPF da CNH não é o do seu cadastro.");
  }
  const want = nameWords(d.name), got = nameWords(f.nome);
  if (want.length && got.length && !(got.includes(want[0]) && want.slice(1).some((w) => got.includes(w)))) problems.push("O nome da CNH não é o do seu cadastro.");
  if (d.birth_date && f.data_nascimento && String(f.data_nascimento) !== String(d.birth_date)) problems.push("A data de nascimento da CNH não bate com o cadastro.");
  const hoje = new Date(Date.now() - 3 * 3600 * 1000).toISOString().slice(0, 10);
  const exp = /^\d{4}-\d{2}-\d{2}$/.test(String(f.cnh_validade || "")) ? String(f.cnh_validade) : null;
  if (!exp) problems.push("Não deu para ler a validade. Envie uma foto nítida da CNH inteira.");
  else if (exp < hoje) problems.push(`Esta CNH também está vencida (${dBR(exp)}).`);
  if (problems.length) {
    await notifyMasters(`CNH de ${d.name || "motorista"} recusada pela IA`, problems.join(" "));
    return { ok: false, problems };
  }
  const upd: Record<string, unknown> = { cnh_path: p, cnh_expiry: exp, cnh_pending_path: null, cnh_sent_at: null, cnh_checked_at: new Date().toISOString() };
  if (f.cnh_numero) upd.cnh_number = String(f.cnh_numero);
  if (f.cnh_categoria) upd.cnh_category = String(f.cnh_categoria);
  const { error } = await admin.from("profiles").update(upd).eq("id", userId);
  if (error) return { ok: false, error: error.message };
  await notifyMasters(`${d.name || "Motorista"} atualizou a CNH`, `CNH nova conferida pela IA, válida até ${dBR(exp!)}.`);
  return { ok: true, expiry: exp, number: f.cnh_numero || null, category: f.cnh_categoria || null, foto_cnh: f.foto_cnh || null };
}

async function aiRead(driverId: string) {
  const d = await driverInfo(driverId);
  const parts: unknown[] = [{ text: AI_PROMPT }];
  for (const col of ["cnh_path", "address_path"]) {
    if (d[col]) {
      const f = await readFile(d[col]);
      parts.push({ text: `Documento: ${DOC_LABEL[col]}` });
      parts.push({ inline_data: { mime_type: f.mime, data: f.base64 } });
    }
  }
  if (parts.length === 1) return { ok: false, error: "Este motorista não tem CNH nem comprovante de endereço enviados." };
  return await callGeminiDriver(parts);
}

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response("ok", { headers: cors });
  try {
    const body = await req.json().catch(() => ({}));
    const cronTok = req.headers.get("x-cron-token");
    if (cronTok) {
      if (cronTok !== (await secret("cron_token"))) return json({ error: "proibido" }, 403);
      let out: unknown = { ok: false, error: "tipo desconhecido" };
      if (body.type === "doc") out = await syncDoc(body.driver_id, body.col);
      else if (body.type === "receipt") out = await uploadReceipt(body.receipt_id);
      else if (body.type === "pix") out = await syncPix(body.history_id);
      else if (body.type === "expense") out = await syncExpense(body.expense_id);
      else if (body.type === "vehicle_doc") out = await syncVehicleDoc(body.vehicle_id);
      else if (body.type === "inspection") out = await syncInspection(body.photo_id);
      else if (body.type === "terms") out = await syncTerms(body.acceptance_id);
      else if (body.type === "verify_receipt") out = await verifyReceipt(body.receipt_id);
      else if (body.type === "driver_cnh") out = await checkDriverCnh(body.driver_id);
      console.log(body.type, JSON.stringify(out));
      return json(out);
    }

    const token = (req.headers.get("Authorization") || "").replace(/^Bearer\s+/i, "");
    const { data: u } = await admin.auth.getUser(token);
    if (!u?.user) return json({ error: "faça login" }, 401);
    const { data: me } = await admin.from("profiles").select("role").eq("id", u.user.id).maybeSingle();
    if (body.type === "driver_cnh_check") return json(await driverCnhCheck(u.user.id, body.path));
    if (me?.role !== "master") return json({ error: "apenas o master" }, 403);

    if (body.type === "ai_read") return json(await aiRead(body.driver_id));
    if (body.type === "verify_receipt") return json(await verifyReceipt(body.receipt_id));
    if (body.type === "ai_read_files") {
      const out = await aiReadFiles(body.paths, body.kind, body.types);
      console.log("ai_read_files", body.kind, (out as { ok: boolean }).ok, (out as { error?: string }).error || (out as { model?: string }).model);
      return json(out);
    }
    if (body.type === "ai_analyze_inspection") {
      const out = await aiAnalyzeInspection(body.paths, body.phase, body.baseline);
      console.log("ai_analyze_inspection", body.phase, (out as { ok: boolean }).ok, (out as { error?: string }).error || (out as { model?: string }).model);
      return json(out);
    }
    if (body.type === "driver_welcome") return json(await driverWelcome(body.driver_id, String(body.password || "")));
    if (body.type === "email_draft") return json(await emailDraft(body.kind, body.name, body.content));
    if (body.type === "send_email") return json(await sendEmail(body.to, body.subject, body.body));

    if (body.type === "drive_ping") return json(await drive({ action: "ping" }));
    if (body.type === "drive_resync") {
      const { data: drivers } = await admin.from("profiles").select("id, cnh_path, address_path, contract_path, inspection_term_path").in("role", ["driver", "excluido"]);
      let n = 0;
      for (const d of drivers ?? []) for (const col of ["cnh_path", "address_path", "contract_path", "inspection_term_path"]) if ((d as Record<string, string>)[col]) { await syncDoc(d.id, col); n++; }
      const { data: hist } = await admin.from("pix_history").select("id");
      for (const h of hist ?? []) { await syncPix(h.id); n++; }
      const { data: exps } = await admin.from("vehicle_expenses").select("id");
      for (const e of exps ?? []) { await syncExpense(e.id); n++; }
      const { data: vehs } = await admin.from("vehicles").select("id, crlv_path");
      for (const v of vehs ?? []) if (v.crlv_path) { await syncVehicleDoc(v.id); n++; }
      const { data: fotos } = await admin.from("inspection_photos").select("id");
      for (const p of fotos ?? []) { await syncInspection(p.id); n++; }
      const { data: aceites } = await admin.from("terms_acceptances").select("id");
      for (const a of aceites ?? []) { await syncTerms(a.id); n++; }
      return json({ ok: true, sent: n });
    }
    return json({ error: "tipo desconhecido" }, 400);
  } catch (e) {
    console.error(e);
    return json({ ok: false, error: String(e) }, 500);
  }
});
