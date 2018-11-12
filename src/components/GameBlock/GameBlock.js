'use strict';

import MainComponent from '../MainComponent/MainComponent.js';
import template from './GameBlock.hbs';
import './GameBlock.scss';

export default class GameBlock extends MainComponent {
	constructor() {
		super();
		this.template = template;
	}
}
