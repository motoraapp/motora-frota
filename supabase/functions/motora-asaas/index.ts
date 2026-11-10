// MOTORA - cobrança automática e conferência de pagamento pelo ASAAS
// Só vale para motoristas com "Pagamento automático pelo Asaas" ligado na ficha (profiles.asaas_auto_charge_enabled).
//
// acao "cobrar" (cron "motora-asaas-cobrar", todo dia 08:00 de Brasília):
//   para cada motorista ligado, quando falta 1 dia (ou no próprio dia, se a véspera falhou) para o dia de pagamento dele,
//   cria no Asaas um QR CODE PIX ESTÁTICO com o valor da semana (aluguel do carro + parcela da caução + multas pendentes + acréscimo repetido),
//   coloca o Pix copia e cola e o QR code no app do motorista e avisa (notificação + WhatsApp pelo robô).
//   POR QUE QR ESTÁTICO: no Asaas os 100 primeiros Pix recebidos no mês por chave ou QR estático não pagam taxa;
//   a "cobrança" comum (QR dinâmico) paga taxa. Assim fica gratuito (até 100 pagamentos por mês).
// acao "webhook" (o Asaas chama quando o pagamento cai):
//   descobre de quem é o pagamento (pelo QR code da semana ou, se pagou direto na chave, pelo CPF de quem pagou),
//   registra o pagamento como comprovante JÁ CONFERIDO, o app abate a cobrança, o motorista volta para "Em dia"
//   e o recibo vai para a fila do WhatsApp (o robô envia sozinho).
//
// acao "preparar" (botão no Financeiro): confere a conta e cria o aviso de pagamento no Asaas, sem gastar nada.
// CUSTO MÍNIMO: nunca criar cliente, cobrança comum ou notificação do Asaas aqui; só QR estático, que é o que não tem tarifa.
// Chaves (tabela app_secrets): asaas_key (colocada pelo dono), asaas_chave_pix (colada pelo dono), asaas_webhook_token (gerada pelo banco),
// asaas_ambiente = 'sandbox' para testes (sem ela usa a conta de verdade).
import { createClient } from "npm:@supabase/supabase-js@2.45.4";
import { decodeBase64 } from "jsr:@std/encoding@1/base64";

function serviceKey() {
  const legacy = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY");
  if (legacy) return legacy;
  try { const keys = JSON.parse(Deno.env.get("SUPABASE_SECRET_KEYS") || "{}"); return keys.default || Object.values(keys)[0]; } catch { return ""; }
}
const admin = createClient(Deno.env.get("SUPABASE_URL")!, serviceKey() as string, { auth: { persistSession: false } });
const CORS = { "Access-Control-Allow-Origin": "*", "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type" };
const json = (b: unknown, s = 200) => new Response(JSON.stringify(b), { status: s, headers: { ...CORS, "Content-Type": "application/json" } });
const LIMITE_GRATIS = 100; // Pix por chave ou QR estático sem tarifa por mês; passou disso, para e avisa o dono
const brl = (v: unknown) => Number(v).toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
const DIAS_ANTES = 1;

async function secret(key: string) {
  const { data } = await admin.from("app_secrets").select("value").eq("key", key).maybeSingle();
  return data?.value ?? null;
}

async function asaas(method: string, path: string, body?: unknown) {
  const key = await secret("asaas_key");
  if (!key) throw new Error("Chave do Asaas não cadastrada (app_secrets.asaas_key).");
  const base = (await secret("asaas_ambiente")) === "sandbox" ? "https://api-sandbox.asaas.com/v3" : "https://api.asaas.com/v3";
  const r = await fetch(base + path, {
    method, headers: { "Content-Type": "application/json", "access_token": key, "User-Agent": "MOTORA" },
    body: body ? JSON.stringify(body) : undefined, signal: AbortSignal.timeout(20000),
  });
  const j = await r.json().catch(() => ({}));
  if (!r.ok) throw new Error(`Asaas ${r.status}: ${(j?.errors || []).map((e: { description?: string }) => e.description).join("; ") || JSON.stringify(j).slice(0, 200)}`);
  return j;
}

async function avisar(payload: Record<string, unknown>) {
  try {
    await fetch(`${Deno.env.get("SUPABASE_URL")}/functions/v1/motora-push`, {
      method: "POST", headers: { "Content-Type": "application/json", "x-cron-token": (await secret("cron_token")) || "" },
      body: JSON.stringify(payload),
    });
  } catch (_) { /* aviso nunca trava a cobrança */ }
}

