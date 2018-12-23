import langService from '../../service/LangService/LangService';
const langJSON = require('../../lang.json');

const initialState: ILangReducer = {
    lang: langService.getLang(),
    langObject: langJSON,
};

export enum LangActionTypes {
    SET_LANG = 'SET_LANG',
}

export interface ILangReducer {
    lang: string;
    langObject: object;
}

export function lang(state: ILangReducer = initialState, action: any) {
    switch (action.type) {
        case LangActionTypes.SET_LANG:
            langService.changeLanguage(action.data);
            return {
                ...state,
                lang: action.data,
            };
        default:
            return state;
    }
}
