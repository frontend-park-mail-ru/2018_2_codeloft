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
				this._gameTimer.addDuration(10);
				eventBus.emit('timerTick', this._gameTimer.getTimeLeft());
			}
		};
		this._goalHandler = this.handleGoalCollision.bind(this);
		this._bonusHandler = this.handleBonusCollision.bind(this);
		this._goalSpawner = (index) => {
			this._arena.clearGoal(index);
			this._arena.spawnOneGoal(this.players);
		};
		this._goalSpawner = this._goalSpawner.bind(this);
		this._ageHandler = () => this._arena.handleObjectsAge();
		this._ageHandler = this._ageHandler.bind(this);
		this._bonusSpawner = this._arena.spawnBonus.bind(this._arena);
		this._gameTimer = new Timer(BASE_ROUND_TIME);
		eventBus.on('goalCollision', this._goalHandler);
		eventBus.on('bonusCollision', this._bonusHandler);
		eventBus.on('spawnGoals', this._goalSpawner);
		eventBus.on('timerTick', this._ageHandler);
	}

	handleGoalCollision(details) {
		details.player.addGoal();
		details.player.addScore(details.scoreBonus);
		eventBus.emit('scoreRedraw', details.player.getScore());
		this._gameTimer.addDuration(Math.round(details.scoreBonus / 5));
		eventBus.emit('timerTick', this._gameTimer.getTimeLeft());
		this._arena.clearGoal(details.index);
		this._arena.spawnOneGoal(this.players);
	}

	handleBonusCollision(details) {
		this._arena.resetBonus();
		this._bonusMap[details.effect](details.player);
	}

	keyControl(event) {
		const action = this.keyCodeMap[event.keyCode];
		if (action) {
			this._direction = action;
			this._protagonist.setDirection(this._direction);
		}
	}

	startGame() {
		this._arena.loadTextures().then(() => {
			this._direction = 'RIGHT';
			this._gameLoops.push(setInterval(this._bonusSpawner, 10000));
			super.startGame();
			this.players.forEach((player) => {
				player.resetScore();
			});
			this._arena.spawnGoals(this.players);
			this._arena.spawnBonus();
			this._gameTimer.start();
		});
	}

	gameLoop() {
		this._arena.clearSingleField();
		this.players.forEach((player) => {
			this._arena.clearPlayer(player, this._direction);
			this._arena.checkBorderCollision(player);
			this._arena.checkGoalCollision(player);
			this._arena.checkBonusCollision(player);
			if (this._arena.canMove(player, this._direction)) {
				player.move();
			}
			this._arena.drawPlayer(player, this._direction);
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
		this._arena.clearSingleField();
		super.stopGame();
		this._gameTimer.stop();
		eventBus.off('goalCollision', this._goalHandler);
		eventBus.off('spawnGoals', this._goalSpawner);
		eventBus.off('timerTick', this._ageHandler);
		eventBus.off('bonusCollision', this._bonusHandler);
	}
}
