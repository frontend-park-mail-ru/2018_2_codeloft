'use strict';

import MainComponent from '../MainComponent/MainComponent.js';

export default class Button extends MainComponent {
	constructor() {
		super();
		this.template = '<div class = "{{class}}">{{text}}</div>';
		this.events = ['click'];
	}
}
