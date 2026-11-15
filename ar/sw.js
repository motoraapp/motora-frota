// Nossa casinha: só recebe e mostra os avisos (ar ligado/desligado pelo automático, quarto quente).
// Não guarda cache: o app abre sempre a versão publicada. Enviado pela função ar-aviso.
self.addEventListener('install', function () { self.skipWaiting(); });
self.addEventListener('activate', function (e) { e.waitUntil(self.clients.claim()); });
self.addEventListener('push', function (e) {
  var d = {};
  try { d = e.data ? e.data.json() : {}; } catch (err) { d = { body: e.data ? e.data.text() : '' }; }
  var opts = { body: d.body || '', icon: 'icon-192.png', badge: 'icon-192.png', data: { url: d.url || './' } };
  if (d.tag) { opts.tag = d.tag; opts.renotify = true; }  // avisos dos cachorros: um só na tela
  e.waitUntil(self.registration.showNotification(d.title || 'Nossa casinha', opts));
});
self.addEventListener('notificationclick', function (e) {
  e.notification.close();
  var url = self.registration.scope, alvo = new URL((e.notification.data && e.notification.data.url) || './', url).href, jogo = /[?&]jogo=/.test(alvo);
  e.waitUntil(clients.matchAll({ type: 'window', includeUncontrolled: true }).then(function (list) {
    for (var i = 0; i < list.length; i++) if (list[i].url.indexOf(url) === 0 && 'focus' in list[i]) { if (jogo) list[i].postMessage({ jogo: true }); return list[i].focus(); }
    return clients.openWindow(alvo);
  }));
});
