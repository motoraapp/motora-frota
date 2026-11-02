// MOTORA - ponte entre o app e o ROBÔ DO WHATSAPP que fica no computador do dono.
// O robô só DISPARA mensagens (não lê nem responde ninguém). Quem escreve as mensagens é a IA (Gemini)
// na função motora-push, com a chave já cadastrada; elas ficam na tabela whatsapp_queue.
// O robô usa só a chave "robo_token" (não tem acesso ao banco).
//   acao "pendentes": devolve até 5 mensagens para enviar (só se o envio automático estiver ligado)
//   acao "enviada":   marca a mensagem como enviada
//   acao "falhou":    avisa o dono que uma mensagem não foi (ela continua no botão Enviar da Área IA)
import { createClient } from "npm:@supabase/supabase-js@2.45.4";

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
      if (!cfg.ativo) return json({ ativo: false, mensagens: [] });
      const desde = cfg.ativado_em || new Date().toISOString();
      const { data: fila } = await admin.from("whatsapp_queue").select("id, driver_id, title, message, created_at")
        .eq("status", "pendente").gte("created_at", desde).order("created_at").limit(5);
      const ids = [...new Set((fila ?? []).map((m) => m.driver_id))];
      const { data: pessoas } = ids.length ? await admin.from("profiles").select("id, name, phone, phone2, role").in("id", ids) : { data: [] };
      const mensagens = (fila ?? []).map((m) => {
        const p = (pessoas ?? []).find((x) => x.id === m.driver_id);
        return { id: m.id, nome: p?.name || "", telefones: [p?.phone, p?.phone2].filter(Boolean), texto: m.message, excluido: p?.role === "excluido" };
      }).filter((m) => !m.excluido);
      return json({ ativo: true, mensagens });
    }

    if (body.acao === "enviada" && body.id) {
      await admin.from("whatsapp_queue").update({ status: "enviada", sent_at: new Date().toISOString() }).eq("id", body.id).eq("status", "pendente");
      return json({ ok: true });
    }

    if (body.acao === "falhou" && body.id) {
      const { data: m } = await admin.from("whatsapp_queue").select("title, driver_id").eq("id", body.id).maybeSingle();
      const { data: p } = m ? await admin.from("profiles").select("name").eq("id", m.driver_id).maybeSingle() : { data: null };
      await fetch(`${Deno.env.get("SUPABASE_URL")}/functions/v1/motora-push`, {
        method: "POST", headers: { "Content-Type": "application/json", "x-cron-token": (await secret("cron_token")) || "" },
        body: JSON.stringify({ type: "master_alert", title: `Robô não enviou para ${p?.name || "o motorista"}`, body: `${String(body.erro || "").slice(0, 120)} Toque para enviar pela Área IA.`, url: `/?abrir=ia&msg=${body.id}` }),
      }).catch(() => {});
      return json({ ok: true });
    }
    // QR code para conectar o WhatsApp: o robô manda, o app mostra na Área IA (no Hostless não tem tela)
    if (body.acao === "qr") {
      const v = { ...cfg, qr: body.qr || null, conectado: !body.qr, visto_em: new Date().toISOString() };
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
