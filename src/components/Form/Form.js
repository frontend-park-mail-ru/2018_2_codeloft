'use strict';

import MainComponent from '../MainComponent/MainComponent.js';
import eventHandler from '../../modules/EventHandler/EventHandler.js';

export default class Form extends MainComponent {
	constructor() {
		super();
		this.template = '<form class = "{{class}}"></form>';
		this.events = ['click'];
	}
	addEvents(config) {
		this.events.forEach(event => {
			eventHandler.handleEvent(this.element.children, event, config[event]);
		});
	}
}
