'use strict';

import eventBus from '../../modules/EventBus/EventBus.js';

export default class PagePointer {
	constructor(text, action) {
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
		this.reference.style.display = 'none';
	}

	show() {
		this.reference.style.display = 'block';
	}

	setActive() {
		this.element.setAttribute('class', 'active');
	}

	setUsual() {
		this.element.setAttribute('class', '');
	}
}
