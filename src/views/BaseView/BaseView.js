export default class BaseView {

    constructor() {
        this.element = null;
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

}