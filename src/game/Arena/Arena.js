import Player from '../Player/Player.js';
import Goal from '../Goal/Goal.js';

export default class Arena {
	constructor() {
		this._gameBlock = document.getElementsByClassName('game-field')[0];
		this._context = this._gameBlock.getContext('2d');
		this._xZero = this._gameBlock.getBoundingClientRect().x;
		this._yZero = this._gameBlock.getBoundingClientRect().y;
		this._xMax = this._gameBlock.getBoundingClientRect().width - this._xZero;
		this._yMax = this._gameBlock.getBoundingClientRect().height - this._yZero;
		window.addEventListener('resize', this.resizeGameField.bind(this));
		this._currentGoal = {};
		this.resizeGameField();
		this.clearField();
	}

	resizeGameField() {
		this._gameBlock.width = window.innerWidth;
		this._gameBlock.height = window.innerHeight;
	}

	clearField() {
		this._context.beginPath();
		this._context.clearRect(0, 0, this._xMax, this._yMax);
		this._context.closePath();
		this._context.beginPath();
	}

	clearPlayer(player) {
		if (player) {
			this._context.globalCompositeOperation = 'destination-out';
			this._context.beginPath();
			this._context.arc(player.getX(), player.getY(), player.getRadius() + 2, 0, 2 * Math.PI);
			this._context.fillStyle = '#0C141F';
			this._context.fill();
			this._context.closePath();
		}
	}

	drawPlayer(player = new Player()) {
		this._context.globalCompositeOperation = 'source-over';
		this._context.beginPath();
		this._context.arc(player.getX(), player.getY(), player.getRadius(), 0, 2 * Math.PI);
		this._context.fillStyle = player.getColor();
		this._context.fill();
		this._context.closePath();
		return player;
	}

	spawnGoal() {
		const firstX = Math.floor(Math.random() * (this._xMax - 300 - this._xZero + 20) + this._xZero + 20);
		const firstY = Math.floor(Math.random() * (this._yMax - 300 - this._yZero + 20) + this._yZero + 20);

		const secondX = Math.floor(Math.random() * (firstX + 200 - firstX + 20)) + firstX + 20;
		const secondY = Math.floor(Math.random() * (firstY + 200 - firstY + 20)) + firstY + 20;

		this._currentGoal = new Goal(firstX, firstY, secondX, secondY);

		this._context.globalCompositeOperation = 'source-over';
		this._context.beginPath();
		this._context.arc(firstX, firstY, 10, 0, 2 * Math.PI);
		this._context.arc(secondX, secondY, 10, 0, 2 * Math.PI);
		this._context.fillStyle = '#FFE64D';
		this._context.fill();
		this._context.closePath();

		// setInterval(this.goalAnimate, 50);

		this._context.beginPath();
		this._context.moveTo(firstX, firstY);
		this._context.lineTo(secondX, secondY);
		this._context.strokeStyle = '#FFE64D';
		this._context.lineWidth = 5;
		this._context.stroke();
		this._context.closePath();
	}

	goalAnimate(x, y) {
		this._context.beginPath();
		this._context.arc(x, y, 10, 0, 2 * Math.PI);
		this._context.fillStyle = '#FFE64D';
		this._context.fill();
		this._context.closePath();
	}

	checkGoalCollision(player) {
		if (player.getY() <= this._currentGoal.calculateY(player.getX()) + 10
		&& player.getY() >= this._currentGoal.calculateY(player.getX()) - 10
		&& this._currentGoal.inInterval(player.getY())) {
			alert('yeah');
		}
	}

	checkBorderCollision(player) {
		if (player.getX() < this._xZero) {
			player.setX(this._xMax);
		}
		if (player.getY() < this._yZero) {
			player.setY(this._yMax);
		}
		if (player.getX() > this._xMax) {
			player.setX(this._xZero);
		}
		if (player.getY() > this._yMax) {
			player.setY(this._yZero);
		}
	}
}
