import BaseGameHandler from '../BaseGameHandler';
import eventBus from '../../modules/EventBus';
import Timer from '../Timer/Timer';

const BASEROUNDTIME = 30;

export default class SinglePlayerHandler extends BaseGameHandler {
    private gameTimer: Timer;
    private direction: string;
    private readonly bonusMap: object;
    private readonly goalSpawner: (index) => void;
    private readonly goalHandler: (details) => void;
    private readonly bonusHandler: (details) => void;
    private readonly bonusSpawner: () => void;
    private readonly ageHandler: () => void;

    constructor(players = [], arenaClassName) {
        super(players, arenaClassName);
        this.bonusMap = {
            0: (player) => player.speedBonus(),
            1: (player) => {
                player.addScore(50);
                eventBus.emit('scoreRedraw', player.getScore());
            },
            2: () => {
                this.gameTimer.addDuration(5);
                eventBus.emit('timerTick', this.gameTimer.getTimeLeft());
            },
        };
        this.goalHandler = this.handleGoalCollision.bind(this);
        this.bonusHandler = this.handleBonusCollision.bind(this);
        this.goalSpawner = (index) => {
            this.arena.clearGoal(index);
            this.arena.spawnOneGoal(this.players);
        };
        this.goalSpawner = this.goalSpawner.bind(this);
        this.ageHandler = () => this.arena.handleObjectsAge();
        this.ageHandler = this.ageHandler.bind(this);
        this.bonusSpawner = this.arena.spawnBonus.bind(this.arena);
        this.gameTimer = new Timer(BASEROUNDTIME);
        eventBus.on('goalCollision', this.goalHandler);
        eventBus.on('bonusCollision', this.bonusHandler);
        eventBus.on('spawnGoals', this.goalSpawner);
        eventBus.on('timerTick', this.ageHandler);
    }

    public handleGoalCollision(details) {
        details.player.addGoal();
        details.player.addScore(details.scoreBonus);
        eventBus.emit('scoreRedraw', details.player.getScore());
        this.gameTimer.addDuration(Math.round(details.scoreBonus / 5));
        eventBus.emit('timerTick', this.gameTimer.getTimeLeft());
        this.arena.clearGoal(details.index);
        this.arena.spawnOneGoal(this.players);
    }

    public handleBonusCollision(details) {
        this.arena.resetBonus();
        this.bonusMap[details.effect](details.player);
    }

    public keyControl(event) {
        const action = this.keyCodeMap[event.keyCode];
        if (action) {
            this.direction = action;
            this.protagonist.setDirection(this.direction);
        }
    }

    public tapControl(event) {
        if (event.clientX < this.arena._xMax / 2 && this.direction === 'UP' || this.direction === 'DOWN') {
            this.direction = 'LEFT';
            this.protagonist.setDirection(this.direction);
        } else if (event.clientX > this.arena._xMax / 2 && this.direction === 'UP' || this.direction === 'DOWN') {
            this.direction = 'RIGHT';
            this.protagonist.setDirection(this.direction);
        } else if (event.clientY < this.arena._yMax / 2 && this.direction === 'RIGHT' || this.direction === 'LEFT') {
            this.direction = 'UP';
            this.protagonist.setDirection(this.direction);
        } else if (event.clientY > this.arena._yMax / 2 && this.direction === 'RIGHT' || this.direction === 'LEFT') {
            this.direction = 'DOWN';
            this.protagonist.setDirection(this.direction);
        }
    }

    public startGame() {
        this.arena.loadTextures().then(() => {
            this.direction = 'RIGHT';
            this.gameLoops.push(setInterval(this.bonusSpawner, 10000));
            super.startGame();
            this.players.forEach((player) => {
                player.resetScore();
            });
            this.arena.spawnGoals(this.players);
            this.arena.spawnBonus();
            this.gameTimer.start();
        });
    }

    public gameLoop() {
        this.arena.clearSingleField();
        this.players.forEach((player) => {
            this.arena.clearPlayer(player, this.direction);
            this.arena.checkBorderCollision(player);
            this.arena.checkGoalCollision(player);
            this.arena.checkBonusCollision(player);
            if (this.arena.canMove(player, this.direction)) {
                player.move();
            }
            this.arena.drawPlayer(player, this.direction);
            this.arena.drawGoal();
            this.arena.drawBonus();
        });
    }

    public getScore() {
        return this.protagonist.getScore();
    }

    public getGoalsPassed() {
        return this.protagonist.getGoalsPassed();
    }

    public stopGame() {
        this.arena.clearSingleField();
        super.stopGame();
        this.gameTimer.stop();
        eventBus.off('goalCollision', this.goalHandler);
        eventBus.off('spawnGoals', this.goalSpawner);
        eventBus.off('timerTick', this.ageHandler);
        eventBus.off('bonusCollision', this.bonusHandler);
    }
}
