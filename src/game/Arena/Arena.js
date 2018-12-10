import Goal from '../Goal/Goal.js';
import eventBus from '../../modules/EventBus/EventBus.js';
import Bonus from '../Bonus/Bonus.js';

const SCORE_RATE = 2;
const GOAL_RADIUS = 10;


export default class Arena {
	constructor(arenaClassName) {
		this._gameBlock = document.getElementsByClassName(arenaClassName)[0];
		this._context = this._gameBlock.getContext('2d');
		this._goalArray = [];
		this.resizeGameField();
		window.addEventListener('resize', this.resizeGameField.bind(this));
		this.clearSingleField();
	}

	resizeGameField() {
		this._gameBlock.width = window.innerWidth;
		this._gameBlock.height = window.innerHeight;
		this._xMin = this._gameBlock.getBoundingClientRect().x + 5;
		this._yMin = this._gameBlock.getBoundingClientRect().y + 5;
		this._xMax = this._gameBlock.getBoundingClientRect().width - this._xMin - 5;
		this._yMax = this._gameBlock.getBoundingClientRect().height - this._yMin - 5;
		this._diagonal = Math.sqrt((this._xMax - this._xMin) * (this._xMax - this._xMin)
			+ (this._yMax - this._yMin) * (this._yMax - this._yMin));
		eventBus.emit('gameFieldResized');
	}

	scaleGameField(xVal, yVal) {
		this._scaleX = this._gameBlock.width / xVal;
		this._scaleY = this._gameBlock.height / yVal;
	}

	canMove(player, direction) {
		if (player) {
			this._goalArray.forEach((goal) => {
				const deltaX1 = Math.abs(goal.getCoords().x1 - (player.getX() + player.getDirection().x));// + player.getDirection().x);
				const deltaY1 = Math.abs(goal.getCoords().y1 - (player.getY() + player.getDirection().y));// + player.getDirection().y);
				const deltaX2 = Math.abs(goal.getCoords().x2 - (player.getX() + player.getDirection().x));// + player.getDirection().x);
				const deltaY2 = Math.abs(goal.getCoords().y2 - (player.getY() + player.getDirection().y));// + player.getDirection().y);
				if (direction === 'RIGHT' || direction === 'LEFT') {
					if ((deltaX1 <= 40 + 5 && deltaY1 <= 20 + 5)
						|| (deltaX2 <= 40 + 5 && deltaY2 <= 20 + 5)) {
						player.bounce('x');
					}
				} else if ((deltaX1 <= 20 + 5 && deltaY1 <= 40 + 5)
					|| (deltaX2 <= 20 + 5 && deltaY2 <= 40 + 5)) {
					player.bounce('y');
				}
			});
			return true;
		}
		return false;
	}

	clearSingleField() {
		this._context.beginPath();
		this._context.fillStyle = '#0C141F';
		this._context.fillRect(this._xMin, this._yMin, this._xMax, this._yMax);
		this._context.closePath();
	}

	clearMultiField() {
		this._context.beginPath();
		this._context.fillStyle = '#0C141F';
		this._context.fillRect(0, 0, window.innerHeight, window.innerWidth);
		this._context.closePath();
	}

	clearPlayer(player, direction) {
		if (player) {
			// this._context.globalCompositeOperation = 'destination-out';
			this._context.beginPath();
			this._context.save();
			this._context.translate(player.getX(), player.getY());
			if (direction === 'RIGHT') {
				this._context.rotate(Math.PI / 2);
			} else if (direction === 'LEFT') {
				this._context.rotate(3 * Math.PI / 2);
			} else if (direction === 'DOWN') {
				this._context.rotate(Math.PI);
			}
			// this._context.arc(player.getX(), player.getY(), player.getRadius() + 2, 0, 2 * Math.PI);
			this._context.fillStyle = '#0C141F';
			this._context.fillRect(-22, -42, 42, 82);
			this._context.fill();
			this._context.restore();
			this._context.closePath();
		}
	}

