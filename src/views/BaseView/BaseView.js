export default class BaseView {

    constructor() {
        this.element = null;
    }

    render(data) {
        return this.element;
    }

    show() {
        this.element.style.display = 'block';
    }

    hide() {
        this.element.style.display = 'none';
    }

}