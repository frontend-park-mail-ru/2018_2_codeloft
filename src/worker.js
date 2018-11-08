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
			.then((cache) => {
				console.log('Adding urls...');
				return cache.addAll(Object.keys(URLS));
			})
			.catch((error) => {
				console.log(error);
			})
	);
});

this.addEventListener('fetch', (event) => {
	if (navigator.onLine) {
		// return fetch(event.request);
		return;
	}
	console.log('from cache');
	event.respondWith(
		caches.match(event.request)
			.then((cache) => {
				if (cache) {
					return cache;
				}

				return fetch(event.request);

			})
			.catch((error) => console.log('WTF', error)));

});
