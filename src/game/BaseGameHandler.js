import Arena from './Arena/Arena.js';
import Player from './Player/Player.js';
import eventBus from '../modules/EventBus/EventBus.js';

export default class BaseGameHandler {
	constructor(players = [new Player(true)]) {
		this.keyCodeMap = {
			37: 'LEFT',
			38: 'TOP',
			39: 'RIGHT',
			40: 'DOWN',
			65: 'LEFT',
			87: 'TOP',
			68: 'RIGHT',
			83: 'DOWN',
		};
		this._arena = new Arena();
		players.forEach((player) => {
			if (player.isMain()) {
				this._protagonist = player;
			}
			this._arena.drawPlayer(player);
		});
		if (!this._protagonist) {
			this._protagonist = new Player(true);
		}
		this.keyHandler = this.keyControl.bind(this);
		this._gameLoops = [];
	}

	keyControl(event) {
		if (event.type === 'keypress' || event.type === 'keydown') {
			const action = this.keyCodeMap[event.keyCode];
			if (action) {
				this._protagonist.setDirection(action);
			}
		} else if (event.type === 'keyup') {
			const action = this.keyCodeMap[event.keyCode];
			if (action) {
				this._protagonist.setDirection(action);
			}
			this._protagonist.removeDirection(action);
		}
	}

	gameLoop() {
		this._arena.clearPlayer(this._protagonist);
		this._arena.checkBorderCollision(this._protagonist);
		this._arena.checkGoalCollision(this._protagonist);
		this._protagonist.move();
		this._arena.drawPlayer(this._protagonist);
	}

	startGame() {
		window.addEventListener('keydown', this.keyHandler);
		window.addEventListener('keyup', this.keyHandler);
		window.addEventListener('keypress', this.keyHandler);
		this._gameLoops.push(setInterval(this.gameLoop.bind(this), 20));
		this._arena.spawnGoal();
		// this._gameLoops.push(setInterval(this._arena.spawnGoal.bind(this._arena), 50000));
	}

	stopGame() {
		window.removeEventListener('keydown', this.keyHandler);
		window.removeEventListener('keyup', this.keyHandler);
		window.removeEventListener('keypress', this.keyHandler);
		this._gameLoops.forEach((loop) => clearInterval(loop));
	}
}
