import { SET_INPUT_DATA, SET_LOADING, SET_USER } from './common.constants';
import { IInputData, ILoaderData, IUser, IAbout } from 'customTypes';
import * as types from '../../store/types';

export interface ICommonReducer {
    inputData: IInputData;
    loaderData: ILoaderData;
    userData: IUser;
    text: IAbout;
}

enum CommonActionTypes {
    SET_INPUT_DATA = 'SET_INPUT_DATA',
    SET_LOADING = 'SET_LOADING',
    SET_USER = 'SET_USER',
}

interface ICommonAction {
    type: any;
    inputData?: IInputData;
    loaderData?: ILoaderData;
    userData?: IUser;
}

const initialState: ICommonReducer = {
    inputData: {
        value: '',
    },
    loaderData: {
        isActive: false,
    },
    userData: {
        name: '',
    },
    text: {
        text: 'a',
    },
};

export function common(state: ICommonReducer = initialState, action: any) {
    switch (action.type) {
        case SET_INPUT_DATA:
            return {
                ...state,
                inputData: action.inputData,
            };
        case SET_LOADING:
            return {
                ...state,
                loaderData: action.loaderData,
            };
        case SET_USER:
            return {
                ...state,
                userData: action.userData,
            };
        case types.RULES_RELOAD:
            return {
                ...state,
                text: action.data,
            };
        default:
            return state;
    }
}
