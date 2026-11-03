// MOTORA - envio de notificações no celular (Web Push)
// + Área IA: cada aviso enviado ao motorista vira uma mensagem de WhatsApp pronta (tabela whatsapp_queue)
//   - Envio automático DESLIGADO: o dono toca em Enviar na Área IA (abre o WhatsApp com o texto pronto)
//   - Envio automático LIGADO: o robô do computador do dono (função motora-robo) envia sozinho
// + "Pagamento confirmado" vira RECIBO no WhatsApp (valor, semana e o que foi pago)
// + "cobranca": botão Cobrar atraso (a IA escreve a cobrança)
import webpush from "npm:web-push@3.6.7";
import { PDFDocument, StandardFonts } from "npm:pdf-lib@1.17.1";
import { createClient } from "npm:@supabase/supabase-js@2.45.4";

function serviceKey() {
  const legacy = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY");
  if (legacy) return legacy;
  try { const keys = JSON.parse(Deno.env.get("SUPABASE_SECRET_KEYS") || "{}"); return keys.default || Object.values(keys)[0]; } catch { return ""; }
}
const admin = createClient(Deno.env.get("SUPABASE_URL")!, serviceKey() as string, { auth: { persistSession: false } });
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

// Chaves de notificação: criadas sozinhas na primeira vez e guardadas no banco
async function vapid() {
  let pub = await secret("vapid_public");
  let priv = await secret("vapid_private");
  if (!pub || !priv) {
    const k = webpush.generateVAPIDKeys();
    await admin.from("app_secrets").upsert([{ key: "vapid_public", value: k.publicKey }, { key: "vapid_private", value: k.privateKey }]);
    pub = k.publicKey;
    priv = k.privateKey;
  }
  return { pub, priv };
}

async function sendTo(userIds: string[], payload: Record<string, string>) {
  if (!userIds.length) return 0;
  const { pub, priv } = await vapid();
  webpush.setVapidDetails("mailto:thiagogb20@gmail.com", pub, priv);
  const { data: subs } = await admin.from("push_subscriptions").select("*").in("user_id", userIds);
  let sent = 0;
  for (const s of subs ?? []) {
    try {
      await webpush.sendNotification({ endpoint: s.endpoint, keys: { p256dh: s.p256dh, auth: s.auth } }, JSON.stringify(payload));
      sent++;
    } catch (e) {
      const code = (e as { statusCode?: number }).statusCode;
      if (code === 404 || code === 410) await admin.from("push_subscriptions").delete().eq("id", s.id);
      else console.error("push falhou", code, String(e));
    }
  }
  return sent;
}

async function masterIds() {
  const { data: masters } = await admin.from("profiles").select("id").eq("role", "master");
  return (masters ?? []).map((m) => m.id);
}

function fmtDue(iso: string | null) {
  if (!iso) return "";
  return new Date(iso).toLocaleDateString("pt-BR", { timeZone: "America/Sao_Paulo", weekday: "long", day: "2-digit", month: "2-digit" });
}
const fmtDia = (iso: string) => new Date(iso).toLocaleDateString("pt-BR", { timeZone: "America/Sao_Paulo", day: "2-digit", month: "2-digit", year: "numeric" });

// endereço aberto ao tocar na notificação (só caminhos do próprio app)
const safeUrl = (u: unknown) => { const s = String(u || "/"); return s.startsWith("/") && !s.startsWith("//") ? s : "/"; };

// ===================== ÁREA IA (mensagens de WhatsApp) =====================
const brl = (v: unknown) => Number(v).toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
const PIX_TYPES: Record<string, string> = { aleatoria: "Aleatória", celular: "Celular", cpf: "CPF", cnpj: "CNPJ", email: "E-mail" };
function pixKey(link: unknown) {
  const s = String(link || "");
  const m = s.match(/^chave:([^|]+)\|(.*)$/);
  if (!m) return null;
  return { type: PIX_TYPES[m[1]] || m[1], key: m[2] };
}

async function setting(key: string) {
  const { data } = await admin.from("app_settings").select("value").eq("key", key).maybeSingle();
  return (data?.value ?? null) as Record<string, unknown> | null;
}
async function iaAtiva() { return (await setting("ia_whatsapp"))?.ativo !== false; } // sem registro = ligada
// robô ligado e dando sinal de vida nos últimos 5 minutos
async function roboFuncionando() {
  const r = await setting("whatsapp_robo");
  return !!r?.ativo && r?.conectado !== false && !!r?.visto_em && Date.now() - new Date(String(r.visto_em)).getTime() < 5 * 60000;
}

