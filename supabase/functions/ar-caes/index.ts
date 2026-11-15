// Avisos de fome e sede dos cachorros do "Nossa casinha" (15/11/2026). verify_jwt: false (a função confere o login ou o token do cron).
//  - app (login do dono, header Authorization): {acao:'vapid'} | 'assinar' {sub, cachorros, tz} | 'estado' {endpoint, cachorros} | 'teste' {endpoint} | 'apagar' {endpoint}
//  - cron `ar-caes` a cada 15 min (x-cron-token): {acao:'rodar'} -> calcula fome/sede pelo tempo e manda o push (regras em logica.js, testadas)
// Chaves de notificação: as mesmas do MOTORA (app_secrets vapid_public/vapid_private). Tabela: public.ar_caes_push (SQL supabase/2026-11-15-ar-caes.sql).
import webpush from 'npm:web-push@3.6.7';
import { createClient } from 'npm:@supabase/supabase-js@2.45.4';
import { calcularAviso } from './logica.js';

const db = createClient(Deno.env.get('SUPABASE_URL')!, Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!, { auth: { persistSession: false } });
const cors = { 'Access-Control-Allow-Origin': '*', 'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type, x-cron-token' };
const json = (o: unknown, status = 200) => new Response(JSON.stringify(o), { status, headers: { ...cors, 'Content-Type': 'application/json' } });
async function secret(k: string) { const { data } = await db.from('app_secrets').select('value').eq('key', k).maybeSingle(); return data?.value ?? null; }

type Linha = { endpoint: string; p256dh: string; auth: string; tz: string; cachorros: unknown[]; avisos: Record<string, number> };
const limpar = (l: unknown) => (Array.isArray(l) ? l.slice(0, 6).map((c: any) => ({ id: String(c?.id || '').slice(0, 24), nome: String(c?.nome || '').slice(0, 24), artigo: c?.artigo === 'a' ? 'a' : 'o', fome: Number(c?.fome) || 0, sede: Number(c?.sede) || 0, em: Number(c?.em) || Date.now() })) : []);

async function configurar() {
  const pub = await secret('vapid_public'), priv = await secret('vapid_private');
  if (!pub || !priv) return null;
  webpush.setVapidDetails('https://motoraapp.github.io/motora-frota/ar/', pub, priv);
  return pub as string;
}
async function enviar(l: Linha, msg: { titulo: string; corpo: string; url: string }) {
  try {
    await webpush.sendNotification({ endpoint: l.endpoint, keys: { p256dh: l.p256dh, auth: l.auth } }, JSON.stringify({ title: msg.titulo, body: msg.corpo, url: msg.url, tag: 'caes' }), { TTL: 3600 });
    return true;
  } catch (e) {
    const code = (e as { statusCode?: number }).statusCode;
    if (code === 404 || code === 410) await db.from('ar_caes_push').delete().eq('endpoint', l.endpoint);
    else console.error('aviso dos cachorros falhou', code, String(e));
    return false;
  }
}

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') return new Response('ok', { headers: cors });
  const b = await req.json().catch(() => ({})) as Record<string, any>;
  const pub = await configurar();
  if (!pub) return json({ error: 'sem chaves' }, 500);

  const tok = req.headers.get('x-cron-token');
  if (tok) {
    if (tok !== (await secret('cron_token')) || b.acao !== 'rodar') return json({ error: 'proibido' }, 403);
    const { data } = await db.from('ar_caes_push').select('*').limit(200);
    const agora = Date.now();
    let n = 0;
    for (const l of (data ?? []) as Linha[]) {
      const msg = calcularAviso(l.cachorros as any, l.avisos, agora, l.tz);
      if (!msg || !(await enviar(l, msg))) continue;
      n++;
      const avisos = { ...(l.avisos || {}) };
      for (const k of msg.marcar) avisos[k] = agora;
      await db.from('ar_caes_push').update({ avisos }).eq('endpoint', l.endpoint);
    }
    return json({ enviados: n });
  }

  // do app: só quem está logado (a chave pública não é segredo, mas segue o mesmo caminho)
  const jwt = (req.headers.get('authorization') || '').replace(/^Bearer /i, '');
  const { data: u } = jwt ? await db.auth.getUser(jwt) : { data: null };
  if (!u?.user) return json({ error: 'login' }, 401);
  if (b.acao === 'vapid') return json({ publica: pub });
  if (b.acao === 'assinar') {
    const s = b.sub;
    if (!/^https:\/\//.test(s?.endpoint || '') || !s.keys?.p256dh || !s.keys?.auth) return json({ error: 'assinatura' }, 400);
    const { count } = await db.from('ar_caes_push').select('endpoint', { count: 'exact', head: true });
    if ((count ?? 0) >= 50) return json({ error: 'limite' }, 429);
    const { error } = await db.from('ar_caes_push').upsert({ endpoint: s.endpoint, p256dh: s.keys.p256dh, auth: s.keys.auth, tz: String(b.tz || 'America/Sao_Paulo').slice(0, 64), cachorros: limpar(b.cachorros), atualizado_em: new Date().toISOString() });
    return json(error ? { error: error.message } : { ok: true }, error ? 500 : 200);
  }
  const endpoint = String(b.endpoint || '');
  if (b.acao === 'estado') {
    const { data, error } = await db.from('ar_caes_push').update({ cachorros: limpar(b.cachorros), atualizado_em: new Date().toISOString() }).eq('endpoint', endpoint).select('endpoint');
    return json(error ? { error: error.message } : { ok: !!data?.length });
  }
  if (b.acao === 'apagar') { await db.from('ar_caes_push').delete().eq('endpoint', endpoint); return json({ ok: true }); }
  if (b.acao === 'teste') {
    const { data } = await db.from('ar_caes_push').select('*').eq('endpoint', endpoint).maybeSingle();
    if (!data) return json({ error: 'sem assinatura' }, 404);
    return json({ ok: await enviar(data as Linha, { titulo: 'Nossa casinha', corpo: 'Teste: os cachorros vão te chamar assim 🐶', url: './?jogo=1' }) });
  }
  return json({ error: 'acao' }, 400);
});
