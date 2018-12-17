'use strict';

import BaseView from '../BaseView/BaseView.js';
import tagParser from '../../modules/TagParser/TagParser.js';
import SinglePlayerHandler from '../../game/SinglePlayer/SinglePlayerHandler.js';
import eventBus from '../../modules/EventBus/EventBus.js';
import router from '../../modules/Router/Router.js';
import GameResults from '../../components/GameResults/GameResults.js';
import langService from '../../services/LangService/LangService.js';
import './SinglePlayer.scss';

const SINGLE_PLAYER_GAME_FIELD = 'singleplayer-block__game-field';

export default class SinglePlayer extends BaseView {
	constructor() {
		super();
		this._needAuth = false;
	}

	build() {
		return new Promise((resolve) => {
			this.template = `<GameBlock {{class=${SINGLE_PLAYER_GAME_FIELD} border}}>
							 <GameStat>
							 <ControlPopUp>
							 <PreSinglePlayer {{label=${langService.getWord('preSingle.label')}}} 
							 {{scoreTip=${langService.getWord('preSingle.scoreTip')}}}
							 {{goalTip=${langService.getWord('preSingle.goalTip')}}}
							 {{controlTip=${langService.getWord('preSingle.controlTip')}}}
							 {{playText=${langService.getWord('preSingle.play')}}}>`;
			tagParser.toHTML(this.template).then((elementsArray) => {
				this._resultBlock = new GameResults();
				this.elementsArray = elementsArray;
				const div = document.createElement('div');
				div.setAttribute('class', 'main-content__singleplayer-block');
				this.elementsArray.forEach((el) => {
					el.hide();
					div.appendChild(el.render());
				});
				this.element = div;
				this.gameBlock = this.elementsArray[0];
				this.gameStat = this.elementsArray[1];
				this.controlPopUp = this.elementsArray[2];
				this.preGameBlock = this.elementsArray[3];
				this.preGameBlock.playButton.addEventListener('click', () => {
					this.play();
				});
				this.scoreHandler = this.redrawScore.bind(this);
				this.timerHandler = this.redrawTimer.bind(this);
				this.resultsHandler = this.showResults.bind(this);
				this._resultBlock.build({}).then(() => {
					this._resultBlock.backButton.addEventListener('click', () => {
						router.goMenu();
					});
					this._resultBlock.againButton.addEventListener('click', () => {
						this.play();
					});
					this._resultBlock.hide();
					this.element.appendChild(this._resultBlock.render());
				});
				resolve();
			});
		});
	}

	afterRender() {
		return new Promise((resolve) => {
			this.scoreLabel = document.getElementsByClassName('game-stat__score-block')[0];
			this.timerLabel = document.getElementsByClassName('game-stat__timer-block')[0];
			resolve();
		});
	}

	redrawScore(value) {
		this.scoreLabel.innerText = `Score: ${value}`;
	}

	play() {
		this.gameBlock.show();
		document.body.style.cursor = 'none';
		eventBus.on('scoreRedraw', this.scoreHandler);
		eventBus.on('timerTick', this.timerHandler);
		eventBus.on('timerStop', this.resultsHandler);
		this.timerLabel.style.color = '';
		this.timerLabel.style.animation = '';
		this._resultBlock.hide();
		this.preGameBlock.hide();
		this.gameStat.show();
		this.controlPopUp.show();
		this.scoreLabel.innerText = `${langService.getWord('game.score')} 0`;
		this.timerLabel.innerText = `${langService.getWord('game.time')} 30`;
		this._gameHandler = new SinglePlayerHandler([], SINGLE_PLAYER_GAME_FIELD);
		this._gameHandler.startGame();
	}

	showResults() {
		this.gameBlock.hide();
		this._resultBlock.show();
		this.endGame();
	}

	endGame() {
		document.body.style.cursor = 'default';
		this._resultBlock.scoreLabel.innerHTML = `${langService.getWord('gameResults.score')} ${this._gameHandler.getScore()}`;
		this._resultBlock.goalsLabel.innerHTML = `${langService.getWord('gameResults.goals')} ${this._gameHandler.getGoalsPassed()}`;
		this.gameStat.hide();
		eventBus.off('timerStop', this.resultsHandler);
		eventBus.off('timerTick', this.timerHandler);
		eventBus.off('scoreRedraw', this.scoreHandler);
		this._gameHandler.stopGame();
	}

	redrawTimer(value) {
		if (value < 10) {
			this.timerLabel.style.color = 'red';
			this.timerLabel.style.animation = '1s Always ease alternate infinite';
		} else {
			this.timerLabel.style.color = 'white';
			this.timerLabel.style.animation = '';
		}
		this.timerLabel.innerText = `${langService.getWord('game.time')} ${value}`;
	}

	show() {
		super.show().then(() => {
			this.element.style.display = 'grid';
			this.mainLogo.style.display = 'none';
			this.gameBlock.hide();
			this.preGameBlock.show();
		});
	}

	hide() {
		super.hide();
		this._resultBlock.hide();
		if (this._gameHandler) {
			this.endGame();
		}
	}
}
