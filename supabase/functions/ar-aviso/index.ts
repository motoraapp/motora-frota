// Avisos do "Nossa casinha" no celular (14/11/2026; desde 15/11/2026 também leva a temperatura de lá fora à placa). Só vai para os celulares que ativaram os avisos no próprio app
// (ar.push), nunca para o MOTORA. Duas entradas:
//  - gatilhos do banco (x-cron-token): {device_id, title, body}  -> ar ligado/desligado pelo automático, quarto quente
//  - o app (login do dono): {teste: true}                       -> aviso de teste para conferir
// Chaves de notificação: as mesmas do MOTORA (app_secrets vapid_public/vapid_private). verify_jwt: false.
import webpush from 'npm:web-push@3.6.7';
import { createClient } from 'npm:@supabase/supabase-js@2.45.4';

const admin = createClient(Deno.env.get('SUPABASE_URL')!, Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!, { auth: { persistSession: false } });
const cors = { 'Access-Control-Allow-Origin': '*', 'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type' };
const json = (o: unknown, status = 200) => new Response(JSON.stringify(o), { status, headers: { ...cors, 'Content-Type': 'application/json' } });
async function secret(k: string) { const { data } = await admin.from('app_secrets').select('value').eq('key', k).maybeSingle(); return data?.value ?? null; }

async function mandar(device: string, payload: { title: string; body: string; url: string }) {
  const pub = await secret('vapid_public'), priv = await secret('vapid_private');
  if (!pub || !priv) return 0;
  webpush.setVapidDetails('https://motoraapp.github.io/motora-frota/ar/', pub, priv);
  const { data: subs } = await admin.rpc('ar_push_lista', { p_device: device });
  let n = 0;
  for (const s of (subs ?? []) as { endpoint: string; p256dh: string; auth: string }[]) {
    try { await webpush.sendNotification({ endpoint: s.endpoint, keys: { p256dh: s.p256dh, auth: s.auth } }, JSON.stringify(payload), { TTL: 3600 }); n++; }
    catch (e) {
      const code = (e as { statusCode?: number }).statusCode;
      if (code === 404 || code === 410) await admin.rpc('ar_push_apagar', { p_endpoint: s.endpoint });
      else console.error('aviso falhou', code, String(e));
    }
  }
  return n;
}

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') return new Response('ok', { headers: cors });
  const corpo = await req.json().catch(() => ({})) as Record<string, unknown>;
  const tok = req.headers.get('x-cron-token');
  if (tok) {
    if (tok !== (await secret('cron_token'))) return json({ error: 'proibido' }, 403);
    // {tempo: true} (cron ar-tempo, a cada 15 min): temperatura de lá fora agora em Trindade-GO (Open-Meteo, sem chave)
    // vai para a placa como comando {fora: 21.3} (versão 20: lá fora mais frio = o automático não liga e pede a janela).
    if (corpo.tempo) {
      const r = await fetch('https://api.open-meteo.com/v1/forecast?latitude=-16.66&longitude=-49.5&current=temperature_2m&timezone=America%2FSao_Paulo');
      const t = Number((await r.json().catch(() => ({})))?.current?.temperature_2m);
      if (!r.ok || !Number.isFinite(t)) return json({ error: 'tempo' }, 502);
      const { error } = await admin.rpc('ar_fora_gravar', { p_t: t });
      return json(error ? { error: error.message } : { fora: t }, error ? 500 : 200);
    }
    const device = String(corpo.device_id || '');
    if (!/^[0-9a-f]{16}$/.test(device)) return json({ error: 'placa' }, 400);
    return json({ sent: await mandar(device, { title: String(corpo.title || 'Nossa casinha').slice(0, 80), body: String(corpo.body || '').slice(0, 200), url: './' }) });
  }
  // teste pelo app: precisa do login do dono
  const jwt = (req.headers.get('authorization') || '').replace(/^Bearer /i, '');
  const { data: u } = await admin.auth.getUser(jwt);
  if (!u?.user) return json({ error: 'login' }, 401);
  const doDono = createClient(Deno.env.get('SUPABASE_URL')!, Deno.env.get('SUPABASE_ANON_KEY')!, { global: { headers: { Authorization: 'Bearer ' + jwt } }, auth: { persistSession: false } });
  const { data: devs } = await doDono.rpc('ar_status');
  const dev = Array.isArray(devs) ? devs[0] : null;
  if (!dev) return json({ error: 'sem placa' }, 404);
  return json({ sent: await mandar(dev.id, { title: 'Nossa casinha', body: 'Avisos ativados neste celular.', url: './' }) });
});
