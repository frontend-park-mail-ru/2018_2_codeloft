'use strict';

import MainComponent from '../MainComponent/MainComponent.js';

export default class ScoreTable extends MainComponent {
	preRender() {
		this.pageNumber = 1;
		this.template = '<div class="leaderboard-page__users"></div>';
		return super.preRender();
	}
}
