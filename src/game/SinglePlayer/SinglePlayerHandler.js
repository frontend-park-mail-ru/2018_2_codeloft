import BaseGameHandler from '../BaseGameHandler.js';
import eventBus from '../../modules/EventBus/EventBus';
import Timer from '../Timer/Timer.js';

const BASE_ROUND_TIME = 30;

export default class SinglePlayerHandler extends BaseGameHandler {
	constructor(players = [], arenaClassName) {
		super(players, arenaClassName);
		this._bonusMap = {
			0: (player) => player.speedBonus(),
			1: (player) => {
				player.addScore(50);
				eventBus.emit('scoreRedraw', player.getScore());
			},
			2: () => {
				this._gameTimer.addDuration(5);
				eventBus.emit('timerTick', this._gameTimer.getTimeLeft());
			}
		};
		this._goalHandler = this.handleGoalCollision.bind(this);
		this._bonusHandler = this.handleBonusCollision.bind(this);
		this._goalSpawner = () => this._arena.spawnGoal(this.players);
		this._goalSpawner = this._goalSpawner.bind(this);
		this._ageHandler = () => this._arena.handleObjectsAge();
		this._ageHandler = this._ageHandler.bind(this);
		this._bonusSpawner = this._arena.spawnBonus.bind(this._arena);
		this._gameTimer = new Timer(BASE_ROUND_TIME);
		eventBus.on('goalCollision', this._goalHandler);
		eventBus.on('bonusCollision', this._bonusHandler);
		eventBus.on('spawnGoal', this._goalSpawner);
		eventBus.on('timerTick', this._ageHandler);
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

	handleBonusCollision(details) {
		this._arena.resetBonus();
		this._bonusMap[details.effect](details.player);
	}

	keyControl(event) {
		const action = this.keyCodeMap[event.keyCode];
		if (action) {
			this._protagonist.setDirection(action);
		}
	}

	startGame() {
		this._gameLoops.push(setInterval(this._bonusSpawner, 8000));
		super.startGame();
		this.players.forEach((player) => {
			player.resetScore();
		});
		this._arena.spawnGoal(this.players);
		this._arena.spawnBonus();
		this._gameTimer.start();
	}

	gameLoop() {
		this._arena.clearField();
		this.players.forEach((player) => {
			this._arena.clearPlayer(player);
			this._arena.checkBorderCollision(player);
			this._arena.checkGoalCollision(player);
			this._arena.checkBonusCollision(player);
			if (this._arena.canMove(player)) {
				player.move();
			}
			this._arena.drawPlayer(player);
			this._arena.drawGoal();
			this._arena.drawBonus();
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
		eventBus.off('timerTick', this._ageHandler);
	}
}
