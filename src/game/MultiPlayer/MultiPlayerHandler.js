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
		this._prevPlayerHeads = [];
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
		this._prevPlayerHeads.forEach((player) => {
			this._arena.clearPlayerHead(player.position.x, player.position.y, player.move_direction);
		});
		this._prevPlayerHeads = data.payload.players;
		data.payload.diff.forEach((cellObject) => {
			this._cachedField[cellObject.pos.y][cellObject.pos.x] = cellObject.color;
			this._arena.drawPixel(cellObject.pos.x, cellObject.pos.y, cellObject.color);
		});
		data.payload.players.forEach((player) => {
			this._arena.drawPlayerHead(player.position.x, player.position.y, player.move_direction);
		});
	}

	startGame() {
		this._arena.loadTextures().then(() => {
			this._gameSocket = new GameSocket();
			super.startGame();
		});
	}

	stopGame() {
		eventBus.off('gameFieldResized', this.arrayHandler);
		eventBus.off('connectedToRoom', this.arrayHandler);
		eventBus.off('fieldUpdated', this.fieldUpdater);
		this._gameSocket.endSession();
		super.stopGame();
	}
}
