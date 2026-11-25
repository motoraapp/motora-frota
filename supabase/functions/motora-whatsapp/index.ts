// MOTORA - WhatsApp OFICIAL (API da Meta, "WhatsApp Cloud API"), no lugar do robô. Pedido do dono (25/11/2026).
// Só manda mensagens para os MOTORISTAS (Pix, vence hoje, atraso, recibo em PDF e avisos). Não manda nada ao dono nem à Dara.
// Fica DESLIGADA até o dono ligar em Configurações → "WhatsApp oficial (API da Meta)".
//
// Configuração (Configurações do app; SQL supabase/2026-11-25-whatsapp-api.sql):
//   app_settings whatsapp_api = {ativo, ativado_em, waba_id, phone_id, app_id, versao}
//   app_secrets wa_token (token permanente do usuário do sistema), wa_app_secret (chave secreta do app, confere o aviso da Meta),
//               wa_verify (palavra de verificação do aviso, criada pelo banco)
//
// Ações:
//   "enviar_fila"    (cron motora-whatsapp-api, a cada 1 min, e o dono): manda as mensagens pendentes de whatsapp_queue criadas
//                    depois de ligar (até 6 h de idade), para telefone 1, telefone 2 e 2º motorista. Erro: tenta 3 vezes e avisa o dono.
//   "modelos"        (dono): cria na Meta os 4 modelos de mensagem (MODELOS) para aprovação.
//   "situacao"       (dono): confere o número na Meta e a situação dos modelos (aprovado, em análise, recusado).
//   "teste"          (dono): manda o modelo motora_aviso para um número (o WhatsApp do dono, se não vier outro).
//   GET ?hub.*        verificação do aviso (webhook) da Meta; POST da Meta: guarda falha de entrega em whatsapp_queue.api_erro.
import { createClient } from "npm:@supabase/supabase-js@2.45.4";
import { PDFDocument, StandardFonts } from "npm:pdf-lib@1.17.1";
import QRCode from "npm:qrcode@1.5.4";
import { decodeBase64 } from "jsr:@std/encoding@1/base64";

function serviceKey() {
  const legacy = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY");
  if (legacy) return legacy;
  try { const keys = JSON.parse(Deno.env.get("SUPABASE_SECRET_KEYS") || "{}"); return keys.default || Object.values(keys)[0]; } catch { return ""; }
}
const admin = createClient(Deno.env.get("SUPABASE_URL")!, serviceKey() as string, { auth: { persistSession: false } });
const CORS = { "Access-Control-Allow-Origin": "*", "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type, x-cron-token" };
const json = (b: unknown, s = 200) => new Response(JSON.stringify(b), { status: s, headers: { ...CORS, "Content-Type": "application/json" } });
type Extra = Record<string, any>; // eslint-disable-line @typescript-eslint/no-explicit-any

const IDIOMA = "pt_BR";
const MAX_IDADE_H = 6;        // mensagem mais velha que isso não sai sozinha (fica na Área IA), igual ao robô
const POR_RODADA = 10;
const MAX_TENTATIVAS = 3;
const brl = (v: unknown) => Number(v || 0).toLocaleString("pt-BR", { style: "currency", currency: "BRL" });

// ---------- modelos de mensagem (a Meta aprova uma vez; depois o app só preenche os {{n}}) ----------
// Regras da Meta: texto fixo + variáveis; variável não pode ter quebra de linha nem começar/terminar o texto.
const EX_CODIGO = "00020126580014br.gov.bcb.pix0136123e4567-e12b-12d1-a456-4266554400005204000053039865406650.005802BR5913LOCADORA TESTE6008GOIANIA62070503***6304ABCD";
export const MODELOS = [
  {
    name: "motora_pix_qr", category: "UTILITY", language: IDIOMA, comImagem: true,
    corpo: "Olá, {{1}}.\n\n*{{2}}*\n\n{{3}}\n\n*Total: {{4}} | Vencimento: {{5}}*\n\nPague pelo QR Code acima ou pelo Pix copia e cola abaixo. Não precisa enviar o comprovante.\n\n{{6}}\n\nOs mesmos dados estão no app MOTORA.",
    exemplo: ["Marcos", "Novo Pix disponível", "Aluguel do carro: R$ 550,00 · Caução 3/10: R$ 100,00", "R$ 650,00", "segunda-feira, 01/12, até 23:59", EX_CODIGO],
  },
  {
    name: "motora_pix", category: "UTILITY", language: IDIOMA,
    corpo: "Olá, {{1}}.\n\n*{{2}}*\n\n{{3}}\n\n*Total: {{4}} | Vencimento: {{5}}*\n\nPara pagar, use o Pix abaixo. Não precisa enviar o comprovante.\n\n{{6}}\n\nOs mesmos dados estão no app MOTORA.",
    exemplo: ["Marcos", "Seu Pix vence hoje", "Aluguel do carro: R$ 550,00 · Caução 3/10: R$ 100,00", "R$ 650,00", "hoje, 01/12, até 23:59", EX_CODIGO],
  },
  {
    name: "motora_recibo", category: "UTILITY", language: IDIOMA, comDocumento: true,
    corpo: "Olá, {{1}}.\n\n{{2}}\n\nO recibo em PDF está nesta mensagem. Obrigado!",
    exemplo: ["Marcos", "Recebemos seu pagamento de R$ 650,00 em 01/12/2026, referente à semana de 01/12 a 07/12."],
  },
  {
    name: "motora_aviso", category: "UTILITY", language: IDIOMA,
    corpo: "Olá, {{1}}.\n\n*{{2}}*\n\n{{3}}\n\nQualquer dúvida, responda esta mensagem.",
    exemplo: ["Marcos", "Dia do pagamento alterado", "Seu pagamento agora é todo sábado. O Pix de R$ 650,00 vence sábado, 06/12, até 23:59."],
  },
];
const RODAPE = "MOTORA · aluguel de veículos";

