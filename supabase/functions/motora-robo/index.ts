// MOTORA - ponte entre o app e o ROBÔ DO WHATSAPP que fica no computador do dono.
// O robô só DISPARA mensagens (não lê nem responde ninguém). Quem escreve as mensagens é a IA (Gemini)
// na função motora-push, com a chave já cadastrada; elas ficam na tabela whatsapp_queue.
// O robô usa só a chave "robo_token" (não tem acesso ao banco).
//   acao "pendentes": devolve até 5 mensagens para enviar (só se o envio automático estiver ligado)
//   acao "enviada":   marca a mensagem como enviada
//   acao "falhou":    avisa o dono que uma mensagem não foi (ela continua no botão Enviar da Área IA)
//   acao "mensagem":  texto recebido; do dono, CONFIRMAR/RECUSAR decide o comprovante
//   acao "atendimento": número desconhecido é saudado; sem resposta em 3 min, a Dara é chamada e a conversa passa por ela
//   acao "comprovante_url" / "comprovante_salvar": foto ou PDF de motorista cadastrado vira comprovante no app
import { createClient } from "npm:@supabase/supabase-js@2.45.4";
import { chaveFone, escolher, escolherConversa, extensao, foneBonito, lerComando, primeiroNome, saudacao, textoDara } from "./comandos.ts";

function serviceKey() {
  const legacy = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY");
  if (legacy) return legacy;
  try { const keys = JSON.parse(Deno.env.get("SUPABASE_SECRET_KEYS") || "{}"); return keys.default || Object.values(keys)[0]; } catch { return ""; }
}
const admin = createClient(Deno.env.get("SUPABASE_URL")!, serviceKey() as string, { auth: { persistSession: false } });
const json = (b: unknown, s = 200) => new Response(JSON.stringify(b), { status: s, headers: { "Content-Type": "application/json" } });

async function secret(key: string) {
  const { data } = await admin.from("app_secrets").select("value").eq("key", key).maybeSingle();
  return data?.value ?? null;
}

async function ehDono(telefone: unknown) {
  const k = chaveFone(telefone), dono = chaveFone(await secret("dono_whatsapp"));
  return !!k && k === dono;
}
// motorista ativo dono deste telefone (se dois tiverem o mesmo número, não adivinha)
async function motoristaDoFone(telefone: unknown) {
  const k = chaveFone(telefone);
  if (!k) return null;
  const { data } = await admin.from("profiles").select("id, name, phone, phone2, pix_extra").eq("role", "driver");
  const achados = (data ?? []).filter((p) => chaveFone(p.phone) === k || chaveFone(p.phone2) === k || chaveFone(p.pix_extra?.motorista2?.whatsapp) === k);
  return achados.length === 1 ? achados[0] : null;
}

