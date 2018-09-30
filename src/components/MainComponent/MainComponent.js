'use strict';

import eventHandler from "../../modules/EventHandler/EventHandler.js";

export default class MainComponent {
    constructor() {
        this.element = null;
        this.template = null;
        this.events = [];
    }

    render() {
        return this.element;
    }

    show() {
        if (!this.element) {
            this.build();
            document.getElementById('main').appendChild(this.render());
        }
        this.element.style.display = 'block';
    }

    hide() {
        if (this.element) {
            this.element.style.display = 'none';
        }
    }

    innerHTML(html) {
        this.element.innerHTML = html;
    }

    remove() {
        this.element.parentElement.removeChild(this.element);
    }

    compile(config) {
        const parent = document.createElement('div');
        parent.innerHTML = this.template(config);
        this.element = parent.lastChild;
        this.addEvents(config);
    }

    addEvents(config) {
        this.events.forEach(event => {
            eventHandler.handleEvent(this.element, event, config[event]);
        })
    }

}
