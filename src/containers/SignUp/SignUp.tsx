import * as React from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';

import Button from '../../components/Button/Button';
import Input from '../../components/Input/Input';
import Label from '../../components/Label/Label';
import { setLogin, setPassword, setEmail, setRepeat } from '../../redux/signUp/signUp.action';
import { ILangReducer } from '../../redux/lang/lang.reducer';
import { ISignUpReducer, signUp } from '../../redux/signUp/signUp.reducer';
import { IValidatorReducer } from '../../redux/validator/validation.reducer';
import userService from '../../service/UserService/UserService';
import validator from '../../modules/Validator';
import { ChangeEvent } from 'react';
import { setSignUpEmailError, setSignUpLoginError, setSignUpPasswordError, setSignUpRepeatError } from '../../redux/validator/validation.action';
import { PATHS } from '../../routes';
import { Link, Redirect } from 'react-router-dom';
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';

/* tslint:disable:variable-name */
const SignUpWrapper = styled.div`
  // some styles
`;

/* tslint:enable:variable-name */

interface ISignUpError {
    loginError?: string;
    passwordError?: string;
    emailError?: string;
    repeatError?: string;
}

interface IProps {
    loginPlaceholder?: string;
    passwordPlaceholder?: string;
    emailPlaceholder?: string;
    repeatPlaceholder?: string;
    setLogin?: (login: string) => void;
    setPassword?: (password: string) => void;
    setEmail?: (email: string) => void;
    setRepeat?: (repeat: string) => void;
    setLoginError?: (wrong: boolean) => void;
    setPasswordError?: (wrong: boolean) => void;
    setEmailError?: (wrong: boolean) => void;
    setRepeatError?: (wrong: boolean) => void;
    login?: string;
    password?: string;
    email?: string;
    repeat?: string;
    hasLoginError?: boolean;
    hasPasswordError?: boolean;
    hasEmailError?: boolean;
    hasRepeatError?: boolean;
    regText?: string;
    backText?: string;
}

interface IState {
    needRedirect: boolean;
}

class SignUp extends React.Component<IProps, IState> {
    private errors: ISignUpError = {
        loginError: '',
        passwordError: '',
        emailError: '',
        repeatError: '',
    };

    public constructor(props) {
        super(props);
        this.state = {
            needRedirect: false,
        };
        this.onSubmit = this.onSubmit.bind(this);
        this.setLogin = this.setLogin.bind(this);
        this.setPassword = this.setPassword.bind(this);
        this.setEmail = this.setEmail.bind(this);
        this.setRepeat = this.setRepeat.bind(this);
        this.loginWithEnter = this.loginWithEnter.bind(this);
        this.validateInput = this.validateInput.bind(this);
    }

    public render(): JSX.Element {
        const {loginPlaceholder} = this.props;
        const {passwordPlaceholder} = this.props;
        const {emailPlaceholder} = this.props;
        const {repeatPlaceholder} = this.props;
        const {login} = this.props;
        const {password} = this.props;
        const {repeat} = this.props;
        const {email} = this.props;
        const {hasLoginError} = this.props;
        const {hasPasswordError} = this.props;
        const {hasEmailError} = this.props;
        const {hasRepeatError} = this.props;
        const {regText} = this.props;
        const {backText} = this.props;

        if (userService.isLogIn()) {
            return <Redirect to={PATHS.PROFILE}/>;
        }
        return (
            <SignUpWrapper>
                <Header auth={false} logo={'Tron 2D'}/>
                <div className='main-content'>
                    {!this.state.needRedirect ? (
                        <form className={'sinUp-block__signUp-form'}>
                            {hasLoginError ? <Label text={this.errors.loginError}/> : ''}
                            <Input
                                text={login}
                                placeholder={loginPlaceholder}
                                onChange={this.setLogin}
                                className={'signUp-form__login-input'}
                                onBlur={this.validateInput}
                            />
                            {hasEmailError ? <Label text={this.errors.emailError}/> : ''}
                            <Input
                                text={email}
                                placeholder={emailPlaceholder}
                                onChange={this.setEmail}
                                className={'signUp-form__email-input'}
                                onBlur={this.validateInput}
                            />
                            {hasPasswordError ? <Label text={this.errors.passwordError}/> : ''}
                            <Input
                                text={password}
                                type={'password'}
                                placeholder={passwordPlaceholder}
                                onChange={this.setPassword}
                                className={'signUp-form__password-input'}
                                onBlur={this.validateInput}
                            />
                            {hasRepeatError ? <Label text={this.errors.repeatError}/> : ''}
                            <Input
                                text={repeat}
                                type={'password'}
                                placeholder={repeatPlaceholder}
                                onChange={this.setRepeat}
                                className={'signUp-form__repeat-input'}
                                onBlur={this.validateInput}
                            />
                        </form>
                    ) : <Redirect to={PATHS.MENU}/>}
                    <Button text={regText} onClick={this.onSubmit} main={true}/>
                    <Button
                        link={<Link to={PATHS.MENU} className={'button'}>{backText}</Link>}
                    />
                </div>
                <Footer/>
            </SignUpWrapper>
        );
    }

