import Goal from '../Goal/Goal.js';
import eventBus from '../../modules/EventBus/EventBus.js';
import Bonus from '../Bonus/Bonus.js';

const SCORE_RATE = 2;
const GOAL_RADIUS = 10;

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
		const coords1 = this._generateGoal();
		let coords2 = this._generateGoal();

		while (Math.sqrt((coords1.firstX - coords2.firstX) * (coords1.firstX - coords2.firstX)) < this._xMax / 8
			|| Math.sqrt((coords1.secondX - coords2.secondX) * (coords1.secondX - coords2.secondX)) < this._yMax / 8
			|| Math.sqrt((coords1.firstY - coords2.firstY) * (coords1.firstY - coords2.firstY)) < this._xMax / 8
			|| Math.sqrt((coords1.secondY - coords2.secondY) * (coords1.secondY - coords2.secondY)) < this._yMax / 8) {
			coords2 = this._generateGoal();
		}

		if (!this._checkCollision(players, coords1) && !this._checkCollision(players, coords2)) {
			this._goalArray.push(new Goal(coords1.firstX, coords1.firstY, coords1.secondX, coords1.secondY));
			this._goalArray.push(new Goal(coords2.firstX, coords2.firstY, coords2.secondX, coords2.secondY));
			this.drawGoal();
		} else {
			this.spawnGoal(players);
		}
	}

	handleObjectsAge() {
		this._goalArray.forEach((goal) => {
			goal.ageIncr();
		});
	}

	_generateGoal() {
		const coords = {};

		coords.firstX = Math.floor(Math.random() * (this._xMax - 250 - this._xMin + 20) + this._xMin + 20);
		coords.firstY = Math.floor(Math.random() * (this._yMax - 250 - this._yMin + 20) + this._yMin + 20);

		coords.secondX = Math.floor(Math.random() * (coords.firstX + 80 - coords.firstX + 50)) + coords.firstX + 50;
		coords.secondY = Math.floor(Math.random() * (coords.firstY + 80 - coords.firstY + 50)) + coords.firstY + 50;

		return coords;
	}

	drawGoal() {
		if (this._goalArray.length) {
			if (this._goalArray[0].getAge() >= 5) {
				eventBus.emit('spawnGoal');
				return;
			}
		}
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

			this._context.fillStyle = '#3EC8AC';
			this._context.font = '4vmin serif';
			this._context.fillText(`${5 - goal.getAge()}`,
				Math.max(goal.getCoords().x1, goal.getCoords().x2) + goal.getRadius() + this._diagonal / 150,
				Math.max(goal.getCoords().y1, goal.getCoords().y2) + goal.getRadius() + this._diagonal / 150);
		});
	}

	_goalDist(x, y) {
		let max = this._yMax;
		this._goalArray.forEach((goal) => {
			const diff1 = Math.sqrt((x - goal.getCoords().x1) * (x - goal.getCoords().x1)
				+ (y - goal.getCoords().y1) * (y - goal.getCoords().y1));
			const diff2 = Math.sqrt((x - goal.getCoords().x2) * (x - goal.getCoords().x2)
				+ (y - goal.getCoords().y2) * (y - goal.getCoords().y2));
			max = Math.max(diff1, diff2, max);
		});
		return max;
	}

	spawnBonus() {
		let coords = this._generateBonus();
		while (this._goalDist(coords.x, coords.y) < this._diagonal / 100) {
			coords = this._generateBonus();
		}
		this._currentBonus = new Bonus(coords.x, coords.y);
	}

	_generateBonus() {
		const coords = {};
		coords.x = Math.floor(Math.random() * (this._xMax - 200 - this._xMin + 20) + this._xMin + 20);
		coords.y = Math.floor(Math.random() * (this._yMax - 200 - this._yMin + 20) + this._yMin + 20);
		return coords;
	}

	drawBonus() {
		if (this._currentBonus) {
			this._context.globalCompositeOperation = 'source-over';
			this._context.beginPath();
			this._context.arc(this._currentBonus.getX(), this._currentBonus.getY(),
				10 + 2, 0, 2 * Math.PI);
			this._context.fillStyle = '#FFE64D';
			this._context.fill();
			this._context.closePath();
		}
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

	checkBonusCollision(player) {
		if (player && this._currentBonus) {
			if (Math.sqrt((player.getX() - this._currentBonus.getX()) * (player.getX() - this._currentBonus.getX())
				+ (player.getY() - this._currentBonus.getY()) * (player.getY() - this._currentBonus.getY())) < this._diagonal / 50) {
				eventBus.emit('bonusCollision', {
					player: player,
					effect: this._currentBonus.getEffect()
				});
			}
		}
	}

	resetBonus() {
		this._currentBonus = undefined;
	}
}
