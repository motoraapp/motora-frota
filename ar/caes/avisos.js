// Avisos de fome e sede dos cachorros com o app fechado (Web Push), pela função ar-caes do Supabase.
// A permissão só é pedida depois de um toque (botão em Ajustes). No iPhone só funciona com o app na Tela de Início (iOS 16.4+).
// Usa o mesmo service worker (sw.js) e a mesma chave de notificação dos outros avisos do Nossa casinha.
export const BACKEND = 'https://epswrtcwszhbapaxdpzz.supabase.co/functions/v1/ar-caes';

let pegarToken = async () => null; // o app entrega o login: usarLogin(async () => (await sb.auth.getSession()).data.session?.access_token)
export function usarLogin(f) { pegarToken = f; }

async function chamar(acao, corpo = {}) {
  const t = await pegarToken();
  const r = await fetch(BACKEND, { method: 'POST', headers: { 'Content-Type': 'application/json', ...(t ? { Authorization: 'Bearer ' + t } : {}) }, body: JSON.stringify({ acao, ...corpo }) });
  return r.json().catch(() => ({ error: 'resposta' }));
}
const b64 = (s) => { const b = atob((s + '='.repeat((4 - (s.length % 4)) % 4)).replace(/-/g, '+').replace(/_/g, '/')); return Uint8Array.from(b, (c) => c.charCodeAt(0)); };

export const ehIOS = () => /iPad|iPhone|iPod/.test(navigator.userAgent) || (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1);
export const instalado = () => matchMedia('(display-mode: standalone)').matches || navigator.standalone === true;
const suporta = () => 'serviceWorker' in navigator && 'PushManager' in window && 'Notification' in window;

async function inscricao() { try { const reg = await navigator.serviceWorker.getRegistration('./'); return reg ? await reg.pushManager.getSubscription() : null; } catch { return null; } }

// 'instalar' | 'sem-suporte' | 'negado' | 'ativo' | 'desligado'
export async function situacao() {
  if (!suporta()) return ehIOS() && !instalado() ? 'instalar' : 'sem-suporte';
  if (Notification.permission === 'denied') return 'negado';
  const sub = await inscricao();
  return sub && localStorage.getItem('casinha_caes_av') === '1' ? 'ativo' : 'desligado';
}

// chamar SÓ dentro do toque no botão (o iPhone só pergunta logo depois do toque)
export async function ativar(resumo) {
  if (ehIOS() && !instalado()) return { ok: false, motivo: 'instalar' };
  if (!suporta()) return { ok: false, motivo: 'sem-suporte' };
  const perm = Notification.permission === 'granted' ? 'granted' : await Notification.requestPermission();
  if (perm !== 'granted') return { ok: false, motivo: 'negado' };
  const reg = await navigator.serviceWorker.register('sw.js', { scope: './' }); await navigator.serviceWorker.ready;
  let sub = await reg.pushManager.getSubscription();
  if (!sub) {
    const { publica } = await chamar('vapid');
    if (!publica) return { ok: false, motivo: 'servidor' };
    sub = await reg.pushManager.subscribe({ userVisibleOnly: true, applicationServerKey: b64(publica) });
  }
  const r = await chamar('assinar', { sub: sub.toJSON(), cachorros: resumo, tz: Intl.DateTimeFormat().resolvedOptions().timeZone });
  if (!r.ok) return { ok: false, motivo: 'servidor' };
  localStorage.setItem('casinha_caes_av', '1');
  return { ok: true };
}
export async function desativar() { const e = (await inscricao())?.endpoint; localStorage.setItem('casinha_caes_av', '0'); if (e) await chamar('apagar', { endpoint: e }); }

// a cada comida/água: manda o nível de cada cachorro e o horário
export async function enviarEstado(resumo) { if (localStorage.getItem('casinha_caes_av') !== '1') return; const e = (await inscricao())?.endpoint; if (e) chamar('estado', { endpoint: e, cachorros: resumo }).catch(() => {}); }
export async function pushTeste() { const e = (await inscricao())?.endpoint; return e ? chamar('teste', { endpoint: e }) : { error: 'Ative os avisos primeiro' }; }
