// Nossa casinha: só recebe e mostra os avisos (ar ligado/desligado pelo automático, quarto quente).
// Não guarda cache: o app abre sempre a versão publicada. Enviado pela função ar-aviso.
self.addEventListener('install', function () { self.skipWaiting(); });
self.addEventListener('activate', function (e) { e.waitUntil(self.clients.claim()); });
self.addEventListener('push', function (e) {
  var d = {};
  try { d = e.data ? e.data.json() : {}; } catch (err) { d = { body: e.data ? e.data.text() : '' }; }
  e.waitUntil(self.registration.showNotification(d.title || 'Nossa casinha', {
    body: d.body || '', icon: 'icon-192.png', badge: 'icon-192.png', data: { url: './' }
  }));
});
self.addEventListener('notificationclick', function (e) {
  e.notification.close();
  var url = self.registration.scope;
  e.waitUntil(clients.matchAll({ type: 'window', includeUncontrolled: true }).then(function (list) {
    for (var i = 0; i < list.length; i++) if (list[i].url.indexOf(url) === 0 && 'focus' in list[i]) return list[i].focus();
    return clients.openWindow(url);
  }));
});
