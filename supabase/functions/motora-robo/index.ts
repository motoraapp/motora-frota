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
import { chaveContato, chaveFone, escolher, escolherConversa, extensao, foneBonito, lerComando, lerNivel, MINUTOS_NIVEL, nivelPorPalavras, primeiroNome, promptNivel, saudacao, textoDara, textoDaraMotorista, textoDaraSim, lerDecisao, promptResumo, lerResumo, promptDara, lerMensagemIA, avisoDaraValido, ofertaVeiculo, promptCliente, lerRespostaCliente, valoresConferem, TEXTO_ESPERA, type Nivel } from "./comandos.ts";
import { tentarGemini } from "./gemini.ts";

function serviceKey() {
  const legacy = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY");
  if (legacy) return legacy;
  try { const keys = JSON.parse(Deno.env.get("SUPABASE_SECRET_KEYS") || "{}"); return keys.default || Object.values(keys)[0]; } catch { return ""; }
}
const admin = createClient(Deno.env.get("SUPABASE_URL")!, serviceKey() as string, { auth: { persistSession: false } });
const json = (b: unknown, s = 200) => new Response(JSON.stringify(b), { status: s, headers: { "Content-Type": "application/json" } });
const IA_MAX = 3; // respostas da IA por conversa com cliente (era 15; reduzido depois da restrição da Meta em 04/11/2026)

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

// áudio não dá para ler: fica no meio. Se a IA não responder, vale o tempo maior (o dono aceita até 20 min)
async function nivelDaMensagem(texto: string, midia: boolean, figurinha: boolean): Promise<Nivel> {
  if (figurinha && !texto) return "agradecimento";
  if (!texto) return midia ? "importante" : "normal";
  const direto = nivelPorPalavras(texto);
  if (direto) return direto;
  const key = await secret("gemini_key");
  if (!key) return "normal";
  const corpo = JSON.stringify({ contents: [{ role: "user", parts: [{ text: promptNivel(texto) }] }], generationConfig: { responseMimeType: "application/json", temperature: 0 } });
  const achou = await tentarGemini(key, (await secret("gemini_model")) || "gemini-flash-latest", corpo, lerNivel);
  return achou?.valor ?? "normal";
}

// resumo do que a pessoa escreveu para a Dara decidir. Mensagem curta ou IA fora do ar: mostra o próprio texto
async function resumoDe(mensagens: string[]) {
  const junto = mensagens.join(" ").trim();
  if (!junto) return "ainda não escreveu texto (pode ter mandado arquivo ou áudio).";
  if (junto.length <= 80) return junto;
  const key = await secret("gemini_key");
  const corpo = JSON.stringify({ contents: [{ role: "user", parts: [{ text: promptResumo(mensagens) }] }], generationConfig: { responseMimeType: "application/json", temperature: 0.1 } });
  const achou = key ? await tentarGemini(key, (await secret("gemini_model")) || "gemini-flash-latest", corpo, lerResumo) : null;
  return achou?.valor ?? junto.slice(0, 500);
}

// disponível = carro não excluído e sem motorista ativo. Responde só se for sobre carros e com os valores certos; senão fica calada e a Dara atende
async function respostaCliente(conversa: string[], chave = "") {
  const key = await secret("gemini_key");
  if (!key) return null;
  const { data: carros } = await admin.from("vehicles").select("id, model, color, year, rent_amount").is("deleted_at", null);
  const { data: ocupados } = await admin.from("profiles").select("vehicle_id").eq("role", "driver").not("vehicle_id", "is", null);
  const presos = new Set((ocupados ?? []).map((p) => p.vehicle_id));
  // teste: só o número em whatsapp_robo.teste_disponivel vê estes carros como livres; ninguém mais e nada muda nos carros
  const { data: rc } = await admin.from("app_settings").select("value").eq("key", "whatsapp_robo").maybeSingle();
  const teste = rc?.value?.teste_disponivel;
  const simulados = new Set<string>(teste?.chave === chave ? teste.ids || [] : []);
  const ofertas = (carros ?? []).filter((v) => !presos.has(v.id) || simulados.has(v.id)).map(ofertaVeiculo);
  if (!ofertas.length) return null; // sem carro disponível a IA não responde perguntas
  const corpo = JSON.stringify({ contents: [{ role: "user", parts: [{ text: promptCliente(ofertas, conversa) }] }], generationConfig: { responseMimeType: "application/json", temperature: 0.7 } });
  const aceita = (j: unknown) => { const r = lerRespostaCliente(j); return r && (!r.responder || (r.mensagem && valoresConferem(r.mensagem, ofertas))) ? r : null; };
  const achou = await tentarGemini(key, (await secret("gemini_model")) || "gemini-flash-latest", corpo, aceita);
  return achou?.valor.responder ? achou.valor.mensagem : null;
}

