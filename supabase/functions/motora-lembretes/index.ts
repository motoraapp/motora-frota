// MOTORA - lembretes da cobrança semanal (crons "motora-lembretes" 08:30 quem=dono e "motora-lembretes-motorista" 19:00 quem=motorista, Brasília)
// 1) DONO, 2 dias antes do dia de pagamento: "confirme o valor" (notificação), para cada motorista.
//    É só um lembrete: se o dono não mudar nada, o Pix automático sai com o valor mostrado.
// 2) MOTORISTA, no dia do vencimento, se o Pix ainda não foi pago: lembrete por notificação e WhatsApp.
//    Pix manual: pede para enviar o comprovante. Asaas/PicPay: não fala de comprovante (a conferência é sozinha).
// O aviso de Pix criado (1 dia antes) sai das funções motora-asaas e motora-picpay.
// { "acao": "lembrar", "simular": true } só devolve o que seria enviado, sem enviar nada.
import { createClient } from "npm:@supabase/supabase-js@2.45.4";

function serviceKey() {
  const legacy = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY");
  if (legacy) return legacy;
  try { const keys = JSON.parse(Deno.env.get("SUPABASE_SECRET_KEYS") || "{}"); return keys.default || Object.values(keys)[0]; } catch { return ""; }
}
const admin = createClient(Deno.env.get("SUPABASE_URL")!, serviceKey() as string, { auth: { persistSession: false } });
const json = (b: unknown, s = 200) => new Response(JSON.stringify(b), { status: s, headers: { "Content-Type": "application/json" } });
const brl = (v: unknown) => Number(v).toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
const NOMES = ["domingo", "segunda-feira", "terça-feira", "quarta-feira", "quinta-feira", "sexta-feira", "sábado"];
type Extra = Record<string, any>; // eslint-disable-line @typescript-eslint/no-explicit-any

async function secret(key: string) {
  const { data } = await admin.from("app_secrets").select("value").eq("key", key).maybeSingle();
  return data?.value ?? null;
}

const hojeBR = () => new Date().toLocaleDateString("sv-SE", { timeZone: "America/Sao_Paulo" });
const diaBR = (iso: string) => new Date(iso).toLocaleDateString("sv-SE", { timeZone: "America/Sao_Paulo" });
function proximoDia(dia: number) {
  const hoje = new Date(hojeBR() + "T12:00:00-03:00");
  const add = (dia - hoje.getUTCDay() + 7) % 7;
  return { iso: new Date(hoje.getTime() + add * 86400000).toISOString().slice(0, 10), faltam: add };
}

// mesma conta do Novo Pix e das funções motora-asaas e motora-picpay, sem alterar nada
function previsao(d: Extra, aluguel: number | null) {
  const ex: Extra = d.pix_extra || {};
  let total = aluguel != null ? Number(aluguel) : 0;
  const cau = ex.caucao;
  if (cau?.forma === "parcelada" && Number(cau.cobradas || 0) < Number(cau.parcelas || 0) && Number(cau.valor_parcela) > 0) total += Number(cau.valor_parcela);
  if (ex.multas?.ativo) for (const i of ex.multas.itens || []) if (!i.cobrada && !i.paga) total += Number(i.valor || 0);
  if (ex.repetir && Number(ex.valor) > 0 && !(cau?.forma && /cau[çc][ãa]o/i.test(ex.descricao || ""))) {
    const m = String(ex.descricao || "").match(/(\d+)\s*\/\s*(\d+)/);
    if (!(ex.ultimo_enviado && m && Number(m[1]) + 1 > Number(m[2]))) total += Number(ex.valor);
  }
  for (const a of Array.isArray(ex.ajustes) ? ex.ajustes : []) total += (a.tipo === "desconto" ? -1 : 1) * Number(a.valor || 0);
  return Math.round(total * 100) / 100;
}

const formaAuto = (d: Extra) => d.picpay_auto_charge_enabled ? "PicPay" : d.asaas_auto_charge_enabled ? "Asaas" : "";

