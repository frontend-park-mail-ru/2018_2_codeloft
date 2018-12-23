export interface ISignInReducer {
    login: string;
    password: string;
}

const initialState: ISignInReducer = {
  login: '',
  password: '',
};

export enum SignInActionTypes {
    SET_LOGIN = 'SET_LOGIN',
    SET_PASSWORD = 'SET_PASSWORD',
}

export function signIn(state: ISignInReducer = initialState, action: any) {
    switch (action.type) {
        case SignInActionTypes.SET_LOGIN:
            return {
                ...state,
                login: action.login,
            };
        case SignInActionTypes.SET_PASSWORD:
            return {
                ...state,
                password: action.password,
            };
        default:
            return state;
    }
}
