import BaseGameHandler from '../BaseGameHandler.js';
import eventBus from '../../modules/EventBus/EventBus';
import Timer from '../Timer/Timer.js';

const BASE_ROUND_TIME = 60;

export default class SinglePlayerHandler extends BaseGameHandler {
	constructor(players = [], arenaClassName) {
		super(players, arenaClassName);
		this._goalHandler = this.handleGoalCollision.bind(this);
		this._gameTimer = new Timer(BASE_ROUND_TIME);
		eventBus.on('goalCollision', this._goalHandler);
	}

	handleGoalCollision(details) {
		details.player.addScore(details.scoreBonus);
		eventBus.emit('scoreRedraw', details.player.getScore());
		this._gameTimer.addDuration(Math.round(details.scoreBonus / 4));
		eventBus.emit('timerTick', this._gameTimer.getTimeLeft());
		this._arena.clearGoal();
		this._arena.spawnGoal(this.players);
	}

	keyControl(event) {
		const action = this.keyCodeMap[event.keyCode];
		if (action) {
			this._protagonist.setDirection(action);
		}
	}

	startGame() {
		super.startGame();
		this._arena.spawnGoal(this.players);
		this._gameTimer.start();
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
		this._gameTimer.stop();
		eventBus.off('goalCollision', this._goalHandler);
	}
}
