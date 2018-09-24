'use strict';

export default class MainComponent {
    constructor() {
        this.element = null;
        this.template = null;
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

    compile(data) {
        const parent = document.createElement('div');
        parent.innerHTML = this.template(data);
        this.element = parent.lastChild;
        //this.element.appendChild(element);
    }
}
