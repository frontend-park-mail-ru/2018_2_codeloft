'use strict';

import MainComponent from '../MainComponent/MainComponent.js';
import template from './MessageOut.hbs';

import './MessageOut.scss';

export default class MessageOut extends MainComponent {
	constructor() {
		super();
		this.template = template;
	}
}
