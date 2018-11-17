import BaseGameHandler from '../BaseGameHandler.js';
import eventBus from '../../modules/EventBus/EventBus';
import Timer from '../Timer/Timer.js';

const BASE_ROUND_TIME = 60;

export default class SinglePlayerHandler extends BaseGameHandler {
	constructor(players = []) {
		super(players);
		this._goalHandler = this.handleGoalCollision.bind(this);
		eventBus.on('goalCollision', this._goalHandler);
		this._gameTimer = new Timer(BASE_ROUND_TIME);
	}

	handleGoalCollision(details) {
		details.player.addScore(details.scoreBonus);
		eventBus.emit('scoreRedraw', details.player.getScore());
		this._arena.clearGoal();
		this._arena.spawnGoal(this.players);
	}

	startGame() {
		super.startGame();
		this._arena.spawnGoal(this.players);
	}

	gameLoop() {
		this._arena.clearField();
		this.players.forEach((player) => {
			this._arena.clearPlayer(player);
			this._arena.checkBorderCollision(player);
			this._arena.checkGoalCollision(player);
			if (this._arena.canMove(player)) {
				player.move();
			}
			this._arena.drawPlayer(player);
			this._arena.drawGoal();
		});
	}

	stopGame() {
		super.stopGame();
		eventBus.off('goalCollision', this._goalHandler);
	}
}
