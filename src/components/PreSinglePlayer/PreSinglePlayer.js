'use strict';

import MainComponent from '../MainComponent/MainComponent.js';
import template from './PreSinglePlayer.hbs';

import './PreSinglePlayer.scss';

export default class PreSinglePlayer extends MainComponent {
	constructor() {
		super();
		this.template = template;
	}

	afterRender() {
		this.playButton = this.element.querySelector('.play-button');
		return super.afterRender();
	}


	show() {
		if (this.element) {
			this.element.style.display = 'grid';
		}
	}
}
