const URLS = [
	'/',
	'/login',
	'/register',
	'/profile',
	'/about',
	'/score',
	'/singleplayer',
	'/bundle.js',
	'/static/img/user-default.jpg',
	'/api/user?page=1&page_size=5'
];

this.addEventListener('install', (event) => {
	console.log('SW installed');
	event.waitUntil(
		caches.open('codeloft_cache')
			.then((cache) => cache.addAll(URLS))
			.catch((error) => {
				console.log(error);
			})
	);
});

this.addEventListener('fetch', (event) => {
	if (navigator.onLine) {
		return fetch(event.request);
	}
	event.respondWith(
		caches.match(event.request)
			.then((cache) => {
				console.log(cache);
				if (cache) {
					return cache;
				}
				return fetch(event.request);
			})
			.catch((error) => console.log('Failed', error))
	);
});
