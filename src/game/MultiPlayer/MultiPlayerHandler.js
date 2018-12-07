import BaseGameHandler from '../BaseGameHandler.js';
import eventBus from '../../modules/EventBus/EventBus.js';
import GameSocket from '../../services/GameSocket/GameSocket.js';

export default class MultiPlayerHandler extends BaseGameHandler {
	constructor(players = [], arenaClassName) {
		super(players, arenaClassName);
		this.arrayHandler = this.arrayInit.bind(this);
		eventBus.on('connectedToRoom', this.arrayHandler);
		eventBus.on('gameFieldResized', this.arrayHandler);
		this.fieldUpdater = this.updateField.bind(this);
		eventBus.on('fieldUpdated', this.fieldUpdater);
		this.deathHandler = this.handleDeath.bind(this);
		// eventBus.on('protagonistIsDead', this.deathHandler);
		this._cachedField = {};
	}

	arrayInit(payload) {
		if (payload.size) {
			this._arena.scaleGameField(payload.size.x, payload.size.y);
		}
		payload.field.forEach((array, i) => {
			this._cachedField[i] = {};
			array.forEach((cell, j) => {
				this._arena.drawPixel(j, i, payload.field[i][j].color);
				this._cachedField[i][j] = payload.field[i][j].color;
			});
		});
	}

	handleDeath(payload) {
		payload.diff.forEach((cellObject) => {
			this._arena.clearPixel(cellObject.pos.x, cellObject.pos.y);
		});
	}

	keyControl(event) {
		const action = this.keyCodeMap[event.keyCode];
		this._gameSocket.sendDirection(action);
	}

	updateField(data) {
		data.payload.diff.forEach((cellObject) => {
			this._cachedField[cellObject.pos.y][cellObject.pos.x] = cellObject.color;
			this._arena.drawPixel(cellObject.pos.x, cellObject.pos.y, cellObject.color);
		});
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
