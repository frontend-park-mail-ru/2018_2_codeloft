'use strict';

import MainComponent from '../MainComponent/MainComponent.js';

export default class GameBlock extends MainComponent {
	constructor() {
		super();
		this.template = '<canvas class="game-block" height="640" width="480" tabindex="0"></canvas>';
	}
}
