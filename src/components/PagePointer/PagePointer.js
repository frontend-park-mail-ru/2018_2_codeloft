'use strict';

import eventBus from '../../modules/EventBus/EventBus.js';

export default class PagePointer {
	constructor(text) {
		this.element = document.createElement('a');
		this.element.innerHTML = text;
		this.eventMap = {
			'<<': () => eventBus.emit('getPage', '-1'),
			'>>': () => eventBus.emit('getPage', '+1'),
		};
		this.element.addEventListener('click', this.eventMap[text] || (() => eventBus.emit('getPage', text)));
	}

	render() {
		return this.element;
	}

	hide() {
		this.element.style.display = 'none';
	}

	show() {
		this.element.style.display = 'block';
	}

	setActive() {
		this.element.setAttribute('class', 'active');
	}

	setUsual() {
		this.element.setAttribute('class', '');
	}
}