    public onSubmit(): void {
        const event = new Event('blur');
        document.querySelector('.signUp-form__login-input').dispatchEvent(event);
        document.querySelector('.signUp-form__password-input').dispatchEvent(event);
        document.querySelector('.signUp-form__email-input').dispatchEvent(event);
        document.querySelector('.signUp-form__repeat-input').dispatchEvent(event);
        if (!this.props.hasLoginError && !this.props.hasPasswordError
            && !this.props.hasEmailError && !this.props.hasRepeatError) {
            const requestBody = {
                login: this.props.login,
                password: this.props.password,
                email: this.props.email,
            };
            userService.register(requestBody)
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
        } else if (event.target.className.match(/email/ig)) {
            this.props.setEmailError(false);
            this.errors.emailError = validator.validateEmail(event.target.value);
            if (this.errors.emailError) {
                this.props.setEmailError(true);
            }
        } else if (event.target.className.match(/repeat/ig)) {
            this.props.setRepeatError(false);
            this.errors.repeatError = validator.validateRepeat(event.target.value, this.props.password);
            if (this.errors.repeatError) {
                this.props.setRepeatError(true);
            }
        }
    }

    private setLogin(event: ChangeEvent<HTMLInputElement>): void {
        this.props.setLogin(event.target.value);
    }

    private setPassword(event: ChangeEvent<HTMLInputElement>): void {
        this.props.setPassword(event.target.value);
    }

    private setEmail(event: ChangeEvent<HTMLInputElement>): void {
        this.props.setEmail(event.target.value);
    }

    private setRepeat(event: ChangeEvent<HTMLInputElement>): void {
        this.props.setRepeat(event.target.value);
    }
}

const mapStateToProps = (state: { lang: ILangReducer, signUp: ISignUpReducer, validator: IValidatorReducer }) => {
    return {
        loginPlaceholder: state.lang.langObject['signIn.login'][state.lang.lang],
        passwordPlaceholder: state.lang.langObject['signIn.password'][state.lang.lang],
        emailPlaceholder: state.lang.langObject['signUp.email'][state.lang.lang],
        repeatPlaceholder: state.lang.langObject['signUp.repeatPassword'][state.lang.lang],
        regText: state.lang.langObject['main.signUp'][state.lang.lang],
        backText: state.lang.langObject['buttonBack'][state.lang.lang],
        login: state.signUp.login,
        password: state.signUp.password,
        email: state.signUp.email,
        repeat: state.signUp.passwordRepeat,
        hasLoginError: state.validator.signUpLoginError,
        hasPasswordError: state.validator.signUpPasswordError,
        hasEmailError: state.validator.signUpEmailError,
        hasRepeatError: state.validator.signUpRepeatError,
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
        setEmail(email: string) {
            dispatch(setEmail(email));
        },
        setRepeat(repeat: string) {
            dispatch(setRepeat(repeat));
        },
        setLoginError(wrong: boolean) {
            dispatch(setSignUpLoginError(wrong));
        },
        setPasswordError(wrong: boolean) {
            dispatch(setSignUpPasswordError(wrong));
        },
        setEmailError(wrong: boolean) {
            dispatch(setSignUpEmailError(wrong));
        },
        setRepeatError(wrong: boolean) {
            dispatch(setSignUpRepeatError(wrong));
        },
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(SignUp);
