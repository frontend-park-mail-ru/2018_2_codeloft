'use strict';

export default class MainComponent {
    constructor(defaultTag = 'div', classes = [], attr = {}) {
        this.element = document.createElement(defaultTag);

        classes.forEach(className => {
            this.element.classList.add(className);
        });

        for (let attrName in attr) {
            this.element.setAttribute(attrName, attr[attrName])
        }
    }

    render() {
        return this.element;
    }

    show() {
        this.element.style.display = 'block';
    }

    hide() {
        this.element.style.display = 'none';
    }

    innerHTML(html) {
        this.element.innerHTML = html;
    }

    remove() {
        this.element.parentElement.removeChild(this.element);
    }

    append(element) {
        this.element.appendChild(element);
    }
}
