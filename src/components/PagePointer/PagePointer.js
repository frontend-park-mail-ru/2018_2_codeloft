'use strict';

import eventBus from '../../modules/EventBus/EventBus.js';

export default class PagePointer {
	constructor(text, action) {
		this.element = document.createElement('a');
		this.element.innerHTML = text;
		this.eventMap = {
			'<<': () => {
				eventBus.emit('pageBack');
			},
			'>>': () => {
				eventBus.emit('pageForward');
			},
		};
		this.element.addEventListener('click', this.eventMap[text] || (() => eventBus.emit('getPageByNumber', text)));
	}

	render() {
		return this.element;
	}

	hide() {
		this.reference.style.display = 'none';
	}

	show() {
		this.reference.style.display = 'block';
	}
}
