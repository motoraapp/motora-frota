// MOTORA - lembretes da cobrança semanal (crons "motora-lembretes" 08:30 quem=dono, "motora-pix-auto" 10:00 quem=pix_auto,
// "motora-lembretes-motorista-12h" 12:00 e "motora-lembretes-motorista" 19:00 quem=motorista, Brasília)
// 1) DONO, 2 dias antes do dia de pagamento: "confirme o valor" (notificação), para cada motorista.
//    É só um lembrete: se o dono não mudar nada, o Pix automático sai com o valor mostrado.
// 2) MOTORISTA, no dia do vencimento (12h e 19h), se o Pix ainda não foi pago e não há comprovante (app ou WhatsApp): lembrete por notificação e WhatsApp.
//    Pix manual: pede para enviar o comprovante. Asaas/PicPay: não fala de comprovante (a conferência é sozinha).
// 4) PIX AUTOMÁTICO DO MOTORA (ficha: Forma de cobrança "Pix automático do MOTORA" = pix_extra.pix_auto): 2 dias antes, às 10h,
//    cria o Pix copia e cola (BR Code do Banco Central, sem API de banco) com a chave do dono (app_settings pix_recebedor) e o valor da semana.
//    Sem aviso ao motorista nessa hora: ele recebe o Pix (com o código) no dia do pagamento, nos lembretes das 12h e 19h.
// O aviso de Pix criado (1 dia antes) do Asaas/PicPay sai das funções motora-asaas e motora-picpay.
// { "acao": "lembrar", "simular": true } só devolve o que seria enviado, sem enviar nada.
// { "acao": "lembrar", "quem": "pix_auto", "simular": true, "testar": "<id do motorista>" } mostra a conta e o código dele, sem gravar.
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
  const cau = ex.devolucao ? null : ex.caucao;
  if (cau?.forma === "parcelada" && Number(cau.cobradas || 0) < Number(cau.parcelas || 0) && Number(cau.valor_parcela) > 0) total += Number(cau.valor_parcela);
  if (!ex.devolucao && ex.multas?.ativo) for (const i of ex.multas.itens || []) if (!i.cobrada && !i.paga) total += Number(i.valor || 0);
  if (ex.repetir && Number(ex.valor) > 0 && !(cau?.forma && /cau[çc][ãa]o/i.test(ex.descricao || ""))) {
    const m = String(ex.descricao || "").match(/(\d+)\s*\/\s*(\d+)/);
    if (!(ex.ultimo_enviado && m && Number(m[1]) + 1 > Number(m[2]))) total += Number(ex.valor);
  }
  for (const a of Array.isArray(ex.ajustes) ? ex.ajustes : []) total += (a.tipo === "desconto" ? -1 : 1) * Number(a.valor || 0);
  return Math.round(total * 100) / 100;
}

const formaAuto = (d: Extra) => d.picpay_auto_charge_enabled ? "PicPay" : d.asaas_auto_charge_enabled ? "Asaas" : "";

async function avisoDono(d: Extra, aluguel: number | null) {
  if (d.pix_extra?.sem_cobranca) return null; // motorista proprietário ou carro já devolvido: sem cobrança
  const dia = d.payment_day_of_week ?? 1;
  const venc = proximoDia(dia);
  if (venc.faltam !== 2) return null;
  if (d.pix_extra?.devolucao) { // devolução informada: no máximo 2 cobranças dentro do prazo
    const { count } = await admin.from("pix_history").select("id", { count: "exact", head: true }).eq("driver_id", d.id).gte("due_at", d.pix_extra.devolucao.informada_em);
    if ((count ?? 0) >= 2 || venc.iso > d.pix_extra.devolucao.ate) return null;
  }
  if (d.pix_due_at && diaBR(d.pix_due_at) === venc.iso) return null; // o Pix desse vencimento já existe
  const valor = previsao(d, aluguel);
  if (!d.vehicle_id && !(valor > 0)) return null; // sem carro e sem nada a cobrar: não há o que confirmar
  const data = venc.iso.split("-").reverse().slice(0, 2).join("/");
  const auto = formaAuto(d);
  const como = auto
    ? `Amanhã o ${auto} cria o Pix com esse valor. Se precisar mudar, ajuste a ficha do motorista hoje ou amanhã até as 7h.`
    : d.pix_extra?.pix_auto && !d.pix_extra?.devolucao ? "Hoje às 10h o MOTORA cria o Pix com esse valor; ele recebe no dia do pagamento, às 12h. Se precisar mudar, ajuste a ficha do motorista antes das 10h."
    : "Pagamento manual: confira o valor e envie o Pix para ele.";
  return {
    type: "master_alert", url: "/",
    title: valor > 0 ? `Confirme o valor: ${d.name}, ${brl(valor)}` : `${d.name}: cobrança sem valor`,
    body: `Vence ${NOMES[dia]}, ${data}. ${valor > 0 ? como : "O carro dele está sem valor de aluguel. Coloque o valor antes da cobrança."}`,
  };
}

