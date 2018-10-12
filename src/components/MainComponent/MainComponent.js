'use strict';

import eventHandler from '../../modules/EventHandler/EventHandler.js';
import Transport from "../../modules/Transport/Transport.js";

export default class MainComponent {

    constructor() {
        this.element = null;
        this.template = null;
        this.events = [];
        this._needAuth = false;
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
        if (context['needAuth'] === 'true') {
            this._needAuth = true;
        }
        return Transport.GetHTML(this.template, context)
            .then((resJSON) => resJSON.json())
            .then(compiled => {
                const parent = document.createElement('div');
                parent.innerHTML = compiled.html;
                this.element = parent.lastChild;
                this.addEvents(context);
                return this;
            })
            .catch(error => console.log(error));
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
}
