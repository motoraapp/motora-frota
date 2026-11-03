// MOTORA - a IA do dono muda a tela do app só por aqui, com três travas:
// 1) só o index.html; 2) depois do SIM vai para uma cópia de teste, que não enxerga os dados reais (pages.yml);
// 3) só vai para o app de verdade com PUBLICAR + palavra secreta, conferida aqui. Chamada só pelo motora-dono (cron_token).
import { createClient } from "npm:@supabase/supabase-js@2.45.4";
import { encodeBase64 } from "jsr:@std/encoding@1/base64";

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
const guarda = (key: string, value: string) => admin.from("app_secrets").upsert({ key, value });
const REPO = "https://api.github.com/repos/motoraapp/motora-frota", RAW = "https://raw.githubusercontent.com/motoraapp/motora-frota", ARQ = "index.html", RAMO = "teste-ia";
export const LINK_TESTE = "https://motoraapp.github.io/motora-frota/teste/?demo=dono";

async function gh(token: string, caminho: string, metodo = "GET", corpo?: unknown) {
  const r = await fetch(REPO + caminho, { method: metodo, headers: { authorization: `Bearer ${token}`, accept: "application/vnd.github+json", "x-github-api-version": "2022-11-28", "user-agent": "motora" }, body: corpo ? JSON.stringify(corpo) : undefined, signal: AbortSignal.timeout(30000) });
  const t = await r.text(); let d: Record<string, any> = {}; try { d = t ? JSON.parse(t) : {}; } catch { /* sem corpo */ }
  return { ok: r.ok, status: r.status, d };
}
const shaArq = async (token: string, ref: string) => (await gh(token, `/contents/${ARQ}?ref=${ref}`)).d.sha as string;
const textoEm = async (ref: string) => { const r = await fetch(`${RAW}/${ref}/${ARQ}?x=${Date.now()}`, { signal: AbortSignal.timeout(20000) }); if (!r.ok) throw new Error("não consegui ler o app"); return await r.text(); };
const b64 = (s: string) => encodeBase64(new TextEncoder().encode(s));
const autor = { name: "IA do dono", email: "noreply@motora.app" };

// cada trecho precisa existir exatamente uma vez, e o resultado precisa continuar sendo um programa válido
function aplica(texto: string, trocas: { de: string; para: string }[]) {
  let t = texto;
  for (const x of trocas) {
    const de = String(x.de ?? ""); if (!de) throw new Error("trecho vazio");
    const n = t.split(de).length - 1;
    if (n !== 1) throw new Error(`trecho encontrado ${n} vezes, precisa ser 1: ${de.slice(0, 80)}`);
    t = t.replace(de, () => String(x.para ?? ""));
  }
  for (const m of t.matchAll(/<script(?![^>]*\bsrc=)[^>]*>([\s\S]*?)<\/script>/gi)) {
    try { new Function(m[1]); } catch (e) { if (e instanceof SyntaxError) throw new Error("a mudança deixaria o app com erro: " + e.message); }
  }
  return t;
}
async function palavraCerta(palavra: string) {
  const bloq = JSON.parse((await secret("dono_palavra_erros")) || "{}");
  if (bloq.ate && Date.now() < bloq.ate) return { erro: "Muitas tentativas erradas. Bloqueado por 1 hora." };
  const sal = await secret("dono_palavra_sal"), hash = await secret("dono_palavra_hash");
  if (!sal || !hash) return { erro: "A palavra secreta ainda não foi cadastrada. Cadastre em Ajustes, no app." };
  const dig = await crypto.subtle.digest("SHA-256", new TextEncoder().encode(sal + palavra));
  const hex = [...new Uint8Array(dig)].map((b) => b.toString(16).padStart(2, "0")).join("");
  if (hex !== hash) {
    const n = (bloq.n || 0) + 1;
    await guarda("dono_palavra_erros", JSON.stringify(n >= 5 ? { n: 0, ate: Date.now() + 3600000 } : { n }));
    return { erro: "Palavra secreta errada. Nada foi feito." };
  }
  await guarda("dono_palavra_erros", "{}");
  return { ok: true };
}

