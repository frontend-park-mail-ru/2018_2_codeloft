export default class Bonus {
	constructor(x, y) {
		this._effect = Math.floor(Math.random() * 1000) % 3;
		this._x = x;
		this._y = y;
	}

	getEffect() {
		return this._effect;
	}

	getX() {
		return this._x;
	}

	getY() {
		return this._y;
	}
}
