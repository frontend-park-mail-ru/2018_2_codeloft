import Goal from '../Goal/Goal.js';
import eventBus from '../../modules/EventBus/EventBus.js';

const SCORE_RATE = 2;
const GOAL_RADIUS = 10;
const GOALS_AMOUNT = 2;

export default class Arena {
	constructor(arenaClassName) {
		this._gameBlock = document.getElementsByClassName(arenaClassName)[0];
		this._context = this._gameBlock.getContext('2d');
		this._xMin = this._gameBlock.getBoundingClientRect().x + 5;
		this._yMin = this._gameBlock.getBoundingClientRect().y + 5;
		this._xMax = this._gameBlock.getBoundingClientRect().width - this._xMin - 5;
		this._yMax = this._gameBlock.getBoundingClientRect().height - this._yMin - 5;
		this.resized = false;
		this._diagonal = Math.sqrt((this._xMax - this._xMin) * (this._xMax - this._xMin)
			+ (this._yMax - this._yMin) * (this._yMax - this._yMin));
		this._goalArray = [];
		window.addEventListener('resize', this.resizeGameField.bind(this));
		this.resizeGameField();
		this.clearField();
	}

	resizeGameField() {
		this._gameBlock.width = window.innerWidth;
		this._gameBlock.height = window.innerHeight;
		this._scaleX = this._gameBlock.width / 160;
		this._scaleY = this._gameBlock.height / 90;
		this.resized = true;
	}

	canMove(player) {
		if (player) {
			this._goalArray.forEach((goal) => {
				const deltaX1 = goal.getCoords().x1 - (player.getX() + player.getDirection().x);
				const deltaY1 = goal.getCoords().y1 - (player.getY() + player.getDirection().y);
				const deltaX2 = goal.getCoords().x2 - (player.getX() + player.getDirection().x);
				const deltaY2 = goal.getCoords().y2 - (player.getY() + player.getDirection().y);
				if (Math.sqrt(deltaX1 * deltaX1 + deltaY1 * deltaY1) < player.getRadius() + goal.getRadius() - 1) {
					player.bounce('x');
				}
				if (Math.sqrt(deltaX2 * deltaX2 + deltaY2 * deltaY2) < player.getRadius() + goal.getRadius() - 1) {
					player.bounce('y');
				}
			});
			return true;
		}
		return false;
	}

