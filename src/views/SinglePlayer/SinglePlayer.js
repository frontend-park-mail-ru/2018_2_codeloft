'use strict';

import BaseView from '../BaseView/BaseView.js';
import tagParser from '../../modules/TagParser/TagParser.js';
import router from '../../modules/Router/Router.js';
import URLS from '../../modules/Consts/Consts.js';

export default class SinglePlayer extends BaseView {
	constructor() {
		super();
		this._needAuth = true;
		this.x = 0;
		this.y = 0;
		this.gameMode = false;
		document.addEventListener('keydown', (key) => {
			if (this.gameMode) {
				const button = String.fromCharCode(key.keyCode || key.charCode);
				this.ctx.fillStyle = ('rgb(255, 255, 255');
				this.ctx.fillRect(this.x, this.y, 30, 30);
				this.ctx.fillStyle = 'rgb(0, 0, 200)';
				if (button === 'S') {
					this.y += 10;
				} else if (button === 'W') {
					this.y -= 10;
				} else if (button === 'D') {
					this.x += 10;
				} else if (button === 'A') {
					this.x -= 10;
				}
				this.ctx.fillRect(this.x, this.y, 30, 30);
			}
		});
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
			this.gameMode = true;
			this.handleGameProcess();
			resolve();
		});
	}

	hide() {
		super.hide();
		this.gameMode = false;
	}

	handleGameProcess() {
		this.ctx = document.getElementsByClassName('game-field')[0].getContext('2d');
		this.ctx.fillStyle = 'rgb(0, 0, 200)';
		this.ctx.fillRect(this.x, this.y, 30, 30);
	}
}