Deno.serve(async (req) => {
  try {
    const tok = req.headers.get("x-robo-token");
    if (!tok || tok !== (await secret("robo_token"))) return json({ error: "proibido" }, 403);
    const body = await req.json().catch(() => ({}));

    const { data: s } = await admin.from("app_settings").select("value").eq("key", "whatsapp_robo").maybeSingle();
    const cfg = (s?.value || {}) as { ativo?: boolean; ativado_em?: string; visto_em?: string };

    if (body.acao === "pendentes") {
      // sinal de vida: o app mostra "Robô funcionando agora"
      await admin.from("app_settings").upsert({ key: "whatsapp_robo", value: { ...cfg, visto_em: new Date().toISOString() }, updated_at: new Date().toISOString() });
      const reiniciar_em = (cfg as { reiniciar_em?: string }).reiniciar_em || null; // pedido de reinício do robô
      if (!cfg.ativo) return json({ ativo: false, mensagens: [], reiniciar_em });
      const desde = cfg.ativado_em || new Date().toISOString();
      const { data: fila } = await admin.from("whatsapp_queue").select("id, driver_id, title, message, created_at, arquivo_path")
        .eq("status", "pendente").gte("created_at", desde).order("created_at").limit(5);
      const ids = [...new Set((fila ?? []).map((m) => m.driver_id))];
      const { data: pessoas } = ids.length ? await admin.from("profiles").select("id, name, phone, phone2, role, pix_extra").in("id", ids) : { data: [] };
      // avisos para o dono vão primeiro; mais velhos que 24 h não saem mais
      const dia = new Date(Date.now() - 24 * 3600 * 1000).toISOString();
      const numeroDono = await secret("dono_whatsapp");
      const { data: filaDono } = numeroDono ? await admin.from("whatsapp_dono").select("id, message, arquivo_path")
        .eq("status", "pendente").gte("created_at", desde > dia ? desde : dia).order("created_at").limit(5) : { data: [] };
      const doDono = await Promise.all((filaDono ?? []).map(async (m) => {
        const url = m.arquivo_path ? (await admin.storage.from("docs").createSignedUrl(m.arquivo_path, 3600)).data?.signedUrl : null;
        return { id: m.id, nome: "dono", telefones: [numeroDono], texto: m.message, pdf_url: url && /\.pdf$/i.test(m.arquivo_path!) ? url : null, imagem_url: url && !/\.pdf$/i.test(m.arquivo_path!) ? url : null };
      }));
      const mensagens = (await Promise.all((fila ?? []).map(async (m) => {
        const p = (pessoas ?? []).find((x) => x.id === m.driver_id);
        const pdf = m.arquivo_path ? (await admin.storage.from("docs").createSignedUrl(m.arquivo_path, 3600)).data?.signedUrl : null;
        return { id: m.id, nome: p?.name || "", telefones: [p?.phone, p?.phone2].filter(Boolean), texto: m.message, excluido: p?.role === "excluido", pdf_url: pdf || null, copias: p?.pix_extra?.motorista2?.whatsapp ? [p.pix_extra.motorista2.whatsapp] : [] };
      }))).filter((m) => !m.excluido);
      return json({ ativo: true, mensagens: [...doDono, ...mensagens], reiniciar_em });
    }

    if (body.acao === "enviada" && body.id) {
      await admin.from("whatsapp_queue").update({ status: "enviada", sent_at: new Date().toISOString() }).eq("id", body.id).eq("status", "pendente");
      await admin.from("whatsapp_dono").update({ status: "enviada", sent_at: new Date().toISOString() }).eq("id", body.id).eq("status", "pendente");
      return json({ ok: true });
    }

    if (body.acao === "falhou" && body.id) {
      // falha em aviso para o dono não gera outro aviso (senão vira laço)
      const { data: paraDono } = await admin.from("whatsapp_dono").update({ status: "falhou" }).eq("id", body.id).select("id");
      if (paraDono?.length) { console.error("aviso ao dono falhou", String(body.erro || "").slice(0, 120)); return json({ ok: true }); }
      const { data: m } = await admin.from("whatsapp_queue").select("title, driver_id").eq("id", body.id).maybeSingle();
      const { data: p } = m ? await admin.from("profiles").select("name").eq("id", m.driver_id).maybeSingle() : { data: null };
      await fetch(`${Deno.env.get("SUPABASE_URL")}/functions/v1/motora-push`, {
        method: "POST", headers: { "Content-Type": "application/json", "x-cron-token": (await secret("cron_token")) || "" },
        body: JSON.stringify({ type: "master_alert", title: `Robô não enviou para ${p?.name || "o motorista"}`, body: `${String(body.erro || "").slice(0, 120)} Toque para enviar pela Área IA.`, url: `/?abrir=ia&msg=${body.id}` }),
      }).catch(() => {});
      return json({ ok: true });
    }
    // ---------- mensagens RECEBIDAS: só valem com o envio automático ligado ----------
    if (["atendimento", "atendimento_fila", "atendimento_ok", "atendimento_falhou", "locadora_respondeu"].includes(body.acao) && !cfg.ativo) return json({ tratado: false });
    if (["mensagem", "comprovante_url", "comprovante_salvar", "comprovante_sem_numero"].includes(body.acao) && !cfg.ativo) return json({ resposta: null });
    // ---------- número desconhecido: saúda, em 3 min sem resposta chama a Dara e intermedia a conversa ----------
    const SETE_DIAS = 7 * 24 * 3600 * 1000;
    const rotulo = (l: { nome?: string | null; telefone: string }) => `${primeiroNome(l.nome) || "Contato"} ${foneBonito(l.telefone)}`;
    if (body.acao === "atendimento") {
      const k = chaveFone(body.telefone);
      if (!k) return json({ tratado: false });
      const agora = new Date().toISOString();
      if (k === chaveFone(await secret("dono_whatsapp"))) {
        // depois de 7 dias o robô só volta a atender com a ordem do dono: ATENDER
        const m = String(body.texto || "").trim().match(/^atender(?=\s|$)\s*(.*)$/i);
        if (!m) return json({ tratado: false });
        const { data: esperando } = await admin.from("whatsapp_atendimento").select("*").eq("status", "perguntar");
        const alvo = chaveFone(m[1]);
        const lista = (esperando ?? []).filter((l) => !alvo || l.chave === alvo);
        if (!lista.length) return json({ tratado: true, resposta: "Não há conversa esperando sua ordem." });
        if (lista.length > 1) return json({ tratado: true, resposta: `Há ${lista.length} esperando. Diga qual:\n${lista.map((l) => `ATENDER ${foneBonito(l.telefone)}`).join("\nou\n")}` });
        const l = lista[0];
        await admin.from("whatsapp_atendimento").update({ status: "aguardando", saudado_em: agora, ultima_msg_em: agora, escalado_em: null }).eq("id", l.id);
        return json({ tratado: true, resposta: `Ok, vou atender ${rotulo(l)}.`, envios: [{ jid: l.jid, texto: saudacao(l.nome) }] });
      }
      if (k === chaveFone(await secret("dara_whatsapp"))) {
        const { data: abertas } = await admin.from("whatsapp_atendimento").select("id, chave, nome, telefone, jid").eq("status", "com_dara").gte("ultima_msg_em", new Date(Date.now() - SETE_DIAS).toISOString());
        if (!abertas?.length) return json({ tratado: false });
        const e = escolherConversa(abertas, body.citado);
        if ("resposta" in e) return json({ tratado: true, resposta: e.resposta });
        const c = abertas.find((a) => a.id === e.conversa.id)!;
        await admin.from("whatsapp_atendimento").update(/^encerrar$/i.test(String(body.texto || "").trim()) ? { status: "encerrado", ultima_msg_em: agora } : { ultima_msg_em: agora }).eq("id", c.id);
        if (/^encerrar$/i.test(String(body.texto || "").trim())) return json({ tratado: true, resposta: `Conversa com ${rotulo(c)} encerrada.` });
        return json(body.midia ? { tratado: true, encaminhar: { jid: c.jid } } : { tratado: true, envios: [{ jid: c.jid, texto: String(body.texto || "") }] });
      }
      const { data: pessoas } = await admin.from("profiles").select("phone, phone2, pix_extra");
      if ((pessoas ?? []).some((p) => chaveFone(p.phone) === k || chaveFone(p.phone2) === k || chaveFone(p.pix_extra?.motorista2?.whatsapp) === k)) return json({ tratado: false });
      const { data: lead } = await admin.from("whatsapp_atendimento").select("*").eq("chave", k).maybeSingle();
      if (lead && lead.status !== "perguntar" && Date.now() - new Date(lead.ultima_msg_em).getTime() > SETE_DIAS) {
        // voltou depois de 7 dias: não responde nada sem o dono mandar
        await admin.from("whatsapp_atendimento").update({ status: "perguntar", jid: String(body.jid), ultima_msg_em: agora, guardadas: body.texto ? [String(body.texto)] : [] }).eq("id", lead.id);
        await admin.from("whatsapp_dono").insert({ message: `*${rotulo(lead)}* voltou a escrever depois de mais de 7 dias${body.texto ? `:\n${String(body.texto).slice(0, 500)}` : "."}\n\nA assistente não respondeu. Para ela atender, responda:\nATENDER ${foneBonito(lead.telefone)}` });
        return json({ tratado: true });
      }
      if (!lead) {
        const { count } = await admin.from("whatsapp_atendimento").select("id", { count: "exact", head: true }).gte("saudado_em", new Date(Date.now() - 3600 * 1000).toISOString());
        if ((count ?? 0) >= 20) return json({ tratado: true }); // proteção contra bloqueio do WhatsApp
        const { data: novo, error } = await admin.from("whatsapp_atendimento").upsert({ chave: k, telefone: String(body.telefone), jid: String(body.jid), nome: primeiroNome(body.nome) || null, status: "aguardando", guardadas: body.texto ? [String(body.texto)] : [], saudado_em: agora, ultima_msg_em: agora, escalado_em: null }, { onConflict: "chave" }).select("id").single();
        if (error) return json({ error: error.message }, 500);
        return json({ tratado: true, lead_id: novo.id, guardar: true, resposta: saudacao(body.nome) });
      }
      await admin.from("whatsapp_atendimento").update({ ultima_msg_em: agora, jid: String(body.jid), ...(["aguardando", "perguntar"].includes(lead.status) && body.texto ? { guardadas: [...(lead.guardadas || []), String(body.texto)] } : {}) }).eq("id", lead.id);
      if (lead.status === "aguardando") return json({ tratado: true, lead_id: lead.id, guardar: true });
      if (lead.status !== "com_dara") return json({ tratado: true }); // uma pessoa já assumiu ou a conversa foi encerrada
      const dara = await secret("dara_whatsapp");
      return json({ tratado: true, envios: [{ telefone: dara, texto: body.midia ? `*${rotulo(lead)}* enviou:` : `*${rotulo(lead)}:*\n${String(body.texto || "")}` }], ...(body.midia ? { encaminhar: { telefone: dara } } : {}) });
    }
    if (body.acao === "locadora_respondeu") {
      const { data: lead } = await admin.from("whatsapp_atendimento").select("*").eq("chave", chaveFone(body.telefone) || "-").maybeSingle();
      if (!lead || !["aguardando", "com_dara"].includes(lead.status) || String(body.em || "") < new Date(lead.saudado_em).toISOString()) return json({ tratado: true });
      await admin.from("whatsapp_atendimento").update({ status: "humano", ultima_msg_em: new Date().toISOString() }).eq("id", lead.id);
      return json({ tratado: true, lead_id: lead.id, envios: lead.status === "com_dara" ? [{ telefone: await secret("dara_whatsapp"), texto: `A conversa com ${rotulo(lead)} foi assumida pelo número da locadora. Não vou mais repassar.` }] : [] });
    }
    if (body.acao === "atendimento_fila") {
      const dara = await secret("dara_whatsapp");
      if (!dara) return json({ chamadas: [] });
      const { data: leads } = await admin.from("whatsapp_atendimento").select("*").eq("status", "aguardando").lte("saudado_em", new Date(Date.now() - Number((cfg as { atendimento_min?: number }).atendimento_min ?? 3) * 60000).toISOString()).order("saudado_em").limit(5);
      return json({ chamadas: (leads ?? []).map((l) => ({ id: l.id, telefone: dara, textos: [textoDara(l.telefone), `*${rotulo(l)}*${(l.guardadas || []).length ? " perguntou:\n" + l.guardadas.join("\n") : ""}\n\nPara encerrar a conversa, responda ENCERRAR.`] })) });
    }
    if (body.acao === "atendimento_ok" && body.id) {
      await admin.from("whatsapp_atendimento").update({ status: "com_dara", escalado_em: new Date().toISOString(), guardadas: [] }).eq("id", body.id).eq("status", "aguardando");
      return json({ ok: true });
    }
    if (body.acao === "atendimento_falhou" && body.id) {
      const { data: l } = await admin.from("whatsapp_atendimento").update({ status: "encerrado" }).eq("id", body.id).select("nome, telefone").maybeSingle();
      if (l) await admin.from("whatsapp_dono").insert({ message: `⚠️ Não consegui chamar a Dara. ${rotulo(l)} mandou mensagem para a locadora e está sem resposta.` });
      return json({ ok: true });
    }
    if (body.acao === "mensagem") {
      if (!(await ehDono(body.telefone))) return json({ resposta: null }); // só o número do dono dá ordens
      const c = lerComando(body.texto);
      if (!c) return json({ resposta: null });
      // abertos: já enviados ao dono e ainda sem decisão (quem decidiu pelo app sai da lista)
      const { data: linhas } = await admin.from("whatsapp_dono").select("id, receipt_id, receipts!inner(driver_id, confirmed_at, rejected_at)").eq("status", "enviada").not("receipt_id", "is", null);
      const vivos = (linhas ?? []).filter((l) => { const r = l.receipts as unknown as { confirmed_at: string | null; rejected_at: string | null }; return !r.confirmed_at && !r.rejected_at; });
      const ids = vivos.map((l) => (l.receipts as unknown as { driver_id: string }).driver_id);
      const { data: pessoas } = ids.length ? await admin.from("profiles").select("id, name").in("id", ids) : { data: [] };
      const abertos = vivos.map((l) => ({ id: l.id as string, receipt: l.receipt_id as string, nome: (pessoas ?? []).find((p) => p.id === (l.receipts as unknown as { driver_id: string }).driver_id)?.name || "motorista" }));
      const e = escolher(abertos, c);
      if ("resposta" in e) return json({ resposta: e.resposta });
      const linha = abertos.find((a) => a.id === e.id)!;
      const { data: res, error } = await admin.rpc("robo_decidir_comprovante", { p_receipt: linha.receipt, p_confirmar: c.confirmar, p_motivo: e.motivo || null });
      if (error) { console.error(error); return json({ resposta: "Não consegui registrar agora. Tente de novo em instantes ou decida pelo app." }); }
      await admin.from("whatsapp_dono").update({ status: "decidido" }).eq("id", linha.id);
      const textos: Record<string, string> = {
        confirmado: `✅ Comprovante de ${e.nome} confirmado. O motorista será avisado.`,
        recusado: `❌ Comprovante de ${e.nome} recusado. O motorista será avisado.`,
        ja_confirmado: `Esse comprovante de ${e.nome} já estava confirmado.`,
        ja_recusado: `Esse comprovante de ${e.nome} já estava recusado. Para mudar, use o app.`,
      };
      return json({ resposta: textos[String(res)] || "Comprovante não encontrado." });
    }
    if (body.acao === "comprovante_url") {
      if (await ehDono(body.telefone)) return json({ url: null, resposta: null });
      const d = await motoristaDoFone(body.telefone);
      if (!d) return json({ url: null, resposta: null }); // quem não é motorista cadastrado é ignorado
      const ext = extensao(body.mimetype);
      if (!ext) return json({ url: null, resposta: "Envie o comprovante como foto ou PDF." });
      const desde24 = new Date(Date.now() - 24 * 3600 * 1000).toISOString();
      const { count } = await admin.from("receipts").select("id", { count: "exact", head: true }).eq("driver_id", d.id).gte("created_at", desde24).like("file_path", "%/receipts/wa-%");
      if ((count ?? 0) >= 10) return json({ url: null, resposta: "Você já enviou muitos arquivos hoje. Se precisar, fale com a locadora." });
      const id = String(body.msg_id || "").replace(/[^A-Za-z0-9]/g, "").slice(0, 60);
      if (!id) return json({ url: null, resposta: null });
      const path = `${d.id}/receipts/wa-${id}.${ext}`;
      const { data: ja } = await admin.from("receipts").select("id").eq("file_path", path).maybeSingle();
      if (ja) return json({ url: null, resposta: null }); // mesma mensagem entregue de novo
      const { data, error } = await admin.storage.from("docs").createSignedUploadUrl(path, { upsert: true });
      if (error) return json({ error: error.message }, 500);
      return json({ url: data.signedUrl, path });
    }
    if (body.acao === "comprovante_salvar") {
      const d = await motoristaDoFone(body.telefone);
      const path = String(body.path || "");
      if (!d || !new RegExp(`^${d.id}/receipts/wa-[A-Za-z0-9]+\\.(pdf|jpg|png|webp)$`).test(path)) return json({ error: "proibido" }, 403);
      const { data: ja } = await admin.from("receipts").select("id").eq("file_path", path).maybeSingle();
      if (ja) return json({ resposta: null });
      const { error } = await admin.from("receipts").insert({ driver_id: d.id, file_name: String(body.file_name || "Comprovante pelo WhatsApp").slice(0, 120), file_path: path });
      if (error) return json({ error: error.message }, 500);
      return json({ resposta: "✅ Recebemos seu comprovante. Ele será conferido e você será avisado." });
    }
    if (body.acao === "comprovante_sem_numero") {
      await admin.from("whatsapp_dono").insert({ message: `⚠️ ${String(body.nome || "Alguém").slice(0, 60)} mandou um arquivo para o WhatsApp da locadora, mas o WhatsApp não mostrou o número. Ele NÃO entrou no MOTORA: abra a conversa e confira.` });
      return json({ ok: true });
    }
    // QR code para conectar o WhatsApp: o robô manda, o app mostra na Área IA (no Hostless não tem tela)
    if (body.acao === "qr") {
      const v = { ...cfg, qr: body.qr || null, conectado: !body.qr, visto_em: new Date().toISOString(), ...(body.pagina ? { pagina: String(body.pagina) } : {}),
        parear_codigo: null, parear_erro: null, ...(body.qr ? {} : { parear_numero: null, parear_pedido_em: null }) };
      await admin.from("app_settings").upsert({ key: "whatsapp_robo", value: v, updated_at: new Date().toISOString() });
      return json({ ok: true });
    }
    // Conectar pelo número: o app grava o pedido em whatsapp_robo; o robô lê aqui e devolve o código de 8 letras
    if (body.acao === "parear_ver") {
      const c = cfg as { parear_numero?: string; parear_pedido_em?: string };
      return json({ numero: c.parear_numero || null, pedido_em: c.parear_pedido_em || null });
    }
    if (body.acao === "parear_codigo") {
      const v = { ...cfg, parear_codigo: body.codigo ? String(body.codigo) : null, parear_erro: body.erro ? String(body.erro) : null, visto_em: new Date().toISOString() };
      await admin.from("app_settings").upsert({ key: "whatsapp_robo", value: v, updated_at: new Date().toISOString() });
      return json({ ok: true });
    }
    // sessão do WhatsApp guardada no Supabase (pasta privada "robo"): o robô não perde a conexão quando o Hostless reinicia
    const ARQ = "sessao-whatsapp.zip";
    if (body.acao === "sessao_existe") {
      const { data } = await admin.storage.from("robo").list("", { search: ARQ });
      return json({ existe: (data ?? []).some((f) => f.name === ARQ) });
    }
    if (body.acao === "sessao_enviar") {
      const { data, error } = await admin.storage.from("robo").createSignedUploadUrl(ARQ, { upsert: true });
      if (error) return json({ error: error.message }, 500);
      return json({ url: data.signedUrl });
    }
    if (body.acao === "sessao_baixar") {
      const { data, error } = await admin.storage.from("robo").createSignedUrl(ARQ, 600);
      if (error) return json({ error: error.message }, 404);
      return json({ url: data.signedUrl });
    }
    if (body.acao === "sessao_apagar") {
      await admin.storage.from("robo").remove([ARQ]);
      return json({ ok: true });
    }
    return json({ error: "ação desconhecida" }, 400);
  } catch (e) {
    console.error(e);
    return json({ ok: false, error: String(e) }, 500);
  }
});
