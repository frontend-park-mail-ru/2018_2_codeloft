'use strict';

import MainComponent from '../MainComponent/MainComponent.js';
import template from './ScoreTable.hbs';

export default class ScoreTable extends MainComponent {
	preRender() {
		this.template = template;
		return super.preRender();
	}
}
