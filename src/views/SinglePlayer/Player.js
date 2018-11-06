'user strict';

export default class Player {
	constructor(x, y, speed, radius, context, color) {
		this.context = context;
		this.color = color;

		this.userCoord = {
		    x: x,
			y: y,
			radius: radius,
			speed: speed,
		};
	}

	draw() {
		this.context.beginPath();
		this.context.arc(this.userCoord.x, this.userCoord.y, this.userCoord.radius, 0, Math.PI * 2, false);
		this.context.fillStyle = this.color;
		this.context.fill();
		this.context.closePath();
	}

	update(keyUp, keyDown, keyLeft, keyRight) {
		const borderLeft = this.userCoord.x - this.userCoord.radius >= 0;
		const borderRight = this.userCoord.x + this.userCoord.radius <= window.innerWidth;
		const borderUp = this.userCoord.y - this.userCoord.radius > 0;
		const borderDown = this.userCoord.y + this.userCoord.radius < window.innerHeight;

		if (keyLeft === true && borderLeft) {
			this.userCoord.x -= this.userCoord.speed;
		}
		if (keyRight === true && borderRight) {
			this.userCoord.x += this.userCoord.speed;
		}
		if (keyUp === true && borderUp) {
			this.userCoord.y -= this.userCoord.speed;
		}
		if (keyDown === true && borderDown) {
			this.userCoord.y += this.userCoord.speed;
		}

		this.draw();
	}

	getPlayerCoord() {
	    return this.userCoord;
	}
}
