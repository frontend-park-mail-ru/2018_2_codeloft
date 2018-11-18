'use strict';

import BaseView from '../BaseView/BaseView.js';
import tagParser from '../../modules/TagParser/TagParser.js';
import MultiPlayerHandler from '../../game/MultiPlayer/MultiPlayerHandler.js';
import eventBus from '../../modules/EventBus/EventBus.js';
import router from '../../modules/Router/Router.js';
import URLS from '../../modules/Consts/Consts.js';
import './Multiplayer.scss';

export default class MultiPlayer extends BaseView {
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
			resolve();
		});
	}

	endGame() {
		router.go(URLS.MENU);
		this._gameHandler.stopGame();
	}

	show() {
		super.show().then(() => {
			this.element.style.display = 'block';
			this.mainLogo.style.display = 'none';
			this._gameHandler = new MultiPlayerHandler();
			this._gameHandler.startGame();
		});
	}

	hide() {
		super.hide();
		this._gameHandler.stopGame();
	}
}
