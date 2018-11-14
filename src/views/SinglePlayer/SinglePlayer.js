'use strict';

import BaseView from '../BaseView/BaseView.js';
import tagParser from '../../modules/TagParser/TagParser.js';
import SinglePlayerHandler from '../../game/SinglePlayer/SinglePlayerHandler.js';

export default class SinglePlayer extends BaseView {
	constructor() {
		super();
		this._needAuth = true;
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

	show() {
		super.show().then(() => {
			this.mainLogo.style.display = 'none';
			this._gameHandler = new SinglePlayerHandler();
			this._gameHandler.startGame();
		});
	}

	afterRender() {
		return new Promise((resolve) => {
			resolve();
		});
	}

	hide() {
		this._gameHandler.stopGame();
		super.hide();
	}
}
