'use strict';

import MainComponent from '../MainComponent/MainComponent.js';
import template from './GameInfo.hbs';
import './GameInfo.scss';

export default class GameInfo extends MainComponent {
	constructor() {
		super();
		this.template = template;
	}
}
