'use strict';

import BaseView from '../BaseView/BaseView.js';
import tagParser from '../../modules/TagParser/TagParser.js';
import router from '../../modules/Router/Router.js';
import URLS from '../../modules/Consts/Consts.js';
import Player from './Player.js';

export default class SinglePlayer extends BaseView {
	constructor() {
		super();
		this._needAuth = true;

		this.playerColorArray = ['#E6FFFF', '#6FC3DF', 'rgba(111, 195, 223, 0)', '#DF740C'];

		this.mapArray = [
			[0, 0, 0, 0, 0, 0, 0, 0],
			[0, 0, 0, 0, 0, 0, 0, 0],
			[0, 0, 0, 0, 0, 0, 0, 0],
			[0, 0, 0, 0, 0, 0, 0, 0],
			[0, 0, 0, 0, 0, 0, 0, 0],
			[0, 0, 0, 0, 0, 0, 0, 0],
			[0, 0, 0, 0, 0, 0, 0, 0],
			[0, 0, 0, 0, 0, 0, 0, 0],
		];

		this.playerInMatrix = {
			x: 3,
			y: 3,
		};

		this.playerCoord = {
			x: 0,
			y: 0,
			radius: 10,
			speed: 3,
		};

		this.mapArray[this.playerInMatrix.x][this.playerInMatrix.y] = 1;

		this._innerName = 'SinglePlayer';
		this.context = undefined;
		this.eventKeyDown = undefined;
		this.eventKeyUp = undefined;

		this.matrixWidthCellPixels = window.innerWidth / this.mapArray[this.playerInMatrix.y].length;
		this.matrixHeightCellPixels = window.innerHeight / this.mapArray.length;
	}

	build() {
		return new Promise((resolve) => {
			this.template = '<GameBlock>';
			tagParser.toHTML(this.template).then((elementsArray) => {
				this.elementsArray = elementsArray;
				const div = document.createElement('div');
				div.setAttribute('class', 'main-content__game-block');
				this.elementsArray.forEach((el) => {
					div.appendChild(el.render());
				});
				this.element = div;
				resolve();
			});
		});
	}

	afterRender() {
		return new Promise((resolve) => {
			// this.gameMode = true;

			this.canvas = document.getElementsByClassName('game-field')[0];
			this.canvas.width = window.innerWidth;
			this.canvas.height = window.innerHeight;
			this.context = this.canvas.getContext('2d');

			this.eventKeyDown = document.addEventListener('keydown', (event) => {
				switch (event.keyCode) {
				case 87:
					this.moveUp = true;
					this.userMoveUp(this.playerInMatrix.x, this.playerInMatrix.y);
					break;
				case 65:
					this.moveLeft = true;
					this.userMoveLeft(this.playerInMatrix.x, this.playerInMatrix.y);
					break;
				case 83:
					this.moveDown = true;
					this.userMoveDown(this.playerInMatrix.x, this.playerInMatrix.y);
					break;
				case 68:
					this.moveRight = true;
					this.userMoveRight(this.playerInMatrix.x, this.playerInMatrix.y);
					break;
				case 38:
					this.moveUp = true;
					this.userMoveUp(this.playerInMatrix.x, this.playerInMatrix.y);
					break;
				case 37:
					this.moveLeft = true;
					this.userMoveLeft(this.playerInMatrix.x, this.playerInMatrix.y);
					break;
				case 40:
					this.moveDown = true;
					this.userMoveDown(this.playerInMatrix.x, this.playerInMatrix.y);
					break;
				case 39:
					this.moveRight = true;
					this.userMoveRight(this.playerInMatrix.x, this.playerInMatrix.y);
					break;
				default:
					break;
				}
			});

			this.handleGameProcess();
			resolve();
		});
	}

	updateUserCoord() {
		this.playerCoord.x = this.matrixWidthCellPixels * (this.playerInMatrix.x + 1) - this.matrixWidthCellPixels / 2;
		this.playerCoord.y = this.matrixHeightCellPixels * (this.playerInMatrix.y + 1) - this.matrixHeightCellPixels / 2;
	}