async function avisoDono(d: Extra, aluguel: number | null) {
  if (d.pix_extra?.sem_cobranca) return null; // motorista proprietário: o carro não gera aluguel
  const dia = d.payment_day_of_week ?? 1;
  const venc = proximoDia(dia);
  if (venc.faltam !== 2) return null;
  if (d.pix_due_at && diaBR(d.pix_due_at) === venc.iso) return null; // o Pix desse vencimento já existe
  const valor = previsao(d, aluguel);
  if (!d.vehicle_id && !(valor > 0)) return null; // sem carro e sem nada a cobrar: não há o que confirmar
  const data = venc.iso.split("-").reverse().slice(0, 2).join("/");
  const auto = formaAuto(d);
  const como = auto
    ? `Amanhã o ${auto} cria o Pix com esse valor. Se precisar mudar, ajuste a ficha do motorista hoje ou amanhã até as 7h.`
    : "Pagamento manual: confira o valor e envie o Pix para ele.";
  return {
    type: "master_alert", url: "/",
    title: valor > 0 ? `Confirme o valor: ${d.name}, ${brl(valor)}` : `${d.name}: cobrança sem valor`,
    body: `Vence ${NOMES[dia]}, ${data}. ${valor > 0 ? como : "O carro dele está sem valor de aluguel. Coloque o valor antes da cobrança."}`,
  };
}

async function avisoMotorista(d: Extra) {
  if (!d.pix_due_at || !d.pix_sent_at || diaBR(d.pix_due_at) !== hojeBR()) return null;
  const { data: cob } = await admin.from("pix_history").select("paid_at").eq("driver_id", d.id).eq("sent_at", d.pix_sent_at).maybeSingle();
  if (!cob || cob.paid_at) return null;
  const { data: recs } = await admin.from("receipts").select("confirmed_at, rejected_at").eq("driver_id", d.id).gte("created_at", d.pix_sent_at);
  const vivos = (recs ?? []).filter((r) => !r.rejected_at);
  if (vivos.some((r) => !r.confirmed_at)) return null; // já enviou comprovante e está sendo conferido
  const ex: Extra = d.pix_extra || {};
  const hoje = hojeBR();
  // automático só se o Pix desta semana foi mesmo criado pelo Asaas/PicPay
  const automatico = ex.asaas?.vencimento === hoje || ex.picpay?.vencimento === hoje;
  const comprovante = automatico ? "" : " Depois de pagar, envie o comprovante pelo app.";
  const base = { type: "driver_alert", driver_id: d.id, url: "/?aba=pagamento" };
  if (vivos.length) return { ...base, title: "Lembrete de pagamento", body: `Ainda falta uma parte do pagamento que vence hoje, até 23:59. Veja o valor no app.${comprovante}` };
  return { ...base, title: "Lembrete: seu Pix vence hoje", body: `Pagamento até hoje, 23:59.${d.pix_amount != null ? ` Valor: ${brl(d.pix_amount)}.` : ""}${comprovante}` };
}

// mesma distribuição do app (allocatePix): pagamentos aceitos quitam as cobranças da mais antiga para a mais nova
function emAberto(cobrancas: Extra[], pagos: Extra[], agora: number) {
  const ch = cobrancas.filter((h) => h.amount != null).sort((a, b) => +new Date(a.sent_at) - +new Date(b.sent_at)).map((h) => ({ due: h.due_at, rest: Number(h.amount) }));
  for (const r of pagos.filter((x) => !x.rejected_at && (x.confirmed_at || x.ai_status === "ok")).sort((a, b) => +new Date(a.created_at) - +new Date(b.created_at))) {
    const lido = Number(r.ai_result?.valor);
    let v = lido > 0 ? lido : (ch.find((c) => c.rest > 0.005)?.rest ?? 0);
    for (const c of ch) { if (v <= 0.005) break; const m = Math.min(v, c.rest); c.rest -= m; v -= m; }
  }
  const venc = ch.filter((c) => c.rest > 0.005 && new Date(c.due).getTime() < agora);
  return { total: Math.round(venc.reduce((t, c) => t + c.rest, 0) * 100) / 100, datas: venc.map((c) => new Date(c.due).toLocaleDateString("pt-BR", { timeZone: "America/Sao_Paulo", day: "2-digit", month: "2-digit" })) };
}

