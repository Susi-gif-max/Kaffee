const C='roastbook-v16';const FILES=['./','index.html','manifest.webmanifest','icon-180.png','icon-192.png'];
self.addEventListener('install',e=>{e.waitUntil(caches.open(C).then(c=>c.addAll(FILES.map(f=>new Request(f,{cache:'reload'})))));self.skipWaiting()});
self.addEventListener('activate',e=>{e.waitUntil(caches.keys().then(k=>Promise.all(k.filter(x=>x!==C).map(x=>caches.delete(x)))));self.clients.claim()});
/* Network first, skipping the browser's HTTP cache so a new upload shows up on the next open; the cache is only the offline fallback */
self.addEventListener('fetch',e=>{if(e.request.method!=='GET')return;const same=new URL(e.request.url).origin===location.origin;
  e.respondWith((same?fetch(e.request.url,{cache:'no-cache'}):fetch(e.request)).then(r=>{if(r.ok){const cp=r.clone();caches.open(C).then(c=>c.put(e.request,cp))}return r}).catch(()=>caches.match(e.request).then(r=>r||caches.match('index.html'))))});
