'use strict';

import MainComponent from '../MainComponent/MainComponent.js';

export default class Block extends MainComponent {
	constructor() {
		super();
		this.template = '<div name="{{name}}" class="{{class}}">{{text}}</div>';
	}
}
