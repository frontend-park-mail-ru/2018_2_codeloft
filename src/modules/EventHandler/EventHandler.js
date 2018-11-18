import router from '../Router/Router.js';
import URLS from '../Consts/Consts.js';
import userService from '../../services/UserService/UserService.js';

/**
 * Класс, навешивающий обработчики событий
 * на объекты различных классов
 */
class EventHandler {
	constructor() {
		/**
		 * Мапа, отображающая имя обработчика в конкретную функцию-обработчик
		 */
		this.eventMap = {};
	}

	/**
	 * Метод, который непосредственно навешивает обработчик на объект
	 * @param object - объект, на который навешивается событие
	 * @param event - имя события
	 * @param funcName - имя обработчика
	 */
	handleEvent(object, event, funcName) {
		object.addEventListener(event, this.eventMap[funcName]);
	}

	/**
	 * Добавить отображение обработчика на его название
	 * @param funcName - имя обработчика
	 * @param handler - сама функция-обработчик
	 * @return {EventHandler} - возваращается сам объект
	 * класса Router для красивого многострочного добавления
	 */
	addHandler(funcName, handler) {
		this.eventMap[funcName] = handler;
		return this;
	}
}

const eventHandler = new EventHandler();

eventHandler
	.addHandler('goLogin', () => {
		router.go(URLS.SIGN_IN);
	})
	.addHandler('goRegister', () => {
		router.go(URLS.SIGN_UP);
	})
	.addHandler('goScore', () => {
		router.go(URLS.HIGH_SCORE);
	})
	.addHandler('goAbout', () => {
		router.go(URLS.ABOUT);
	})
	.addHandler('goProfile', () => {
		router.go(URLS.PROFILE);
	})
	.addHandler('goMenu', () => {
		router.go(URLS.MENU);
	})
	.addHandler('goSinglePlayer', () => {
		router.go(URLS.SINGLE_PLAYER);
	})
	.addHandler('goMultiPlayer', () => {
		router.go(URLS.MULTI_PLAYER);
	})
	.addHandler('logOut', () => {
		userService.logOut();
	});

export default eventHandler;