// ---------- configuração ----------
async function secret(key: string) {
  const { data } = await admin.from("app_secrets").select("value").eq("key", key).maybeSingle();
  return (data?.value ?? null) as string | null;
}
async function config() {
  const { data } = await admin.from("app_settings").select("value").eq("key", "whatsapp_api").maybeSingle();
  const c: Extra = { versao: "v21.0", ...(data?.value || {}) };
  c.token = await secret("wa_token");
  return c;
}
async function graph(c: Extra, method: string, path: string, body?: unknown) {
  const r = await fetch(`https://graph.facebook.com/${c.versao}/${path}`, {
    method, headers: { "Content-Type": "application/json", Authorization: `Bearer ${c.token}` },
    body: body ? JSON.stringify(body) : undefined, signal: AbortSignal.timeout(20000),
  });
  const j = await r.json().catch(() => ({}));
  if (!r.ok) throw new Error(`Meta ${r.status}: ${j?.error?.error_user_msg || j?.error?.message || JSON.stringify(j).slice(0, 200)}`);
  return j;
}
async function avisarDono(title: string, body: string) {
  try {
    await fetch(`${Deno.env.get("SUPABASE_URL")}/functions/v1/motora-push`, {
      method: "POST", headers: { "Content-Type": "application/json", "x-cron-token": (await secret("cron_token")) || "" },
      body: JSON.stringify({ type: "master_alert", title, body, url: "/" }),
    });
  } catch (_) { /* aviso nunca trava o envio */ }
}

// ---------- montar a mensagem de cada linha da fila ----------
export const plano = (s: unknown, max = 700) => String(s ?? "").replace(/\r/g, "").replace(/\s*\n+\s*/g, " · ").replace(/\t/g, " ").replace(/ {4,}/g, "   ").replace(/^[\s·]+|[\s·]+$/g, "").slice(0, max) || "-";
export const numeroWa = (v: unknown) => {
  let d = String(v ?? "").replace(/\D/g, "");
  if (d.length === 10 || d.length === 11) d = "55" + d;
  return d.length >= 12 && d.length <= 13 ? d : "";
};
export const ehPix = (titulo: string) => /^(Novo Pix|Seu Pix vence|Pagamento em atraso|Pix atualizado)/i.test(titulo);
function vencTexto(iso: string | null) {
  if (!iso) return "-";
  const d = new Date(iso);
  const hoje = new Date().toLocaleDateString("sv-SE", { timeZone: "America/Sao_Paulo" });
  const dia = d.toLocaleDateString("sv-SE", { timeZone: "America/Sao_Paulo" });
  const dm = d.toLocaleDateString("pt-BR", { timeZone: "America/Sao_Paulo", day: "2-digit", month: "2-digit" });
  const sem = d.toLocaleDateString("pt-BR", { timeZone: "America/Sao_Paulo", weekday: "long" });
  return `${dia === hoje ? "hoje" : sem}, ${dm}, até 23:59`;
}
function codigoPix(d: Extra) {
  if (d.pix_code) return String(d.pix_code);
  const m = String(d.pix_link || "").match(/^chave:([^|]+)\|(.+)$/);
  return m ? `Chave Pix (${m[1]}): ${m[2]}` : "";
}
async function linkArquivo(path: string) {
  const { data } = await admin.storage.from("docs").createSignedUrl(path, 3600);
  return data?.signedUrl || "";
}
const param = (t: string) => ({ type: "text", text: plano(t) });

