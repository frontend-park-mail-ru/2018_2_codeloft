'user strict';

export default class Player {
	constructor(x, y, speed, radius, context, colorArray) {
		this.context = context;
		this.colorArray = colorArray;

		this.userCoord = {
		    x: x,
			y: y,
			radius: radius,
			speed: speed,
		};
	}

	draw() {
		this.context.beginPath();

		// const gradient = this.context.createRadialGradient(this.userCoord.x, this.userCoord.y,
		// 	0, this.userCoord.x, this.userCoord.y, this.userCoord.radius);
		// gradient.addColorStop(0, this.colorArray[0]);
		// gradient.addColorStop(0.5, this.colorArray[1]);
		// gradient.addColorStop(1, this.colorArray[2]);
		// this.context.arc(this.userCoord.x, this.userCoord.y, this.userCoord.radius, 0, Math.PI * 2, false);
		// this.context.fillStyle = gradient;

		this.context.rect(this.userCoord.x, this.userCoord.y, this.userCoord.radius, this.userCoord.radius);
		this.context.fillStyle = this.colorArray[1];

		this.context.fill();
		this.context.closePath();
	}

	update(coordX, coordY) {
		if (this.userCoord.x !== coordX) {
			if (this.userCoord.x < coordX) {
				this.userCoord.x += this.userCoord.speed;
				if (this.userCoord.x > coordX) {
					this.userCoord.x = coordX;
				}
			}
			if (this.userCoord.x > coordX) {
				this.userCoord.x -= this.userCoord.speed;
				if (this.userCoord.x < coordX) {
					this.userCoord.x = coordX;
				}
			}
		} else {
			if (this.userCoord.y < coordY) {
				this.userCoord.y += this.userCoord.speed;
			}
			if (this.userCoord.y > coordY) {
				this.userCoord.y -= this.userCoord.speed;
			}
		}

		this.draw();
	}

	getPlayerCoord() {
	    return this.userCoord;
	}
}
