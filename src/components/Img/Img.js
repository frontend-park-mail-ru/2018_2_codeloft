'use strict';

import MainComponent from '../MainComponent/MainComponent.js';
import eventHandler from '../../modules/EventHandler/EventHandler.js';

export default class Img extends MainComponent {
	constructor() {
		super();
		this.template = '<img src={{src}} class={{class}}>';
		this.events = ['click'];
	}
	addEvents(config) {
		this.events.forEach(event => {
			eventHandler.handleEvent(this.element, event, config[event]);
		});
	}
}
