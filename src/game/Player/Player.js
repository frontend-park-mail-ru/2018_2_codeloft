export default class Player {
	constructor(isProtagonist = false, x = 10, y = 10, color = '#FFE64D') {
		this._xCoord = x;
		this._yCoord = y;
		this._radius = 4;
		this._color = color;
		this._isProtagonist = isProtagonist;
		this._speed = 2;
		this._xSpeed = 0;
		this._ySpeed = 0;
		this._traceArray = [];
	}

	isMain() {
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
		if (action === 'RIGHT') {
			this._xSpeed = this._speed;
		} else if (action === 'TOP') {
			this._ySpeed = -this._speed;
		} else if (action === 'LEFT') {
			this._xSpeed = -this._speed;
		} else if (action === 'DOWN') {
			this._ySpeed = this._speed;
		}
	}

	removeDirection(action) {
		if (action === 'RIGHT') {
			this._xSpeed = 0;
		} else if (action === 'TOP') {
			this._ySpeed = 0;
		} else if (action === 'LEFT') {
			this._xSpeed = 0;
		} else if (action === 'DOWN') {
			this._ySpeed = 0;
		}
	}

	move() {
		this._xCoord += this._xSpeed;
		this._yCoord += this._ySpeed;
	}
}
