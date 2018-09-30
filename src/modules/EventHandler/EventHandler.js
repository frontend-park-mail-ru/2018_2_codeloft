import router from '../Router/Router.js'

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
        router.go('/login/');
    })
    .addHandler('goRegister', () => {
        router.go('/register/');
    })
    .addHandler('goScore', () => {
        router.go('/score/');
    })
    .addHandler('goAbout', () => {
        router.go('/about/');
    })
    .addHandler('goProfile', () => {
        router.go('/profile/');
    })
    .addHandler('goMenu', () => {
        router.go('/');
    });

export default eventHandler;
