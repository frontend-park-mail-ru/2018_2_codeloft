'use strict';

import MainComponent from '../MainComponent/MainComponent.js';
import Transport from '../../modules/Transport/Transport.js';

export default class ScoreTable extends MainComponent {
	constructor(){
		super();
        this.template = `<table class="game-highScore"></table>`;
	}
}