export async function montar(row: Extra, d: Extra): Promise<{ modelo: string; componentes: Extra[] }> {
  const nome = String(d.name || "").split(/\s+/)[0] || "motorista";
  const titulo = String(row.title || "Aviso");
  const codigo = codigoPix(d);
  const pixAberto = !!(codigo && d.pix_amount != null);
  if (ehPix(titulo) && pixAberto) {
    const itens = String(d.pix_description || "").split("\n").filter((l) => l.trim() && !/^Total:/i.test(l.trim())).join("\n");
    const corpo = [nome, titulo, itens || "Aluguel do veículo", brl(d.pix_amount), vencTexto(d.pix_due_at), codigo].map(param);
    const img = d.pix_qr_path ? await linkArquivo(String(d.pix_qr_path)) : "";
    if (img) return { modelo: "motora_pix_qr", componentes: [{ type: "header", parameters: [{ type: "image", image: { link: img } }] }, { type: "body", parameters: corpo }] };
    return { modelo: "motora_pix", componentes: [{ type: "body", parameters: corpo }] };
  }
  if (/\.pdf$/i.test(String(row.arquivo_path || ""))) {
    const doc = await linkArquivo(String(row.arquivo_path));
    if (doc) {
      return { modelo: "motora_recibo", componentes: [
        { type: "header", parameters: [{ type: "document", document: { link: doc, filename: "Recibo MOTORA.pdf" } }] },
        { type: "body", parameters: [param(nome), param(row.body || row.message || "Recebemos seu pagamento.")] },
      ] };
    }
  }
  return { modelo: "motora_aviso", componentes: [{ type: "body", parameters: [param(nome), param(titulo), param(row.body || row.message || titulo)] }] };
}

async function mandarModelo(c: Extra, para: string, modelo: string, componentes: Extra[]) {
  const r = await graph(c, "POST", `${c.phone_id}/messages`, {
    messaging_product: "whatsapp", recipient_type: "individual", to: para, type: "template",
    template: { name: modelo, language: { code: IDIOMA }, components: componentes },
  });
  return String(r?.messages?.[0]?.id || "");
}

// ---------- fila ----------
async function enviarFila() {
  const c = await config();
  if (!c.ativo) return { pulou: "API desligada" };
  if (!c.token || !c.phone_id) return { pulou: "falta token ou ID do número" };
  // linha presa em "enviando" (rodada que caiu no meio) volta para a fila
  await admin.from("whatsapp_queue").update({ status: "pendente" }).eq("status", "enviando").lt("created_at", new Date(Date.now() - 5 * 60000).toISOString());
  const desde = new Date(Math.max(Date.parse(String(c.ativado_em || 0)) || 0, Date.now() - MAX_IDADE_H * 3600000)).toISOString();
  const { data: fila } = await admin.from("whatsapp_queue").select("*").eq("status", "pendente").not("driver_id", "is", null)
    .gte("created_at", desde).lt("api_tentativas", MAX_TENTATIVAS).order("created_at").limit(POR_RODADA);
  const out: Extra[] = [];
  for (const row of fila ?? []) {
    // reserva a linha (se outra rodada pegou primeiro, pula)
    const { data: pego } = await admin.from("whatsapp_queue").update({ status: "enviando" }).eq("id", row.id).eq("status", "pendente").select("id");
    if (!pego?.length) continue;
    try {
      const { data: d } = await admin.from("profiles").select("*").eq("id", row.driver_id).maybeSingle();
      if (!d || d.role !== "driver") throw new Error("motorista não encontrado");
      const ex: Extra = d.pix_extra || {};
      const numeros = [...new Set([d.phone, d.phone2, ex.motorista2?.whatsapp].map(numeroWa).filter(Boolean))];
      if (!numeros.length) throw new Error("motorista sem WhatsApp na ficha");
      const { modelo, componentes } = await montar(row, d);
      const ids: string[] = [], erros: string[] = [];
      for (const n of numeros) {
        try { ids.push(await mandarModelo(c, n, modelo, componentes)); } catch (e) { erros.push(String((e as Error).message || e)); }
      }
      if (!ids.length) throw new Error(erros[0] || "não enviada");
      await admin.from("whatsapp_queue").update({ status: "enviada", sent_at: new Date().toISOString(), api_id: ids[0], api_erro: erros[0] || null }).eq("id", row.id);
      out.push({ id: row.id, modelo, enviados: ids.length, erros: erros.length });
    } catch (e) {
      const msg = String((e as Error).message || e).slice(0, 300);
      const t = Number(row.api_tentativas || 0) + 1;
      await admin.from("whatsapp_queue").update({ status: "pendente", api_erro: msg, api_tentativas: t }).eq("id", row.id);
      if (t >= MAX_TENTATIVAS) await avisarDono("WhatsApp oficial: mensagem não enviada", `"${row.title}" não saiu pela API (${msg.slice(0, 120)}). Envie pela Área IA.`);
      out.push({ id: row.id, erro: msg });
    }
  }
  return { enviadas: out.filter((o) => !o.erro).length, out };
}

