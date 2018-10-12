'use strict';

import eventBus from '../../modules/EventBus/EventBus.js';

export default class BaseView {

    constructor() {
        this.element = null;
        this.elementsArray = [];
        eventBus.on('loggedIn', this.showPrivateComponents.bind(this));
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
                    document.getElementById('main').appendChild(this.render());
                    resolve();
                })
            }
            else {
                resolve();
            }
        }).then(() => {
            this.element.style.display = 'block';
            this.addEffects();
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
               }
            });
        }
    }

    addEffects() {

    }
}