export default class Player {
	constructor(isProtagonist = false, x = 50, y = 50, color = '#FFE64D') {
		this._xCoord = x;
		this._yCoord = y;
		this._radius = 20;
		this._color = color;
		this._isProtagonist = isProtagonist;
		this._speed = 4;
		this._xSpeed = this._speed;
		this._ySpeed = 0;
		this._score = 0;
		this._goalsPassed = 0;
		this.speedHandleMap = {
			RIGHT: () => this._xSpeed = this._speed,
			LEFT: () => this._xSpeed = -this._speed,
			UP: () => this._ySpeed = -this._speed,
			DOWN: () => this._ySpeed = this._speed,
		};
	}

	main() {
		return this._isProtagonist;
	}

	getColor() {
		return this._color;
	}

	getX() {
		return this._xCoord;
	}

	getY() {
		return this._yCoord;
	}

	getRadius() {
		return this._radius;
	}

	setDirection(action) {
		this._xSpeed = 0;
		this._ySpeed = 0;
		this.speedHandleMap[action]();
	}

	resetDiretions() {
		this._xSpeed = 0;
		this._ySpeed = 0;
	}

	getDirection() {
		return {
			x: this._xSpeed,
			y: this._ySpeed,
		};
	}

	addGoal() {
		this._goalsPassed++;
	}

	getGoalsPassed() {
		return this._goalsPassed;
	}

	addScore(value) {
		this._score += value;
	}

	getScore() {
		return this._score;
	}

	move() {
		this._xCoord += this._xSpeed;
		this._yCoord += this._ySpeed;
	}

	setX(x) {
		this._xCoord = x;
	}

	setY(y) {
		this._yCoord = y;
	}
}
