export default class BaseView {

    constructor() {
        this.element = null;
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

    addEffects() {

    }
}