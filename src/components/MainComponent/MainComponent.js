'use strict';

import eventHandler from '../../modules/EventHandler/EventHandler.js';
import Transport from "../../modules/Transport/Transport.js";

export default class MainComponent {

    constructor() {
        this.element = null;
        this.template = null;
        this.events = [];
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
     * @param config - нужный для копиляции объект
     */
    compile(context) {
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
}