async function avisoMotorista(d: Extra) {
  if (d.pix_extra?.sem_cobranca) return null;
  if (!d.pix_due_at || !d.pix_sent_at || diaBR(d.pix_due_at) !== hojeBR()) return null;
  const { data: cob } = await admin.from("pix_history").select("paid_at").eq("driver_id", d.id).eq("sent_at", d.pix_sent_at).maybeSingle();
  if (!cob || cob.paid_at) return null;
  const { data: recs } = await admin.from("receipts").select("confirmed_at, rejected_at").eq("driver_id", d.id).gte("created_at", d.pix_sent_at);
  const vivos = (recs ?? []).filter((r) => !r.rejected_at);
  if (vivos.some((r) => !r.confirmed_at)) return null; // já enviou comprovante (app ou WhatsApp) e está sendo conferido
  const ex: Extra = d.pix_extra || {};
  const hoje = hojeBR();
  // automático só se o Pix desta semana foi mesmo criado pelo Asaas/PicPay
  const automatico = ex.asaas?.vencimento === hoje || ex.picpay?.vencimento === hoje;
  const comprovante = automatico ? "" : " Depois de pagar, envie o comprovante pelo app ou pelo WhatsApp.";
  // o Pix copia e cola vai junto no WhatsApp (no Pix automático do MOTORA é o primeiro envio do código ao motorista)
  const codigo = d.pix_code ? { extra: `${d.pix_description ? d.pix_description + "\n\n" : ""}Pix copia e cola:\n${d.pix_code}`, must: [d.pix_code, ...(d.pix_amount != null && !vivos.length ? [brl(d.pix_amount)] : [])] } : {};
  const base = { type: "driver_alert", driver_id: d.id, url: "/?aba=pagamento", ...codigo };
  if (vivos.length) return { ...base, title: "Lembrete de pagamento", body: `Ainda falta uma parte do pagamento que vence hoje, até 23:59. Veja o valor no app.${comprovante}` };
  return { ...base, title: "Seu Pix vence hoje", body: `Pagamento até hoje, 23:59.${d.pix_amount != null ? ` Valor: ${brl(d.pix_amount)}.` : ""}${comprovante}` };
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
  if (d.payment_status !== "Em atraso" || d.pix_extra?.sem_cobranca) return null;
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

// ===== 4) PIX AUTOMÁTICO DO MOTORA =====
// Código no padrão BR Code (o mesmo pixGerarCodigo do app): campos id+tamanho+valor e CRC16 no final.
function crc16(s: string) {
  let c = 0xffff;
  for (let i = 0; i < s.length; i++) { c ^= s.charCodeAt(i) << 8; for (let j = 0; j < 8; j++) c = (c & 0x8000) ? ((c << 1) ^ 0x1021) & 0xffff : (c << 1) & 0xffff; }
  return c.toString(16).toUpperCase().padStart(4, "0");
}
const campo = (id: string, v: string) => id + String(v.length).padStart(2, "0") + v;
const txtPix = (s: unknown, max: number) => String(s || "").normalize("NFD").replace(/[̀-ͯ]/g, "").replace(/[^A-Za-z0-9 ]/g, " ").replace(/\s+/g, " ").trim().toUpperCase().slice(0, max);
function codigoPix(chave: string, valor: number, nome: string, cidade: string, txid: string) {
  const c = campo("00", "01") + campo("26", campo("00", "br.gov.bcb.pix") + campo("01", chave)) + campo("52", "0000") + campo("53", "986")
    + campo("54", valor.toFixed(2)) + campo("58", "BR") + campo("59", txtPix(nome, 25) || "RECEBEDOR") + campo("60", txtPix(cidade, 15) || "BRASIL")
    + campo("62", campo("05", txid.replace(/[^A-Za-z0-9]/g, "").slice(0, 25))) + "6304";
  return c + crc16(c);
}
// mesma regra do app (normalizePixKey)
function chaveNormal(tipo: string, raw: unknown) {
  let k = String(raw || "").trim(); const dig = k.replace(/\D/g, "");
  if (tipo === "celular") { if (dig.length === 10 || dig.length === 11) k = "+55" + dig; else if (dig.length === 12 || dig.length === 13) k = "+" + dig; }
  else if (tipo === "cpf" || tipo === "cnpj") k = dig;
  else k = k.toLowerCase();
  return k;
}
function proximaParcela(desc: string) {
  const m = String(desc || "").match(/(\d+)\s*\/\s*(\d+)/);
  if (!m) return { desc, done: false };
  const k = Number(m[1]) + 1, n = Number(m[2]);
  return { desc: desc.replace(m[0], `${k}/${n}`), done: k > n };
}

// forcar: só no teste simulado (não grava nada), para ver a conta e o código de qualquer motorista em qualquer dia
async function pixAutomatico(d: Extra, rec: Extra, simular: boolean, forcar = false): Promise<Extra | null> {
  const ex: Extra = { ...(d.pix_extra || {}) };
  if (!(ex.pix_auto || forcar) || d.asaas_auto_charge_enabled || d.picpay_auto_charge_enabled || ex.sem_cobranca) return null;
  if (ex.devolucao) return { motorista: d.name, pulou: "devolução: o Pix só sai pelo Novo Pix" };
  const venc = proximoDia(d.payment_day_of_week ?? 1);
  if (venc.faltam > 2 && !forcar) return null;
  if (!forcar && (ex.pix_auto_venc === venc.iso || (d.pix_due_at && diaBR(d.pix_due_at) === venc.iso))) return { motorista: d.name, pulou: "o Pix deste vencimento já existe" };
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
  for (const a of Array.isArray(ex.ajustes) ? ex.ajustes : []) { const desc = a.tipo === "desconto"; total += (desc ? -1 : 1) * Number(a.valor || 0); linhas.push(`${desc ? "−" : "+"} ${a.desc}: ${brl(a.valor)}`); }
  total = Math.round(total * 100) / 100;
  if (!(total > 0)) return { motorista: d.name, erro: "sem valor a cobrar", aviso: { type: "master_alert", url: "/", title: `Pix automático: ${d.name} sem valor`, body: "Não há valor a cobrar (aluguel vazio ou desconto maior que o total). O Pix não foi criado: envie pelo Novo Pix." } };
  linhas.push(`Total: ${brl(total)}`);
  const tipo = String(rec.tipo || ""), chave = chaveNormal(tipo, rec.chave);
  const code = codigoPix(chave, total, String(rec.nome || ""), String(rec.cidade || ""), "MTR" + venc.iso.replace(/-/g, "") + String(d.id).replace(/[^A-Za-z0-9]/g, "").slice(0, 8));
  if (simular) return { motorista: d.name, valor: total, vencimento: venc.iso, itens: linhas, codigo: code };
  // ----- atualiza o motorista (o banco cria o histórico e a data de pagamento sozinho) -----
  delete ex.ajustes;
  delete ex.repetir; delete ex.descricao; delete ex.valor; delete ex.ultimo_enviado;
  if (novoRepetir) Object.assign(ex, { repetir: true, descricao: novoRepetir.descricao, valor: d.pix_extra.valor, ultimo_enviado: true });
  if (cauCobrada) ex.caucao = { ...cau, cobradas: Number(cau.cobradas || 0) + 1 };
  if (multas.length) { const ids = new Set(multas.map((i: Extra) => i.id)); ex.multas = { ...ex.multas, itens: ex.multas.itens.map((i: Extra) => ids.has(i.id) ? { ...i, cobrada: hojeBR() } : i) }; }
  ex.pix_auto_venc = venc.iso;
  const { error } = await admin.from("profiles").update({
    pix_code: code, pix_qr_path: null, pix_link: `chave:${tipo}|${chave}`, pix_amount: total,
    pix_description: linhas.join("\n"), pix_extra: ex, pix_next: { due: venc.iso },
  }).eq("id", d.id);
  if (error) throw new Error("salvar no app: " + error.message);
  const { data: atual } = await admin.from("profiles").select("pix_due_at").eq("id", d.id).maybeSingle();
  const prazo = atual?.pix_due_at ? new Date(atual.pix_due_at).toLocaleDateString("pt-BR", { timeZone: "America/Sao_Paulo", weekday: "long", day: "2-digit", month: "2-digit" }) : venc.iso.split("-").reverse().join("/");
  // pedido do dono (04/11/2026): o motorista NÃO é avisado agora; o Pix vai para ele só no dia do pagamento (lembretes das 12h e 19h, com o código)
  const avisos = [
    { type: "master_alert", url: "/", title: `Pix criado: ${d.name}, ${brl(total)}`, body: `O MOTORA criou o Pix (vence ${prazo}). O motorista recebe o Pix no dia do pagamento, às 12h.` },
  ];
  return { motorista: d.name, valor: total, vencimento: venc.iso, avisos };
}

async function pixAutoTodos(simular: boolean, testar = "") {
  const forcar = simular && !!testar;
  const { data: lista } = forcar ? await admin.from("profiles").select("*").eq("role", "driver").eq("id", testar)
    : await admin.from("profiles").select("*").eq("role", "driver").contains("pix_extra", { pix_auto: true });
  if (!lista?.length) return { out: [] as Extra[], avisos: [] as Extra[] };
  const { data: s } = await admin.from("app_settings").select("value").eq("key", "pix_recebedor").maybeSingle();
  const rec: Extra = s?.value || {};
  if (!rec.chave || !rec.tipo) return { out: [{ erro: "sem chave Pix do dono" }] as Extra[], avisos: [{ type: "master_alert", url: "/", title: "Pix automático: falta a sua chave Pix", body: "Envie um Novo Pix com \"Gerar o Pix copia e cola sozinho\" ligado: o app guarda a chave e o Pix automático passa a funcionar." }] as Extra[] };
  const out: Extra[] = [], avisos: Extra[] = [];
  for (const d of lista) {
    try {
      const r = await pixAutomatico(d, rec, simular, forcar);
      if (!r) continue;
      out.push({ ...r, avisos: undefined, aviso: undefined });
      if (r.avisos) avisos.push(...r.avisos);
      if (r.aviso) avisos.push(r.aviso);
    } catch (e) {
      out.push({ motorista: d.name, erro: String((e as Error).message || e) });
      avisos.push({ type: "master_alert", url: "/", title: `Pix automático: erro com ${d.name}`, body: String((e as Error).message || e).slice(0, 180) });
    }
  }
  return { out, avisos };
}

async function enviar(avisos: Extra[]) {
  const token = (await secret("cron_token")) || "";
  for (const a of avisos) {
    try {
      await fetch(`${Deno.env.get("SUPABASE_URL")}/functions/v1/motora-push`, { method: "POST", headers: { "Content-Type": "application/json", "x-cron-token": token }, body: JSON.stringify(a) });
    } catch (e) { console.error("aviso", e); }
  }
}

async function lembrar(simular: boolean, quem: string, testar = ""): Promise<Extra[]> {
  if (quem === "pix_auto") {
    const { out, avisos } = await pixAutoTodos(simular, testar);
    if (!simular) await enviar(avisos);
    console.log("pix_auto", JSON.stringify(out));
    return simular ? out : avisos;
  }
  if (quem === "atraso") {
    const { data: lista } = await admin.from("profiles").select("*").eq("role", "driver").eq("payment_status", "Em atraso");
    const avisos: Extra[] = [];
    for (const d of lista ?? []) { try { const a = await avisoAtraso(d); if (a) avisos.push(a); } catch (e) { console.error("atraso", d.name, e); } }
    if (!simular) await enviar(avisos);
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
  if (!simular) await enviar(avisos);
  return avisos;
}

Deno.serve(async (req) => {
  try {
    const body = await req.json().catch(() => ({}));
    if (req.headers.get("x-cron-token") !== (await secret("cron_token"))) return json({ error: "proibido" }, 403);
    if (body.acao !== "lembrar") return json({ error: "ação desconhecida" }, 400);
    const avisos = await lembrar(body.simular === true, String(body.quem || ""), String(body.testar || ""));
    console.log("lembretes", JSON.stringify(avisos.map((a) => a.title || a.motorista)));
    return json({ ok: true, simulado: body.simular === true, avisos });
  } catch (e) {
    console.error(e);
    return json({ ok: false, error: String(e) }, 500);
  }
});
