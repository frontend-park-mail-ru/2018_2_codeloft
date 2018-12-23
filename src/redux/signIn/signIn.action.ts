import { SignInActionTypes } from './signIn.reducer';

export function setLogin(data: string) {
    return {
        type: SignInActionTypes.SET_LOGIN,
        login: data,
    };
}

export function setPassword(data: string) {
    return {
        type: SignInActionTypes.SET_PASSWORD,
        password: data,
    };
}
