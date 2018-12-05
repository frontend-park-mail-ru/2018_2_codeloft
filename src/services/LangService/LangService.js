const langJson = require('../../lang.json');

const RUSSIAN = 'ru';
const ENGLISH = 'en';

class LangService {
	constructor() {
		this._lang = ENGLISH;
	}

	changeLanguage(newLang) {
		if (newLang === RUSSIAN || newLang === ENGLISH) {
			this._lang = newLang;
		}
	}

	getWord(keyName) {
		if (langJson[keyName]) {
			return langJson[keyName][this._lang] || 'Error';
		}
		return 'Error';
	}
}

const langService = new LangService();
export default langService;
