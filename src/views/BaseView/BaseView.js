'use strict';

import eventBus from '../../modules/EventBus/EventBus.js';
import userService from '../../services/UserService/UserService.js';
import router from '../../modules/Router/Router.js';
import URLS from '../../modules/Consts/Consts.js';

export default class BaseView {

    constructor() {
        this.element = null;
        this.elementsArray = [];
        this._needAuth = false;
        eventBus.on('loggedIn', this.handlePrivateComponents.bind(this));
        eventBus.on('loggedOut', this.handlePrivateComponents.bind(this));
    }

    init() {
        return new Promise((resolve) => {
            this.build().then(() => {
                this.hide();
                document.getElementById('main').appendChild(this.render());
                resolve();
            });
        });
    }

    build() {

    }

    render() {
        return this.element;
    }

    preRender() {
        return new Promise((resolve) => resolve());
    }

    afterRender() {
        return new Promise((resolve) => resolve());
    }

    show() {
        this.preRender()
            .then(() => {
                if (!this.element) {
                    return this.init();
                }
            })
            .then(() => {
                if (userService.isLogIn() || !this.needAuth()) {
                    this.afterRender().then(() => this.element.style.display = 'block')
                } else {
                    router.go(URLS.SIGN_IN);
                }
            });
    }

    hide() {
        if (this.element) {
            this.element.style.display = 'none';
        }
    }

    handlePrivateComponents() {
        if (this.element) {
            this.elementsArray.forEach((element) => element.handleVisibility());
        }
    }

    needAuth() {
        return this._needAuth;
    }
}