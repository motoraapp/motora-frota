// MOTORA - preenche cor e ano dos carros que ainda não têm, lendo o CRLV-e guardado com a IA. Só chamada interna (cron_token).
import { createClient } from "npm:@supabase/supabase-js@2.45.4";
import { encodeBase64 } from "jsr:@std/encoding@1/base64";
import { tentarGemini } from "./gemini.ts";

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
const PROMPT = `Você vai receber o CRLV-e (documento de veículo brasileiro). Devolva SOMENTE um JSON (use null quando não encontrar; não invente): {"cor": string (cor predominante, ex: "Prata"), "ano_fabricacao": number, "ano_modelo": number, "placa": string (sem traço)}`;

Deno.serve(async (req) => {
  try {
    if (req.headers.get("x-cron-token") !== (await secret("cron_token"))) return json({ error: "proibido" }, 403);
    const key = await secret("gemini_key");
    if (!key) return json({ error: "sem chave do Gemini" }, 400);
    const modelo = (await secret("gemini_model")) || "gemini-flash-latest";
    const { data: carros } = await admin.from("vehicles").select("id, plate, crlv_path, color, year").is("deleted_at", null);
    const out: unknown[] = [];
    for (const v of carros ?? []) {
      if ((v.color && v.year) || !v.crlv_path) { out.push({ placa: v.plate, pulou: v.crlv_path ? "já preenchido" : "sem CRLV-e" }); continue; }
      try {
        const { data: arq, error } = await admin.storage.from("docs").download(v.crlv_path);
        if (error || !arq) throw new Error("arquivo não encontrado");
        let mime = arq.type || "";
        if (!mime || mime === "application/octet-stream") mime = /\.pdf$/i.test(v.crlv_path) ? "application/pdf" : "image/jpeg";
        const corpo = JSON.stringify({ contents: [{ role: "user", parts: [{ text: PROMPT }, { inline_data: { mime_type: mime, data: encodeBase64(new Uint8Array(await arq.arrayBuffer())) } }] }], generationConfig: { responseMimeType: "application/json", temperature: 0 } });
        const aceita = (j: unknown) => {
          // deno-lint-ignore no-explicit-any
          const t = (j as any)?.candidates?.[0]?.content?.parts?.map((p: { text?: string }) => p.text || "").join("") || "";
          try { const m = t.match(/\{[\s\S]*\}/); return JSON.parse(m ? m[0] : t); } catch { return null; }
        };
        const achou = await tentarGemini(key, modelo, corpo, aceita, 25000, 15000);
        if (!achou) throw new Error("a IA não leu");
        const r = achou.valor as { cor?: string; ano_fabricacao?: number; ano_modelo?: number; placa?: string };
        const norm = (s: unknown) => String(s ?? "").toUpperCase().replace(/[^A-Z0-9]/g, "");
        if (r.placa && norm(r.placa) !== norm(v.plate)) { out.push({ placa: v.plate, erro: "o CRLV-e é de outra placa", lida: r.placa }); continue; }
        const ano = [...new Set([r.ano_fabricacao, r.ano_modelo].filter(Boolean))].join("/");
        const cor = r.cor ? String(r.cor).trim().toLowerCase().replace(/^./, (c) => c.toUpperCase()) : null;
        await admin.from("vehicles").update({ color: v.color || cor, year: v.year || ano || null }).eq("id", v.id);
        out.push({ placa: v.plate, cor, ano });
      } catch (e) { out.push({ placa: v.plate, erro: String((e as Error).message || e) }); }
    }
    console.log("ler veiculos", JSON.stringify(out));
    return json({ ok: true, out });
  } catch (e) {
    console.error(e);
    return json({ ok: false, error: String(e) }, 500);
  }
});
