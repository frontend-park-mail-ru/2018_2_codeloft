'use strict';

import MainComponent from '../MainComponent/MainComponent.js';
import template from './GameStat.hbs';
import './GameStat.scss';

export default class GameStat extends MainComponent {
	constructor() {
		super();
		this.template = template;
	}
}
