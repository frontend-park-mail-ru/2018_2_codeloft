'use strict';

import MainComponent from '../MainComponent/MainComponent.js';

export default class Label extends MainComponent {
	constructor() {
		super();
		this.template = '<p class="{{class}}" style="display: {{visible}}">{{text}}</p>';
	}
}