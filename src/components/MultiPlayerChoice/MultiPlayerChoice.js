import MainComponent from '../MainComponent/MainComponent.js';
import template from './MultiPlayerChoice.hbs';
import './MultiPlayerChoice.scss';

const PLAY_BUTTON = 'play-button';

export default class MultiPlayerChoice extends MainComponent {
	constructor() {
		super();
		this.template = template;
	}

	afterRender() {
		this.playButton = this.element.querySelector(`.${PLAY_BUTTON}`);
		return super.afterRender();
	}
}
