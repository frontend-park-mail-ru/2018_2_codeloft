import Arena from './Arena/Arena.js';
import Player from './Player/Player.js';

export default class BaseGameHandler {
	constructor(players, arenaClassName) {
		this.keyCodeMap = {
			37: 'LEFT',
			38: 'UP',
			39: 'RIGHT',
			40: 'DOWN',
			65: 'LEFT',
			87: 'UP',
			68: 'RIGHT',
			83: 'DOWN',
		};
		this._arena = new Arena(arenaClassName);
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
	}

	keyControl(event) {

	}

	gameLoop() {

	}

	startGame() {
		window.addEventListener('keydown', this.keyHandler);
		window.addEventListener('keypress', this.keyHandler);
		this._gameLoops.push(setInterval(this.gameLoop.bind(this), 10));
	}

	stopGame() {
		window.removeEventListener('keydown', this.keyHandler);
		window.removeEventListener('keypress', this.keyHandler);
		this._gameLoops.forEach((loop) => clearInterval(loop));
	}
}
