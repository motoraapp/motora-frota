// Páginas do app de casa (http://gree.local). Os blocos "Horários programados", "Sensor do quarto",
// "Aparelho" e "Atualização sem fio" são iguais aos de ar/index.html (o verificar.mjs confere).
#pragma once
const char PAGINA_APP[] PROGMEM = R"rawliteral(<!doctype html><html lang="pt-br"><head><meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1,user-scalable=no">
<meta name="theme-color" content="#0b1220"><link rel="manifest" href="/manifest.json"><link rel="icon" href="/icon.svg">
<link rel="apple-touch-icon" href="/icon.svg"><meta name="apple-mobile-web-app-capable" content="yes">
<title>Gree AC</title><style>
body{margin:0;font-family:system-ui;background:#0b1220;color:#e8eefc;display:flex;flex-direction:column;align-items:center;padding:20px}
.t{font-size:80px;font-weight:200;margin:10px 0}.r{display:flex;gap:10px;margin:8px 0;flex-wrap:wrap;justify-content:center}
button{background:#1b2740;color:#e8eefc;border:0;border-radius:14px;padding:16px 20px;font-size:16px;min-width:76px}
button.on{background:#2f7cf6}#p{width:120px;height:120px;border-radius:60px;font-size:20px}#p.on{background:#e5484d}
details{width:100%;max-width:420px;margin-top:28px;background:#121b2e;border-radius:14px;padding:4px 16px}summary{padding:12px 0;font-size:16px;cursor:pointer}
details p{margin:6px 0 10px;font-size:14px;color:#a9b6d6;line-height:1.45}#rx{background:#0b1220;border-radius:10px;padding:12px;font-size:13px;word-break:break-word}
#rx code{font-size:14px;color:#8fd3ff}.mb button{min-width:0;flex:1}
</style></head><body>
<button id="p">ON/OFF</button><div class="t"><span id="t">24</span>°</div>
<div class="r"><button onclick="d(-1)">−</button><button onclick="d(1)">+</button></div>
<div class="r" id="m"></div><div class="r" id="f"></div>
<div class="r" id="x"></div><small id="s"></small>
<details id="hor"></details>
<details id="aj"><summary>Ajustes do controle</summary>
<p><b>Modelo do controle Gree.</b> Se o ar não obedecer, toque em outro modelo: o comando é enviado de novo na hora.</p>
<div class="r mb" id="mo"></div>
<p><b>Ler o controle original.</b> Aponte o controle do ar para o receptor da placa e aperte um botão (com o ar ligado).</p>
<div id="rx">Nenhum sinal lido ainda.</div><div class="r" id="rxb"></div>
<p><b>Acesso de fora de casa.</b> <span id="cst">Verificando…</span></p>
<div id="cpair"></div><div class="r"><button id="cbt" onclick="pair()">Gerar código</button></div>
<p><a href="/wifi" style="color:#8fa3d6">Configurar Wi-Fi</a></p></details>
<script>
let S={power:false,mode:1,temp:24,fan:0,swing:false,light:true,turbo:false,xfan:false,sleep:false};
const M=[[1,'Frio'],[4,'Quente'],[2,'Seco'],[3,'Vent'],[0,'Auto']],F=[[0,'Auto'],[1,'1'],[2,'2'],[3,'3']],
X=[['swing','Swing'],['turbo','Turbo'],['light','Luz'],['xfan','X-Fan'],['sleep','Sleep']];
async function send(p){try{const r=await fetch('/api/state',{method:'POST',body:JSON.stringify(p)});S=await r.json();ui();s.textContent=''}catch(e){s.textContent='sem conexão'}}
function d(n){send({temp:Math.min(30,Math.max(16,S.temp+n))})}
function ui(){t.textContent=S.temp;p.className=S.power?'on':'';
m.innerHTML=M.map(([v,l])=>`<button class="${S.mode==v?'on':''}" onclick="send({mode:${v}})">${l}</button>`).join('');
f.innerHTML=F.map(([v,l])=>`<button class="${S.fan==v?'on':''}" onclick="send({fan:${v}})">Fan ${l}</button>`).join('');
x.innerHTML=X.map(([k,l])=>`<button class="${S[k]?'on':''}" onclick="send({${k}:${!S[k]}})">${l}</button>`).join('')}
p.onclick=()=>send({power:!S.power});
const MO=[[1,'A (YAW1F)'],[2,'B (YBOFB)'],[3,'C (YX1FSF)']];
function uiMo(){mo.innerHTML=MO.map(([v,l])=>`<button class="${S.model==v?'on':''}" onclick="send({model:${v}})">${l}</button>`).join('')}
const ui0=ui;ui=function(){ui0();uiMo()};
let RN=0;async function poll(){if(document.hidden)return;try{const j=await(await fetch('/api/rx')).json();if(j.n==RN)return;RN=j.n;
rx.textContent='';const h=document.createElement('div');h.textContent='Sinal '+j.n+': '+j.proto;rx.append(h);
if(j.hex){const c=document.createElement('code');c.textContent=j.hex;rx.append(c)}
if(j.text){const x=document.createElement('div');x.textContent=j.text;x.style.marginTop='6px';x.style.color='#a9b6d6';rx.append(x)}
rxb.innerHTML='';if(!j.ac){const w=document.createElement('p');w.textContent='Não é sinal de ar-condicionado conhecido. Confira se é o controle do ar.';rx.append(w)}
else{const r=await fetch('/api/state');S=await r.json();ui();
sugAp(j,rxb)}}catch(e){}}
setInterval(poll,2000);
let CU='';function cshow(j){CU=j.url;cst.textContent=!j.ok?'Sem internet ou servidor fora do ar.':(j.dono?'Ligado à sua conta. Use o app pelo link abaixo de qualquer lugar.':'Conectado, falta ligar à sua conta: toque em Gerar código.');
cpair.innerHTML='';const a=document.createElement('p');
if(j.code){a.innerHTML='Código: <b style="font-size:28px;letter-spacing:4px"></b><br>Abra o link abaixo, entre com seu usuário e senha do MOTORA e digite o código (vale 9 minutos).';a.querySelector('b').textContent=j.code}
const l=document.createElement('a');l.href=j.url;l.textContent=j.url;l.style.color='#8fd3ff';l.style.wordBreak='break-all';a.append(document.createElement('br'),l);cpair.append(a)}
async function cpoll(){if(document.hidden||!aj.open)return;try{cshow(await(await fetch('/api/cloud')).json())}catch(e){}}
async function pair(){try{cshow(await(await fetch('/api/pair',{method:'POST'})).json())}catch(e){}}
aj.addEventListener('toggle',cpoll);setInterval(cpoll,4000);
// Horários programados: mesma tela no app de casa (src/web.h) e no de fora (motora-frota/ar). Usa S, send() e ui() de cada app.
(function(){
const DN=['Dom','Seg','Ter','Qua','Qui','Sex','Sáb'],MN={1:'Frio',4:'Quente',2:'Seco',3:'Vent',0:'Auto'},box=document.getElementById('hor');
const st=document.createElement('style');st.textContent='#hor select,#hor input{background:#1b2740;color:#e8eefc;border:0;border-radius:12px;padding:14px;font-size:16px;flex:1;min-width:0}'+
'#hor .dia{min-width:0;flex:1;padding:12px 0;font-size:14px}.hi{display:flex;align-items:center;gap:8px;background:#0b1220;border-radius:12px;padding:10px 12px;margin:8px 0}'+
'.hi div{flex:1;min-width:0}.hi b{font-size:20px}.hi small{display:block;color:#a9b6d6}.hi button{min-width:0;padding:10px 12px;font-size:14px}.hi.off{opacity:.5}#hmsg{color:#f5a524}#hor [hidden]{display:none}';document.head.append(st);
box.innerHTML='<summary>Horários programados</summary><p>A placa liga ou desliga o ar sozinha nos dias e horas escolhidos (hora de Brasília), mesmo com o celular desligado. <span id="hclk"></span></p>'+
'<div id="hlist"></div><p><b>Novo horário</b></p><div class="r" id="hdias"></div>'+
'<div class="r"><input id="hhora" type="time" value="22:00" aria-label="Hora"><select id="hacao" aria-label="O que fazer"><option value="1">Ligar</option><option value="0">Desligar</option></select></div>'+
'<div class="r" id="hlig"><select id="htemp" aria-label="Temperatura"></select><select id="hmodo" aria-label="Modo"></select></div>'+
'<div class="r"><button class="on" id="hadd">Adicionar horário</button></div><p id="hmsg" role="status"></p>';
const $=i=>document.getElementById(i);let dias=127,last='';
for(let t=16;t<=30;t++)$('htemp').add(new Option(t+'°',t,false,t==23));
[1,4,2,3,0].forEach(m=>$('hmodo').add(new Option(MN[m],m)));
function diasUi(){$('hdias').replaceChildren(...DN.map((n,i)=>{const b=document.createElement('button');b.className='dia'+((dias>>i)&1?' on':'');b.textContent=n;
 b.onclick=()=>{dias^=1<<i;if(!dias)dias=1<<i;diasUi()};return b}))}
diasUi();$('hacao').onchange=()=>{$('hlig').hidden=$('hacao').value==='0'};
function dTxt(d){if(d==127)return'Todos os dias';if(d==62)return'Seg a Sex';if(d==65)return'Sáb e Dom';return DN.filter((n,i)=>(d>>i)&1).join(', ')}
const p2=n=>String(n).padStart(2,'0'),lista=()=>(S.sched||[]).map(x=>({...x}));
function salvar(l){l.sort((a,b)=>a.h*60+a.m-(b.h*60+b.m));send({sched:l})}
window.renderHor=function(){$('hclk').textContent=S.hora?'Hora na placa: '+S.hora+'.':'';const j=JSON.stringify(S.sched||[]);if(j===last)return;last=j;const l=lista();
 $('hlist').replaceChildren(...(l.length?l.map((x,i)=>{const r=document.createElement('div');r.className='hi'+(x.e?'':' off');
  const t=document.createElement('div');t.innerHTML='<b></b><small></small>';t.querySelector('b').textContent=p2(x.h)+':'+p2(x.m)+' · '+(x.a?'Ligar':'Desligar');
  t.querySelector('small').textContent=dTxt(x.d)+(x.a?' · '+x.t+'° '+MN[x.o]:'')+(x.e?'':' · pausado');
  const pa=document.createElement('button');pa.textContent=x.e?'Pausar':'Ativar';pa.onclick=()=>{const n=lista();n[i].e=n[i].e?0:1;salvar(n)};
  const ex=document.createElement('button');ex.textContent='Excluir';ex.onclick=()=>{if(ex.dataset.c!=='1'){ex.dataset.c='1';ex.textContent='Confirmar';return}const n=lista();n.splice(i,1);salvar(n)};
  r.append(t,pa,ex);return r}):[Object.assign(document.createElement('p'),{textContent:'Nenhum horário programado.'})]))};
$('hadd').onclick=()=>{const l=lista();if(l.length>=8){$('hmsg').textContent='Máximo de 8 horários.';return}
 const [h,m]=($('hhora').value||'').split(':').map(Number);if(isNaN(h)||isNaN(m)){$('hmsg').textContent='Escolha a hora.';return}
 const a=+$('hacao').value;l.push({d:dias,h,m,a,t:+$('htemp').value,o:+$('hmodo').value,e:1});salvar(l);
 $('hmsg').textContent='Horário adicionado: '+p2(h)+':'+p2(m)+' · '+dTxt(dias)+'.';setTimeout(()=>{$('hmsg').textContent=''},4000)};
const u0=ui;ui=function(){u0();renderHor()};
})();

// Sensor do quarto + modo automático: mesma tela no app de casa e no de fora. Usa S, send() e ui() de cada app.
(function(){
const big=document.querySelector('.t'),sala=document.createElement('div');sala.id='sala';sala.style.cssText='color:#a9b6d6;font-size:15px;margin:-4px 0 8px';big.after(sala);
const box=document.createElement('details');box.id='aut';document.getElementById('hor').before(box);
const st=document.createElement('style');st.textContent='#aut input{background:#1b2740;color:#e8eefc;border:0;border-radius:12px;padding:14px;font-size:16px;flex:1;min-width:0}'+
'#atog{width:100%;font-size:17px}#atog.on{background:#3ecf8e;color:#06140d}#aalvo{font-size:34px;font-weight:300;min-width:90px;text-align:center}#aut .r{align-items:center}';document.head.append(st);
box.innerHTML='<summary>Modo automático (sensor do quarto)</summary>'+
'<p id="atxt"></p>'+
'<div class="r"><button id="atog">Automático: desligado</button></div>'+
'<p><b>Temperatura que eu quero no quarto</b></p><div class="r"><button id="amenos" aria-label="Diminuir">−</button><span id="aalvo">24°</span><button id="amais" aria-label="Aumentar">+</button></div>'+
'<p><b>Vale só neste horário</b></p><div class="r"><input id="ade" type="time" aria-label="Começa"><span>até</span><input id="aate" type="time" aria-label="Termina"></div>'+
'<p id="ainfo"></p>';
const $=i=>document.getElementById(i),p2=n=>String(n).padStart(2,'0'),hm=m=>p2(Math.floor(m/60))+':'+p2(m%60),mn=v=>{const[a,b]=(v||'').split(':').map(Number);return isNaN(a)||isNaN(b)?null:a*60+b};
const A=()=>({on:false,alvo:24,de:480,ate:1200,...(S.auto||{})}),put=c=>send({auto:{...A(),...c}});
$('atog').onclick=()=>put({on:!A().on});
$('amenos').onclick=()=>put({alvo:Math.max(16,A().alvo-1)});$('amais').onclick=()=>put({alvo:Math.min(30,A().alvo+1)});
$('ade').onchange=()=>{const m=mn($('ade').value);if(m!==null)put({de:m})};$('aate').onchange=()=>{const m=mn($('aate').value);if(m!==null)put({ate:m})};
const f=n=>String(n).replace('.',',');
// Placa versão 2 em diante também desliga o ar (só o que o automático ligou); versão 3 liga logo acima da temperatura escolhida.
const T1='Quando o quarto passar 1 °C da temperatura escolhida, a placa liga o ar no <b>Frio</b> nessa temperatura. ',
 T1v3='No horário escolhido, se o quarto estiver <b>acima</b> da temperatura escolhida, a placa liga o ar no <b>Frio</b> nessa temperatura. Se estiver nessa temperatura ou abaixo, não liga. ',
 T2='Quando o quarto ficar 1 °C abaixo, ela <b>desliga</b>, mas só se foi o automático que ligou: se você ligou o ar, ele continua ligado. Tudo só dentro do horário escolhido. ',
 T3='Se você desligar o ar, ela só liga de novo depois que o quarto esfriar.';
window.renderAuto=function(){const a=A(),q=S.sala,novo=(S.fw||0)>=2,v3=(S.fw||0)>=3;
 $('atxt').innerHTML=(v3?T1v3:T1)+(novo?T2:'')+T3;
 sala.textContent=q?'Quarto agora: '+f(q.t)+' °C · umidade '+q.u+'%':'Sensor do quarto: sem leitura';
 $('atog').textContent='Automático: '+(a.on?'LIGADO':'desligado');$('atog').className=a.on?'on':'';$('aalvo').textContent=a.alvo+'°';
 if(document.activeElement!==$('ade'))$('ade').value=hm(a.de);if(document.activeElement!==$('aate'))$('aate').value=hm(a.ate);
 $('ainfo').textContent=!q?'Sem leitura do sensor: o automático fica parado até o sensor voltar.':(a.on?(v3?'Liga quando o quarto passar de '+a.alvo+' °C':'Liga quando o quarto chegar a '+(a.alvo+1)+' °C')+(novo?' e desliga quando cair a '+(a.alvo-1)+' °C (só se o automático ligou)':'')+', entre '+hm(a.de)+' e '+hm(a.ate)+'.'+(novo&&a.ligou&&S.power?' Agora o ar está ligado pelo automático.':''):'')};
const u0=ui;ui=function(){u0();renderAuto()};
})();

// Aparelho (controle universal): escolher a marca, busca automática e sugestão pelo controle original. Mesmo código nos dois apps.
(function(){
const PN={"24": "Gree", "109": "Airton", "79": "Airwell", "69": "Amcor", "27": "Argo", "120": "Bosch 144", "84": "Carrier 64", "15": "Coolix", "86": "Corona", "16": "Daikin", "68": "Daikin 128", "70": "Daikin 152", "65": "Daikin 160", "67": "Daikin 176", "53": "Daikin 2", "61": "Daikin 216", "78": "Daikin 64", "80": "Delonghi", "98": "Ecoclim", "48": "Electra", "33": "Fujitsu", "63": "Goodweather", "38": "Haier", "115": "Haier 160", "101": "Haier 176", "44": "Haier Yrw 02", "40": "Hithi", "41": "Hithi 1", "111": "Hithi 264", "113": "Hithi 296", "85": "Hithi 344", "73": "Hithi 424", "103": "Kelon", "18": "Kelvinator", "10": "LG", "51": "LG 2", "34": "Midea", "94": "Mirage", "20": "Mitsubishi", "72": "Mitsubishi 112", "71": "Mitsubishi 136", "60": "Mitsubishi Heavy 152", "59": "Mitsubishi Heavy 88", "66": "Neoclima", "49": "Panasonic", "96": "Panasonic 32", "108": "Rhoss", "46": "Samsung", "89": "Sanyo", "105": "Sanyo 88", "62": "Sharp", "57": "TCL", "93": "Technibel", "55": "Teco", "102": "Teknopoint", "32": "Toshiba", "92": "Transcold", "28": "Trotec", "104": "Trotec 3550", "100": "Truma", "54": "Vestel", "90": "Voltas", "45": "Whirlpool", "126": "York"},ORD=[24, 109, 79, 69, 27, 120, 84, 15, 86, 16, 68, 70, 65, 67, 53, 61, 78, 80, 98, 48, 33, 63, 38, 115, 101, 44, 40, 41, 111, 113, 85, 73, 103, 18, 10, 51, 34, 94, 20, 72, 71, 60, 59, 66, 49, 96, 108, 46, 89, 105, 62, 57, 93, 55, 102, 32, 92, 28, 104, 100, 54, 90, 45, 126],nome=p=>PN[p]||('Tipo '+p),$=i=>document.getElementById(i);
const aj=$('aj'),sec=document.createElement('div');sec.id='apar';aj.querySelector('summary').after(sec);
const st=document.createElement('style');st.textContent='#apar select{background:#1b2740;color:#e8eefc;border:0;border-radius:12px;padding:14px;font-size:16px;flex:1;min-width:0}[hidden]{display:none!important}#apscan{background:#0b1220;border-radius:12px;padding:12px;margin:8px 0}#apscan .r button{min-width:0;flex:1;padding:14px 8px}#apok{background:#3ecf8e!important;color:#06140d}';document.head.append(st);
sec.innerHTML='<p><b>Aparelho de ar-condicionado.</b> Funciona como controle universal: escolha a marca ou use a busca automática. Em uso: <b id="apnow"></b></p>'+
'<div class="r"><select id="apsel" aria-label="Marca do aparelho"></select><button id="apuse">Usar</button></div>'+
'<p>Não sabe a marca? Fique perto do ar, com ele <b>desligado</b>, e toque em Busca automática. A placa testa um tipo a cada 8 segundos. Quando o ar <b>ligar ou apitar</b>, toque em <b>Funcionou!</b></p>'+
'<div class="r"><button id="apstart">Busca automática</button></div>'+
'<div id="apscan" hidden><p id="aptxt"></p><div class="r"><button id="apprev">◀ Anterior</button><button id="apagain">Testar de novo</button><button id="apnext">Próximo ▶</button></div>'+
'<div class="r"><button id="apok">Funcionou!</button><button id="apstop">Parar</button></div><p>Se passou do ponto, use Anterior e Testar de novo até o ar responder.</p></div>';
ORD.forEach(p=>$('apsel').add(new Option(nome(p),p)));
$('apuse').onclick=()=>send({proto:+$('apsel').value});
const sc=c=>send({scan:c});$('apstart').onclick=()=>sc('start');$('apprev').onclick=()=>sc('prev');$('apnext').onclick=()=>sc('next');
$('apagain').onclick=()=>sc('again');$('apok').onclick=()=>sc('ok');$('apstop').onclick=()=>sc('stop');
window.renderAp=function(){const g=S.proto==24;$('apnow').textContent=nome(S.proto)+(g&&S.model>0?' (modelo '+'ABC'[S.model-1]+')':'');
 if(document.activeElement!==$('apsel')&&S.proto)$('apsel').value=S.proto;
 const mo=$('mo');if(mo){mo.hidden=!g;if(mo.previousElementSibling)mo.previousElementSibling.hidden=!g}
 const s=typeof S.scan==='object'&&S.scan?S.scan:null;$('apscan').hidden=!s;$('apstart').hidden=!!s;
 if(s)$('aptxt').textContent='Testando '+s.i+' de '+s.n+': '+nome(s.p)+(s.auto?' (passa sozinho)':' (parado neste)')};
window.sugAp=function(j,box){if(!j||!j.ac)return;const nm=nome(j.pid)+(j.pid==24&&j.model>0?' modelo '+'ABC'[j.model-1]:'');
 if(j.pid==S.proto&&(!(j.model>0)||j.model==S.model)){const p=document.createElement('p');p.textContent='Este é o aparelho em uso: '+nm+'.';box.append(p);return}
 const b=document.createElement('button');b.className='on';b.textContent='Usar este aparelho: '+nm;b.onclick=()=>send(Object.assign({proto:j.pid},j.model>0?{model:j.model}:{}));box.append(b)};
const u0=ui;ui=function(){u0();renderAp()};
})();

// Atualização sem fio: versão da placa e botões. Mesmo código nos dois apps (usa S, send, ui).
(function(){
const aj=document.getElementById('aj'),box=document.createElement('div');box.id='ota';aj.append(box);
box.innerHTML='<p><b>Atualização da placa.</b> <span id="otav"></span></p><p id="otam"></p><div class="r"><button id="otac">Procurar atualização</button><button id="otan" class="on" hidden>Atualizar agora</button></div>';
const $=i=>document.getElementById(i);
$('otac').onclick=()=>{$('otam').textContent='Procurando…';send({ota:'check'})};
$('otan').onclick=()=>{$('otam').textContent='Pedido enviado. A placa baixa a versão nova e reinicia sozinha (cerca de 1 minuto).';send({ota:'now'})};
window.renderOta=function(){$('otav').textContent=S.fw?'Versão '+S.fw+(S.fwNova?' · versão '+S.fwNova+' disponível (instala sozinha de madrugada)':''):'';
 $('otan').hidden=!S.fwNova;if(S.fwMsg)$('otam').textContent=S.fwMsg};
const u0=ui;ui=function(){u0();renderOta()};
})();

// TV AOC (controle universal): abas Ar e TV, controle da TV e aprender botões do controle original. Mesmo código nos dois apps (usa S, send, ui).
(function(){
const $=i=>document.getElementById(i),pw=$('p'),pai=pw.parentNode,aj=$('aj');
const P={ar:'M4 5h16v8H4zM7 9h10M8 17l-1 3M12 17v3M16 17l1 3',tv:'M3 5h18v12H3zM8 21h8M12 17v4',pwr:'M12 3v8M6.3 7a8 8 0 1 0 11.4 0',
 up:'M6 15l6-6 6 6',down:'M6 9l6 6 6-6',left:'M15 6l-6 6 6 6',right:'M9 6l6 6-6 6',mute:'M4 9h4l5-4v14l-5-4H4zM16 9l5 6M21 9l-5 6'};
const ic=k=>'<svg viewBox="0 0 24 24" aria-hidden="true"><path d="'+P[k]+'"/></svg>';
const N={power:'Ligar ou desligar a TV',chUp:'Canal +',chDn:'Canal −',volUp:'Volume +',volDn:'Volume −',menu:'Menu',mute:'Mudo',fonte:'TV/AV',info:'Info',voltar:'Último canal',sleep:'Sleep',tela:'Tela'};
for(let i=0;i<10;i++)N['n'+i]='Número '+i;
const st=document.createElement('style');st.textContent=
'.abas{display:flex;gap:4px;width:100%;max-width:420px;padding:4px;margin:0 0 18px;background:#121b2e;border-radius:16px}'+
'.abas button{flex:1;min-width:0;display:flex;align-items:center;justify-content:center;gap:8px;padding:12px;background:none;color:#a9b6d6;font-weight:600;transition:background .25s cubic-bezier(.16,1,.3,1),color .25s}'+
'.abas button[aria-selected=true]{background:#1b2740;color:#e8eefc}.abas svg,#pTv svg{width:22px;height:22px;fill:none;stroke:currentColor;stroke-width:2;stroke-linecap:round;stroke-linejoin:round}'+
'#pAr,#pTv{width:100%;display:flex;flex-direction:column;align-items:center}#pTv{max-width:420px;gap:16px}'+
'#pTv .tk{position:relative;min-width:0;padding:0;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:2px;font-size:13px;color:#a9b6d6;transition:background .35s cubic-bezier(.16,1,.3,1)}'+
'#pTv .tk svg{color:#e8eefc}#pTv .tk.vai{background:#2f7cf6;color:#fff;transition:none}#pTv .tk.ap::after{content:"";position:absolute;top:7px;right:7px;width:7px;height:7px;border-radius:4px;background:#3ecf8e}'+
'#pTv .tvp{width:88px;height:88px;border-radius:44px;background:#e5484d}#pTv .tvp svg{width:34px;height:34px;color:#fff}'+
'.tvx{display:grid;grid-template-columns:repeat(3,80px);grid-template-rows:repeat(3,64px);gap:8px}.tvx .tk{border-radius:16px}.tvx [data-k=menu]{border-radius:32px;color:#e8eefc;font-size:14px}'+
'.tvr,.tvn{display:grid;gap:8px;width:100%}.tvr{grid-template-columns:repeat(4,1fr)}.tvr .tk{height:60px}.tvn{grid-template-columns:repeat(3,1fr)}'+
'.tvn .tk{height:56px;font-size:21px;color:#e8eefc;font-variant-numeric:tabular-nums}.tvn [data-k=sleep],.tvn [data-k=tela]{font-size:14px;color:#a9b6d6}'+
'#pTv.apr .tk{outline:2px dashed #f5a524;outline-offset:-2px}#tvmsg{min-height:21px;margin:0;font-size:14px;color:#a9b6d6;text-align:center}'+
'.tvli{display:flex;align-items:center;justify-content:space-between;gap:8px;margin:6px 0}.tvli span{color:#e8eefc}.tvli button{min-width:0;padding:10px 12px;font-size:14px}'+
'.abas button:focus-visible,#pTv button:focus-visible{outline:2px solid #2f7cf6;outline-offset:2px}';
document.head.append(st);
const abas=document.createElement('div'),ar=document.createElement('div'),tv=document.createElement('div');
abas.className='abas';abas.setAttribute('role','tablist');abas.setAttribute('aria-label','Aparelho');
ar.id='pAr';tv.id='pTv';ar.setAttribute('role','tabpanel');tv.setAttribute('role','tabpanel');ar.setAttribute('aria-labelledby','aba-ar');tv.setAttribute('aria-labelledby','aba-tv');
pai.insertBefore(abas,pw);pai.insertBefore(ar,pw);
for(let n=pw;n&&n!==aj;){const s=n.nextSibling;ar.append(n);n=s}
ar.after(tv);
abas.innerHTML='<button role="tab" id="aba-ar" aria-controls="pAr">'+ic('ar')+'Ar</button><button role="tab" id="aba-tv" aria-controls="pTv">'+ic('tv')+'TV</button>';
const b=(k,c)=>'<button class="tk'+(c?' '+c:'')+'" data-k="'+k+'" aria-label="'+N[k]+'">';
tv.innerHTML=b('power','tvp')+ic('pwr')+'</button>'+
 '<div class="tvx"><i></i>'+b('chUp')+ic('up')+'Canal</button><i></i>'+b('volDn')+ic('left')+'Vol</button>'+b('menu')+'Menu</button>'+b('volUp')+ic('right')+'Vol</button><i></i>'+b('chDn')+ic('down')+'Canal</button><i></i></div>'+
 '<div class="tvr">'+b('mute')+ic('mute')+'Mudo</button>'+b('fonte')+'TV/AV</button>'+b('info')+'Info</button>'+b('voltar')+'Último</button></div>'+
 '<div class="tvn">'+[1,2,3,4,5,6,7,8,9].map(i=>b('n'+i)+i+'</button>').join('')+b('sleep')+'Sleep</button>'+b('n0')+'0</button>'+b('tela')+'Tela</button></div>'+
 '<p id="tvmsg" role="status" aria-live="polite"></p>'+
 '<details id="tvaj"><summary>Ajustar botões da TV</summary><p>A placa já vem com os códigos das TVs AOC. Se algum botão não funcionar, ensine a placa: toque em <b>Aprender um botão</b>, toque no botão aqui e aperte o mesmo botão no controle da TV, apontado para a placa. O ponto verde marca os botões ensinados.</p>'+
 '<div class="r"><button id="tvap">Aprender um botão</button></div><div id="tvl"></div></details>';
function aba(k){ar.hidden=k!=='ar';tv.hidden=k!=='tv';for(const x of abas.children){const s=x.id==='aba-'+k;x.setAttribute('aria-selected',s);x.tabIndex=s?0:-1}try{localStorage.setItem('aba',k)}catch(e){}}
abas.onclick=e=>{const x=e.target.closest('[role=tab]');if(x)aba(x.id.slice(4))};
abas.onkeydown=e=>{if(e.key!=='ArrowRight'&&e.key!=='ArrowLeft')return;const k=tv.hidden?'tv':'ar';aba(k);$('aba-'+k).focus()};
let ini='ar';try{ini=localStorage.getItem('aba')||'ar'}catch(e){}aba(ini==='tv'?'tv':'ar');
let apr=false,ult='',ultm='',espera=0,limpa=0;
const aviso=(t,s)=>{$('tvmsg').textContent=t;clearTimeout(limpa);if(s)limpa=setTimeout(()=>{$('tvmsg').textContent=''},s)};
const modoApr=on=>{apr=on;tv.classList.toggle('apr',on);$('tvap').textContent=on?'Cancelar':'Aprender um botão';if(on)aviso('Toque no botão que você quer ensinar.')};
$('tvap').onclick=()=>modoApr(!apr);
tv.addEventListener('click',e=>{const t=e.target.closest('.tk');if(!t)return;const k=t.dataset.k;
 if(apr){modoApr(false);send({tvAprender:k});aviso('Agora aperte '+N[k]+' no controle da TV, apontado para a placa (30 segundos).');return}
 t.classList.add('vai');setTimeout(()=>t.classList.remove('vai'),160);if(navigator.vibrate)navigator.vibrate(8);send({tecla:k});aviso('Enviado: '+N[k],2500)});
window.renderTv=function(){const v=S.tv||{},l=v.l||[],j=JSON.stringify(l);
 if(j!==ult){ult=j;tv.querySelectorAll('.tk').forEach(x=>x.classList.toggle('ap',l.includes(x.dataset.k)));
  $('tvl').replaceChildren(...l.map(k=>{const r=document.createElement('div'),s=document.createElement('span'),x=document.createElement('button');
   r.className='tvli';s.textContent=N[k]||k;x.textContent='Voltar ao código AOC';x.onclick=()=>send({tvEsquecer:k});r.append(s,x);return r}))}
 if(v.a){aviso('Esperando o botão '+(N[v.a]||v.a)+' do controle da TV…');if(typeof refresh!=='function'&&!espera)espera=setTimeout(()=>{espera=0;send({})},1500)}
 else if(v.m&&v.mn!==ultm){ultm=v.mn;aviso(v.m,6000)}};
const u0=ui;ui=function(){u0();renderTv()};
})();

fetch('/api/state').then(r=>r.json()).then(j=>{S=j;ui()}).catch(ui);
</script></body></html>)rawliteral";
const char PAGINA_WIFI[] PROGMEM = R"rawliteral(<!doctype html><html lang="pt-br"><head><meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1"><title>Wi-Fi - Gree AC</title><style>
body{margin:0;font-family:system-ui;background:#0b1220;color:#e8eefc;padding:20px;max-width:420px}
label{display:block;margin:14px 0 6px}input{box-sizing:border-box;width:100%;padding:14px;font-size:16px;border-radius:12px;border:0;background:#1b2740;color:#e8eefc}
button{margin-top:20px;width:100%;background:#2f7cf6;color:#fff;border:0;border-radius:14px;padding:16px;font-size:16px}a{color:#7d8bb0}
</style></head><body><h2>Wi-Fi da casa</h2>
<p>Digite o nome e a senha da rede Wi-Fi. O aparelho reinicia e passa a usar essa rede.</p>
<form method="post" action="/wifi"><label for="ssid">Nome da rede</label><input id="ssid" name="ssid" maxlength="32" required autocapitalize="none">
<label for="pass">Senha</label><input id="pass" name="pass" type="password" maxlength="63">
<button type="submit">Salvar e reiniciar</button></form><p><a href="/app">Abrir o controle sem mudar o Wi-Fi</a></p>
</body></html>)rawliteral";
const char MANIFEST[] PROGMEM = R"rawliteral({"name":"Gree AC","short_name":"Gree AC","start_url":"/","display":"standalone","background_color":"#0b1220","theme_color":"#0b1220","icons":[{"src":"/icon.svg","sizes":"any","type":"image/svg+xml"}]})rawliteral";
const char ICONE[] PROGMEM = R"rawliteral(<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64"><rect width="64" height="64" rx="14" fill="#2f7cf6"/><path d="M12 24h40v14H12zM20 46l-4 8M32 46v8M44 46l4 8" stroke="#fff" stroke-width="4" fill="none" stroke-linecap="round"/></svg>)rawliteral";
