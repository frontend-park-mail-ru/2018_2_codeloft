import Arena from './Arena/Arena.js';
import Player from './Player/Player.js';
import eventBus from '../modules/EventBus/EventBus.js';

export default class BaseGameHandler {
	constructor(players) {
		this.pressedKeysMap = {
			LEFT: false,
			TOP: false,
			RIGHT: false,
			DOWN: false,
		};
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
			if (player.main()) {
				this._protagonist = player;
			}
			this._arena.drawPlayer(player);
		});
		this.players = players;
		if (!this._protagonist) {
			this._protagonist = new Player(true);
			this.players.push(this._protagonist);
		}
		this.keyHandler = this.keyControl.bind(this);
		this._gameLoops = [];
		this._goalHandler = this.handleGoalCollision.bind(this);
		eventBus.on('goalCollision', this._goalHandler);
	}

	keyControl(event) {
		if (event.type === 'keypress' || event.type === 'keydown') {
			const action = this.keyCodeMap[event.keyCode];
			if (action) {
				this.pressedKeysMap[action] = true;
				this._protagonist.setDirection(this.pressedKeysMap);
			}
		} else if (event.type === 'keyup') {
			const action = this.keyCodeMap[event.keyCode];
			if (action) {
				this.pressedKeysMap[action] = false;
				this._protagonist.setDirection(this.pressedKeysMap);
			}
		}
	}

	handleGoalCollision(details) {
		if (details.player === this._protagonist) {
			details.player.addScore(details.scoreBonus);
			eventBus.emit('scoreRedraw', details.player.getScore());
		}
		this._arena.clearGoal();
		this._arena.spawnGoal();
	}

	gameLoop() {
		this._arena.clearField();
		this.players.forEach((player) => {
			this._arena.clearPlayer(player);
			this._arena.checkBorderCollision(player);
			this._arena.checkGoalCollision(player);
			player.move();
			this._arena.drawPlayer(player);
			this._arena.drawGoal();
		});
	}

	startGame() {
		window.addEventListener('keydown', this.keyHandler);
		window.addEventListener('keyup', this.keyHandler);
		window.addEventListener('keypress', this.keyHandler);
		this._gameLoops.push(setInterval(this.gameLoop.bind(this), 5));
		this._arena.spawnGoal();
		// this._gameLoops.push(setInterval(this._arena.spawnGoal.bind(this._arena), 50000));
	}

	stopGame() {
		window.removeEventListener('keydown', this.keyHandler);
		window.removeEventListener('keyup', this.keyHandler);
		window.removeEventListener('keypress', this.keyHandler);
		this._gameLoops.forEach((loop) => clearInterval(loop));
		eventBus.off('goalCollision', this._goalHandler);
	}
}
