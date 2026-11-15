// Liga os cachorros (Elvis, Belinha e Maya) no Nossa casinha e cuida dos botões em Ajustes. Só depois do login.
import { iniciarCachorros } from './dogs3d.js';
import * as avisos from './avisos.js';

const $ = (id) => document.getElementById(id);
const lerLS = (k) => { try { return localStorage.getItem(k); } catch { return null; } };
const gravarLS = (k, v) => { try { localStorage.setItem(k, v); } catch {} };
const glob = (f, vazio) => { try { return f(); } catch { return vazio; } }; // S, FR, DEV e sb são do script principal do app
let caes = null;

avisos.usarLogin(async () => { try { return (await sb.auth.getSession()).data.session?.access_token; } catch { return null; } });

function ambiente() {
  return glob(() => ({
    fora: FR && FR.agora ? +FR.agora.t : NaN, // temperatura de lá fora medida (aeroporto de Goiânia)
    quarto: S.sala ? +S.sala.t : NaN,         // sensor do quarto
    arLigado: !!S.power, modo: S.mode === 1 ? 'frio' : 'outro', alvo: S.temp,
  }), {});
}

function ligar() {
  if (caes) return;
  caes = iniciarCachorros({
    getAmbiente: ambiente,
    seletorPegar: '.clima button, #m button, #f button, #x button, #mimi', // botões que os cachorros podem puxar (nunca são acionados)
    seletorAr: '#p',                                                        // bloco do ar: no calor, eles vão para perto
    aoAlimentar: (resumo) => avisos.enviarEstado(resumo),
  });
  document.body.classList.add('com-caes');
  window.caes = caes;
  if (new URLSearchParams(location.search).has('jogo')) setTimeout(() => caes && caes.destacarJogo(), 600);
}
function desligar() { if (!caes) return; caes.destruir(); caes = null; window.caes = null; document.body.classList.remove('com-caes'); }

// só depois do login (DEV = a placa do dono já carregou)
const espera = setInterval(() => { if (glob(() => !!DEV, false)) { clearInterval(espera); if (lerLS('casinha_caes_off') !== '1') ligar(); pintar(); } }, 500);

navigator.serviceWorker?.addEventListener('message', (e) => { if (e.data && e.data.jogo && caes) caes.destacarJogo(); });

// ---- botões em Ajustes ----
const TXT = {
  ativo: 'Ligado neste celular: avisa quando o Elvis, a Belinha ou a Maya ficarem com fome ou sede (no máximo 1 vez a cada 2 horas por cachorro, e nunca das 22h às 7h). Tocar no aviso abre o app na comida e na água.',
  negado: 'Os avisos estão bloqueados. Libere em Ajustes do iPhone → Notificações → Nossa casinha.',
  'sem-suporte': 'Este navegador não recebe avisos.',
  desligado: 'Quando eles ficarem com fome ou sede, o celular avisa mesmo com o app fechado.',
  instalar: 'Quando eles ficarem com fome ou sede, o celular avisa mesmo com o app fechado.',
};
async function pintar(aviso) {
  $('bCaes').textContent = caes ? 'Desligar cachorros' : 'Ligar cachorros';
  $('bSom').textContent = caes && caes.som ? 'Desligar som dos latidos' : 'Ligar som dos latidos';
  $('bSom').disabled = !caes;
  const s = await avisos.situacao();
  $('bCaesAv').textContent = s === 'ativo' ? 'Parar de avisar (fome e sede)' : 'Avisar quando estiverem com fome ou sede 🔔';
  $('caesInstalar').hidden = s !== 'instalar';
  $('caesAvTxt').textContent = aviso || TXT[s] || '';
}
$('bCaes').onclick = () => { if (caes) { desligar(); gravarLS('casinha_caes_off', '1'); } else { gravarLS('casinha_caes_off', '0'); ligar(); } pintar(); };
$('bSom').onclick = () => { if (caes) { caes.definirSom(!caes.som); pintar(); } };
$('bCaesAv').onclick = async () => {
  const b = $('bCaesAv'); b.disabled = true; let aviso = '';
  try {
    if ((await avisos.situacao()) === 'ativo') await avisos.desativar();
    else {
      if (!caes) { gravarLS('casinha_caes_off', '0'); ligar(); }
      const r = await avisos.ativar(caes.necessidades.resumo());
      if (!r.ok) aviso = r.motivo === 'negado' ? 'Você não permitiu os avisos. Dá para liberar nas configurações do celular.' : r.motivo === 'instalar' ? 'Primeiro coloque o app na Tela de Início (passo a passo abaixo).' : 'Não deu para ativar agora. Tente de novo.';
      else await avisos.pushTeste().catch(() => {}); // aviso de teste para conferir
    }
  } catch (e) { aviso = 'Não deu para ativar agora. Tente de novo.'; }
  b.disabled = false; pintar(aviso);
};
$('aj').addEventListener('toggle', () => { if ($('aj').open) pintar(); });
