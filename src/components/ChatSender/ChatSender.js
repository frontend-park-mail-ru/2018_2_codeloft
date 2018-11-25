'use strict';

import MainComponent from '../MainComponent/MainComponent.js';
import template from './ChatSender.hbs';

import './ChatSender.scss';

export default class ChatSender extends MainComponent {
	constructor() {
		super();
		this.template = template;
	}

	show() {
		if (this.element) {
			this.element.style.display = 'flex';
		}
	}
}
