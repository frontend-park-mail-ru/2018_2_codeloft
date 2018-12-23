import * as types from './types';

const initialState = {
   text: 'example',
};

export default function about(state: any = initialState, action: any) {
    switch (action.type) {
        case types.RULES_RELOAD:
            return {
                ...state,
                text: { ...action.text },
            };
        default:
            return state;
    }
}