	drawPlayer(player, direction) {
		if (player) {
			this._context.globalCompositeOperation = 'source-over';
			this._context.beginPath();
			this._context.save();
			this._context.translate(player.getX(), player.getY());
			if (direction === 'RIGHT') {
				this._context.rotate(Math.PI / 2);
			} else if (direction === 'LEFT') {
				this._context.rotate(3 * Math.PI / 2);
			} else if (direction === 'DOWN') {
				this._context.rotate(Math.PI);
			}
			this._context.drawImage(this._image, -20, -40, 40, 80);
			this._context.restore();
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

	spawnOneGoal(players) {
		let coords = this._generateGoal();

		if (this._goalArray.length) {
			while (Math.sqrt((coords.firstX - this._goalArray[0].getCoords().x1) * (coords.firstX - this._goalArray[0].getCoords().x1)) < this._xMax / 5
			|| Math.sqrt((coords.secondX - this._goalArray[0].getCoords().x2) * (coords.secondX - this._goalArray[0].getCoords().x2)) < this._yMax / 5
			|| Math.sqrt((coords.firstY - this._goalArray[0].getCoords().y1) * (coords.firstY - this._goalArray[0].getCoords().y1)) < this._xMax / 5
			|| Math.sqrt((coords.secondY - this._goalArray[0].getCoords().y2) * (coords.secondY - this._goalArray[0].getCoords().y2)) < this._yMax / 5) {
				coords = this._generateGoal();
			}
		}

		if (!this._checkCollision(players, coords)) {
			this._goalArray.push(new Goal(coords.firstX, coords.firstY, coords.secondX, coords.secondY));
			this.drawGoal();
		} else {
			this.spawnOneGoal(players);
		}
	}

	spawnGoals(players) {
		this._goalArray = [];
		const coords1 = this._generateGoal();
		let coords2 = this._generateGoal();

		while (Math.sqrt((coords1.firstX - coords2.firstX) * (coords1.firstX - coords2.firstX)) < this._xMax / 5
			|| Math.sqrt((coords1.secondX - coords2.secondX) * (coords1.secondX - coords2.secondX)) < this._yMax / 5
			|| Math.sqrt((coords1.firstY - coords2.firstY) * (coords1.firstY - coords2.firstY)) < this._xMax / 5
			|| Math.sqrt((coords1.secondY - coords2.secondY) * (coords1.secondY - coords2.secondY)) < this._yMax / 5) {
			coords2 = this._generateGoal();
		}

		if (!this._checkCollision(players, coords1) && !this._checkCollision(players, coords2)) {
			this._goalArray.push(new Goal(coords1.firstX, coords1.firstY, coords1.secondX, coords1.secondY));
			this._goalArray.push(new Goal(coords2.firstX, coords2.firstY, coords2.secondX, coords2.secondY));
			this.drawGoal();
		} else {
			this.spawnGoals(players);
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

		coords.secondX = Math.floor(Math.random() * (coords.firstX + 90 - coords.firstX + 70)) + coords.firstX + 70;
		coords.secondY = Math.floor(Math.random() * (coords.firstY + 90 - coords.firstY + 70)) + coords.firstY + 70;

		return coords;
	}

	drawGoal() {
		this._goalArray.forEach((goal, index) => {
			if (goal.getAge() >= 10) {
				eventBus.emit('spawnGoals', index);
			}
		});

		this._goalArray.forEach((goal) => {
			this._context.globalCompositeOperation = 'source-over';
			this._context.beginPath();
			// this._context.arc(goal.getCoords().x1, goal.getCoords().y1,
			// 	12, 0, 2 * Math.PI);
			// this._context.arc(goal.getCoords().x2, goal.getCoords().y2,
			// 	12, 0, 2 * Math.PI);
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
			this._context.drawImage(this._goalImage, goal.getCoords().x1 - 10, goal.getCoords().y1 - 10);
			this._context.drawImage(this._goalImage, goal.getCoords().x2 - 10, goal.getCoords().y2 - 10);

			this._context.fillStyle = '#3EC8AC';
			this._context.font = '4vmin serif';
			this._context.fillText(`${10 - goal.getAge()}`,
				Math.max(goal.getCoords().x1, goal.getCoords().x2) + goal.getRadius() + this._diagonal / 150,
				Math.max(goal.getCoords().y1, goal.getCoords().y2) + goal.getRadius() + this._diagonal / 150);
		});
	}

	clearGoal(index) {
		const i = index === 1 ? 0 : 1;
		const goal = this._goalArray[i];
		this._context.globalCompositeOperation = 'destination-out';
		this._context.beginPath();
		this._context.arc(goal.getCoords().x1, goal.getCoords().y1,
			14, 0, 2 * Math.PI);
		this._context.arc(goal.getCoords().x2, goal.getCoords().y2,
			14, 0, 2 * Math.PI);
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

		this._goalArray = this._goalArray.slice(i, i + 1);
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
			// this._context.globalCompositeOperation = 'source-over';
			this._context.beginPath();
			// this._context.arc(this._currentBonus.getX(), this._currentBonus.getY(),
			// 	10 + 2, 0, 2 * Math.PI);
			// this._context.fillStyle = '#FFE64D';
			// this._context.fill();
			this._context.drawImage(this._bonusImage, this._currentBonus.getX() - 40, this._currentBonus.getY() - 40, 80, 80);
			this._context.closePath();
		}
	}

	loadTextures() {
		return new Promise((resolve) => {
			this._image = new Image();
			this._image.src = '../../../static/Archive/camry/camry_yellow.png';
			this._image.onload = () => resolve();
			this._goalImage = new Image();
			this._goalImage.src = '../../../static/Archive/index.png';
			this._bonusImage = new Image();
			this._bonusImage.src = '../../../static/Archive/bonus.svg';
		});
	}

	clearPlayerHead(x, y, direction, color) {
		this._context.beginPath();
		this._context.save();
		this._context.translate(x * this._scaleX, y * this._scaleY);
		if (direction === 'RIGHT') {
			this._context.rotate(Math.PI / 2);
		} else if (direction === 'LEFT') {
			this._context.rotate(3 * Math.PI / 2);
		} else if (direction === 'DOWN') {
			this._context.rotate(Math.PI);
		}
		this._context.fillStyle = '#0c141F';
		this._context.fillRect(-17, -32, 34, 64);
		this._context.restore();
		this._context.closePath();
		this.drawPixel(x, y, color);
	}

	drawPlayerHead(x, y, direction) {
		this._context.beginPath();
		this._context.save();
		this._context.translate(x * this._scaleX, y * this._scaleY);
		if (direction === 'RIGHT') {
			this._context.rotate(Math.PI / 2);
		} else if (direction === 'LEFT') {
			this._context.rotate(3 * Math.PI / 2);
		} else if (direction === 'DOWN') {
			this._context.rotate(Math.PI);
		}
		this._context.drawImage(this._image, -15, -30, 30, 60);
		this._context.restore();
		this._context.closePath();
	}

	drawPixel(x, y, color) {
		let _color = color;
		let width = this._scaleX;
		let height = this._scaleY;
		let beginX = x * this._scaleX - this._scaleX / 2;
		let beginY = y * this._scaleY - this._scaleY / 2;
		if (color === '#000000') {
			_color = '#0c141F';
			width += 4;
			height += 4;
			beginX -= 2;
			beginY -= 2;
		}
		this._context.beginPath();
		this._context.fillStyle = _color;
		this._context.fillRect(beginX, beginY, width, height);
		this._context.closePath();
	}

	clearPixel(x, y) {
		this._context.beginPath();
		this._context.arc(x * this._scaleX, y * this._scaleY, 7, 0, 2 * Math.PI);
		this._context.fillStyle = '#0C141F';
		this._context.fill();
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
		this._goalArray.forEach((goal, index) => {
			if (player.getY() <= goal.calculateY(player.getX()) + 6
				&& player.getY() >= goal.calculateY(player.getX()) - 6
				&& goal.inInterval(player.getY())) {
				eventBus.emit('goalCollision', {
					player: player,
					scoreBonus: Math.round(this._diagonal / (SCORE_RATE * goal.getLength())),
					index: index
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
