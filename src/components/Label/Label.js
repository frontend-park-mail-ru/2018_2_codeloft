'use strict';

import MainComponent from '../MainComponent/MainComponent.js';
import template from './Label.hbs';

import './Label.scss';

export default class Label extends MainComponent {
	constructor() {
		super();
		this.template = template;
	}
}
