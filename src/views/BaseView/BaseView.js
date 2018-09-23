export default class BaseView {

    constructor() {
        this.element = null;
    }

    render(data) {
        const div = document.createElement(('div'));
        div.innerHTML = this.template(data);
        this.element = div.lastChild;
    }

    show() {
        this.element.style.display = 'block';
    }

    hide() {
        this.element.style.display = 'none';
    }

}