var V='mi-rutina-v1',FILES=['./','./index.html','./manifest.json','./icon-192.png','./icon-512.png','./icon-maskable-512.png','./apple-touch-icon.png','./favicon.png'];
self.addEventListener('install',function(e){e.waitUntil(caches.open(V).then(function(c){return c.addAll(FILES)}).then(function(){return self.skipWaiting()}))});
self.addEventListener('activate',function(e){e.waitUntil(caches.keys().then(function(k){return Promise.all(k.filter(function(x){return x!==V}).map(function(x){return caches.delete(x)}))}).then(function(){return self.clients.claim()}))});
self.addEventListener('fetch',function(e){var r=e.request,u=new URL(r.url);
if(r.method!=='GET')return;
if(u.origin===location.origin){e.respondWith(fetch(r).then(function(n){var c=n.clone();caches.open(V).then(function(h){h.put(r,c)});return n}).catch(function(){return caches.match(r).then(function(m){return m||caches.match('./index.html')})}));return}
if(u.hostname==='fonts.googleapis.com'||u.hostname==='fonts.gstatic.com'){e.respondWith(caches.match(r).then(function(m){return m||fetch(r).then(function(n){var c=n.clone();caches.open(V).then(function(h){h.put(r,c)});return n})}))}});
