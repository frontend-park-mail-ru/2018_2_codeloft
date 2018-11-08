'use strict';

import MainComponent from '../MainComponent/MainComponent.js';
import template from './Block.hbs';

export default class Block extends MainComponent {
	constructor() {
		super();
		this.template = template;
	}
}
