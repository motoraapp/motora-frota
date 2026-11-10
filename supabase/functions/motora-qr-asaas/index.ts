// MOTORA - guarda na pasta do motorista a imagem de um QR code criado pelo Asaas. Só chamada interna do banco.
import { createClient } from "npm:@supabase/supabase-js@2.45.4";
import { decodeBase64 } from "jsr:@std/encoding@1/base64";

function serviceKey() {
  const legacy = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY");
  if (legacy) return legacy;
  try { const keys = JSON.parse(Deno.env.get("SUPABASE_SECRET_KEYS") || "{}"); return keys.default || Object.values(keys)[0]; } catch { return ""; }
}
const admin = createClient(Deno.env.get("SUPABASE_URL")!, serviceKey() as string, { auth: { persistSession: false } });
const json = (b: unknown, s = 200) => new Response(JSON.stringify(b), { status: s, headers: { "Content-Type": "application/json" } });

Deno.serve(async (req) => {
  try {
    const tok = req.headers.get("x-cron-token");
    const { data } = await admin.from("app_secrets").select("value").eq("key", "cron_token").maybeSingle();
    if (!tok || tok !== data?.value) return json({ error: "proibido" }, 403);
    const b = await req.json();
    if (!/^[0-9a-f-]{36}$/.test(String(b.driver_id)) || !b.b64) return json({ error: "dados inválidos" }, 400);
    const path = `${b.driver_id}/pix-qr-asaas-${Date.now()}.png`;
    const up = await admin.storage.from("docs").upload(path, decodeBase64(String(b.b64)), { contentType: "image/png", upsert: true });
    if (up.error) return json({ error: up.error.message }, 500);
    return json({ qr_salvo: path });
  } catch (e) {
    return json({ error: String(e) }, 500);
  }
});
