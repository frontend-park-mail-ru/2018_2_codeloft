import * as types from './types';

export function setAboutText(text) {
    return {
        type: types.RULES_RELOAD,
        data: {text},
    };
}
