export default class Player {
	constructor(isProtagonist = false, x = 10, y = 10, color = '#FFE64D') {
		this._xCoord = x;
		this._yCoord = y;
		this._radius = 4;
		this._color = color;
		this._isProtagonist = isProtagonist;
		this._xSpeed = 2;
		this._ySpeed = 2;
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

	move(action) {
		if (action === 'RIGHT') {
			this._xCoord += this._xSpeed;
		} else if (action === 'TOP') {
			this._yCoord -= this._ySpeed;
		} else if (action === 'LEFT') {
			this._xCoord -= this._xSpeed;
		} else if (action === 'DOWN') {
			this._yCoord += this._ySpeed;
		}
	}
}