Deno.serve(async (req) => {
  try {
    if (req.headers.get("x-cron-token") !== (await secret("cron_token"))) return json({ error: "proibido" }, 403);
    const b = await req.json().catch(() => ({}));
    if (b.acao === "buscar") {
      const q = String(b.texto || "").toLowerCase(); if (q.length < 3) return json({ erro: "Busque ao menos 3 letras." });
      const achados = (await textoEm("main")).split("\n").flatMap((l, i) => l.toLowerCase().includes(q) ? [{ linha: i + 1, texto: l.trim().slice(0, 200) }] : []);
      return json({ total: achados.length, achados: achados.slice(0, 25) });
    }
    if (b.acao === "ler") {
      const ini = Math.max(1, Number(b.linha) || 1), qtd = Math.min(Number(b.quantidade) || 40, 120);
      return json({ codigo: (await textoEm("main")).split("\n").slice(ini - 1, ini - 1 + qtd).map((l, i) => `${ini + i}: ${l}`).join("\n").slice(0, 25000) });
    }
    if (b.acao === "validar") { aplica(await textoEm("main"), b.trocas || []); return json({ ok: true }); }

    const token = await secret("github_token_ia");
    if (!token) return json({ erro: "A chave do GitHub ainda não foi cadastrada. Cadastre em Ajustes, no app." });
    if (b.acao === "preparar") {
      const main = await gh(token, "/git/ref/heads/main"); if (!main.ok) return json({ erro: "O GitHub recusou a chave." });
      const sha = main.d.object.sha as string, novo = aplica(await textoEm(sha), b.trocas || []);
      await gh(token, `/git/refs/heads/${RAMO}`, "DELETE"); // só existe uma mudança em teste por vez
      const cria = await gh(token, "/git/refs", "POST", { ref: `refs/heads/${RAMO}`, sha }); if (!cria.ok) return json({ erro: "Não consegui criar a cópia de teste." });
      const put = await gh(token, `/contents/${ARQ}`, "PUT", { message: `IA do dono (teste): ${String(b.explicacao || "").slice(0, 100)}`, content: b64(novo), sha: await shaArq(token, RAMO), branch: RAMO, author: autor, committer: autor });
      if (!put.ok) return json({ erro: "Não consegui gravar a cópia de teste." });
      await guarda("codigo_explicacao", String(b.explicacao || "").slice(0, 500));
      const pub = await gh(token, "/actions/workflows/pages.yml/dispatches", "POST", { ref: "main" });
      return json(pub.ok ? { ok: true, link: LINK_TESTE } : { erro: "A cópia foi gravada, mas não consegui publicar o teste." });
    }
    if (b.acao === "publicar" || b.acao === "desfazer") {
      const p = await palavraCerta(String(b.palavra || "")); if (p.erro) return json({ erro: p.erro });
      const main = await gh(token, "/git/ref/heads/main"); if (!main.ok) return json({ erro: "O GitHub recusou a chave." });
      if (b.acao === "publicar") {
        if (!(await gh(token, `/git/ref/heads/${RAMO}`)).ok) return json({ erro: "Não há nenhuma mudança em teste para publicar." });
        const m = await gh(token, "/merges", "POST", { base: "main", head: RAMO, commit_message: `IA do dono: ${(await secret("codigo_explicacao")) || "mudança no app"}` });
        if (!m.ok) return json({ erro: "O app mudou depois do teste e as mudanças não se encaixam. Peça a mudança de novo." });
        await guarda("codigo_antes_sha", main.d.object.sha);
        await gh(token, `/git/refs/heads/${RAMO}`, "DELETE");
        return json({ ok: true, texto: "✅ Publicado no app. Em cerca de 2 minutos já vale para todos. Se der problema, responda DESFAZER e a palavra secreta." });
      }
      const antes = await secret("codigo_antes_sha"); if (!antes) return json({ erro: "Não há publicação para desfazer." });
      const put = await gh(token, `/contents/${ARQ}`, "PUT", { message: "IA do dono: desfaz a última mudança", content: b64(await textoEm(antes)), sha: await shaArq(token, "main"), branch: "main", author: autor, committer: autor });
      if (!put.ok) return json({ erro: "Não consegui desfazer. Fale com o suporte." });
      await guarda("codigo_antes_sha", "");
      return json({ ok: true, texto: "↩️ Desfeito. Em cerca de 2 minutos o app volta a ser como antes." });
    }
    return json({ erro: "ação desconhecida" }, 400);
  } catch (e) {
    console.error("motora-codigo", String(e));
    return json({ erro: String((e as Error).message || e).slice(0, 200) });
  }
});
