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
        eventBus.on('loggedIn', this.showPrivateComponents.bind(this));
        eventBus.on('loggedOut', this.hidePrivateComponents.bind(this));
    }

    build() {

    }

    render() {
        return this.element;
    }

    show() {
        new Promise((resolve) => {
            if (!this.element) {
                this.build().then(() => {
                    this.render().style.display = 'none';
                    document.getElementById('main').appendChild(this.render());
                    if (userService.isLogIn()) {
                        this.showPrivateComponents();
                    } else {
                        this.hidePrivateComponents();
                    }
                    resolve();
                });
            }
            else {
                resolve();
            }
        }).then(() => {
            if (userService.isLogIn() || !this.needAuth()) {
                this.element.style.display = 'block';
                this.addEffects();
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

    showPrivateComponents() {
        if (this.element) {
            this.elementsArray.forEach((element) => {
                if (element.needAuth()) {
                    element.show();
                } else if (element.forAuth()) {
                    element.hide();
                }
            });
        }
    }

    hidePrivateComponents() {
        if (this.element) {
            this.elementsArray.forEach((element) => {
                if (element.needAuth()) {
                    element.hide();
                } else if (element.forAuth()) {
                    element.show();
                }
            });
        }
    }

    needAuth() {
        return this._needAuth;
    }

    addEffects() {

    }
}