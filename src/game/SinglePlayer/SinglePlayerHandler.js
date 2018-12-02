import BaseGameHandler from '../BaseGameHandler.js';
import eventBus from '../../modules/EventBus/EventBus';
import Timer from '../Timer/Timer.js';

const BASE_ROUND_TIME = 30;

export default class SinglePlayerHandler extends BaseGameHandler {
	constructor(players = [], arenaClassName) {
		super(players, arenaClassName);
		this._goalHandler = this.handleGoalCollision.bind(this);
		this._goalSpawner = () => this._arena.spawnGoal(this.players);
		this._goalSpawner = this._goalSpawner.bind(this);
		this._goalAgeHandler = () => this._arena.addGoalsAge();
		this._goalAgeHandler = this._goalAgeHandler.bind(this);
		this._gameTimer = new Timer(BASE_ROUND_TIME);
		eventBus.on('goalCollision', this._goalHandler);
		eventBus.on('spawnGoal', this._goalSpawner);
		eventBus.on('timerTick', this._goalAgeHandler);
	}

	handleGoalCollision(details) {
		details.player.addGoal();
		details.player.addScore(details.scoreBonus);
		eventBus.emit('scoreRedraw', details.player.getScore());
		this._gameTimer.addDuration(Math.floor(details.scoreBonus / 4));
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
		this.players.forEach((player) => {
			player.resetScore();
		});
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

	getScore() {
		return this._protagonist.getScore();
	}

	getGoalsPassed() {
		return this._protagonist.getGoalsPassed();
	}

	stopGame() {
		super.stopGame();
		this._arena.clearField();
		this._gameTimer.stop();
		eventBus.off('goalCollision', this._goalHandler);
		eventBus.off('spawnGoal', this._goalSpawner);
		eventBus.off('timerTick', this._goalAgeHandler);
	}
}
