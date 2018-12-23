import * as React from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';

import Button from '../../components/Button/Button';
import Input from '../../components/Input/Input';
import Label from '../../components/Label/Label';
import { setLogin, setPassword } from '../../redux/signIn/signIn.action';
import { ILangReducer } from '../../redux/lang/lang.reducer';
import { ISignInReducer, signIn } from '../../redux/signIn/signIn.reducer';
import { setSignInLoginError, setSignInPasswordError } from '../../redux/validator/validation.action';
import { IValidatorReducer } from '../../redux/validator/validation.reducer';
import userService from '../../service/UserService/UserService';
import validator from '../../modules/Validator';
import { ChangeEvent } from 'react';
import { PATHS } from '../../routes';
import { Link, Redirect } from 'react-router-dom';
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';
/* tslint:disable:variable-name */
const SignInWrapper = styled.div`
  // some styles
`;

/* tslint:enable:variable-name */

interface ISignInError {
    loginError?: string;
    passwordError?: string;
}

interface IProps {
    loginPlaceholder?: string;
    passwordPlaceholder?: string;
    setLogin?: (login: string) => void;
    setPassword?: (password: string) => void;
    setLoginError?: (wrong: boolean) => void;
    setPasswordError?: (wrong: boolean) => void;
    login?: string;
    password?: string;
    hasLoginError?: boolean;
    hasPasswordError?: boolean;
    loginText?: string;
    backText?: string;
}

interface IState {
    needRedirect: boolean;
}

class SignIn extends React.Component<IProps, IState> {
    private errors: ISignInError = {
        loginError: '',
        passwordError: '',
    };

    public constructor(props) {
        super(props);
        this.state = {
            needRedirect: false,
        };
        this.onSubmit = this.onSubmit.bind(this);
        this.setLogin = this.setLogin.bind(this);
        this.setPassword = this.setPassword.bind(this);
        this.loginWithEnter = this.loginWithEnter.bind(this);
        this.validateInput = this.validateInput.bind(this);
    }

    public render(): JSX.Element {
        const {loginPlaceholder} = this.props;
        const {passwordPlaceholder} = this.props;
        const {login} = this.props;
        const {password} = this.props;
        const {hasLoginError} = this.props;
        const {hasPasswordError} = this.props;
        const {loginText} = this.props;
        const {backText} = this.props;

        if (userService.isLogIn()) {
            return <Redirect to={PATHS.PROFILE}/>;
        }
        return (
            <SignInWrapper>
                <Header auth={false} logo={'Tron 2D'}/>
                <div className='main-content'>
                    {!this.state.needRedirect ? (
                        <form className={'sinIn-block__signIn-form'}>
                            {hasLoginError ? <Label text={this.errors.loginError}/> : ''}
                            <Input
                                text={login}
                                placeholder={loginPlaceholder}
                                onChange={this.setLogin}
                                className={'signIn-form__login-input'}
                                onBlur={this.validateInput}
                            />
                            {hasPasswordError ? <Label text={this.errors.passwordError}/> : ''}
                            <Input
                                text={password}
                                type={'password'}
                                placeholder={passwordPlaceholder}
                                onChange={this.setPassword}
                                className={'signIn-form__password-input'}
                                onBlur={this.validateInput}
                            />
                        </form>
                    ) : <Redirect to={PATHS.MENU}/>}
                    <Button
                        text={loginText}
                        onClick={this.onSubmit}
                        main={true}
                    />
                    <Button
                        link={<Link to={PATHS.MENU} className={'button'}>{backText}</Link>}
                    />
                </div>
                <Footer/>
            </SignInWrapper>
        );
    }

    public onSubmit(): void {
        const event = new Event('blur');
        document.querySelector('.signIn-form__login-input').dispatchEvent(event);
        document.querySelector('.signIn-form__password-input').dispatchEvent(event);
        if (!this.props.hasLoginError && !this.props.hasPasswordError) {
            const requestBody = {
                login: this.props.login,
                password: this.props.password,
            };
            userService.logIn(requestBody)
                .then((ans) => {
                    if (ans === 'ok') {
                        this.setState({needRedirect: true});
                    } else {
                        this.errors.loginError = ans.What || 'Internal error';
                        this.props.setLoginError(true);
                    }
                });
        }
    }

    public componentWillMount(): void {
        window.addEventListener('keypress', this.loginWithEnter);
    }

    public componentWillUnmount(): void {
        window.removeEventListener('keypress', this.loginWithEnter);
    }

    private loginWithEnter(event) {
        if (event.keyCode === 13 && event.type === 'keypress') {
            this.onSubmit();
        }
    }

    private validateInput(event: ChangeEvent<HTMLInputElement>) {
        if (event.target.className.match(/login/ig)) {
            this.props.setLoginError(false);
            this.errors.loginError = validator.validateLogin(event.target.value);
            if (this.errors.loginError) {
                this.props.setLoginError(true);
            }
        } else if (event.target.className.match(/password/ig)) {
            this.props.setPasswordError(false);
            this.errors.passwordError = validator.validatePassword(event.target.value);
            if (this.errors.passwordError) {
                this.props.setPasswordError(true);
            }
        }
    }

    private setLogin(event: ChangeEvent<HTMLInputElement>): void {
        this.props.setLogin(event.target.value);
    }

    private setPassword(event: ChangeEvent<HTMLInputElement>): void {
        this.props.setPassword(event.target.value);
    }
}

const mapStateToProps = (state: { lang: ILangReducer, signIn: ISignInReducer, validator: IValidatorReducer }) => {
    return {
        loginPlaceholder: state.lang.langObject['signIn.login'][state.lang.lang],
        passwordPlaceholder: state.lang.langObject['signIn.password'][state.lang.lang],
        loginText: state.lang.langObject['main.signIn'][state.lang.lang],
        backText: state.lang.langObject['buttonBack'][state.lang.lang],
        login: state.signIn.login,
        password: state.signIn.password,
        hasLoginError: state.validator.signInLoginError,
        hasPasswordError: state.validator.signInPasswordError,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        setLogin(login: string) {
            dispatch(setLogin(login));
        },
        setPassword(password: string) {
            dispatch(setPassword(password));
        },
        setLoginError(wrong: boolean) {
            dispatch(setSignInLoginError(wrong));
        },
        setPasswordError(wrong: boolean) {
            dispatch(setSignInPasswordError(wrong));
        },
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(SignIn);
