'use strict';

import userService from '../UserService/UserService';
import eventBus from '../../modules/EventBus';

const CONNECTED_MESSAGE = 'connected';
const PLAYER_MOVEMENT_MESSAGE = 'IN_GAME';
const CHANGE_DIRECTION_MESSAGE = 'change_direction';
const DEATH_MESSAGE = 'DEAD';

export default class GameSocket {
    private roomSocket: WebSocket;

    constructor() {
        this.roomSocket = new WebSocket('wss://backend.codeloft.ru/gamews');
        this.roomSocket.onopen = () => {
            this.roomSocket.send(JSON.stringify(userService.getUserInfo('login')));
        };
        this.roomSocket.onmessage = (msg) => {
            const receivedData = JSON.parse(msg.data);
            if (receivedData.type === CONNECTED_MESSAGE) {
                eventBus.emit('connectedToRoom', receivedData.payload);
            } else if (receivedData.type === PLAYER_MOVEMENT_MESSAGE || receivedData.type === DEATH_MESSAGE) {
                eventBus.emit('fieldUpdated', receivedData);
            }
        };
    }

    public sendDirection(direction) {
        const info = {
            type: CHANGE_DIRECTION_MESSAGE,
            payload: direction,
        };
        this.roomSocket.send(JSON.stringify(info));
    }

    public endSession() {
        this.roomSocket.close();
    }
}
