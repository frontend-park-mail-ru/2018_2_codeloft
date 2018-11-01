'use strict';

import MainComponent from '../MainComponent/MainComponent.js';

export default class ScoreTable extends MainComponent {
	preRender() {
		this.template = '<div class="leaderboard-page__users"></div>';
		return super.preRender();
	}
}