// datas no horário de Brasília
const hojeBR = () => new Date().toLocaleDateString("sv-SE", { timeZone: "America/Sao_Paulo" });
function proximoDia(dia: number) {
  const hoje = new Date(hojeBR() + "T12:00:00-03:00");
  const add = (dia - hoje.getUTCDay() + 7) % 7;
  const d = new Date(hoje.getTime() + add * 86400000);
  return { iso: d.toISOString().slice(0, 10), faltam: add };
}

function proximaParcela(desc: string) {
  const m = String(desc || "").match(/(\d+)\s*\/\s*(\d+)/);
  if (!m) return { desc, done: false };
  const k = Number(m[1]) + 1, n = Number(m[2]);
  return { desc: desc.replace(m[0], `${k}/${n}`), done: k > n };
}

type Extra = Record<string, any>; // eslint-disable-line @typescript-eslint/no-explicit-any

async function cobrarMotorista(d: Record<string, any>) { // eslint-disable-line @typescript-eslint/no-explicit-any
  const dia = d.payment_day_of_week ?? 1;
  const venc = proximoDia(dia);
  const ex: Extra = { ...(d.pix_extra || {}) };
  const asx: Extra = ex.asaas || {};
  if (venc.faltam > DIAS_ANTES) return { motorista: d.name, pulou: `faltam ${venc.faltam} dias` };
  if (asx.vencimento === venc.iso || ex.picpay?.vencimento === venc.iso) return { motorista: d.name, pulou: "cobrança desta semana já criada" };

  // devolução informada: no máximo 2 cobranças depois do aviso; caução e multas não entram (multas saem da caução)
  if (ex.devolucao) {
    const { count } = await admin.from("pix_history").select("id", { count: "exact", head: true }).eq("driver_id", d.id).gte("due_at", ex.devolucao.informada_em);
    if ((count ?? 0) >= 2 || venc.iso > ex.devolucao.ate) return { motorista: d.name, pulou: "devolução: sem mais cobranças no prazo" };
  }
  // ----- valores (mesma regra do Novo Pix) -----
  const { data: v } = d.vehicle_id ? await admin.from("vehicles").select("model, rent_amount").eq("id", d.vehicle_id).maybeSingle() : { data: null };
  const linhas: string[] = [];
  let total = 0;
  if (v?.rent_amount != null) { total += Number(v.rent_amount); linhas.push(`Aluguel do ${v.model}: ${brl(v.rent_amount)}`); }
  const cau = ex.devolucao ? null : ex.caucao;
  let cauCobrada = false;
  if (cau?.forma === "parcelada" && Number(cau.cobradas || 0) < Number(cau.parcelas || 0) && Number(cau.valor_parcela) > 0) {
    total += Number(cau.valor_parcela); cauCobrada = true;
    linhas.push(`+ Caução ${Number(cau.cobradas || 0) + 1}/${cau.parcelas}: ${brl(cau.valor_parcela)}`);
  }
  const multas = !ex.devolucao && ex.multas?.ativo ? (ex.multas.itens || []).filter((i: Extra) => !i.cobrada && !i.paga) : [];
  for (const i of multas) { total += Number(i.valor || 0); linhas.push(`+ ${i.desc}: ${brl(i.valor)}`); }
  let novoRepetir: Extra | null = null;
  if (ex.repetir && Number(ex.valor) > 0 && !(cau?.forma && /cau[çc][ãa]o/i.test(ex.descricao || ""))) {
    const np = ex.ultimo_enviado ? proximaParcela(ex.descricao) : { desc: ex.descricao, done: false };
    if (!np.done) { total += Number(ex.valor); linhas.push(`+ ${np.desc}: ${brl(ex.valor)}`); novoRepetir = { descricao: np.desc }; }
  }
  for (const a of Array.isArray(ex.ajustes) ? ex.ajustes : []) { const desc = a.tipo === "desconto"; total += (desc ? -1 : 1) * Number(a.valor || 0); linhas.push(`${desc ? "−" : "+"} ${a.desc}: ${brl(a.valor)}`); }
  total = Math.round(total * 100) / 100;
  if (!(total > 0)) {
    await avisar({ type: "master_alert", title: `Asaas: ${d.name} sem valor`, body: "Não há valor a cobrar (aluguel vazio ou desconto maior que o total). A cobrança automática não foi criada.", url: "/" });
    return { motorista: d.name, erro: "sem valor de aluguel" };
  }
  linhas.push(`Total: ${brl(total)}`);

  // ----- QR code Pix estático com o valor da semana (sem taxa até 100 Pix/mês) -----
  let chave = await secret("asaas_chave_pix");
  if (!chave) {
    const ks = await asaas("GET", "/pix/addressKeys?status=ACTIVE&limit=10");
    chave = ks?.data?.[0]?.key;
    if (!chave) throw new Error("Sua conta do Asaas ainda não tem chave Pix. Crie uma chave (aleatória) no app do Asaas.");
    await admin.from("app_secrets").upsert({ key: "asaas_chave_pix", value: chave });
  }
  const qr = await asaas("POST", "/pix/qrCodes/static", {
    addressKey: chave, value: total, format: "ALL", allowsMultiplePayments: false,
    description: `MOTORA ${String(d.name).split(/\s+/)[0]} venc ${venc.iso.split("-").reverse().join("/")}`.slice(0, 37),
  });
  if (!qr?.id) throw new Error("O Asaas não devolveu o QR code.");

  // QR code como imagem no app (mesma pasta dos documentos do motorista)
  let qrPath: string | null = null;
  if (qr?.encodedImage) {
    qrPath = `${d.id}/pix-qr-asaas-${Date.now()}.png`;
    const up = await admin.storage.from("docs").upload(qrPath, decodeBase64(qr.encodedImage), { contentType: "image/png", upsert: true });
    if (up.error) qrPath = null;
  }

  // ----- atualiza o motorista (o banco cria o histórico e a data de pagamento sozinho) -----
  delete ex.ajustes;
  delete ex.repetir; delete ex.descricao; delete ex.valor; delete ex.ultimo_enviado;
  if (novoRepetir) Object.assign(ex, { repetir: true, descricao: novoRepetir.descricao, valor: d.pix_extra.valor, ultimo_enviado: true });
  if (cauCobrada) ex.caucao = { ...cau, cobradas: Number(cau.cobradas || 0) + 1 };
  if (multas.length) { const ids = new Set(multas.map((i: Extra) => i.id)); ex.multas = { ...ex.multas, itens: ex.multas.itens.map((i: Extra) => ids.has(i.id) ? { ...i, cobrada: hojeBR() } : i) }; }
  // guarda os últimos QR codes: se o motorista pagar um QR antigo (atrasado), o app ainda sabe de quem é
  ex.asaas = { ...asx, qr: qr.id, qrs: [qr.id, ...(asx.qrs || [])].slice(0, 12), vencimento: venc.iso, criada_em: new Date().toISOString() };
  const { error } = await admin.from("profiles").update({
    pix_code: qr?.payload || null, pix_qr_path: qrPath, pix_link: null, pix_amount: total,
    pix_description: linhas.join("\n"), pix_extra: ex, pix_next: { due: venc.iso },
  }).eq("id", d.id);
  if (error) throw new Error("salvar no app: " + error.message);

  const { data: atual } = await admin.from("profiles").select("pix_due_at").eq("id", d.id).maybeSingle();
  const prazo = atual?.pix_due_at ? new Date(atual.pix_due_at).toLocaleDateString("pt-BR", { timeZone: "America/Sao_Paulo", weekday: "long", day: "2-digit", month: "2-digit" }) : venc.iso;
  await avisar({ type: "driver_alert", driver_id: d.id, title: "Novo Pix disponível", body: `Valor: ${brl(total)}. Pagamento até ${prazo}, 23:59. O pagamento é conferido sozinho: não precisa enviar comprovante.`, url: "/?aba=pagamento" });
  return { motorista: d.name, qr: qr.id, valor: total, vencimento: venc.iso };
}

