'use strict';

class GameSocket {
	constructor() {
		this._roomSocket = new WebSocket('wss://backend.codeloft.ru/gamews');
		this._roomSocket.onopen = () => {
			console.log('opened gamews');
			this.enterRoom();
		};
		this._roomSocket.onmessage = (msg) => {
			console.log(msg.data);
		};
	}

	enterRoom() {
		const initMessage = {
			type: 'connect_player',
		};
		this._roomSocket.send(JSON.stringify(initMessage));
		setTimeout(() => this._roomSocket.close(), 3000);
	}
}

const gameSocket = new GameSocket();
export default gameSocket;