// ---------- criar os modelos na Meta ----------
async function enviarArquivoExemplo(c: Extra, bytes: Uint8Array, nome: string, tipo: string) {
  if (!c.app_id) throw new Error("Falta o ID do app da Meta (para mandar a imagem e o PDF de exemplo).");
  const r1 = await fetch(`https://graph.facebook.com/${c.versao}/${c.app_id}/uploads?file_name=${encodeURIComponent(nome)}&file_length=${bytes.length}&file_type=${encodeURIComponent(tipo)}`,
    { method: "POST", headers: { Authorization: `Bearer ${c.token}` } });
  const j1 = await r1.json().catch(() => ({}));
  if (!r1.ok || !j1?.id) throw new Error(`Meta (envio de exemplo) ${r1.status}: ${j1?.error?.message || ""}`);
  const r2 = await fetch(`https://graph.facebook.com/${c.versao}/${j1.id}`, { method: "POST", headers: { Authorization: `OAuth ${c.token}`, file_offset: "0" }, body: bytes });
  const j2 = await r2.json().catch(() => ({}));
  if (!r2.ok || !j2?.h) throw new Error(`Meta (envio de exemplo) ${r2.status}: ${j2?.error?.message || ""}`);
  return String(j2.h);
}
async function exemploQr() {
  const url = await QRCode.toDataURL(EX_CODIGO, { width: 480, margin: 2 });
  return decodeBase64(url.split(",")[1]);
}
async function exemploPdf() {
  const pdf = await PDFDocument.create();
  const p = pdf.addPage([420, 300]);
  const f = await pdf.embedFont(StandardFonts.Helvetica);
  const linhas = ["RECIBO DE PAGAMENTO (EXEMPLO)", "", "Recebi de Marcos Exemplo o valor de R$ 650,00", "referente ao aluguel da semana de 01/12 a 07/12.", "", "MOTORA - aluguel de veiculos"];
  linhas.forEach((t, i) => p.drawText(t, { x: 30, y: 250 - i * 22, size: 13, font: f }));
  return new Uint8Array(await pdf.save());
}
async function criarModelos() {
  const c = await config();
  if (!c.token || !c.waba_id) throw new Error("Falta o token ou o ID da conta do WhatsApp (WABA).");
  const existentes = await graph(c, "GET", `${c.waba_id}/message_templates?fields=name,status&limit=200`);
  const ja = new Set((existentes?.data ?? []).map((t: Extra) => t.name));
  let hImg = "", hPdf = "";
  const out: Extra[] = [];
  for (const m of MODELOS) {
    if (ja.has(m.name)) { out.push({ modelo: m.name, situacao: "já existe" }); continue; }
    try {
      const comps: Extra[] = [];
      if ((m as Extra).comImagem) { hImg = hImg || await enviarArquivoExemplo(c, await exemploQr(), "qr-exemplo.png", "image/png"); comps.push({ type: "HEADER", format: "IMAGE", example: { header_handle: [hImg] } }); }
      if ((m as Extra).comDocumento) { hPdf = hPdf || await enviarArquivoExemplo(c, await exemploPdf(), "recibo-exemplo.pdf", "application/pdf"); comps.push({ type: "HEADER", format: "DOCUMENT", example: { header_handle: [hPdf] } }); }
      comps.push({ type: "BODY", text: m.corpo, example: { body_text: [m.exemplo] } });
      comps.push({ type: "FOOTER", text: RODAPE });
      const r = await graph(c, "POST", `${c.waba_id}/message_templates`, { name: m.name, language: m.language, category: m.category, components: comps });
      out.push({ modelo: m.name, situacao: r?.status || "enviado para análise" });
    } catch (e) { out.push({ modelo: m.name, erro: String((e as Error).message || e) }); }
  }
  return out;
}
async function situacao() {
  const c = await config();
  if (!c.token) throw new Error("Falta o token.");
  const res: Extra = { ativo: !!c.ativo };
  if (c.phone_id) {
    try { res.numero = await graph(c, "GET", `${c.phone_id}?fields=display_phone_number,verified_name,quality_rating,code_verification_status`); }
    catch (e) { res.numero_erro = String((e as Error).message || e); }
  }
  if (c.waba_id) {
    try {
      const t = await graph(c, "GET", `${c.waba_id}/message_templates?fields=name,status,rejected_reason,category&limit=200`);
      res.modelos = (t?.data ?? []).filter((x: Extra) => String(x.name).startsWith("motora_"));
      res.faltam = MODELOS.map((m) => m.name).filter((n) => !res.modelos.some((x: Extra) => x.name === n));
    } catch (e) { res.modelos_erro = String((e as Error).message || e); }
  }
  return res;
}
async function teste(numero?: string) {
  const c = await config();
  if (!c.token || !c.phone_id) throw new Error("Falta o token ou o ID do número.");
  const para = numeroWa(numero || await secret("dono_whatsapp"));
  if (!para) throw new Error("Informe o número para o teste.");
  const id = await mandarModelo(c, para, "motora_aviso", [{ type: "body", parameters: [param("Thiago"), param("Teste do WhatsApp oficial"), param("Se você recebeu esta mensagem, o app MOTORA já consegue enviar pelo WhatsApp oficial.")] }]);
  return { ok: true, id };
}

