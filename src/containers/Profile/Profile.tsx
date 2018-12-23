import * as React from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';

import Button from '../../components/Button/Button';
import UserInfo from '../../components/UserInfo/UserInfo';
import userService from '../../service/UserService/UserService';
import '../../statics/scss/user-page.scss';
import { ILangReducer } from '../../redux/lang/lang.reducer';
import { PATHS } from '../../routes';
import { Link, Redirect } from 'react-router-dom';
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';

/* tslint:disable:variable-name */
const ProfileWrapper = styled.div`
  // some styles
`;

/* tslint:enable:variable-name */

interface IProps {
    username?: string;
    email?: string;
    score?: string;
    backText?: string;
    logOutText?: string;
}

interface IState {
    canRender: boolean;
}

class Profile extends React.Component<IProps, IState> {
    public constructor(props) {
        super(props);
        this.state = {
            canRender: true,
        };
        this.logOut = this.logOut.bind(this);
    }

    public render(): JSX.Element {
        const {backText} = this.props;
        const {logOutText} = this.props;
        const {canRender} = this.state;

        if (canRender && !userService.isLogIn()) {
            return <Redirect to={PATHS.SIGN_IN}/>;
        }
        return (
            <ProfileWrapper>
                <Header auth={false} logo={'Tron 2D'}/>
                <div className='main-content'>
                    {!canRender ? <Redirect to={PATHS.MENU}/> : (
                        <img src='../../statics/imgs/user-default.jpg' className={'profile-block__avatar'}/>
                    )}
                    <UserInfo
                        className={'profile-block__user-info'}
                        user={userService.getUserInfo('login')}
                        score={userService.getUserInfo('score')}
                    />
                    <Button
                        text={logOutText}
                        onClick={this.logOut}
                    />
                    <Button
                        link={<Link to={PATHS.MENU} className={'button'}>{backText}</Link>}
                    />
                </div>
                <Footer/>
            </ProfileWrapper>
        );
    }

    private logOut() {
        userService.logOut().then(() => {
            this.setState({canRender: false});
        });
    }
}

const mapStateToProps = (state: { lang: ILangReducer }) => {
    return {
        backText: state.lang.langObject['buttonBack'][state.lang.lang],
        logOutText: state.lang.langObject['profile.logOut'][state.lang.lang],
    };
};

const mapDispatchToProps = dispatch => {
    return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(Profile);