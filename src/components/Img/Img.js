'use strict';

import MainComponent from '../MainComponent/MainComponent.js';
import eventHandler from '../../modules/EventHandler/EventHandler.js';
import template from './Img.hbs';

export default class Img extends MainComponent {
	constructor() {
		super();
		this.template = template;
		this.events = ['click'];
	}
	addEvents(config) {
		this.events.forEach(event => {
			eventHandler.handleEvent(this.element, event, config[event]);
		});
	}
}
