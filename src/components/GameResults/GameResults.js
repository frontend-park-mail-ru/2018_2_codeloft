import MainComponent from '../MainComponent/MainComponent.js';
import template from './GameResults.hbs';
import './GameResults.scss';

const BACK_BUTTON = 'back-button';
const AGAIN_BUTTON = 'again-button';
const SCORE_LABEL = 'results-block__score';
const GOALS_LABEL = 'results-block__goals';

export default class GameResults extends MainComponent {
	constructor() {
		super();
		this.template = template;
	}

	afterRender() {
		this.backButton = this.element.querySelector(`.${BACK_BUTTON}`);
		this.againButton = this.element.querySelector(`.${AGAIN_BUTTON}`);
		this.scoreLabel = this.element.querySelector(`.${SCORE_LABEL}`);
		this.goalsLabel = this.element.querySelector(`.${GOALS_LABEL}`);
		return super.afterRender();
	}

	show() {
		if (this.element) {
			this.element.style.display = 'grid';
		}
	}
}
