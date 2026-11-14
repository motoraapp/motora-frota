// Siri do "Nossa casinha": o atalho do iPhone manda {chave, texto}; a resposta é um texto curto que a Siri fala.
// Sem login: vale a chave da Siri criada no app (só o hash fica no banco). verify_jwt: false.
import { createClient } from 'npm:@supabase/supabase-js@2';
import { entender } from './frase.js';

const texto = (t: string, status = 200) => new Response(t, { status, headers: { 'Content-Type': 'text/plain; charset=utf-8' } });
const CHAVE_RUIM = 'A chave da Siri não vale mais. Crie outra no app Nossa casinha, em Ajustes, e troque no atalho.';

Deno.serve(async (req: Request) => {
  if (req.method !== 'POST') return texto('Use o atalho da Siri.', 405);
  let corpo: { chave?: unknown; texto?: unknown };
  try { corpo = await req.json(); } catch { return texto('Não entendi o pedido do atalho.', 400); }
  const chave = String(corpo.chave ?? '').trim().toLowerCase();
  const frase = String(corpo.texto ?? '').slice(0, 200);
  if (!/^[0-9a-f]{32}$/.test(chave)) return texto(CHAVE_RUIM, 401);

  const sb = createClient(Deno.env.get('SUPABASE_URL')!, Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!);
  const { data: dev, error } = await sb.rpc('ar_siri_dispositivo', { p_chave: chave });
  if (error) return texto('O servidor não respondeu. Tente de novo.', 500);
  if (!dev) return texto(CHAVE_RUIM, 401);

  const r = entender(frase, dev.state || {});
  if (!r.cmds.length) return texto(r.resposta);
  const { error: e2 } = await sb.rpc('ar_siri_mandar', { p_chave: chave, p_cmds: r.cmds });
  if (e2) return texto(/muitos/.test(e2.message) ? 'Muitos comandos seguidos. Espere um pouco.' : 'Não consegui mandar agora. Tente de novo.');
  return texto(r.resposta + (dev.online ? '' : ' A placa está sem sinal agora; o pedido vale por 1 minuto.'));
});
