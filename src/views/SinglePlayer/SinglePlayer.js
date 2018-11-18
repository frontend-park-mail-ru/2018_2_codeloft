'use strict';

import BaseView from '../BaseView/BaseView.js';
import tagParser from '../../modules/TagParser/TagParser.js';
import SinglePlayerHandler from '../../game/SinglePlayer/SinglePlayerHandler.js';
import eventBus from '../../modules/EventBus/EventBus.js';
import router from '../../modules/Router/Router.js';
import URLS from '../../modules/Consts/Consts.js';
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
				this.scoreHandler = this.redrawScore.bind(this);
				this.timerHandler = this.redrawTimer.bind(this);
				this.endHandler = this.endGame.bind(this);
				resolve();
			});
		});
	}

	afterRender() {
		return new Promise((resolve) => {
			eventBus.on('scoreRedraw', this.scoreHandler);
			eventBus.on('timerTick', this.timerHandler);
			eventBus.on('timerStop', this.endHandler);
			this.scoreLabel = document.getElementsByClassName('game-stat__score-block')[0];
			this.timerLabel = document.getElementsByClassName('game-stat__timer-block')[0];
			resolve();
		});
	}

	redrawScore(value) {
		this.scoreLabel.innerText = `Score: ${value}`;
	}

	endGame() {
		router.go(URLS.MENU);
		this._gameHandler.stopGame();
	}

	redrawTimer(value) {
		this.timerLabel.innerText = `Seconds Left: ${value}`;
	}

	show() {
		super.show().then(() => {
			this.element.style.display = 'flex';
			this.mainLogo.style.display = 'none';
			this.scoreLabel.innerText = 'Score: 0';
			this.timerLabel.innerText = 'Seconds Left: 60';
			this._gameHandler = new SinglePlayerHandler();
			this._gameHandler.startGame();
		});
	}

	hide() {
		super.hide();
		eventBus.off('timerStop', this.endHandler);
		eventBus.off('timerTick', this.timerHandler);
		eventBus.off('scoreRedraw', this.scoreHandler);
		this._gameHandler.stopGame();
	}
}
