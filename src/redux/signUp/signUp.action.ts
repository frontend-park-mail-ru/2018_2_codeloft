import { SignUpActionTypes } from './signUp.reducer';

export function setLogin(data: string) {
    return {
        type: SignUpActionTypes.SET_LOGIN,
        login: data,
    };
}

export function setPassword(data: string) {
    return {
        type: SignUpActionTypes.SET_PASSWORD,
        password: data,
    };
}

export function setEmail(data: string) {
    return {
        type: SignUpActionTypes.SET_EMAIL,
        email: data,
    };
}

export function setRepeat(data: string) {
    return {
        type: SignUpActionTypes.SET_PASSWORD_REPEAT,
        repeat: data,
    };
}
