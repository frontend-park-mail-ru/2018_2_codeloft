export default class Player {
    private xCoord: number;
    private yCoord: number;
    private readonly radius: number;
    private readonly color: string;
    private speed: number;
    private xSpeed: number;
    private ySpeed: number;
    private score: number;
    private goalsPassed: number;
    private readonly isProtagonist: boolean;
    private bounced: boolean;
    private readonly speedHandleMap: object;

    constructor(isProtagonist = false, x = 50, y = 50, color = '#FFE64D') {
        this.xCoord = x;
        this.yCoord = y;
        this.radius = 15;
        this.color = color;
        this.isProtagonist = isProtagonist;
        this.speed = 5;
        this.xSpeed = this.speed;
        this.ySpeed = 0;
        this.score = 0;
        this.goalsPassed = 0;
        this.bounced = false;
        this.speedHandleMap = {
            RIGHT: () => this.xSpeed = this.speed,
            LEFT: () => this.xSpeed = -this.speed,
            UP: () => this.ySpeed = -this.speed,
            DOWN: () => this.ySpeed = this.speed,
        };
    }

    public main() {
        return this.isProtagonist;
    }

    public getColor() {
        return this.color;
    }

    public getX() {
        return this.xCoord;
    }

    public getY() {
        return this.yCoord;
    }

    public getRadius() {
        return this.radius;
    }

    public bounce() {
        this.xSpeed = -this.xSpeed;
        this.ySpeed = -this.ySpeed;
        this.bounced = true;
        setTimeout(this.unBounce.bind(this), 10);
    }

    public setDirection(action) {
        if (!this.bounced) {
            this.xSpeed = 0;
            this.ySpeed = 0;
            this.speedHandleMap[action]();
        }
    }

    public resetDiretions() {
        this.xSpeed = 0;
        this.ySpeed = 0;
    }

    public getDirection() {
        return {
            x: this.xSpeed,
            y: this.ySpeed,
        };
    }

    public resetScore() {
        this.goalsPassed = 0;
        this.score = 0;
    }

    public addGoal() {
        this.goalsPassed++;
    }

    public getGoalsPassed() {
        return this.goalsPassed;
    }

    public addScore(value) {
        this.score += value;
    }

    public getScore() {
        return this.score;
    }

    public move() {
        this.xCoord += this.xSpeed;
        this.yCoord += this.ySpeed;
    }

    public setX(x) {
        this.xCoord = x;
    }

    public setY(y) {
        this.yCoord = y;
    }

    public speedBonus() {
        this.speed *= 1.4;
        this.calcSpeed();
        setTimeout(() => {
            this.speed /= 1.4;
            this.calcSpeed();
        }, 5000);
    }

    private unBounce() {
        this.bounced = false;
    }

    private calcSpeed() {
        if (this.xSpeed > 0) {
            this.xSpeed = this.speed;
        } else if (this.xSpeed < 0) {
            this.xSpeed = -this.speed;
        } else {
            this.xSpeed = 0;
        }
        if (this.ySpeed > 0) {
            this.ySpeed = this.speed;
        } else if (this.ySpeed < 0) {
            this.ySpeed = -this.speed;
        } else {
            this.ySpeed = 0;
        }
    }
}