async function cobrarTodos() {
  const { data: lista } = await admin.from("profiles").select("*").eq("role", "driver").eq("asaas_auto_charge_enabled", true);
  if (!lista?.length) return []; // ninguém ligado na ficha: nem fala com o Asaas
  const inicioMes = new Date(hojeBR().slice(0, 8) + "01T00:00:00-03:00").toISOString();
  const { count } = await admin.from("receipts").select("id", { count: "exact", head: true }).contains("ai_result", { origem: "asaas" }).gte("created_at", inicioMes);
  if ((count ?? 0) + lista.length > LIMITE_GRATIS) {
    await avisar({ type: "master_alert", title: "Asaas: limite grátis do mês", body: `Já são ${count} Pix neste mês. Para não pagar tarifa, as cobranças automáticas pararam até o mês que vem. Use o Novo Pix.`, url: "/" });
    return [{ pulou: "limite de Pix sem tarifa do mês" }];
  }
  const out: unknown[] = [];
  for (const d of lista ?? []) {
    try { out.push(await cobrarMotorista(d)); } catch (e) {
      out.push({ motorista: d.name, erro: String((e as Error).message || e) });
      await avisar({ type: "master_alert", title: `Asaas: erro na cobrança de ${d.name}`, body: String((e as Error).message || e).slice(0, 180), url: "/" });
    }
  }
  return out;
}

