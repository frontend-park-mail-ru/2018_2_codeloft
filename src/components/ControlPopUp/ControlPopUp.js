import MainComponent from '../MainComponent/MainComponent.js';
import template from './ControlPopUp.hbs';
import './ControlPopUp.scss';

const BACK_BUTTON = 'back-button';
const AGAIN_BUTTON = 'again-button';
const SCORE_LABEL = 'results-block__score';
const GOALS_LABEL = 'results-block__goals';

export default class ControlPopUp extends MainComponent {
	constructor() {
		super();
		this.template = template;
	}

	show() {
		setTimeout(() => this.hide(), 3000);
		return super.show();
	}
}
