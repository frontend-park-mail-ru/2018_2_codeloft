export default class Socket {
	constructor(url) {
		this.url = url;
		this.socket = new WebSocket(url);
		this.socket.addEventListener('open', () => {
			console.log(`opened ${this.url}`);
		});
		this.socket.onmessage = (msg) => {
			console.log(msg.data);
		};
	}

	open() {
		this.socket.addEventListener('open', () => {
			console.log(`opened ${this.url}`);
		});
	}

	send(message) {
		this.socket.send(JSON.stringify(message));
	}

	close(code, reason) {
		if (this.socket && this.socket.readyState === WebSocket.OPEN) {
			this.socket.close(code, reason);
		}
	}
}