	clearField() {
		this._context.beginPath();
		this._context.fillStyle = '#0C141F';
		this._context.fillRect(this._xMin, this._yMin, this._xMax, this._yMax);
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

	drawPlayer(player) {
		if (player) {
			this._context.globalCompositeOperation = 'source-over';
			this._context.beginPath();
			this._context.arc(player.getX(), player.getY(), player.getRadius(), 0, 2 * Math.PI);
			this._context.fillStyle = player.getColor();
			this._context.fill();
			this._context.closePath();
		}
	}

	_checkCollision(players, coords) {
		let collision = false;
		players.forEach((player) => {
			const deltaX1 = coords.firstX - (player.getX() + player.getDirection().x);
			const deltaY1 = coords.firstY - (player.getY() + player.getDirection().y);
			const deltaX2 = coords.secondX - (player.getX() + player.getDirection().x);
			const deltaY2 = coords.secondY - (player.getY() + player.getDirection().y);
			if (Math.sqrt(deltaX1 * deltaX1 + deltaY1 * deltaY1) < player.getRadius() + GOAL_RADIUS - 1) {
				collision = true;
			}
			if (Math.sqrt(deltaX2 * deltaX2 + deltaY2 * deltaY2) < player.getRadius() + GOAL_RADIUS - 1) {
				collision = true;
			}
		});
		return collision;
	}

	spawnGoal(players) {
		this._goalArray = [];
		const coords = {};
		coords.firstX = Math.floor(Math.random() * (this._xMax - 300 - this._xMin + 20) + this._xMin + 20);
		coords.firstY = Math.floor(Math.random() * (this._yMax - 300 - this._yMin + 20) + this._yMin + 20);

		coords.secondX = Math.floor(Math.random() * (coords.firstX + 80 - coords.firstX + 50)) + coords.firstX + 50;
		coords.secondY = Math.floor(Math.random() * (coords.firstY + 80 - coords.firstY + 50)) + coords.firstY + 50;

		if (!this._checkCollision(players, coords)) {
			this._goalArray.push(new Goal(coords.firstX, coords.firstY, coords.secondX, coords.secondY));
			this.drawGoal();
		} else {
			this.spawnGoal(players);
		}
	}

	_generateGoal() {
		const coords = {};
		coords.firstX = Math.floor(Math.random() * (this._xMax - 300 - this._xMin + 20) + this._xMin + 20);
		coords.firstY = Math.floor(Math.random() * (this._yMax - 300 - this._yMin + 20) + this._yMin + 20);

		coords.secondX = Math.floor(Math.random() * (coords.firstX + 80 - coords.firstX + 50)) + coords.firstX + 50;
		coords.secondY = Math.floor(Math.random() * (coords.firstY + 80 - coords.firstY + 50)) + coords.firstY + 50;
	}

	drawGoal() {
		this._goalArray.forEach((goal) => {
			this._context.globalCompositeOperation = 'source-over';
			this._context.beginPath();
			this._context.arc(goal.getCoords().x1, goal.getCoords().y1,
				goal.getRadius() + 2, 0, 2 * Math.PI);
			this._context.arc(goal.getCoords().x2, goal.getCoords().y2,
				goal.getRadius() + 2, 0, 2 * Math.PI);
			this._context.fillStyle = '#FFE64D';
			this._context.fill();
			this._context.closePath();

			// setInterval(this.goalAnimate, 50);

			this._context.beginPath();
			this._context.moveTo(goal.getCoords().x1, goal.getCoords().y1);
			this._context.lineTo(goal.getCoords().x2, goal.getCoords().y2);
			this._context.strokeStyle = '#FFE64D';
			this._context.lineWidth = 5;
			this._context.stroke();
			this._context.closePath();
		});
	}

	drawPixel(x, y) {
		this._context.beginPath();
		this._context.arc(x * this._scaleX, y * this._scaleY, 6, 0, 2 * Math.PI);
		this._context.fillStyle = '#FFE64D';
		this._context.fill();
		this._context.closePath();
	}

	clearPixel(x, y) {
		this._context.beginPath();
		this._context.arc(x * this._scaleX, y * this._scaleY, 7, 0, 2 * Math.PI);
		this._context.fillStyle = '#0C141F';
		this._context.fill();
		this._context.closePath();
	}

	clearGoal() {
		this._goalArray.forEach((goal) => {
			this._context.globalCompositeOperation = 'destination-out';
			this._context.beginPath();
			this._context.arc(goal.getCoords().x1, goal.getCoords().y1,
				goal.getRadius() + 2, 0, 2 * Math.PI);
			this._context.arc(goal.getCoords().x2, goal.getCoords().y2,
				goal.getRadius() + 2, 0, 2 * Math.PI);
			this._context.fillStyle = '#0C141F';
			this._context.fill();
			this._context.closePath();

			this._context.beginPath();
			this._context.moveTo(goal.getCoords().x1, goal.getCoords().y1);
			this._context.lineTo(goal.getCoords().x2, goal.getCoords().y2);
			this._context.strokeStyle = '#FFE64D';
			this._context.lineWidth = 7;
			this._context.stroke();
			this._context.closePath();
		});
	}

	goalAnimate(x, y) {
		this._context.beginPath();
		this._context.arc(x, y, 10, 0, 2 * Math.PI);
		this._context.fillStyle = '#FFE64D';
		this._context.fill();
		this._context.closePath();
	}

	checkGoalCollision(player) {
		this._goalArray.forEach((goal) => {
			if (player.getY() <= goal.calculateY(player.getX()) + 6
				&& player.getY() >= goal.calculateY(player.getX()) - 6
				&& goal.inInterval(player.getY())) {
				eventBus.emit('goalCollision', {
					player: player,
					scoreBonus: Math.round(this._diagonal / (SCORE_RATE * goal.getLength()))
				});
			}
		});
	}

	checkBorderCollision(player) {
		if (player.getX() < this._xMin) {
			player.setX(this._xMax);
		}
		if (player.getY() < this._yMin) {
			player.setY(this._yMax);
		}
		if (player.getX() > this._xMax) {
			player.setX(this._xMin);
		}
		if (player.getY() > this._yMax) {
			player.setY(this._yMin);
		}
	}
}
