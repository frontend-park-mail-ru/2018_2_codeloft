export enum ValidatorActionTypes {
    SET_SIGNIN_LOGIN_ERROR = 'SET_SIGNIN_LOGIN_ERROR',
    SET_SIGNIN_PASSWORD_ERROR = 'SET_SIGNIN_PASSWORD_ERROR',

    SET_SIGNUP_LOGIN_ERROR = 'SET_SIGNUP_LOGIN_ERROR',
    SET_SIGNUP_PASSWORD_ERROR = 'SET_SIGNUP_PASSWORD_ERROR',
    SET_SIGNUP_EMAIL_ERROR = 'SET_SIGNUP_EMAIL_ERROR',
    SET_SIGNUP_REPEAT_ERROR = 'SET_SIGNUP_REPEAT_ERROR',
}

export interface IValidatorReducer {
    signInLoginError?: boolean;
    signInPasswordError?: boolean;

    signUpLoginError?: boolean;
    signUpPasswordError?: boolean;
    signUpRepeatError?: boolean;
    signUpEmailError?: boolean;
}

const initialState: IValidatorReducer = {
    signInLoginError: true,
    signInPasswordError: true,

    signUpLoginError: true,
    signUpPasswordError: true,
    signUpRepeatError: true,
    signUpEmailError: true,
};

export function validator(state: IValidatorReducer = initialState, action: any) {
    switch (action.type) {
        case ValidatorActionTypes.SET_SIGNIN_LOGIN_ERROR:
            return {
                ...state,
                signInLoginError: action.data,
            };
        case ValidatorActionTypes.SET_SIGNIN_PASSWORD_ERROR:
            return {
                ...state,
                signInPasswordError: action.data,
            };
        case ValidatorActionTypes.SET_SIGNUP_EMAIL_ERROR:
            return {
                ...state,
                signUpEmailError: action.data,
            };
        case ValidatorActionTypes.SET_SIGNUP_LOGIN_ERROR:
            return {
                ...state,
                signUpLoginError: action.data,
            };
        case ValidatorActionTypes.SET_SIGNUP_PASSWORD_ERROR:
            return {
                ...state,
                signUpPasswordError: action.data,
            };
        case ValidatorActionTypes.SET_SIGNUP_REPEAT_ERROR:
            return {
                ...state,
                signUpRepeatError: action.data,
            };
        default:
            return state;
    }
}
