'use strict';

import eventBus from '../../modules/EventBus/EventBus.js';
import URLS from '../Consts/Consts.js';

/**
 * Класс-отображение url в конкретные части HTML кода
 */
class Router {
	constructor() {
		this.routesMap = {};
		this.currentView = null;
		document.addEventListener('keydown', (key) => {
			if (key.key === 'Enter') {
				this.currentView.mainEvent();
			} else if (key.key === 'Escape') {
				this.go(URLS.MENU);
			}
		});
	}

	/**
	 * Инициализация работы приложения
	 * Метод получает начальный url и отрисовывает нужную часть сайта
	 * Вызывается при старте приложения
	 */
	start() {
		window.onpopstate = (event => {
			this._onRoute(window.location.pathname);
		});
		eventBus.on('loggedIn', this.goMenu.bind(this));
		eventBus.on('loggedOut', this.goMenu.bind(this));
		this._onRoute(window.location.pathname);
	}

	/**
	 * внутренняя реализация отрисовки и перехода по урлам
	 * @param pathname - урл, по которому и будет происходить изменения
	 * @private
	 */
	_onRoute(pathname) {
		const view = this.routesMap[pathname];

		if (!view) {
			return;
		}

		if (this.currentView) {
			this.currentView.hide();
		}
		this.currentView = view;
		this.currentView.show();
	}

	/**
	 * Добавление зависимости вьюшки от урла
	 * @param path - урл(текст)
	 * @param view - объект вьюшки
	 * @return {Router} - возваращается сам объект
	 * класса Router для красивого многострочного добавления
	 */
	add(path, view) {
		this.routesMap[path] = view;
		return this;
	}

	/**
	 * Публичный метод для перехода по урлу и отрисовки нужной части страницы
	 * @param path - сам урл, по которому необходим переход
	 */
	go(path) {
		window.history.pushState({ url: path }, '', path);
		this._onRoute(path);
	}

	goMenu() {
		this.go(URLS.MENU);
	}
}

const router = new Router();
export default router;
