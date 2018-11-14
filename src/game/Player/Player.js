export default class Player {
	constructor(isProtagonist = false, x = 50, y = 50, color = '#FFE64D') {
		this._xCoord = x;
		this._yCoord = y;
		this._radius = 20;
		this._color = color;
		this._isProtagonist = isProtagonist;
		this._speed = 1;
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

	setDirection(keyPressedMap) {
		this._xSpeed = 0;
		this._ySpeed = 0;
		if (keyPressedMap.RIGHT) {
			this._xSpeed += this._speed;
		}
		if (keyPressedMap.TOP) {
			this._ySpeed -= this._speed;
		}
		if (keyPressedMap.LEFT) {
			this._xSpeed -= this._speed;
		}
		if (keyPressedMap.DOWN) {
			this._ySpeed += this._speed;
		}
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
