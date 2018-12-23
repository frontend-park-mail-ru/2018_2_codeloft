export default function serviceWorkerRegister() {
    if ('serviceWorker' in navigator) {
        console.log('SW not found. Trying to install...');
        navigator.serviceWorker.register('/worker.js', {scope: '/'})
            .then((registration) => {
                console.log('success register of SW: ', registration);
            })
            .catch((error) => {
                console.log('Registration FAILED: ', error);
            });
    }
}
