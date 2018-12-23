import { ValidatorActionTypes } from './validation.reducer';

export function setSignInLoginError(error: boolean) {
    return {
        type: ValidatorActionTypes.SET_SIGNIN_LOGIN_ERROR,
        data: error,
    };
}

export function setSignInPasswordError(error: boolean) {
    return {
        type: ValidatorActionTypes.SET_SIGNIN_PASSWORD_ERROR,
        data: error,
    };
}

export function setSignUpLoginError(error: boolean) {
    return {
        type: ValidatorActionTypes.SET_SIGNUP_LOGIN_ERROR,
        data: error,
    };
}

export function setSignUpPasswordError(error: boolean) {
    return {
        type: ValidatorActionTypes.SET_SIGNUP_PASSWORD_ERROR,
        data: error,
    };
}

export function setSignUpRepeatError(error: boolean) {
    return {
        type: ValidatorActionTypes.SET_SIGNUP_REPEAT_ERROR,
        data: error,
    };
}

export function setSignUpEmailError(error: boolean) {
    return {
        type: ValidatorActionTypes.SET_SIGNUP_EMAIL_ERROR,
        data: error,
    };
}