// 3) MOTORISTA EM ATRASO: uma mensagem por dia (09:00) até regularizar. Não envia se há comprovante aguardando conferência.
async function avisoAtraso(d: Extra) {
  if (d.payment_status !== "Em atraso") return null;
  const { data: cobs } = await admin.from("pix_history").select("amount, sent_at, due_at").eq("driver_id", d.id);
  const { data: recs } = await admin.from("receipts").select("confirmed_at, rejected_at, ai_status, ai_result, created_at").eq("driver_id", d.id);
  if ((recs ?? []).some((r) => !r.rejected_at && !r.confirmed_at && r.ai_status !== "ok")) return null;
  const { total, datas } = emAberto(cobs ?? [], recs ?? [], Date.now());
  if (!(total > 0)) return null;
  const auto = d.asaas_auto_charge_enabled || d.picpay_auto_charge_enabled;
  const chave = String(d.pix_link || "").match(/^chave:[^|]+\|(.*)$/)?.[1];
  const pagar = chave ? `Chave Pix: ${chave}` : d.pix_code ? `Pix copia e cola: ${d.pix_code}` : "";
  const must = [brl(total), ...(chave ? [chave] : d.pix_code ? [d.pix_code] : [])];
  return {
    type: "driver_alert", driver_id: d.id, url: "/?aba=pagamento", title: "Pagamento em atraso",
    body: `Seu pagamento de ${brl(total)} está em atraso (vencimento: ${datas.join(", ")}). Regularize o quanto antes.${auto ? "" : " Depois de pagar, envie o comprovante pelo app."}`,
    extra: pagar, must, tom: "firme, educada e respeitosa",
  };
}

async function lembrar(simular: boolean, quem: string) {
  if (quem === "atraso") {
    const { data: lista } = await admin.from("profiles").select("*").eq("role", "driver").eq("payment_status", "Em atraso");
    const avisos: Extra[] = [];
    for (const d of lista ?? []) { try { const a = await avisoAtraso(d); if (a) avisos.push(a); } catch (e) { console.error("atraso", d.name, e); } }
    if (!simular) {
      const token = (await secret("cron_token")) || "";
      for (const a of avisos) { try { await fetch(`${Deno.env.get("SUPABASE_URL")}/functions/v1/motora-push`, { method: "POST", headers: { "Content-Type": "application/json", "x-cron-token": token }, body: JSON.stringify(a) }); } catch (e) { console.error("aviso", e); } }
    }
    return avisos;
  }
  const { data: lista } = await admin.from("profiles").select("*").eq("role", "driver");
  const avisos: Extra[] = [];
  for (const d of lista ?? []) {
    try {
      const { data: v } = d.vehicle_id ? await admin.from("vehicles").select("rent_amount").eq("id", d.vehicle_id).maybeSingle() : { data: null };
      for (const a of [quem !== "motorista" ? await avisoDono(d, v?.rent_amount ?? null) : null, quem !== "dono" ? await avisoMotorista(d) : null]) if (a) avisos.push(a);
    } catch (e) { console.error("lembrete", d.name, e); }
  }
  if (!simular) {
    const token = (await secret("cron_token")) || "";
    for (const a of avisos) {
      try {
        await fetch(`${Deno.env.get("SUPABASE_URL")}/functions/v1/motora-push`, { method: "POST", headers: { "Content-Type": "application/json", "x-cron-token": token }, body: JSON.stringify(a) });
      } catch (e) { console.error("aviso", e); }
    }
  }
  return avisos;
}

Deno.serve(async (req) => {
  try {
    const body = await req.json().catch(() => ({}));
    if (req.headers.get("x-cron-token") !== (await secret("cron_token"))) return json({ error: "proibido" }, 403);
    if (body.acao !== "lembrar") return json({ error: "ação desconhecida" }, 400);
    const avisos = await lembrar(body.simular === true, String(body.quem || ""));
    console.log("lembretes", JSON.stringify(avisos.map((a) => a.title)));
    return json({ ok: true, simulado: body.simular === true, avisos });
  } catch (e) {
    console.error(e);
    return json({ ok: false, error: String(e) }, 500);
  }
});
