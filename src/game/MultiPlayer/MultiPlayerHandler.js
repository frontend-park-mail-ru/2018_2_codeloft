import BaseGameHandler from '../BaseGameHandler.js';
import eventBus from '../../modules/EventBus/EventBus.js';
import GameSocket from '../../services/GameSocket/GameSocket.js';

export default class MultiPlayerHandler extends BaseGameHandler {
	constructor(players = [], arenaClassName) {
		super(players, arenaClassName);
		this.arrayHandler = this.arrayInit.bind(this);
		eventBus.on('connectedToRoom', this.arrayHandler);
		this.fieldUpdater = this.updateField.bind(this);
		eventBus.on('fieldUpdated', this.fieldUpdater);
		this.deathHandler = this.handleDeath.bind(this);
		eventBus.on('protagonistIsDead', this.deathHandler);
		this._playersArrayMap = {};
	}

	arrayInit(payload) {
		this._arena.scaleGameField(payload.size.x, payload.size.y);
		// this._fieldArray = payload;
		// let i = 0;
		// let j = 0;
		// this._fieldArray.forEach((arr) => {
		// 	j = 0;
		// 	arr.forEach((pixel) => {
		// 		if (pixel.id !== 0) {
		// 			this._arena.drawPixel(j, i);
		// 		}
		// 		this.handlePlayerCoords(pixel.id, i, j);
		// 		j++;
		// 	});
		// 	i++;
		// });
	}

	handleDeath(payload) {
		payload.diff.forEach((cellObject) => {
			console.log(cellObject.pos);
			this._arena.clearPixel(cellObject.pos.x, cellObject.pos.y);
		});
	}

	handlePlayerCoords(id, i, j) {
		const coordObject = {
			x: j,
			y: i,
		};
		if (!this._playersArrayMap[id]) {
			this._playersArrayMap[id] = [];
		}
		this._playersArrayMap[id].push(coordObject);
	}

	keyControl(event) {
		const action = this.keyCodeMap[event.keyCode];
		this._gameSocket.sendDirection(action);
	}

	updateField(payload) {
		payload.diff.forEach((cellObject) => {
			this._arena.drawPixel(cellObject.pos.x, cellObject.pos.y, cellObject.color);
		});
		// payload.players.forEach((playerInfo) => {
		// 	console.log(playerInfo.is_dead);
		// 	if (!playerInfo.is_dead) {
		// 		this.handlePlayerCoords(playerInfo.id, playerInfo.position.y, playerInfo.position.x);
		// 		this._fieldArray[playerInfo.position.y][playerInfo.position.x].id = playerInfo.id;
		// 		this._arena.drawPixel(playerInfo.position.x, playerInfo.position.y);
		// 	} else if (this._playersArrayMap[playerInfo.id]) {
		// 		this._playersArrayMap[playerInfo.id].forEach((coordObject) => {
		// 			this._arena.clearPixel(coordObject.x, coordObject.y);
		// 		});
		// 		this._playersArrayMap[playerInfo.id] = undefined;
		// 	}
		// });
	}

	startGame() {
		this._gameSocket = new GameSocket();
		super.startGame();
	}

	stopGame() {
		eventBus.off('connectedToRoom', this.arrayHandler);
		setTimeout(() => this._gameSocket.endSession(), 100);
		super.stopGame();
	}
}
