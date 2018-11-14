import Arena from './Arena/Arena.js';
import Player from './Player/Player.js';
import eventBus from '../modules/EventBus/EventBus.js';

export default class BaseGameHandler {
	constructor(players = [new Player(true)]) {
		this.keyCodeMap = {
			a: 'LEFT',
			w: 'TOP',
			d: 'RIGHT',
			s: 'DOWN',
			ArrowLeft: 'LEFT',
			ArrowUp: 'TOP',
			ArrowRight: 'RIGHT',
			ArrowDown: 'DOWN',
		};
		this.pressedKeysMap = {
			LEFT: false,
			TOP: false,
			RIGHT: false,
			DOWN: false,
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
		eventBus.on('goalCollision', this.handleGoalCollision.bind(this));
	}

	keyControl(event) {
		if (event.type === 'keypress' || event.type === 'keydown') {
			const action = this.keyCodeMap[event.key];
			if (action) {
				this.pressedKeysMap[action] = true;
				this._protagonist.setDirection(this.pressedKeysMap);
			}
		} else if (event.type === 'keyup') {
			const action = this.keyCodeMap[event.key];
			if (action) {
				this.pressedKeysMap[action] = false;
				this._protagonist.setDirection(this.pressedKeysMap);
			}
		}
	}

	handleGoalCollision(player) {
		this._arena.clearGoal();
		this._arena.spawnGoal();
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
