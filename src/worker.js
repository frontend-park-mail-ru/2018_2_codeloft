const cacheArray = require('./cache.json');

const URLS = [
	'/',
	'/login',
	'/register',
	'/profile',
	'/about',
	'/score',
	'/singleplayer',
	'/api/user?page=1&page_size=5'
];

this.addEventListener('install', (event) => {
	URLS.push(...cacheArray);
	console.log('SW installed');
	event.waitUntil(
		caches.open('codeloft_cache')
			.then((cache) => cache.addAll(URLS))
			.catch((error) => console.log(error))
	);
});

this.addEventListener('fetch', (event) => {
	if (navigator.onLine) {
		return fetch(event.request);
	}
	event.respondWith(
		caches.match(event.request)
			.then((cache) => {
				if (cache) {
					return cache;
				}
				return fetch(event.request);
			})
			.catch((error) => console.log('Failed', error))
	);
});
