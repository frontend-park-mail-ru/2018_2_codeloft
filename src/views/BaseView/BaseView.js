export default class BaseView {

	constructor() {
		this.element = null;
	}

	render() {
		return this.element;
	}

	show() {
		if (!this.element) {
			this.build().then(() => {
                document.getElementById('main').appendChild(this.render());
            })
		}
		else {
		    this.element.style.display = 'block';
        }
		//this.addEffects();
	}

	hide() {
		if (this.element) {
			this.element.style.display = 'none';
		}
	}

	addEffects() {

	}
}