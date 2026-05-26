const CACHE_NAME = 'urban-jungle-v2';
const ASSETS = ['./', './index.html', './index_v2.html', './manifest.json', './icons/icon.svg'];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(ASSETS)).then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(keys.filter((k) => k !== CACHE_NAME).map((k) => caches.delete(k)))
    ).then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', (event) => {
  if (event.request.method !== 'GET') return;
  event.respondWith(
    caches.match(event.request).then((cached) => cached || fetch(event.request))
  );
});

let cachedPlants = [];
let cachedTodayKey = '';

function daysBetween(fromKey, toKey) {
  const a = new Date(fromKey + 'T12:00:00');
  const b = new Date(toKey + 'T12:00:00');
  return Math.round((b - a) / 86400000);
}

function checkWateringState(plant, targetDateKey) {
  const daysSince = daysBetween(plant.lastWateredDate, targetDateKey);
  const interval = Number(plant.interval);
  if (daysSince === 0) return 'watered';
  if (daysSince > 0 && daysSince % interval === 0) return 'alarm';
  if (daysSince > interval) return 'alarm';
  return 'other';
}

function countUnwatered(plants, todayKey) {
  return plants.filter((p) => checkWateringState(p, todayKey) === 'alarm').length;
}

self.addEventListener('message', (event) => {
  const data = event.data || {};
  if (data.type === 'SYNC_PLANTS') {
    cachedPlants = data.plants || [];
    cachedTodayKey = data.todayDateKey || '';
  }
});

self.addEventListener('notificationclick', (event) => {
  event.notification.close();
  event.waitUntil(
    self.clients.matchAll({ type: 'window', includeUncontrolled: true }).then((clients) => {
      if (clients.length) return clients[0].focus();
      return self.clients.openWindow('./index.html');
    })
  );
});
