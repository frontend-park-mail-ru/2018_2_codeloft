'use strict';

import MainComponent from '../MainComponent/MainComponent.js';
import template from './MessageIn.hbs';

import './MessageIn.scss';

export default class MessageIn extends MainComponent {
	constructor() {
		super();
		this.template = template;
	}
}
