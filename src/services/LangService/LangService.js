import eventBus from '../../modules/EventBus/EventBus.js';

const langJson = require('../../lang.json');

const RUSSIAN = 'ru';
const ENGLISH = 'en';

class LangService {
	constructor() {
		this._lang = localStorage.lang || ENGLISH;
		Object.keys(langJson).forEach((key) => {
			localStorage[key] = JSON.stringify(langJson[key]);
		});
		localStorage.lang = this._lang;
		setTimeout(() => {
			this.changeLanguage(ENGLISH);
		}, 3000);
	}

	changeLanguage(newLang) {
		if (newLang === RUSSIAN || newLang === ENGLISH) {
			this._lang = newLang;
			eventBus.emit('langChanged', this._lang);
			localStorage.lang = this._lang;
		}
	}

	getWord(keyName) {
		if (localStorage[keyName]) {
			return JSON.parse(localStorage[keyName])[this._lang];
		}
		return 'Error';
	}
}

const langService = new LangService();
export default langService;
