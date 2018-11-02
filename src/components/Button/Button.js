'use strict';

import MainComponent from '../MainComponent/MainComponent.js';
import eventHandler from '../../modules/EventHandler/EventHandler.js';
import template from './Button.hbs';

export default class Button extends MainComponent {
	constructor() {
		super();
		this.template = template;
		this.events = ['click'];
	}
	addEvents(config) {
		this.events.forEach(event => {
			eventHandler.handleEvent(this.element.children[0], event, config[event]);
		});
	}
}
