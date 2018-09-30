'use strict';

/**
 * Класс-отображение url в конкретные части HTML кода
 */
class Router {

	constructor() {
		this.routesMap = {};
		this.currentView = null;
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
		history.pushState({url: path}, '', path);
		this._onRoute(path);
	}
}

const router = new Router();
export default router;