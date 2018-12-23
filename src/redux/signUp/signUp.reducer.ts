export interface ISignUpReducer {
    login: string;
    password: string;
    email: string;
    passwordRepeat: string;
}

const initialState: ISignUpReducer = {
    login: '',
    password: '',
    email: '',
    passwordRepeat: '',
};

export enum SignUpActionTypes {
    SET_LOGIN = 'SET_LOGIN',
    SET_PASSWORD = 'SET_PASSWORD',
    SET_EMAIL = 'SET_EMAIL',
    SET_PASSWORD_REPEAT = 'SET_PASSWORD_REPEAT',
}

export function signUp(state: ISignUpReducer = initialState, action: any) {
    switch (action.type) {
        case SignUpActionTypes.SET_LOGIN:
            return {
                ...state,
                login: action.login,
            };
        case SignUpActionTypes.SET_PASSWORD:
            return {
                ...state,
                password: action.password,
            };
        case SignUpActionTypes.SET_EMAIL:
            return {
                ...state,
                email: action.email,
            };
        case SignUpActionTypes.SET_PASSWORD_REPEAT:
            return {
                ...state,
                passwordRepeat: action.repeat,
            };
        default:
            return state;
    }
}
