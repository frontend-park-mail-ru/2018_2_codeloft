'use strict';

import eventHandler from '../../modules/EventHandler/EventHandler.js';
import userService from '../../services/UserService/UserService.js';

export default class MainComponent {
	constructor() {
		this.element = null;
		this.template = null;
		this.events = [];
		this._needAuth = false;
		this._forAuth = false;
	}

	/**
	 *  Возвращает непосредственно сам элемент для вставки в код страницы.
	 * @return {element} нужный при вставке элемент *
	 */
	render() {
		return this.element;
	}

	/** Удаляет данный элемент из HTML
	 */
	remove() {
		this.element.parentElement.removeChild(this.element);
	}

	/**
	 * Компилирует шаблон Handlebars
	 * @param context - нужный для копиляции объект
	 */
	compile(context) {
		if (context.needAuth === 'true') {
			this._needAuth = true;
		} else if (context.forAuth === 'true') {
			this._forAuth = true;
		}
		return new Promise((resolve) => {
			const compiled = this.template(context);
			const parent = document.createElement('div');
			parent.innerHTML = compiled;
			this.element = parent.lastChild;
			this.addEvents(context);
			resolve(this);
		});
	}

	preRender() {
		return new Promise((resolve) => resolve());
	}

	afterRender(promise = new Promise((resolve) => resolve())) {
		return promise.then(() => {
			this.handleVisibility();
			return this;
		});
	}

	build(context) {
		return this.preRender()
			.then(() => {
				if (!this.element) {
					return this.compile(context);
				}
				return Promise.resolve();
			})
			.then(() => this.afterRender());
	}

	handleVisibility() {
		if (this.needAuth() && !userService.isLogIn()) {
			this.hide();
		} else if (this.forAuth() && userService.isLogIn()) {
			this.hide();
		} else {
			this.show();
		}
	}

	hide() {
		if (this.element) {
			this.element.style.display = 'none';
		}
	}

	show() {
		if (this.element) {
			this.element.style.display = 'block';
		}
	}

	/**
	 * Добавляет события на объект
	 * @param config - мапа, отображающая имя события в имя обработчика
	 * @see eventHandler навешивает событие на объект по имени обработчика
	 */
	addEvents(config) {
		this.events.forEach(event => {
			eventHandler.handleEvent(this.element, event, config[event]);
		});
	}

	needAuth() {
		return this._needAuth;
	}

	forAuth() {
		return this._forAuth;
	}
}
