import * as React from 'react';

import './HeaderRight.scss';
import { PATHS } from '../../routes';
import { connect } from 'react-redux';
import { ILangReducer } from '../../redux/lang/lang.reducer';
import userService from '../../service/UserService/UserService';

interface IProps {
    auth?: boolean;
    loginText?: boolean;
    regText?: boolean;
}

interface IState {
}

class HeaderRight extends React.Component<IProps, IState> {
    public static defaultProps: Partial<IProps> = {
        auth: userService.isLogIn(),
    };

    public constructor(props: IProps) {
        super(props);
    }

    public render(): JSX.Element {
        const { loginText } = this.props;
        const { regText } = this.props;
        const auth  = userService.isLogIn();

        return (
            <div className='header-right'>
                {auth ?
                    (<a className={ 'header-right__links' } href={ PATHS.PROFILE }>[ { userService.getUserInfo('login') } ]</a>)
                    :
                    (<div>
                        <a className={ 'header-right__links' } href={PATHS.SIGN_IN}>{ loginText }</a>
                        <a className={ 'header-right__links' } href={PATHS.SIGN_UP}>{ regText }</a>
                    </div>)
                }
            </div>
        );
    }
}

const mapStateToProps = (state: { lang: ILangReducer; }) => {
    return {
        loginText: state.lang.langObject['main.signIn'][state.lang.lang],
        regText: state.lang.langObject['main.signUp'][state.lang.lang],
    };
};

const mapDispatchToProps = dispatch => {
    return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(HeaderRight);