	getCoordsFromMatrix(x, y) {
		const pixelX = this.matrixWidthCellPixels * (x + 1) - this.matrixWidthCellPixels / 2;
		const pixelY = this.matrixHeightCellPixels * (y + 1) - this.matrixHeightCellPixels / 2;

		return [pixelX, pixelY];
	}

	drawLines() {
		for (let i = 0; i < this.mapArray[0].length; i++) {
			this.context.beginPath();
			const firstPoint = this.getCoordsFromMatrix(0, i);
			const secondPoint = this.getCoordsFromMatrix(i + this.mapArray[i].length, i);
			this.context.rect(firstPoint[0], firstPoint[1], secondPoint[0], 5);
			this.context.fillStyle = this.playerColorArray[3];
			this.context.fill();
			this.context.closePath();
		}
		for (let i = 0; i < this.mapArray.length; i++) {
			this.context.beginPath();
			const firstPoint = this.getCoordsFromMatrix(i, 0);
			const secondPoint = this.getCoordsFromMatrix(i + this.mapArray[i].length, i);

			this.context.rect(firstPoint[0], firstPoint[1], 5, secondPoint[0]);
			this.context.fillStyle = this.playerColorArray[3];
			this.context.fill();
			this.context.closePath();
		}
	}

	handleGameProcess() {
		this.updateUserCoord();
		this.drawLines();

		const player = new Player(this.playerCoord.x, this.playerCoord.y,
			this.playerCoord.speed, this.playerCoord.radius, this.context, this.playerColorArray);
		player.draw();

		const animate = () => {
			this.animationId = requestAnimationFrame(animate);
			player.update(this.playerCoord.x, this.playerCoord.y);
		};
		animate();
	}

	hide() {
		super.hide();

		cancelAnimationFrame(this.animationId);
		document.removeEventListener('keydown', this.eventKeyDown, false);
	}

	userMoveRight(playerXCoord, playerYCoord) {
		if (playerXCoord + 1 <= this.mapArray[playerYCoord].length
			&& this.mapArray[playerYCoord][playerXCoord + 1] !== 1) {
			this.mapArray[playerYCoord][playerXCoord + 1] = 1;
			this.playerInMatrix.x++;
			this.updateUserCoord();
		} else {
			this.playerInMatrix.x++;
			this.updateUserCoord();
			setTimeout(() => {
				router.go(URLS.MENU);
			}, 1000);
		}
	}

	userMoveLeft(playerXCoord, playerYCoord) {
		if (playerXCoord - 1 >= 0 && this.mapArray[playerYCoord][playerXCoord - 1] !== 1) {
			this.mapArray[playerYCoord][playerXCoord - 1] = 1;
			this.playerInMatrix.x--;
			this.updateUserCoord();
		} else {
			this.playerInMatrix.x--;
			this.updateUserCoord();
			setTimeout(() => {
				router.go(URLS.MENU);
			}, 1000);
		}
	}

	userMoveDown(playerXCoord, playerYCoord) {
		if (playerYCoord + 1 <= this.mapArray.length && this.mapArray[playerYCoord + 1][playerXCoord] !== 1) {
			this.mapArray[playerYCoord + 1][playerXCoord] = 1;
			this.playerInMatrix.y++;
			this.updateUserCoord();
		} else {
			this.playerInMatrix.y++;
			this.updateUserCoord();
			setTimeout(() => {
				router.go(URLS.MENU);
			}, 1000);
		}
	}

	userMoveUp(playerXCoord, playerYCoord) {
		if (playerYCoord - 1 >= 0 && this.mapArray[playerYCoord - 1][playerXCoord] !== 1) {
			this.mapArray[playerYCoord - 1][playerXCoord] = 1;
			this.playerInMatrix.y--;
			this.updateUserCoord();
		} else {
			this.playerInMatrix.y--;
			this.updateUserCoord();
			setTimeout(() => {
				router.go(URLS.MENU);
			}, 1000);
		}
	}
}
