self.addEventListener('install', function (e) {
  e.waitUntil(
    caches.open('jnrmprd').then(function (cache) {
      return cache.addAll(['/', '/index.html', '/index.css', '/index.js'])
    })
  )
})

self.addEventListener('activate', function (event) {
  event.waitUntil(self.clients.claim())
})

self.addEventListener('fetch', function (event) {
  // cehcker si c'est du WS
  // console.log(event.request.url)

  // Renvoyer une fake IP
  event.respondWith(
    caches.match(event.request).then(function (response) {
      return response || fetch(event.request)
    })
  )
})
