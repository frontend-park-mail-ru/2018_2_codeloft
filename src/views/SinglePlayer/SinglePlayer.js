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
		this.x = 0;
		this.y = 0;

		this._innerName = 'SinglePlayer';
		this.context = undefined;
		this.eventKeyDown = undefined;

		this.keyUp = false;
		this.keyDown = false;
		this.keyLeft = false;
		this.keyRight = false;

		// this.gameMode = false;
		// document.addEventListener('keydown', (key) => {
		// 	if (this.gameMode) {
		// 		const button = String.fromCharCode(key.keyCode || key.charCode);
		// 		this.ctx.fillStyle = ('rgb(255, 255, 255');
		// 		this.ctx.fillRect(this.x, this.y, 30, 30);
		// 		this.ctx.fillStyle = 'rgb(0, 0, 200)';
		// 		if (button === 'S') {
		// 			this.y += 10;
		// 		} else if (button === 'W') {
		// 			this.y -= 10;
		// 		} else if (button === 'D') {
		// 			this.x += 10;
		// 		} else if (button === 'A') {
		// 			this.x -= 10;
		// 		}
		// 		this.ctx.fillRect(this.x, this.y, 30, 30);
		// 	}
		// });
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
			this.handleGameProcess();
			resolve();
		});
	}

	handleGameProcess() {
		this.canvas = document.getElementsByClassName('game-field')[0];
		this.canvas.width = window.innerWidth;
		this.canvas.height = window.innerHeight;
		this.context = this.canvas.getContext('2d');

		const player = new Player(window.innerWidth / 2, window.innerHeight / 2, 3, 30, this.context, '#fa4c2b');
		player.draw();

		this.eventKeyDown = document.addEventListener('keydown', (event) => {
			switch (event.keyCode) {
			case 87 || 38:
				this.keyUp = true;
				break;
			case 65 || 37:
				this.keyLeft = true;
				break;
			case 83 || 40:
				this.keyDown = true;
				break;
			case 68 || 39:
				this.keyRight = true;
				break;

			case 38:
				this.keyUp = true;
				break;
			case 37:
				this.keyLeft = true;
				break;
			case 40:
				this.keyDown = true;
				break;
			case 39:
				this.keyRight = true;
				break;
			default:
				break;
			}
		});
		this.eventKeyDown = document.addEventListener('keyup', (event) => {
			switch (event.keyCode) {
			case 87 || 38:
				this.keyUp = false;
				break;
			case 65 || 37:
				this.keyLeft = false;
				break;
			case 83 || 40:
				this.keyDown = false;
				break;
			case 68 || 39:
				this.keyRight = false;
				break;

			case 38:
				this.keyUp = false;
				break;
			case 37:
				this.keyLeft = false;
				break;
			case 40:
				this.keyDown = false;
				break;
			case 39:
				this.keyRight = false;
				break;
			default:
				break;
			}
		});

		const animate = () => {
			this.animationId = requestAnimationFrame(animate);
			this.context.clearRect(0, 0, window.innerWidth, window.innerHeight);
			player.update(this.keyUp, this.keyDown, this.keyLeft, this.keyRight);
		};

		animate();
	}

	hide() {
		super.hide();
		this.gameMode = false;
	}
}
