import { LangActionTypes } from './lang.reducer';

export function changeLang(lang: string) {
    return {
        type: LangActionTypes.SET_LANG,
        data: lang,
    };
}