// ----- pagamento recebido -----
async function quemPagou(p: Record<string, any>) { // eslint-disable-line @typescript-eslint/no-explicit-any
  const campos = "id, name, cpf, pix_extra, role, pix_description";
  // 1) pelo QR code da semana
  if (p.pixQrCodeId) {
    const { data } = await admin.from("profiles").select(campos).eq("role", "driver").contains("pix_extra", { asaas: { qrs: [p.pixQrCodeId] } }).limit(1);
    if (data?.[0]) return data[0];
  }
  // 2) pagou direto na chave Pix: procura pelo CPF de quem pagou
  if (p.customer) {
    try {
      const c = await asaas("GET", `/customers/${p.customer}`);
      const cpf = String(c?.cpfCnpj || "").replace(/\D/g, "");
      if (cpf.length === 11) {
        const { data } = await admin.from("profiles").select(campos).eq("role", "driver");
        const achou = (data ?? []).find((x) => String(x.cpf || "").replace(/\D/g, "") === cpf);
        if (achou) return achou;
      }
      return { semDono: true, pagador: c?.name || "" };
    } catch (_) { /* segue */ }
  }
  return null;
}

async function pagamentoRecebido(aviso: Record<string, any>) { // eslint-disable-line @typescript-eslint/no-explicit-any
  // não confia só no aviso: pergunta ao próprio Asaas se o Pix existe e caiu mesmo
  if (!/^[\w-]+$/.test(String(aviso.id || ""))) return { ignorado: "código de pagamento inválido" };
  const real = await asaas("GET", `/payments/${aviso.id}`);
  if (real.billingType !== "PIX" || !["RECEIVED", "CONFIRMED"].includes(real.status) || !(Number(real.value) > 0)) return { ignorado: "o Asaas não confirma este Pix" };
  const p = { ...aviso, ...real, pixQrCodeId: real.pixQrCodeId || aviso.pixQrCodeId };
  const quem = await quemPagou(p) as Record<string, any> | null; // eslint-disable-line @typescript-eslint/no-explicit-any
  if (!quem || quem.semDono) {
    await avisar({ type: "master_alert", title: `Pix de ${brl(p.value)} recebido no Asaas`, body: `Não consegui saber de qual motorista é${quem?.pagador ? " (pagou: " + quem.pagador + ")" : ""}. Confira no Asaas.`, url: "/" });
    return { ignorado: "pagamento sem motorista identificado" };
  }
  const d = quem;
  // não registra o mesmo pagamento duas vezes
  const { data: ja } = await admin.from("receipts").select("id").eq("driver_id", d.id).contains("ai_result", { id_transacao: p.id }).maybeSingle();
  if (ja) return { ignorado: "pagamento já registrado" };

  const quando = p.clientPaymentDate || p.paymentDate || hojeBR();
  const html = `<!doctype html><html lang="pt-BR"><head><meta charset="utf-8"><title>Pagamento confirmado</title></head><body style="font-family:sans-serif">
<h2>MOTORA – Pagamento confirmado pelo Asaas</h2>
<p><b>Motorista:</b> ${String(d.name).replace(/[<>&]/g, "")}<br><b>Valor:</b> ${brl(p.value)}<br><b>Data:</b> ${quando}<br><b>Código da cobrança:</b> ${p.id}</p>
<p>${String(d.pix_description || p.description || "").replace(/[<>&]/g, "").replace(/\n/g, "<br>")}</p></body></html>`;
  const path = `${d.id}/asaas-${p.id}.html`;
  await admin.storage.from("docs").upload(path, new TextEncoder().encode(html), { contentType: "text/html", upsert: true });

  // já entra como conferido (origem "asaas"): o banco não manda a IA conferir este arquivo
  const agora = new Date().toISOString();
  const { data: rec, error } = await admin.from("receipts").insert({
    driver_id: d.id, file_name: `Pagamento Asaas ${quando}.html`, file_path: path,
    ai_status: "ok", ai_checked_at: agora, confirmed_at: agora,
    ai_result: { origem: "asaas", valor: Number(p.value), situacao: "realizado", id_transacao: p.id, data_hora: quando, pagador_nome: d.name, problemas: [] },
  }).select("id").single();
  if (error) throw new Error("registrar pagamento: " + error.message);
  // abate a cobrança e volta para "Em dia" (mesma regra dos comprovantes)
  await admin.from("receipts").update({ confirmed_at: agora }).eq("id", rec.id); // dispara o gatilho de abatimento

  await avisar({ type: "master_alert", title: `${d.name} pagou ${brl(p.value)}`, body: "Pagamento conferido pelo Asaas. O recibo vai para o WhatsApp dele.", url: "/" });
  await avisar({ type: "driver_alert", driver_id: d.id, title: "Recibo de pagamento", body: `Recebemos seu pagamento de ${brl(p.value)} em ${quando.split("-").reverse().join("/")}. Obrigado!${d.pix_description ? "\nReferente a: " + String(d.pix_description).replace(/\n/g, " · ") : ""}`, url: "/?aba=pagamento" });
  return { ok: true, motorista: d.name, valor: p.value };
}

