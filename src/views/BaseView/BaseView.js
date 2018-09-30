export default class BaseView {

	constructor() {
		this.element = null;
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

}