// Mensagem padrão (usada se a IA não responder)
function baseMessage(first: string, title: string, body: string, extra: string) {
  return `Olá, ${first}! 👋\n\n*${title}*\n${body}${extra ? "\n\n" + extra : ""}\n\nQualquer dúvida, estou à disposição.`;
}

async function regrasDono() {
  const list = (await setting("ia_regras"))?.regras;
  return Array.isArray(list) ? list.filter((t) => typeof t === "string" && t.trim()).slice(0, 40) as string[] : [];
}

async function iaEscreve(first: string, title: string, body: string, extra: string, tom = "educada, simples e direta") {
  const key = await secret("gemini_key");
  if (!key) return null;
  const regras = await regrasDono();
  const model = (await secret("gemini_model")) || "gemini-flash-latest";
  const prompt = `Você escreve mensagens de WhatsApp de um dono de locadora de carros para o motorista que aluga o carro.
Reescreva o aviso abaixo como UMA mensagem curta de WhatsApp, ${tom}, em português do Brasil, falando com ${first}.
Mantenha TODOS os dados exatamente como estão (valores, datas, chave Pix, prazos). Não invente nada. No máximo um emoji.
A mensagem é só um aviso automático: não faça perguntas ao motorista.
Aviso: "${title}" — ${body}
${extra ? "Dados para incluir:\n" + extra : ""}
${regras.length ? "Regras do dono (siga sempre, sem mudar os dados acima):\n" + regras.map((r, i) => `${i + 1}. ${r}`).join("\n") + "\n" : ""}Devolva SOMENTE um JSON: {"mensagem": string}`;
  try {
    const r = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent`, {
      method: "POST",
      headers: { "Content-Type": "application/json", "x-goog-api-key": key },
      body: JSON.stringify({ contents: [{ role: "user", parts: [{ text: prompt }] }], generationConfig: { responseMimeType: "application/json", temperature: 0.3 } }),
      signal: AbortSignal.timeout(20000),
    });
    if (!r.ok) return null;
    const j = await r.json();
    const text = j?.candidates?.[0]?.content?.parts?.map((p: { text?: string }) => p.text || "").join("") || "";
    const m = text.match(/\{[\s\S]*\}/);
    const msg = String(JSON.parse(m ? m[0] : text).mensagem || "").trim();
    return msg || null;
  } catch { return null; }
}

// Recibo: último pagamento aceito e o que ele quitou
async function reciboDados(driverId: string) {
  const { data: r } = await admin.from("receipts").select("id, created_at, ai_result")
    .eq("driver_id", driverId).is("rejected_at", null).not("confirmed_at", "is", null)
    .order("confirmed_at", { ascending: false }).limit(1).maybeSingle();
  if (!r) return null;
  const { data: h } = await admin.from("pix_history").select("due_at, amount, description, period_start, period_end, recibo_descricao")
    .eq("receipt_id", r.id).order("due_at").limit(5);
  const res = (r.ai_result || {}) as { valor?: number; data_hora?: string };
  const lines: string[] = ["RECIBO DE PAGAMENTO"];
  const must: string[] = [];
  const valor = res.valor ?? (h ?? []).reduce((t, x) => t + Number(x.amount || 0), 0);
  if (valor) { lines.push(`Valor pago: ${brl(valor)}`); must.push(brl(valor)); }
  lines.push(`Data do pagamento: ${fmtDia(r.created_at)}`);
  for (const x of h ?? []) {
    const seg = new Date(x.due_at);
    const dom = new Date(seg.getTime() + 6 * 86400000);
    const de = x.period_start ? fmtDia(`${x.period_start}T12:00:00-03:00`) : fmtDia(seg.toISOString());
    const ate = x.period_end ? fmtDia(`${x.period_end}T12:00:00-03:00`) : fmtDia(dom.toISOString());
    const desc = x.recibo_descricao || x.description;
    lines.push(`Período de ${de} a ${ate}${desc ? " — " + String(desc).replace(/\n/g, " · ") : ""}`);
  }
  return { extra: lines.join("\n"), must };
}

// Recibo em PDF (vai junto no WhatsApp pelo robô; na Área IA tem o botão PDF)
async function gerarPdfRecibo(nome: string, texto: string) {
  const pdf = await PDFDocument.create();
  let page = pdf.addPage([595, 842]);
  const fonte = await pdf.embedFont(StandardFonts.Helvetica), negrito = await pdf.embedFont(StandardFonts.HelveticaBold);
  const limpa = (t: string) => t.replace(/−/g, "-").replace(/[^\n\x20-\x7E\xA0-\xFF—–•]/g, "");
  let y = 790;
  page.drawText("MOTORA - Recibo de pagamento", { x: 50, y, size: 18, font: negrito }); y -= 30;
  page.drawText(limpa(`Motorista: ${nome}`), { x: 50, y, size: 12, font: fonte }); y -= 28;
  for (const bruta of limpa(texto).split("\n")) {
    let linha = "";
    const quebradas: string[] = [];
    for (const p of bruta.split(" ")) {
      const t = linha ? linha + " " + p : p;
      if (fonte.widthOfTextAtSize(t, 11) > 495 && linha) { quebradas.push(linha); linha = p; } else linha = t;
    }
    quebradas.push(linha);
    for (const q of quebradas) {
      if (y < 60) { page = pdf.addPage([595, 842]); y = 790; }
      page.drawText(q, { x: 50, y, size: 11, font: fonte }); y -= 18;
    }
  }
  return await pdf.save();
}

async function queueWhatsApp(driverId: string, title: string, body: string, opts: { extra?: string; must?: string[]; tom?: string; avisarDono?: boolean } = {}) {
  try {
    if (!(await iaAtiva())) return null;
    const { data: d } = await admin.from("profiles").select("id, name, pix_amount, pix_link, pix_code, pix_description").eq("id", driverId).maybeSingle();
    if (!d) return null;
    const first = String(d.name || "motorista").split(/\s+/)[0];
    const lines: string[] = opts.extra ? [opts.extra] : [];
    const must: string[] = [...(opts.must || [])]; // dados que a mensagem final precisa conter exatamente
    if (/pix/i.test(title) && !opts.extra) {
      if (d.pix_amount != null) { lines.push(`Valor: ${brl(d.pix_amount)}`); must.push(brl(d.pix_amount)); }
      if (d.pix_description) lines.push(`Referente a: ${d.pix_description}`);
      const k = pixKey(d.pix_link);
      if (k) { lines.push(`Chave Pix (${k.type}): ${k.key}`); must.push(k.key); }
      else if (d.pix_code) { lines.push(`Pix copia e cola: ${d.pix_code}`); must.push(d.pix_code); }
    }
    const ehRecibo = /pagamento confirmado|recibo de pagamento/i.test(title);
    if (ehRecibo && !opts.extra) {
      const rec = await reciboDados(driverId);
      if (rec) { lines.push(rec.extra); must.push(...rec.must); }
    }
    const extra = lines.join("\n");
    let message = await iaEscreve(first, title, body, extra, opts.tom);
    // se a IA esquecer ou mudar algum dado importante, usa a mensagem padrão
    const norm = (s: string) => s.replace(/\s/g, ""); // "R$ 650,00" com espaço comum ou especial
    if (!message || must.some((m) => !norm(message!).includes(norm(m)))) message = baseMessage(first, title, body, extra);
    let arquivo_path: string | null = null;
    if (ehRecibo) {
      try {
        const bytes = await gerarPdfRecibo(String(d.name || ""), extra || body);
        const path = `${driverId}/recibo-${Date.now()}.pdf`;
        const up = await admin.storage.from("docs").upload(path, bytes, { contentType: "application/pdf", upsert: true });
        if (!up.error) arquivo_path = path; else console.error("recibo pdf", up.error.message);
      } catch (e) { console.error("recibo pdf", String(e)); } // sem PDF, o recibo vai só em texto
    }
    const { data: row } = await admin.from("whatsapp_queue").insert({ driver_id: driverId, title, body, message, arquivo_path }).select("id").single();
    // com o robô funcionando a mensagem sai sozinha: não precisa avisar o dono
    if (opts.avisarDono !== false && !(await roboFuncionando())) {
      await sendTo(await masterIds(), {
        title: `WhatsApp para ${first} pronto`,
        body: `${title}. Toque para abrir o WhatsApp com a mensagem pronta.`,
        url: `/?abrir=ia&msg=${row?.id || ""}`,
      });
    }
    return row?.id ?? null;
  } catch (e) { console.error("area ia", String(e)); return null; } // nunca trava o aviso do motorista
}
// =================== fim da Área IA ===================

// Boas-vindas do motorista novo: texto fixo (a IA não reescreve, para não mudar login, valores nem datas)
const LINK_APP = "https://motoraapp.github.io/motora-frota/";
const DIAS = ["domingo", "segunda-feira", "terça-feira", "quarta-feira", "quinta-feira", "sexta-feira", "sábado"];
// deno-lint-ignore no-explicit-any
function textoBoasVindas(d: any, v: any, login: string, senha: string | null, proxima: string) {
  const first = String(d.name || "motorista").split(/\s+/)[0];
  const dia = DIAS[d.payment_day_of_week ?? 1];
  const auto = d.picpay_auto_charge_enabled || d.asaas_auto_charge_enabled;
  const cau = d.pix_extra?.caucao;
  const parcela = cau?.forma === "parcelada" && Number(cau.valor_parcela) > 0 ? Number(cau.valor_parcela) : 0;
  const aluguel = v?.rent_amount != null ? Number(v.rent_amount) : null;
  const l = [`Olá, ${first}! 👋 Seja bem-vindo(a) ao MOTORA, o app da locadora.`, "", "*Como entrar no app*", `Link: ${LINK_APP}`, `Usuário: ${login}`,
    senha ? `Senha: ${senha}` : "Senha: os 6 primeiros números do seu CPF", "", "*Seu carro*"];
  l.push(v ? `${v.model}, placa ${v.plate}` : "Será informado em breve.", "", "*Pagamento*", `Dia: ${(d.payment_day_of_week ?? 1) % 6 === 0 ? "todo" : "toda"} ${dia}, até 23:59`, `Próximo vencimento: ${proxima}`);
  if (aluguel != null) l.push(`Aluguel por semana: ${brl(aluguel)}`);
  if (parcela) l.push(`Parcela da caução: ${brl(parcela)} (${cau.parcelas}x)`);
  if (aluguel != null && parcela) l.push(`Total previsto por semana: ${brl(aluguel + parcela)}`);
  l.push("", "*Mensagens automáticas que você vai receber*", "• Quando o Pix da semana for criado, com o valor e a forma de pagar", "• No dia do pagamento, lembrete se ainda não tiver pago",
    auto ? "• Recibo quando o pagamento for confirmado (a conferência é automática, não precisa enviar comprovante)" : "• Recibo quando o pagamento for confirmado (depois de pagar, envie o comprovante pelo app)",
    "• Aviso de pagamento em atraso e de CNH vencida", "", "Qualquer dúvida, estou à disposição.");
  return l.join("\n");
}

async function sendToDriver(driverId: string, payload: Record<string, string>, opts: { extra?: string; must?: string[]; tom?: string } = {}) {
  const sent = await sendTo([driverId], payload);
  await queueWhatsApp(driverId, payload.title, payload.body, opts);
  return sent;
}

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response("ok", { headers: cors });
  try {
    const body = await req.json().catch(() => ({}));

    if (body.type === "public_key") {
      const { pub } = await vapid();
      return json({ publicKey: pub });
    }

    // Chamada automática do banco ou das outras funções (lembrete de domingo, avisos, Asaas, backup, robô)
    const cronTok = req.headers.get("x-cron-token");
    if (cronTok) {
      if (cronTok !== (await secret("cron_token"))) return json({ error: "proibido" }, 403);
      if (body.type === "sunday") {
        const sent = await sendTo(await masterIds(), {
          title: "MOTORA - Domingo",
          body: "Hoje é dia de enviar as novas chaves Pix para os motoristas.",
          url: "/",
        });
        return json({ sent });
      }
      if (body.type === "recibo_teste") {
        const b = await gerarPdfRecibo("Teste Ção", "RECIBO DE PAGAMENTO\nValor pago: R$ 650,00\nPeríodo de 09/11/2026 a 15/11/2026 — Aluguel · − Desconto 🙂");
        return json({ tamanho: b.length, inicio: new TextDecoder().decode(b.slice(0, 5)) });
      }
      if (body.type === "master_alert") {
        const sent = await sendTo(await masterIds(), { title: String(body.title || "MOTORA"), body: String(body.body || ""), url: safeUrl(body.url) });
        return json({ sent });
      }
      if (body.type === "driver_alert" && body.driver_id) {
        const sent = await sendToDriver(String(body.driver_id), { title: String(body.title || "MOTORA"), body: String(body.body || ""), url: safeUrl(body.url) }, { extra: body.extra ? String(body.extra) : undefined, must: Array.isArray(body.must) ? body.must.map(String) : undefined, tom: body.tom ? String(body.tom) : undefined });
        return json({ sent });
      }
      return json({ error: "tipo desconhecido" }, 400);
    }

    // Chamadas feitas pelo app (usuário logado)
    const token = (req.headers.get("Authorization") || "").replace(/^Bearer\s+/i, "");
    const { data: u } = await admin.auth.getUser(token);
    if (!u?.user) return json({ error: "faça login" }, 401);

    if (body.type === "test") {
      const sent = await sendTo([u.user.id], { title: "MOTORA", body: "Notificações ativadas neste aparelho!", url: "/" });
      return json({ sent });
    }

    const { data: me } = await admin.from("profiles").select("role").eq("id", u.user.id).maybeSingle();
    if (me?.role !== "master") return json({ error: "apenas o master" }, 403);

    if (body.type === "new_pix") {
      const { data: d } = await admin.from("profiles").select("id, pix_due_at").eq("id", body.driver_id).maybeSingle();
      if (!d) return json({ error: "motorista não encontrado" }, 404);
      const sent = await sendToDriver(d.id, {
        title: "Novo Pix disponível",
        body: `Nova data de pagamento: ${fmtDue(d.pix_due_at)} até 23:59. Depois de pagar, envie o comprovante pelo app.`,
        url: "/?aba=pagamento",
      });
      return json({ sent });
    }

    // Botão "Cobrar atraso": a IA escreve a cobrança e devolve o id da mensagem para abrir na Área IA
    if (body.type === "boas_vindas") {
      const { data: d } = await admin.from("profiles").select("*").eq("id", body.driver_id).maybeSingle();
      if (!d) return json({ error: "motorista não encontrado" }, 404);
      if (!String(d.phone || "").replace(/\D/g, "")) return json({ semTelefone: true });
      const { data: v } = d.vehicle_id ? await admin.from("vehicles").select("model, plate, rent_amount").eq("id", d.vehicle_id).maybeSingle() : { data: null };
      const hoje = new Date(new Date().toLocaleDateString("sv-SE", { timeZone: "America/Sao_Paulo" }) + "T12:00:00-03:00");
      const venc = new Date(hoje.getTime() + (((d.payment_day_of_week ?? 1) - hoje.getUTCDay() + 7) % 7) * 86400000);
      const proxima = venc.toLocaleDateString("pt-BR", { timeZone: "America/Sao_Paulo", day: "2-digit", month: "2-digit", year: "numeric" });
      const message = textoBoasVindas(d, v, String(body.login || d.username || ""), body.senha ? String(body.senha) : null, proxima);
      const { data: row, error } = await admin.from("whatsapp_queue").insert({ driver_id: d.id, title: "Boas-vindas", body: "Mensagem de boas-vindas com o acesso ao app.", message }).select("id").single();
      if (error) return json({ error: error.message }, 500);
      if (!(await roboFuncionando())) await sendTo(await masterIds(), { title: `WhatsApp para ${String(d.name).split(/\s+/)[0]} pronto`, body: "Boas-vindas. Toque para abrir o WhatsApp com a mensagem pronta.", url: `/?abrir=ia&msg=${row.id}` });
      return json({ id: row.id });
    }

    if (body.type === "cobranca") {
      const { data: d } = await admin.from("profiles").select("id, pix_link, pix_code").eq("id", body.driver_id).maybeSingle();
      if (!d) return json({ error: "motorista não encontrado" }, 404);
      const valor = Number(body.valor || 0);
      const datas = (Array.isArray(body.vencimentos) ? body.vencimentos : []).map(String).slice(0, 10);
      const lines: string[] = [], must: string[] = [];
      if (valor > 0) { lines.push(`Valor em atraso: ${brl(valor)}`); must.push(brl(valor)); }
      if (datas.length) lines.push(`Vencimento(s): ${datas.join(", ")}`);
      const k = pixKey(d.pix_link);
      if (k) { lines.push(`Chave Pix (${k.type}): ${k.key}`); must.push(k.key); }
      else if (d.pix_code) { lines.push(`Pix copia e cola: ${d.pix_code}`); must.push(d.pix_code); }
      // ligar a IA não é necessário para o dono pedir a cobrança na hora
      const ativa = await iaAtiva();
      if (!ativa) await admin.from("app_settings").upsert({ key: "ia_whatsapp", value: { ativo: true } });
      const id = await queueWhatsApp(d.id, "Pagamento em atraso",
        "O pagamento do aluguel do carro está em atraso. Pedimos que regularize o quanto antes e envie o comprovante pelo app.",
        { extra: lines.join("\n"), must, tom: "firme, educada e respeitosa", avisarDono: false });
      if (!ativa) await admin.from("app_settings").upsert({ key: "ia_whatsapp", value: { ativo: false } });
      if (!id) return json({ error: "Não foi possível criar a mensagem." }, 500);
      return json({ id });
    }

    return json({ error: "tipo desconhecido" }, 400);
  } catch (e) {
    console.error(e);
    return json({ error: String(e) }, 500);
  }
});
