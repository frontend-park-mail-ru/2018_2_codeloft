'use strict';

import MainComponent from '../MainComponent/MainComponent.js';
import template from './Input.hbs';

export default class Input extends MainComponent {
	constructor() {
		super();
		this.template = template;
	}

	compile(context) {
		this.check = context.check;
		return super.compile(context);
	}
}
