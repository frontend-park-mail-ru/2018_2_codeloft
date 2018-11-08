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

		this.playerColorArray = ['#E6FFFF', '#6FC3DF', 'rgba(111, 195, 223, 0)'];

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

			this.eventKeyDown = document.addEventListener('keydown', (event) => {
				switch (event.keyCode) {
				case 87:
					this.userMoveUp(this.playerInMatrix.x, this.playerInMatrix.y);
					break;
				case 65:
					this.userMoveLeft(this.playerInMatrix.x, this.playerInMatrix.y);
					break;
				case 83:
					this.userMoveDown(this.playerInMatrix.x, this.playerInMatrix.y);
					break;
				case 68:
					this.userMoveRight(this.playerInMatrix.x, this.playerInMatrix.y);
					break;
				case 38:
					this.userMoveUp(this.playerInMatrix.x, this.playerInMatrix.y);
					break;
				case 37:
					this.userMoveLeft(this.playerInMatrix.x, this.playerInMatrix.y);
					break;
				case 40:
					this.userMoveDown(this.playerInMatrix.x, this.playerInMatrix.y);
					break;
				case 39:
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
		const matrixWidthCellPixels = window.innerWidth / this.mapArray[this.playerInMatrix.y].length;
		const matrixHeightCellPixels = window.innerHeight / this.mapArray.length;
		this.playerCoord.x = matrixWidthCellPixels * (this.playerInMatrix.x + 1) - matrixWidthCellPixels / 2;
		this.playerCoord.y = matrixHeightCellPixels * (this.playerInMatrix.y + 1) - matrixHeightCellPixels / 2;
	}

	handleGameProcess() {
		this.canvas = document.getElementsByClassName('game-field')[0];
		this.canvas.width = window.innerWidth;
		this.canvas.height = window.innerHeight;
		this.context = this.canvas.getContext('2d');

		this.updateUserCoord();

		const player = new Player(this.playerCoord.x, this.playerCoord.y,
			this.playerCoord.speed, this.playerCoord.radius, this.context, this.playerColorArray);
		player.draw();

		const animate = () => {
			this.animationId = requestAnimationFrame(animate);
			// this.context.clearRect(0, 0, window.innerWidth, window.innerHeight);

			player.update(this.playerCoord.x, this.playerCoord.y);
		};
		animate();
	}

	hide() {
		super.hide();
		// this.gameMode = false;

		cancelAnimationFrame(this.animationId);
		document.removeEventListener('keydown', this.eventKeyDown, false);
		// document.removeEventListener('keyup', this.eventKeyUp, false);
	}

	userMoveRight(playerXCoord, playerYCoord) {
		if (playerXCoord + 1 <= this.mapArray[playerYCoord].length) {
			this.mapArray[playerYCoord][playerXCoord + 1] = 1;
			this.playerInMatrix.x++;
			this.updateUserCoord();
		}
	}

	userMoveLeft(playerXCoord, playerYCoord) {
		if (playerXCoord - 1 >= 0) {
			this.mapArray[playerYCoord][playerXCoord - 1] = 1;
			this.playerInMatrix.x--;
			this.updateUserCoord();
		}
	}

	userMoveDown(playerXCoord, playerYCoord) {
		if (playerYCoord + 1 <= this.mapArray.length) {
			this.mapArray[playerYCoord + 1][playerXCoord] = 1;
			this.playerInMatrix.y++;
			this.updateUserCoord();
		}
	}

	userMoveUp(playerXCoord, playerYCoord) {
		if (playerYCoord - 1 >= 0) {
			this.mapArray[playerYCoord - 1][playerXCoord] = 1;
			this.playerInMatrix.y--;
			this.updateUserCoord();
		}
	}
}
