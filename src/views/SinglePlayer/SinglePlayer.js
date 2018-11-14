'use strict';

import BaseView from '../BaseView/BaseView.js';
import tagParser from '../../modules/TagParser/TagParser.js';
import SinglePlayerHandler from '../../game/SinglePlayer/SinglePlayerHandler.js';
import eventBus from '../../modules/EventBus/EventBus.js';
import './SinglePlayer.scss';

export default class SinglePlayer extends BaseView {
	constructor() {
		super();
		this._needAuth = true;
	}

	build() {
		return new Promise((resolve) => {
			this.template = `<GameBlock>
							 <GameStat>`;
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
			eventBus.on('scoreRedraw', this.redrawScore.bind(this));
			this.scoreLabel = document.getElementsByClassName('game-stat__score-block')[0];
			resolve();
		});
	}

	redrawScore(value) {
		this.scoreLabel.innerText = `Score: ${value}`;
	}

	show() {
		super.show().then(() => {
			this.element.style.display = 'flex';
			this.mainLogo.style.display = 'none';
			this.scoreLabel.innerText = 'Score: 0';
			this._gameHandler = new SinglePlayerHandler();
			this._gameHandler.startGame();
		});
	}

	hide() {
		this._gameHandler.stopGame();
		super.hide();
	}
}
