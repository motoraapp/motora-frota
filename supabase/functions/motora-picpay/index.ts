// MOTORA - cobrança automática e conferência de pagamento pelo PICPAY (conta PJ)
// Só vale para motoristas com "Automático pelo PicPay" na ficha (profiles.picpay_auto_charge_enabled).
//
// acao "cobrar" (cron "motora-picpay-cobrar", todo dia 08:05 de Brasília):
//   quando faltam 3 dias ou menos para o dia de pagamento, cria a cobrança Pix no PicPay
//   (aluguel + parcela da caução + multas pendentes + acréscimo repetido), coloca copia e cola e QR code no app e avisa.
//   Também reconfere as cobranças em aberto, caso um aviso do PicPay tenha se perdido.
// webhook (o PicPay chama quando a cobrança muda): confere o token, reconsulta a cobrança no PicPay e,
//   se estiver paga, registra como comprovante JÁ CONFERIDO, abate e manda o recibo.
// acao "testar" (botão do dono em Financeiro): confere as credenciais.
//
// Chaves (app_secrets): picpay_client_id, picpay_client_secret, picpay_webhook_token, picpay_ambiente = 'sandbox' para testes.
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
const brl = (v: unknown) => Number(v).toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
const DIAS_ANTES = 3;

async function secret(key: string) {
  const { data } = await admin.from("app_secrets").select("value").eq("key", key).maybeSingle();
  return data?.value ?? null;
}

async function hostPicpay() {
  return (await secret("picpay_ambiente")) === "sandbox" ? "https://checkout-api-sandbox.picpay.com" : "https://ecommerce-api.svcp.picpay.com";
}

let tokenCache: { valor: string; ate: number } | null = null;
async function tokenPicpay() {
  if (tokenCache && tokenCache.ate > Date.now()) return tokenCache.valor;
  const id = await secret("picpay_client_id"), sec = await secret("picpay_client_secret");
  if (!id || !sec) throw new Error("Credenciais do PicPay não cadastradas (Financeiro → PicPay).");
  const r = await fetch(`${await hostPicpay()}/oauth2/token`, {
    method: "POST", headers: { "Content-Type": "application/json", accept: "application/json" },
    body: JSON.stringify({ grant_type: "client_credentials", client_id: id, client_secret: sec }), signal: AbortSignal.timeout(20000),
  });
  const j = await r.json().catch(() => ({}));
  if (!r.ok || !j.access_token) throw new Error(`PicPay ${r.status}: credenciais recusadas. ${j.error_description || j.error || ""}`.trim());
  tokenCache = { valor: j.access_token, ate: Date.now() + 4 * 60000 }; // o token vale 5 minutos
  return j.access_token as string;
}

