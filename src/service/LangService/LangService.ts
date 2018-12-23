const langJson = require('../../lang.json');

const RUSSIAN = 'ru';
const ENGLISH = 'en';

class LangService {
    private lang: string;
    constructor() {
        this.lang = localStorage.lang || ENGLISH;
        Object.keys(langJson).forEach((key: string) => {
            localStorage[key] = JSON.stringify(langJson[key]);
        });
        localStorage.lang = this.lang;
        setTimeout(() => this.changeLanguage('en'), 5000);
    }

    public changeLanguage(newLang) {
        if (newLang === RUSSIAN || newLang === ENGLISH) {
            this.lang = newLang;
            localStorage.lang = this.lang;
        }
    }

    public getLang() {
        return this.lang;
    }

    public getWord(keyName) {
        if (localStorage[keyName]) {
            return JSON.parse(localStorage[keyName])[this.lang];
        }
        return 'Error';
    }
}

const langService = new LangService();
export default langService;
