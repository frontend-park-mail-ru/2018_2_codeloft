'use strict';

import BaseView from '../BaseView/BaseView.js';
import tagParser from '../../modules/TagParser/TagParser.js';
import MultiPlayerHandler from '../../game/MultiPlayer/MultiPlayerHandler.js';
import eventBus from '../../modules/EventBus/EventBus.js';
import router from '../../modules/Router/Router.js';
import URLS from '../../modules/Consts/Consts.js';
import './Multiplayer.scss';

const MULTI_PLAYER_GAME_FIELD = 'multiplayer-block__game-field';

export default class MultiPlayer extends BaseView {
	build() {
		return new Promise((resolve) => {
			this.template = `<GameBlock {{class=${MULTI_PLAYER_GAME_FIELD}}}>`;
			tagParser.toHTML(this.template).then((elementsArray) => {
				this.elementsArray = elementsArray;
				// this.choiceBlock = this.elementsArray[0];
				this.gameBlock = this.elementsArray[0];
				// this.gameBlock.hide();
				// this.choiceBlock.playButton.addEventListener('click', () => {
				// 	this.play();
				// });
				const div = document.createElement('div');
				div.setAttribute('class', 'main-content__multiplayer-block');
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
			this.deathHandler = this.play.bind(this);
			resolve();
		});
	}

	endGame() {
		router.go(URLS.MENU);
		this._gameHandler.stopGame();
	}

	play() {
		document.body.style.cursor = 'none';
		// this.choiceBlock.hide();
		// this.gameBlock.show();
		this._gameHandler = new MultiPlayerHandler([], MULTI_PLAYER_GAME_FIELD);
		this._gameHandler.startGame();
	}

	show() {
		super.show().then(() => {
			this.element.style.display = 'block';
			this.mainLogo.style.display = 'none';
			this.play();
		});
	}

	hide() {
		document.body.style.cursor = 'default';
		super.hide();
		this._gameHandler.stopGame();
	}
}
