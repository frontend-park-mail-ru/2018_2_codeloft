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
		this._prevPixels = [];
		this._cachedField = [];
		this._playersAmount = 0;
	}

	arrayInit(payload) {
		this._arena.clearMultiField();
		if (payload) {
			this._arena.scaleGameField(payload.size.x, payload.size.y);
			payload.field.forEach((array, i) => {
				this._cachedField.push([]);
				array.forEach((cell, j) => {
					this._cachedField[i].push(payload.field[i][j].color);
				});
			});
		}
		this._cachedField.forEach((array, i) => {
			array.forEach((cell, j) => {
				if (cell !== '#000000') {
					this._arena.drawPixel(j, i, cell);
				}
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
		const diff = data.payload.diff;
		this._prevPlayerHeads.forEach((player) => {
			this._arena.clearPlayerHead(player.position.x, player.position.y, player.move_direction, player.color);
		});
		diff.forEach((pixel) => {
			this._arena.drawPixel(pixel.pos.x, pixel.pos.y, pixel.color);

			if (this._cachedField[pixel.pos.y][pixel.pos.x] === '#000000') {
				this._arena.drawPixel(pixel.pos.x, pixel.pos.y, pixel.color);
				this._cachedField[pixel.pos.y][pixel.pos.x] = pixel.color;
			} else if (this._cachedField[pixel.pos.y][pixel.pos.x] !== '#000000' && pixel.color === '#000000') {
				this._arena.drawPixel([pixel.pos.x, pixel.pos.y, pixel.color]);
				this._cachedField[pixel.pos.y][pixel.pos.x] = pixel.color;
			} else if (this._cachedField[pixel.pos.y][pixel.pos.x] !== '#000000' && pixel.color !== '#000000') {
				this._arena.drawPixel(pixel.pos.x, pixel.pos.y, this._cachedField[pixel.pos.y][pixel.pos.x]);
				pixel.color = this._cachedField[pixel.pos.y][pixel.pos.x];
			}
		});
		this._cachedField.forEach((array, i) => {
			array.forEach((cell, j) => {
				if (cell !== '#000000') {
					this._arena.drawPixel(j, i, cell);
				}
			});
		});

		data.payload.players.forEach((player) => {
			if (!player.is_dead) {
				this._arena.drawPlayerHead(player.position.x, player.position.y, player.move_direction);
			}
		});
		this._prevPlayerHeads = data.payload.players;
	}

	startGame() {
		this._arena.loadTextures().then(() => {
			super.startGame();
			this._gameSocket = new GameSocket();
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
