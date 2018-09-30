import router from "../Router/Router.js";

class EventHandler {

    constructor() {
        this.eventMap = {};
    }

    handleEvent(object, event, funcName) {
        object.addEventListener(event, this.eventMap[funcName]);
    }

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