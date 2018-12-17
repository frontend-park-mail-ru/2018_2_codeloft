'use strict';

import userService from '../UserService/UserService.js';
import eventBus from '../../modules/EventBus/EventBus.js';

const CONNECTED_MESSAGE = 'connected';
const PLAYER_MOVEMENT_MESSAGE = 'IN_GAME';
const CHANGE_DIRECTION_MESSAGE = 'change_direction';
const DEATH_MESSAGE = 'DEAD';

export default class GameSocket {
	constructor() {
		this._roomSocket = new WebSocket('wss://backend.codeloft.ru/gamews');
		this._roomSocket.onopen = () => {
			this._roomSocket.send(JSON.stringify(userService.getUserInfo('login')));
		};
		this._roomSocket.onmessage = (msg) => {
			const receivedData = JSON.parse(msg.data);
			if (receivedData.type === CONNECTED_MESSAGE) {
				eventBus.emit('connectedToRoom', receivedData.payload);
			} else if (receivedData.type === PLAYER_MOVEMENT_MESSAGE || receivedData.type === DEATH_MESSAGE) {
				eventBus.emit('fieldUpdated', receivedData);
			}
		};
	}

	sendDirection(direction) {
		const info = {
			type: CHANGE_DIRECTION_MESSAGE,
			payload: direction
		};
		this._roomSocket.send(JSON.stringify(info));
	}

	endSession() {
		this._roomSocket.close();
	}
}