async function ehMaster(req: Request) {
  const tok = (req.headers.get("authorization") || "").replace(/^Bearer\s+/i, "");
  if (!tok) return false;
  const { data } = await admin.auth.getUser(tok);
  if (!data?.user) return false;
  const { data: p } = await admin.from("profiles").select("role").eq("id", data.user.id).maybeSingle();
  return p?.role === "master";
}

// confere a conta e deixa o aviso de pagamento (webhook) configurado no Asaas. Não cria cobrança nem gasta nada.
async function preparar() {
  const limpa = (s: unknown) => String(s ?? "").replace(/[^a-z0-9]/gi, "").toLowerCase();
  const ks = await asaas("GET", "/pix/addressKeys?status=ACTIVE&limit=10");
  const chaves: string[] = (ks?.data ?? []).map((k: Extra) => limpa(k.key));
  const salva = await secret("asaas_chave_pix");
  const token = await secret("asaas_webhook_token");
  if (!token) throw new Error("Falta o token do aviso de pagamento.");
  const url = `${Deno.env.get("SUPABASE_URL")}/functions/v1/motora-asaas`;
  const corpo = { name: "MOTORA", url, enabled: true, interrupted: false, apiVersion: 3, authToken: token, sendType: "SEQUENTIALLY", events: ["PAYMENT_RECEIVED"] };
  const hs = await asaas("GET", "/webhooks?limit=100");
  const meu = (hs?.data ?? []).find((h: Extra) => h.url === url);
  if (meu) await asaas("PUT", `/webhooks/${meu.id}`, corpo); else await asaas("POST", "/webhooks", corpo);
  const chave = salva ? chaves.includes(limpa(salva)) : chaves.length > 0;
  const ambiente = (await secret("asaas_ambiente")) === "sandbox" ? "conta de testes" : "conta de verdade";
  const mensagem = chave ? `Asaas pronto (${ambiente}): conexão, aviso de pagamento e chave Pix certos.`
    : salva ? `Conectado (${ambiente}) e aviso de pagamento pronto, mas essa chave Pix não está cadastrada na sua conta do Asaas.`
    : `Conectado (${ambiente}) e aviso de pagamento pronto. Falta só a chave Pix.`;
  return { ok: true, chave_pix_ok: chave, webhook_ok: true, ambiente, mensagem };
}

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response("ok", { headers: CORS });
  try {
    const body = await req.json().catch(() => ({}));
    // 1) o Asaas avisando que o pagamento caiu
    const wTok = req.headers.get("asaas-access-token");
    if (wTok !== null) {
      if (wTok !== (await secret("asaas_webhook_token"))) return json({ error: "proibido" }, 403);
      if (["PAYMENT_RECEIVED", "PAYMENT_CONFIRMED"].includes(body.event) && body.payment) {
        const out = await pagamentoRecebido(body.payment);
        console.log("asaas webhook", JSON.stringify(out));
      }
      return json({ received: true }); // o Asaas só precisa do "200"
    }
    // 2) o banco pedindo as cobranças do dia
    const cronTok = req.headers.get("x-cron-token");
    const doBanco = !!cronTok && cronTok === (await secret("cron_token"));
    if (body.acao === "preparar" && (doBanco || await ehMaster(req))) {
      try { return json(await preparar()); } catch (e) { return json({ ok: false, error: String((e as Error).message || e) }); }
    }
    if (!doBanco) return json({ error: "proibido" }, 403);
    if (body.acao === "cobrar") { const out = await cobrarTodos(); console.log("asaas cobrar", JSON.stringify(out)); return json({ ok: true, out }); }
    return json({ error: "ação desconhecida" }, 400);
  } catch (e) {
    console.error(e);
    return json({ ok: false, error: String(e) }, 500);
  }
});
