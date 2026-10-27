const CACHE = 'motora-v47';
const BASE = ['./', 'index.html', 'manifest.json', 'icon-192.png', 'icon-512.png'];

self.addEventListener('install', function (e) {
  e.waitUntil(caches.open(CACHE).then(function (c) { return c.addAll(BASE); }).then(function () { return self.skipWaiting(); }));
});

self.addEventListener('activate', function (e) {
  e.waitUntil(
    caches.keys().then(function (keys) {
      return Promise.all(keys.filter(function (k) { return k !== CACHE; }).map(function (k) { return caches.delete(k); }));
    }).then(function () { return self.clients.claim(); })
  );
});

// Rede primeiro (sempre pega a versão nova); sem internet, usa a cópia guardada.
self.addEventListener('fetch', function (e) {
  if (e.request.method !== 'GET') return;
  // Só guarda arquivos do próprio app; dados do Supabase vão sempre direto pela internet
  if (new URL(e.request.url).origin !== self.location.origin) return;
  if (new URL(e.request.url).pathname.endsWith('.apk') || new URL(e.request.url).pathname.endsWith('apk-version.json')) return; // download do APK vai direto
  e.respondWith(
    fetch(e.request).then(function (r) {
      var copia = r.clone();
      caches.open(CACHE).then(function (c) { return c.put(e.request, copia); }).catch(function () {});
      return r;
    }).catch(function () {
      return caches.match(e.request).then(function (r) { return r || caches.match('index.html'); });
    })
  );
});

// NOTIFICAÇÕES (Pix novo, lembrete de domingo)
self.addEventListener('push', function (e) {
  var d = {};
  try { d = e.data ? e.data.json() : {}; } catch (err) { d = { body: e.data ? e.data.text() : '' }; }
  // avisa o app aberto para atualizar os dados na hora
  self.clients.matchAll({ type: 'window', includeUncontrolled: true }).then(function (list) {
    list.forEach(function (c) { c.postMessage({ type: 'refresh' }); });
  });
  e.waitUntil(self.registration.showNotification(d.title || 'MOTORA', {
    body: d.body || '',
    icon: 'icon-192.png',
    badge: 'icon-192.png',
    data: { url: d.url || '/' }
  }));
});

self.addEventListener('notificationclick', function (e) {
  e.notification.close();
  // o caminho é relativo à pasta do app (no GitHub Pages o app fica em /motora-frota/)
  var raw = String((e.notification.data && e.notification.data.url) || '/');
  var url = new URL(raw.replace(/^\/+/, ''), self.registration.scope).href;
  e.waitUntil(clients.matchAll({ type: 'window', includeUncontrolled: true }).then(function (list) {
    for (var i = 0; i < list.length; i++) {
      if (list[i].url.indexOf(self.registration.scope) === 0 && 'focus' in list[i]) { list[i].navigate(url); return list[i].focus(); }
    }
    return clients.openWindow(url);
  }));
});
