// MOTORA - backup diário (00:00 de Brasília, chamado pelo cron "motora-backup-diario")
// Copia todas as tabelas do app para um arquivo .json e guarda:
//   1) na pasta privada "backups" do Supabase (os últimos 30 dias)
//   2) no Google Drive do dono, pasta "Backups MOTORA" (pelo mesmo script do Google já usado para os documentos)
// Os documentos e fotos (CNH, comprovantes, vistoria...) já vão sozinhos para o Drive; aqui vão os DADOS.
// A tabela app_secrets (chaves secretas) NUNCA entra no backup.
import { createClient } from "npm:@supabase/supabase-js@2.45.4";
import { encodeBase64 } from "jsr:@std/encoding@1/base64";

function serviceKey() {
  const legacy = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY");
  if (legacy) return legacy;
  try { const keys = JSON.parse(Deno.env.get("SUPABASE_SECRET_KEYS") || "{}"); return keys.default || Object.values(keys)[0]; } catch { return ""; }
}
const admin = createClient(Deno.env.get("SUPABASE_URL")!, serviceKey() as string, { auth: { persistSession: false } });
const json = (b: unknown, s = 200) => new Response(JSON.stringify(b), { status: s, headers: { "Content-Type": "application/json" } });

const TABELAS = [
  "profiles", "vehicles", "pix_history", "receipts", "inspection_photos", "vehicle_expenses", "expense_types",
  "app_earnings", "app_expenses", "app_days_off", "app_settings", "terms_acceptances", "whatsapp_queue",
];
const GUARDAR_DIAS = 30;

async function secret(key: string) {
  const { data } = await admin.from("app_secrets").select("value").eq("key", key).maybeSingle();
  return data?.value ?? null;
}

async function lerTabela(nome: string) {
  const linhas: unknown[] = [];
  for (let de = 0; ; de += 1000) {
    const { data, error } = await admin.from(nome).select("*").range(de, de + 999);
    if (error) return { erro: error.message, linhas };
    linhas.push(...(data ?? []));
    if (!data || data.length < 1000) break;
  }
  return { linhas };
}

Deno.serve(async (req) => {
  try {
    if (req.headers.get("x-cron-token") !== (await secret("cron_token"))) return json({ error: "proibido" }, 403);
    const dia = new Date().toLocaleDateString("sv-SE", { timeZone: "America/Sao_Paulo" }); // AAAA-MM-DD
    const backup: Record<string, unknown> = { app: "MOTORA", criado_em: new Date().toISOString(), tabelas: {} };
    const resumo: Record<string, number | string> = {};
    for (const t of TABELAS) {
      const r = await lerTabela(t);
      (backup.tabelas as Record<string, unknown>)[t] = r.linhas;
      resumo[t] = r.erro ? "erro: " + r.erro : r.linhas.length;
    }
    // lista de arquivos guardados (documentos e fotos), para saber o que existia no dia
    const { data: arquivos } = await admin.schema("storage").from("objects").select("name, created_at, metadata").eq("bucket_id", "docs").limit(20000);
    backup.arquivos = (arquivos ?? []).map((a) => ({ caminho: a.name, criado_em: a.created_at, tamanho: (a.metadata as { size?: number } | null)?.size ?? null }));

    const texto = JSON.stringify(backup);
    const bytes = new TextEncoder().encode(texto);
    const nome = `motora-backup-${dia}.json`;

    // 1) Supabase (pasta privada "backups")
    const up = await admin.storage.from("backups").upload(nome, bytes, { contentType: "application/json", upsert: true });

    // apaga os mais antigos que 30 dias (no Drive eles continuam)
    const { data: lista } = await admin.storage.from("backups").list("", { limit: 1000 });
    const limite = new Date(Date.now() - GUARDAR_DIAS * 86400000).toISOString().slice(0, 10);
    const velhos = (lista ?? []).map((f) => f.name).filter((n) => /^motora-backup-\d{4}-\d{2}-\d{2}\.json$/.test(n) && n.slice(14, 24) < limite);
    if (velhos.length) await admin.storage.from("backups").remove(velhos);

    // 2) Google Drive
    let drive: unknown = { ok: false, error: "Google Drive não configurado" };
    const url = await secret("drive_url");
    if (url) {
      try {
        const r = await fetch(url, {
          method: "POST", headers: { "Content-Type": "text/plain;charset=utf-8" }, redirect: "follow",
          body: JSON.stringify({ action: "file", driverId: "backup-motora", driverName: "Backups MOTORA", folder: "Banco de dados", fileName: nome, mimeType: "application/json", base64: encodeBase64(bytes) }),
        });
        drive = JSON.parse(await r.text());
      } catch (e) { drive = { ok: false, error: String(e) }; }
    }

    // avisa o dono só se der problema
    const falhou = !!up.error || (drive as { ok?: boolean }).ok === false;
    if (falhou) {
      try {
        await fetch(`${Deno.env.get("SUPABASE_URL")}/functions/v1/motora-push`, {
          method: "POST", headers: { "Content-Type": "application/json", "x-cron-token": (await secret("cron_token")) || "" },
          body: JSON.stringify({ type: "master_alert", title: "Backup do MOTORA com problema", body: up.error ? "Não consegui guardar o backup de hoje no Supabase." : "O backup ficou no Supabase, mas não foi para o Google Drive.", url: "/" }),
        });
      } catch (_) { /* nada */ }
    }
    const out = { ok: !up.error, arquivo: nome, tamanho_kb: Math.round(bytes.length / 1024), tabelas: resumo, apagados: velhos.length, drive };
    console.log("backup", JSON.stringify(out));
    return json(out);
  } catch (e) {
    console.error(e);
    return json({ ok: false, error: String(e) }, 500);
  }
});