// ---------- aviso da Meta (webhook) ----------
async function assinaturaOk(req: Request, corpo: string) {
  const chave = await secret("wa_app_secret");
  if (!chave) return false; // sem a chave secreta do app, não aceita nada da Meta
  const sig = req.headers.get("x-hub-signature-256") || "";
  const k = await crypto.subtle.importKey("raw", new TextEncoder().encode(chave), { name: "HMAC", hash: "SHA-256" }, false, ["sign"]);
  const mac = new Uint8Array(await crypto.subtle.sign("HMAC", k, new TextEncoder().encode(corpo)));
  const hex = "sha256=" + [...mac].map((b) => b.toString(16).padStart(2, "0")).join("");
  return hex.length === sig.length && hex === sig;
}
async function avisoMeta(corpo: Extra) {
  for (const e of corpo?.entry ?? []) for (const ch of e?.changes ?? []) {
    for (const s of ch?.value?.statuses ?? []) {
      if (s?.status !== "failed") continue;
      const err = s?.errors?.[0];
      await admin.from("whatsapp_queue").update({ api_erro: `não entregue: ${err?.title || err?.message || "erro"}`.slice(0, 300) }).eq("api_id", String(s.id));
    }
  }
}

async function ehMaster(req: Request) {
  const tok = (req.headers.get("authorization") || "").replace(/^Bearer\s+/i, "");
  if (!tok) return false;
  const { data } = await admin.auth.getUser(tok);
  if (!data?.user) return false;
  const { data: p } = await admin.from("profiles").select("role").eq("id", data.user.id).maybeSingle();
  return p?.role === "master";
}

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response("ok", { headers: CORS });
  try {
    const url = new URL(req.url);
    if (req.method === "GET") {
      const ok = url.searchParams.get("hub.mode") === "subscribe" && url.searchParams.get("hub.verify_token") === (await secret("wa_verify"));
      return ok ? new Response(url.searchParams.get("hub.challenge") || "", { status: 200 }) : new Response("proibido", { status: 403 });
    }
    const texto = await req.text();
    if (req.headers.get("x-hub-signature-256") !== null) {
      if (!(await assinaturaOk(req, texto))) return new Response("proibido", { status: 403 });
      await avisoMeta(JSON.parse(texto || "{}"));
      return new Response("ok", { status: 200 });
    }
    const body = JSON.parse(texto || "{}");
    const cron = req.headers.get("x-cron-token");
    const doBanco = !!cron && cron === (await secret("cron_token"));
    if (!doBanco && !(await ehMaster(req))) return json({ error: "proibido" }, 403);
    try {
      if (body.acao === "enviar_fila") return json({ ok: true, ...(await enviarFila()) });
      if (body.acao === "modelos") return json({ ok: true, modelos: await criarModelos() });
      if (body.acao === "situacao") return json({ ok: true, ...(await situacao()) });
      if (body.acao === "teste") return json(await teste(body.numero));
    } catch (e) { return json({ ok: false, error: String((e as Error).message || e) }); }
    return json({ error: "ação desconhecida" }, 400);
  } catch (e) {
    console.error("motora-whatsapp", String(e));
    return json({ ok: false, error: String(e) }, 500);
  }
});