// o que a IA diz ao cliente depois de ninguém responder: a resposta certa; sem certeza, pede para aguardar uma vez e depois fica calada
async function falaCliente(conversa: string[], chave: string) {
  const ia = conversa.length ? await respostaCliente(conversa, chave).catch(() => null) : null;
  if (ia) return ia;
  return conversa.some((m) => m.includes(TEXTO_ESPERA)) ? null : TEXTO_ESPERA;
}

async function avisoDara(reserva: string, d: Parameters<typeof promptDara>[0]) {
  const key = await secret("gemini_key");
  if (!key) return reserva;
  const corpo = JSON.stringify({ contents: [{ role: "user", parts: [{ text: promptDara(d) }] }], generationConfig: { responseMimeType: "application/json", temperature: 0.9 } });
  const aceita = (j: unknown) => { const t = lerMensagemIA(j); return t && avisoDaraValido(t, d) ? t : null; };
  const achou = await tentarGemini(key, (await secret("gemini_model")) || "gemini-flash-latest", corpo, aceita);
  return achou?.valor ?? reserva;
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
      // proteção contra bloqueio (04/11/2026): mensagem com mais de 6 h não sai sozinha (fica na Área IA para o dono decidir)
      const seisHoras = new Date(Date.now() - 6 * 3600 * 1000).toISOString();
      const desde = [cfg.ativado_em || new Date().toISOString(), seisHoras].sort().at(-1)!;
      // aquecimento: nos 2 primeiros dias depois de religar, no máximo 10 por hora e 40 por dia; depois 20 por hora e 120 por dia
      const aquecendo = !!cfg.ativado_em && Date.now() - new Date(cfg.ativado_em).getTime() < 48 * 3600 * 1000;
      const umaHora = new Date(Date.now() - 3600 * 1000).toISOString(), umDia = new Date(Date.now() - 24 * 3600 * 1000).toISOString();
      const conta = async (t: string, de: string) => (await admin.from(t).select("id", { count: "exact", head: true }).gte("sent_at", de)).count ?? 0;
      const naHora = (await conta("whatsapp_queue", umaHora)) + (await conta("whatsapp_dono", umaHora));
      const noDia = (await conta("whatsapp_queue", umDia)) + (await conta("whatsapp_dono", umDia));
      const resta = Math.max(0, Math.min((aquecendo ? 10 : 20) - naHora, (aquecendo ? 40 : 120) - noDia));
      if (!resta) return json({ ativo: true, mensagens: [], reiniciar_em, limite: true });
      const { data: fila } = await admin.from("whatsapp_queue").select("id, driver_id, title, message, created_at, arquivo_path")
        .eq("status", "pendente").gte("created_at", desde).order("created_at").limit(5);
      const ids = [...new Set((fila ?? []).map((m) => m.driver_id))];
      const { data: pessoas } = ids.length ? await admin.from("profiles").select("id, name, phone, phone2, role, pix_extra").in("id", ids) : { data: [] };
      // avisos para o dono vão primeiro; mais velhos que 6 h não saem mais
      const numeroDono = await secret("dono_whatsapp");
      const { data: filaDono } = numeroDono ? await admin.from("whatsapp_dono").select("id, message, arquivo_path")
        .eq("status", "pendente").gte("created_at", desde).order("created_at").limit(5) : { data: [] };
      const doDono = await Promise.all((filaDono ?? []).map(async (m) => {
        const url = m.arquivo_path ? (await admin.storage.from("docs").createSignedUrl(m.arquivo_path, 3600)).data?.signedUrl : null;
        return { id: m.id, nome: "dono", telefones: [numeroDono], texto: m.message, pdf_url: url && /\.pdf$/i.test(m.arquivo_path!) ? url : null, imagem_url: url && !/\.pdf$/i.test(m.arquivo_path!) ? url : null };
      }));
      const mensagens = (await Promise.all((fila ?? []).map(async (m) => {
        const p = (pessoas ?? []).find((x) => x.id === m.driver_id);
        const pdf = m.arquivo_path ? (await admin.storage.from("docs").createSignedUrl(m.arquivo_path, 3600)).data?.signedUrl : null;
        return { id: m.id, nome: p?.name || "", telefones: [p?.phone, p?.phone2].filter(Boolean), texto: m.message, excluido: p?.role === "excluido", pdf_url: pdf || null, copias: p?.pix_extra?.motorista2?.whatsapp ? [p.pix_extra.motorista2.whatsapp] : [] };
      }))).filter((m) => !m.excluido);
      return json({ ativo: true, mensagens: [...doDono, ...mensagens].slice(0, resta), reiniciar_em });
    }

    // freio automático: o WhatsApp encerrou a conexão ou recusou a conta (ex.: restrição por spam). Desliga o envio
    // automático e avisa o dono pelo app (não pelo WhatsApp, que pode estar bloqueado). Religar é só no app.
    if (body.acao === "freio") {
      if (!cfg.ativo) return json({ ok: true });
      await admin.from("app_settings").upsert({ key: "whatsapp_robo", value: { ...cfg, ativo: false, freio_em: new Date().toISOString(), freio_codigo: Number(body.codigo) || null }, updated_at: new Date().toISOString() });
      await fetch(`${Deno.env.get("SUPABASE_URL")}/functions/v1/motora-push`, {
        method: "POST", headers: { "Content-Type": "application/json", "x-cron-token": (await secret("cron_token")) || "" },
        body: JSON.stringify({ type: "master_alert", title: "Robô do WhatsApp pausado", body: "O WhatsApp desconectou o robô (pode ser restrição). O envio automático foi desligado para proteger o número. Espere a restrição acabar, conecte de novo e religue na Área IA.", url: "/?abrir=ia" }),
      }).catch(() => {});
      return json({ ok: true, pausado: true });
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
    if (["audio_dono", "atendimento", "atendimento_fila", "atendimento_ok", "atendimento_falhou", "locadora_respondeu"].includes(body.acao) && !cfg.ativo) return json({ tratado: false });
    if (["mensagem", "comprovante_url", "comprovante_salvar", "comprovante_sem_numero"].includes(body.acao) && !cfg.ativo) return json({ resposta: null });
    // ---------- número desconhecido: saúda, em 3 min sem resposta chama a Dara e intermedia a conversa ----------
    const SETE_DIAS = 7 * 24 * 3600 * 1000;
    const rotulo = (l: { nome?: string | null; telefone: string }) => `${primeiroNome(l.nome) || "Contato"} ${foneBonito(l.telefone)}`;
    if (body.acao === "atendimento") {
      const k = chaveContato(body.telefone);
      if (!k) return json({ tratado: false });
      const agora = new Date().toISOString();
      if (k === chaveFone(await secret("dono_whatsapp"))) {
        // depois de 7 dias o robô só volta a atender com a ordem do dono: ATENDER
        const m = String(body.texto || "").trim().match(/^atender(?=\s|$)\s*(.*)$/i);
        if (!m) {
          // CONFIRMAR/RECUSAR de comprovante seguem como antes; o resto é pedido para a IA resolver (motora-dono), sempre com o SIM do dono
          if (!String(body.texto || "").trim() && body.audio) return json({ tratado: true, pedir_audio: true }); // só o áudio do dono é baixado
          if (!String(body.texto || "").trim() || lerComando(body.texto)) return json({ tratado: false });
          const r = await fetch(`${Deno.env.get("SUPABASE_URL")}/functions/v1/motora-dono`, { method: "POST", headers: { "Content-Type": "application/json", "x-cron-token": (await secret("cron_token")) || "" }, body: JSON.stringify({ texto: body.texto }) }).then((x) => x.json()).catch(() => null);
          return json({ tratado: true, resposta: r?.resposta ?? "Tive um erro e nada foi feito. Tente de novo.", envios: r?.envios || [] });
        }
        const { data: esperando } = await admin.from("whatsapp_atendimento").select("*").eq("status", "perguntar");
        const alvo = chaveFone(m[1]);
        const lista = (esperando ?? []).filter((l) => !alvo || l.chave === alvo);
        if (!lista.length) return json({ tratado: true, resposta: "Não há conversa esperando sua ordem." });
        if (lista.length > 1) return json({ tratado: true, resposta: `Há ${lista.length} esperando. Diga qual:\n${lista.map((l) => `ATENDER ${foneBonito(l.telefone)}`).join("\nou\n")}` });
        const l = lista[0];
        await admin.from("whatsapp_atendimento").update({ status: "aguardando", saudado_em: agora, ultima_msg_em: agora, escalado_em: null }).eq("id", l.id);
        return json({ tratado: true, resposta: `Ok, vou atender ${rotulo(l)}.`, envios: [{ jid: l.jid, telefone: l.telefone, texto: saudacao(l.nome) }] });
      }
      if (k === chaveFone(await secret("dara_whatsapp"))) {
        const { data: abertas } = await admin.from("whatsapp_atendimento").select("id, chave, nome, telefone, jid").eq("status", "com_dara").gte("ultima_msg_em", new Date(Date.now() - SETE_DIAS).toISOString());
        const { data: perguntas } = await admin.from("whatsapp_atendimento").select("*").eq("status", "pergunta_dara");
        if (perguntas?.length) {
          // a pergunta "quer responder?" espera SIM ou NÃO; responder em cima de outra conversa continua indo para ela
          const citouAberta = !!body.citado && !!abertas?.length && !("resposta" in escolherConversa(abertas, body.citado));
          if (!citouAberta) {
            const decisao = lerDecisao(body.texto);
            const semCitar = !body.citado;
            if (semCitar && abertas?.length) return json({ tratado: true, resposta: "Segure a mensagem da pessoa, toque em Responder e escreva, para eu saber de qual conversa é." });
            const e = escolherConversa(perguntas, body.citado);
            if ("resposta" in e) return json({ tratado: true, resposta: e.resposta });
            if (!decisao) return json({ tratado: true, resposta: `Você quer responder ${foneBonito(e.conversa.telefone)}? Responda SIM ou NÃO.` });
            const l = perguntas.find((p) => p.id === e.conversa.id)!;
            if (decisao === "nao") {
              await admin.from("whatsapp_atendimento").update({ status: "encerrado", ultima_msg_em: agora }).eq("id", l.id);
              await admin.from("whatsapp_dono").insert({ message: `A Dara não vai responder *${rotulo(l)}*. A pessoa está sem resposta: responda pelo número da locadora.\n\nO que ela escreveu:\n${(l.guardadas || []).join("\n").slice(0, 1000)}` });
              return json({ tratado: true, resposta: "Tudo bem, vou avisar o Thiago." });
            }
            await admin.from("whatsapp_atendimento").update({ status: "com_dara", ultima_msg_em: agora, guardadas: [] }).eq("id", l.id);
            return json({ tratado: true, resposta: textoDaraSim(l.telefone, l.guardadas || []), liberar: { telefone: await secret("dara_whatsapp"), lead_id: l.id } });
          }
        }
        if (!abertas?.length) return json({ tratado: false });
        const e = escolherConversa(abertas, body.citado);
        if ("resposta" in e) return json({ tratado: true, resposta: e.resposta });
        const c = abertas.find((a) => a.id === e.conversa.id)!;
        await admin.from("whatsapp_atendimento").update(/^encerrar$/i.test(String(body.texto || "").trim()) ? { status: "encerrado", ultima_msg_em: agora } : { ultima_msg_em: agora }).eq("id", c.id);
        if (/^encerrar$/i.test(String(body.texto || "").trim())) return json({ tratado: true, resposta: `Conversa com ${rotulo(c)} encerrada.` });
        return json(body.midia ? { tratado: true, encaminhar: { jid: c.jid, telefone: c.telefone } } : { tratado: true, envios: [{ jid: c.jid, telefone: c.telefone, texto: String(body.texto || "") }] });
      }
      // motorista cadastrado: sem saudação; a urgência decide quando chamar a Dara. Foto e PDF seguem como comprovante
      const motorista = await motoristaDoFone(body.telefone);
      if (motorista) {
        if (body.arquivo) return json({ tratado: false });
        // devolução informada: o robô e a Dara não falam com ele; o dono recebe a mensagem e decide
        if (motorista.pix_extra?.devolucao) {
          await admin.from("whatsapp_dono").insert({ message: `*${primeiroNome(motorista.name)} ${foneBonito(body.telefone)}* (em devolução) escreveu${body.texto ? `:\n${String(body.texto).slice(0, 800)}` : " (áudio ou figurinha): veja no WhatsApp da locadora."}\n\nNinguém respondeu a ele. Responda você.` });
          return json({ tratado: true });
        }
        const { data: atual } = await admin.from("whatsapp_atendimento").select("*").eq("chave", k).maybeSingle();
        if (atual?.status === "com_dara" && Date.now() - new Date(atual.ultima_msg_em).getTime() <= SETE_DIAS) {
          await admin.from("whatsapp_atendimento").update({ ultima_msg_em: agora, jid: String(body.jid) }).eq("id", atual.id);
          const dara = await secret("dara_whatsapp");
          return json({ tratado: true, envios: [{ telefone: dara, texto: body.midia ? `*${rotulo(atual)}* enviou:` : `*${rotulo(atual)}:*\n${String(body.texto || "")}` }], ...(body.midia ? { encaminhar: { telefone: dara } } : {}) });
        }
        const nivel = await nivelDaMensagem(String(body.texto || ""), !!body.midia, !!body.figurinha);
        if (nivel === "agradecimento") return json({ tratado: true }); // não incomoda a Dara e não começa contagem
        const chamar = new Date(Date.now() + MINUTOS_NIVEL[nivel] * 60000).toISOString();
        if (atual?.status === "aguardando") {
          // mensagem mais urgente adianta a chamada; mais calma nunca atrasa
          const adianta = !atual.chamar_em || chamar < new Date(atual.chamar_em).toISOString();
          await admin.from("whatsapp_atendimento").update({ ultima_msg_em: agora, jid: String(body.jid), guardadas: body.texto ? [...(atual.guardadas || []), String(body.texto)] : atual.guardadas, ...(adianta ? { chamar_em: chamar, urgencia: nivel } : {}) }).eq("id", atual.id);
          return json({ tratado: true, lead_id: atual.id, guardar: true });
        }
        const { data: nova, error } = await admin.from("whatsapp_atendimento").upsert({ chave: k, telefone: String(body.telefone), jid: String(body.jid), nome: motorista.name, motorista: true, chamar_em: chamar, urgencia: nivel, status: "aguardando", guardadas: body.texto ? [String(body.texto)] : [], saudado_em: agora, ultima_msg_em: agora, escalado_em: null }, { onConflict: "chave" }).select("id").single();
        if (error) return json({ error: error.message }, 500);
        return json({ tratado: true, lead_id: nova.id, guardar: true });
      }
      const { data: pessoas } = await admin.from("profiles").select("phone, phone2, pix_extra").neq("role", "excluido");
      if ((pessoas ?? []).some((p) => chaveFone(p.phone) === k || chaveFone(p.phone2) === k || chaveFone(p.pix_extra?.motorista2?.whatsapp) === k)) return json({ tratado: false });
      const { data: lead } = await admin.from("whatsapp_atendimento").select("*").eq("chave", k).maybeSingle();
      // conversa que já existia no WhatsApp da locadora (pedido do dono, 04/11/2026): o robô nunca responde, nem depois de 7 dias
      if (lead?.status === "antiga") {
        await admin.from("whatsapp_atendimento").update({ ultima_msg_em: agora, jid: String(body.jid) }).eq("id", lead.id);
        return json({ tratado: true });
      }
      if (lead && lead.status !== "perguntar" && Date.now() - new Date(lead.ultima_msg_em).getTime() > SETE_DIAS) {
        // voltou depois de 7 dias: não responde nada sem o dono mandar
        await admin.from("whatsapp_atendimento").update({ status: "perguntar", jid: String(body.jid), ultima_msg_em: agora, guardadas: body.texto ? [String(body.texto)] : [] }).eq("id", lead.id);
        await admin.from("whatsapp_dono").insert({ message: `*${rotulo(lead)}* voltou a escrever depois de mais de 7 dias${body.texto ? `:\n${String(body.texto).slice(0, 500)}` : "."}\n\nA assistente não respondeu. Para ela atender, responda:\nATENDER ${foneBonito(lead.telefone)}` });
        return json({ tratado: true });
      }
      if (!lead) {
        // proteção contra bloqueio: "ok", "blz", emoji ou figurinha de número novo não recebe nada (quase sempre é resposta de conversa antiga)
        const trivial = !!body.figurinha || (!body.midia && !body.arquivo && (!String(body.texto || "").trim() || nivelPorPalavras(String(body.texto)) === "agradecimento"));
        if (trivial) return json({ tratado: true });
        // número novo: o robô primeiro vê no WhatsApp se já havia conversa antes (robôs antigos não mandam pode_checar e seguem saudando)
        if (body.pode_checar && body.conversa_antiga === undefined) return json({ tratado: true, checar_historico: true });
        if (body.conversa_antiga === true) {
          const { error } = await admin.from("whatsapp_atendimento").upsert({ chave: k, telefone: String(body.telefone), jid: String(body.jid), nome: primeiroNome(body.nome) || null, status: "antiga", guardadas: [], ia_respostas: 0, saudado_em: agora, ultima_msg_em: agora, escalado_em: null }, { onConflict: "chave" });
          if (error) return json({ error: error.message }, 500);
          return json({ tratado: true }); // sem saudação, sem Dara e sem IA
        }
        const { count } = await admin.from("whatsapp_atendimento").select("id", { count: "exact", head: true }).eq("motorista", false).gte("saudado_em", new Date(Date.now() - 3600 * 1000).toISOString());
        if ((count ?? 0) >= 20) return json({ tratado: true }); // proteção contra bloqueio do WhatsApp
        const inicio = body.texto ? [String(body.texto)] : [];
        const { data: novo, error } = await admin.from("whatsapp_atendimento").upsert({ chave: k, telefone: String(body.telefone), jid: String(body.jid), nome: primeiroNome(body.nome) || null, status: "aguardando", guardadas: inicio, ia_respostas: 0, saudado_em: agora, ultima_msg_em: agora, escalado_em: null }, { onConflict: "chave" }).select("id").single();
        if (error) return json({ error: error.message }, 500);
        return json({ tratado: true, lead_id: novo.id, guardar: true, resposta: saudacao(body.nome) });
      }
      const conversa = [...(lead.guardadas || []), ...(body.texto ? [String(body.texto)] : [])];
      // ordem: saudação, dono (3 min), Dara (10 min). Só depois disso a IA responde (no máximo 3 respostas por conversa: proteção contra bloqueio)
      const ia = body.texto && lead.status === "pergunta_dara" && lead.dono_avisado_em && !lead.motorista && (lead.ia_respostas || 0) < IA_MAX ? await falaCliente(conversa, k) : null;
      await admin.from("whatsapp_atendimento").update({ ultima_msg_em: agora, jid: String(body.jid), ...(["aguardando", "perguntar", "pergunta_dara"].includes(lead.status) && body.texto ? { guardadas: ia ? [...conversa, `(Assistente respondeu: ${ia})`] : conversa } : {}), ...(ia ? { ia_respostas: (lead.ia_respostas || 0) + 1 } : {}) }).eq("id", lead.id);
      if (lead.status === "aguardando" || lead.status === "pergunta_dara") return json({ tratado: true, lead_id: lead.id, guardar: true, resposta: ia });
      if (lead.status !== "com_dara") return json({ tratado: true }); // uma pessoa já assumiu ou a conversa foi encerrada
      const dara = await secret("dara_whatsapp");
      return json({ tratado: true, envios: [{ telefone: dara, texto: body.midia ? `*${rotulo(lead)}* enviou:` : `*${rotulo(lead)}:*\n${String(body.texto || "")}` }], ...(body.midia ? { encaminhar: { telefone: dara } } : {}) });
    }
    if (body.acao === "audio_dono") {
      if (!(await ehDono(body.telefone))) return json({ resposta: null });
      const r = await fetch(`${Deno.env.get("SUPABASE_URL")}/functions/v1/motora-dono`, { method: "POST", headers: { "Content-Type": "application/json", "x-cron-token": (await secret("cron_token")) || "" }, body: JSON.stringify({ audio: { mime: body.mime, b64: body.b64 } }) }).then((x) => x.json()).catch(() => null);
      return json(r ?? { resposta: "Tive um erro e nada foi feito. Tente de novo." });
    }
    if (body.acao === "locadora_respondeu") {
      const { data: lead } = await admin.from("whatsapp_atendimento").select("*").eq("chave", chaveContato(body.telefone) || "-").maybeSingle();
      if (!lead || !["aguardando", "pergunta_dara", "com_dara"].includes(lead.status) || String(body.em || "") < new Date(lead.saudado_em).toISOString()) return json({ tratado: true });
      await admin.from("whatsapp_atendimento").update({ status: "humano", ultima_msg_em: new Date().toISOString() }).eq("id", lead.id);
      return json({ tratado: true, lead_id: lead.id, envios: ["com_dara", "pergunta_dara"].includes(lead.status) ? [{ telefone: await secret("dara_whatsapp"), texto: lead.status === "com_dara" ? `A conversa com ${rotulo(lead)} foi assumida pelo número da locadora. Não vou mais repassar.` : `Não precisa responder ${rotulo(lead)}: já foi atendido pelo número da locadora.` }] : [] });
    }
    if (body.acao === "atendimento_fila") {
      // só é chamada com o WhatsApp conectado (de 20 em 20 s): a checagem do banco usa isto para saber se está tudo certo
      await admin.from("app_settings").upsert({ key: "robo_vivo", value: { em: new Date().toISOString() }, updated_at: new Date().toISOString() });
      const dara = await secret("dara_whatsapp");
      if (!dara) return json({ chamadas: [] });
      // a Dara não respondeu à pergunta em 10 min: avisa o dono no app e no WhatsApp, uma vez
      const { data: semResposta } = await admin.from("whatsapp_atendimento").select("*").eq("status", "pergunta_dara").is("dono_avisado_em", null).lte("escalado_em", new Date(Date.now() - 10 * 60000).toISOString());
      const paraCliente: unknown[] = []; // a Dara não respondeu: agora a IA atende o cliente
      for (const l of semResposta ?? []) {
        const fala = (l.ia_respostas || 0) < IA_MAX ? await falaCliente(l.guardadas || [], l.chave) : null;
        await admin.from("whatsapp_atendimento").update({ dono_avisado_em: new Date().toISOString(), ...(fala ? { guardadas: [...(l.guardadas || []), `(Assistente respondeu: ${fala})`], ia_respostas: (l.ia_respostas || 0) + 1 } : {}) }).eq("id", l.id);
        if (fala) paraCliente.push({ id: l.id, jid: l.jid, telefone: l.telefone, segurar: true, textos: [fala] });
        await fetch(`${Deno.env.get("SUPABASE_URL")}/functions/v1/motora-push`, {
          method: "POST", headers: { "Content-Type": "application/json", "x-cron-token": (await secret("cron_token")) || "" },
          body: JSON.stringify({ type: "master_alert", title: `Dara ainda não respondeu ${rotulo(l)}`, body: `Passaram 10 minutos e a pessoa continua sem resposta. O que ela escreveu: ${(l.guardadas || []).join(" ").slice(0, 300) || "só arquivo ou áudio"}` }),
        }).catch(() => {});
      }
      const minDesconhecido = Number((cfg as { atendimento_min?: number }).atendimento_min ?? 3);
      const { data: leads } = await admin.from("whatsapp_atendimento").select("*").in("status", ["saudar", "aguardando"]).order("saudado_em").limit(30);
      // proteção contra bloqueio: o robô nunca escreve primeiro (status "saudar" não sai sozinho)
      const vencidos = (leads ?? []).filter((l) => l.status === "saudar" ? false : l.motorista ? Date.now() >= new Date(l.chamar_em || l.saudado_em).getTime() : Date.now() - new Date(l.saudado_em).getTime() >= minDesconhecido * 60000).slice(0, 5);
      return json({ chamadas: [...paraCliente, ...await Promise.all(vencidos.map(async (l) => l.status === "saudar" ? { id: l.id, telefone: l.telefone, textos: [saudacao(l.nome)] }
        : l.motorista ? await (async () => {
          const minutos = Math.max(1, Math.round((Date.now() - new Date(l.saudado_em).getTime()) / 60000)), mensagens = l.guardadas || [];
          return { id: l.id, telefone: dara, textos: [await avisoDara(textoDaraMotorista(l.nome, l.telefone, mensagens, minutos, l.urgencia), { motorista: true, nome: l.nome, fone: l.telefone, mensagens, minutos, urgente: l.urgencia === "urgente" })] };
        })()
        : await (async () => {
          const resumo = await resumoDe(l.guardadas || []);
          return { id: l.id, telefone: dara, segurar: true, textos: [await avisoDara(textoDara(l.telefone, resumo), { motorista: false, fone: l.telefone, resumo })] };
        })()))] });
    }
    if (body.acao === "atendimento_ok" && body.id) {
      // conversa iniciada pela locadora (status saudar): a saudação saiu, agora começa a contagem
      const { data: iniciada } = await admin.from("whatsapp_atendimento").update({ status: "aguardando", saudado_em: new Date().toISOString(), ultima_msg_em: new Date().toISOString() }).eq("id", body.id).eq("status", "saudar").select("id");
      if (iniciada?.length) return json({ ok: true });
      // motorista: a conversa já abre. Desconhecido: espera a Dara dizer SIM (as mensagens ficam guardadas até lá)
      const { data: lin } = await admin.from("whatsapp_atendimento").select("motorista").eq("id", body.id).maybeSingle();
      await admin.from("whatsapp_atendimento").update(lin?.motorista ? { status: "com_dara", escalado_em: new Date().toISOString(), guardadas: [] } : { status: "pergunta_dara", escalado_em: new Date().toISOString(), dono_avisado_em: null }).eq("id", body.id).eq("status", "aguardando");
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
      const calado = !!d.pix_extra?.devolucao; // em devolução o robô não responde nada ao motorista
      if (!ext) return json({ url: null, resposta: calado ? null : "Envie o comprovante como foto ou PDF." });
      const desde24 = new Date(Date.now() - 24 * 3600 * 1000).toISOString();
      const { count } = await admin.from("receipts").select("id", { count: "exact", head: true }).eq("driver_id", d.id).gte("created_at", desde24).like("file_path", "%/receipts/wa-%");
      if ((count ?? 0) >= 10) return json({ url: null, resposta: calado ? null : "Você já enviou muitos arquivos hoje. Se precisar, fale com a locadora." });
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
      return json({ resposta: d.pix_extra?.devolucao ? null : "✅ Recebemos seu comprovante. Ele será conferido e você será avisado." });
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
