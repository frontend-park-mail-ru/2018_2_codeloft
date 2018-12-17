export default class Goal {
	constructor(x1, y1, x2, y2) {
		this._xCoord1 = x1;
		this._yCoord1 = y1;
		this._xCoord2 = x2;
		this._yCoord2 = y2;
		this._radius = 15;
		this._age = 0;
		this.c1 = this.getCoords().y2 - this.getCoords().y1;
		this.c2 = this.getCoords().x2 * this.getCoords().y1
            - this.getCoords().x1 * this.getCoords().y2;
		this.c3 = this.getCoords().x2 - this.getCoords().x1;
		this.length = Math.sqrt((this._xCoord1 - this._xCoord2) * (this._xCoord1 - this._xCoord2)
			+ (this._yCoord1 - this._yCoord2) * (this._yCoord1 - this._yCoord2));
	}

	calculateY(x) {
	    return Math.round((this.c1 * x + this.c2) / this.c3);
	}

	inInterval(y) {
		return y <= Math.max(this._yCoord1, this._yCoord2)
			&& y >= Math.min(this._yCoord1, this._yCoord2);
	}

	getLength() {
		return this.length;
	}

	getRadius() {
		return this._radius;
	}

	ageIncr() {
		this._age++;
	}

	getAge() {
		return this._age;
	}

	getCoords() {
		return {
			x1: this._xCoord1,
			y1: this._yCoord1,
			x2: this._xCoord2,
			y2: this._yCoord2,
		};
	}
}