async function picpay(method: string, path: string, body?: unknown) {
  const r = await fetch(`${await hostPicpay()}/api/v1${path}`, {
    method, headers: { "Content-Type": "application/json", accept: "application/json", Authorization: `Bearer ${await tokenPicpay()}` },
    body: body ? JSON.stringify(body) : undefined, signal: AbortSignal.timeout(20000),
  });
  const j = await r.json().catch(() => ({}));
  if (!r.ok) throw new Error(`PicPay ${r.status}: ${(j?.errors || []).map((e: { field?: string; message?: string }) => `${e.field || ""} ${e.message || ""}`.trim()).join("; ") || j?.message || "erro"}`);
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

function telefone(v: unknown) {
  let n = String(v || "").replace(/\D/g, "");
  if (n.length > 11 && n.startsWith("55")) n = n.slice(2);
  if (n.length < 10 || n.length > 11) return null;
  return { countryCode: "55", areaCode: n.slice(0, 2), number: n.slice(2), type: "MOBILE" };
}

async function cobrarMotorista(d: Extra) {
  const dia = d.payment_day_of_week ?? 1;
  const venc = proximoDia(dia);
  const ex: Extra = { ...(d.pix_extra || {}) };
  const ppx: Extra = ex.picpay || {};
  if (venc.faltam > DIAS_ANTES) return { motorista: d.name, pulou: `faltam ${venc.faltam} dias` };
  if (ppx.vencimento === venc.iso || ex.asaas?.vencimento === venc.iso) return { motorista: d.name, pulou: "cobrança desta semana já criada" };

  const cpf = String(d.cpf || "").replace(/\D/g, "");
  const email = String(d.email || "").trim();
  if (cpf.length !== 11 || !email.includes("@")) throw new Error("A ficha do motorista precisa de CPF e e-mail para cobrar pelo PicPay.");

  // ----- valores (mesma regra do Novo Pix e do Asaas) -----
  const { data: v } = d.vehicle_id ? await admin.from("vehicles").select("model, rent_amount").eq("id", d.vehicle_id).maybeSingle() : { data: null };
  const linhas: string[] = [];
  let total = 0;
  if (v?.rent_amount != null) { total += Number(v.rent_amount); linhas.push(`Aluguel do ${v.model}: ${brl(v.rent_amount)}`); }
  const cau = ex.caucao;
  let cauCobrada = false;
  if (cau?.forma === "parcelada" && Number(cau.cobradas || 0) < Number(cau.parcelas || 0) && Number(cau.valor_parcela) > 0) {
    total += Number(cau.valor_parcela); cauCobrada = true;
    linhas.push(`+ Caução ${Number(cau.cobradas || 0) + 1}/${cau.parcelas}: ${brl(cau.valor_parcela)}`);
  }
  const multas = ex.multas?.ativo ? (ex.multas.itens || []).filter((i: Extra) => !i.cobrada && !i.paga) : [];
  for (const i of multas) { total += Number(i.valor || 0); linhas.push(`+ ${i.desc}: ${brl(i.valor)}`); }
  let novoRepetir: Extra | null = null;
  if (ex.repetir && Number(ex.valor) > 0 && !(cau?.forma && /cau[çc][ãa]o/i.test(ex.descricao || ""))) {
    const np = ex.ultimo_enviado ? proximaParcela(ex.descricao) : { desc: ex.descricao, done: false };
    if (!np.done) { total += Number(ex.valor); linhas.push(`+ ${np.desc}: ${brl(ex.valor)}`); novoRepetir = { descricao: np.desc }; }
  }
  total = Math.round(total * 100) / 100;
  if (!(total > 0)) {
    await avisar({ type: "master_alert", title: `PicPay: ${d.name} sem valor`, body: "O carro dele está sem valor de aluguel. A cobrança automática não foi criada.", url: "/" });
    return { motorista: d.name, erro: "sem valor de aluguel" };
  }
  linhas.push(`Total: ${brl(total)}`);

  // ----- cobrança Pix: o QR vale até 23:59 do vencimento -----
  const validade = Math.max(600, Math.floor((new Date(`${venc.iso}T23:59:00-03:00`).getTime() - Date.now()) / 1000));
  const cobId = `mtr-${String(d.id).replace(/-/g, "").slice(0, 8)}-${Date.now().toString(36)}`;
  const phone = telefone(d.phone);
  const cob = await picpay("POST", "/charge/pix", {
    paymentSource: "GATEWAY", merchantChargeId: cobId,
    customer: { name: d.name, email, documentType: "CPF", document: cpf, ...(phone ? { phone } : {}) },
    transactions: [{ amount: Math.round(total * 100), pix: { expiration: validade } }],
  });
  const pix = cob?.transactions?.[0]?.pix;
  if (!pix?.qrCode) throw new Error("O PicPay não devolveu o Pix.");

  let qrPath: string | null = null;
  if (pix.qrCodeBase64) {
    qrPath = `${d.id}/pix-qr-picpay-${Date.now()}.png`;
    const up = await admin.storage.from("docs").upload(qrPath, decodeBase64(String(pix.qrCodeBase64).replace(/^data:[^,]*,/, "")), { contentType: "image/png", upsert: true });
    if (up.error) qrPath = null;
  }

  // ----- atualiza o motorista (o banco cria o histórico e a data de pagamento sozinho) -----
  delete ex.repetir; delete ex.descricao; delete ex.valor; delete ex.ultimo_enviado;
  if (novoRepetir) Object.assign(ex, { repetir: true, descricao: novoRepetir.descricao, valor: d.pix_extra.valor, ultimo_enviado: true });
  if (cauCobrada) ex.caucao = { ...cau, cobradas: Number(cau.cobradas || 0) + 1 };
  if (multas.length) { const ids = new Set(multas.map((i: Extra) => i.id)); ex.multas = { ...ex.multas, itens: ex.multas.itens.map((i: Extra) => ids.has(i.id) ? { ...i, cobrada: hojeBR() } : i) }; }
  ex.picpay = { ...ppx, cobranca: cobId, ids: [cobId, ...(ppx.ids || [])].slice(0, 12), vencimento: venc.iso, criada_em: new Date().toISOString() };
  const { error } = await admin.from("profiles").update({
    pix_code: pix.qrCode, pix_qr_path: qrPath, pix_link: null, pix_amount: total,
    pix_description: linhas.join("\n"), pix_extra: ex,
  }).eq("id", d.id);
  if (error) throw new Error("salvar no app: " + error.message);

  const { data: atual } = await admin.from("profiles").select("pix_due_at").eq("id", d.id).maybeSingle();
  const prazo = atual?.pix_due_at ? new Date(atual.pix_due_at).toLocaleDateString("pt-BR", { timeZone: "America/Sao_Paulo", weekday: "long", day: "2-digit", month: "2-digit" }) : venc.iso;
  await avisar({ type: "driver_alert", driver_id: d.id, title: "Novo Pix disponível", body: `Valor: ${brl(total)}. Pagamento até ${prazo}, 23:59. O pagamento é conferido sozinho: não precisa enviar comprovante.`, url: "/?aba=pagamento" });
  return { motorista: d.name, cobranca: cobId, valor: total, vencimento: venc.iso };
}

// ----- pagamento recebido: sempre confere na API do PicPay antes de dar baixa -----
async function conferirCobranca(cobId: string) {
  const c = await picpay("GET", `/charge/${encodeURIComponent(cobId)}`);
  if (c?.chargeStatus !== "PAID") return { ignorado: `situação ${c?.chargeStatus}` };
  const { data } = await admin.from("profiles").select("id, name, pix_extra, pix_description").eq("role", "driver").contains("pix_extra", { picpay: { ids: [cobId] } }).limit(1);
  const d = data?.[0];
  const valor = Number(c.amount) / 100;
  if (!d) {
    await avisar({ type: "master_alert", title: `Pix de ${brl(valor)} recebido no PicPay`, body: "Não consegui saber de qual motorista é. Confira no PicPay.", url: "/" });
    return { ignorado: "pagamento sem motorista identificado" };
  }
  const { data: ja } = await admin.from("receipts").select("id").eq("driver_id", d.id).contains("ai_result", { id_transacao: cobId }).maybeSingle();
  if (ja) return { ignorado: "pagamento já registrado" };

  const quando = hojeBR();
  const html = `<!doctype html><html lang="pt-BR"><head><meta charset="utf-8"><title>Pagamento confirmado</title></head><body style="font-family:sans-serif">
<h2>MOTORA – Pagamento confirmado pelo PicPay</h2>
<p><b>Motorista:</b> ${String(d.name).replace(/[<>&]/g, "")}<br><b>Valor:</b> ${brl(valor)}<br><b>Data:</b> ${quando}<br><b>Código da cobrança:</b> ${cobId}</p>
<p>${String(d.pix_description || "").replace(/[<>&]/g, "").replace(/\n/g, "<br>")}</p></body></html>`;
  const path = `${d.id}/picpay-${cobId}.html`;
  await admin.storage.from("docs").upload(path, new TextEncoder().encode(html), { contentType: "text/html", upsert: true });

  const agora = new Date().toISOString();
  const { data: rec, error } = await admin.from("receipts").insert({
    driver_id: d.id, file_name: `Pagamento PicPay ${quando}.html`, file_path: path,
    ai_status: "ok", ai_checked_at: agora, confirmed_at: agora,
    ai_result: { origem: "picpay", valor, situacao: "realizado", id_transacao: cobId, data_hora: quando, pagador_nome: d.name, problemas: [] },
  }).select("id").single();
  if (error) throw new Error("registrar pagamento: " + error.message);
  await admin.from("receipts").update({ confirmed_at: agora }).eq("id", rec.id); // dispara o gatilho de abatimento

  await avisar({ type: "master_alert", title: `${d.name} pagou ${brl(valor)}`, body: "Pagamento conferido pelo PicPay. O recibo vai para o WhatsApp dele.", url: "/" });
  await avisar({ type: "driver_alert", driver_id: d.id, title: "Recibo de pagamento", body: `Recebemos seu pagamento de ${brl(valor)} em ${quando.split("-").reverse().join("/")}. Obrigado!${d.pix_description ? "\nReferente a: " + String(d.pix_description).replace(/\n/g, " · ") : ""}`, url: "/?aba=pagamento" });
  return { ok: true, motorista: d.name, valor };
}

async function cobrarTodos() {
  const { data: lista } = await admin.from("profiles").select("*").eq("role", "driver").eq("picpay_auto_charge_enabled", true);
  const out: unknown[] = [];
  for (const d of lista ?? []) {
    const ultima = d.pix_extra?.picpay?.cobranca;
    if (ultima) { try { await conferirCobranca(ultima); } catch (e) { console.error("reconferir", e); } }
    try { out.push(await cobrarMotorista(d)); } catch (e) {
      out.push({ motorista: d.name, erro: String((e as Error).message || e) });
      await avisar({ type: "master_alert", title: `PicPay: erro na cobrança de ${d.name}`, body: String((e as Error).message || e).slice(0, 180), url: "/" });
    }
  }
  return out;
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
    const body = await req.json().catch(() => ({}));
    // 1) o banco pedindo as cobranças do dia
    if (req.headers.get("x-cron-token") !== null) {
      if (req.headers.get("x-cron-token") !== (await secret("cron_token"))) return json({ error: "proibido" }, 403);
      if (body.acao === "cobrar") { const out = await cobrarTodos(); console.log("picpay cobrar", JSON.stringify(out)); return json({ ok: true, out }); }
      return json({ error: "ação desconhecida" }, 400);
    }
    // 2) o dono testando a conexão
    if (body.acao === "testar") {
      if (!(await ehMaster(req))) return json({ error: "proibido" }, 403);
      try {
        await tokenPicpay();
        return json({ ok: true, mensagem: `Conectado ao PicPay (${(await secret("picpay_ambiente")) === "sandbox" ? "conta de testes" : "conta de verdade"}).` });
      } catch (e) { return json({ ok: false, error: String((e as Error).message || e) }); }
    }
    // 3) o PicPay avisando que a cobrança mudou
    const tok = (req.headers.get("authorization") || "").replace(/^Bearer\s+/i, "");
    const esperado = await secret("picpay_webhook_token");
    if (!esperado || tok !== esperado) return json({ error: "proibido" }, 403);
    const cobId = body?.data?.merchantChargeId;
    if (cobId) {
      const out = await conferirCobranca(String(cobId));
      console.log("picpay webhook", JSON.stringify(out));
    }
    return json({ received: true });
  } catch (e) {
    console.error(e);
    return json({ ok: false, error: String(e) }, 500);
  }
});
