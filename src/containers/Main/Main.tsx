import * as React from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';

import Button from '../../components/Button/Button';
import { ILangReducer } from '../../redux/lang/lang.reducer';
import { Link } from 'react-router-dom';
import { PATHS } from '../../routes';
import userService from '../../service/UserService/UserService';
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';

/* tslint:disable:variable-name */
const MainWrapper = styled.div`
  // some styles
`;

/* tslint:enable:variable-name */

interface IProps {
    singleText?: string;
    multiText?: string;
    loginText?: string;
    regText?: string;
    rulesText?: string;
    leadersText?: string;
    profileText?: string;
}

class Main extends React.Component<IProps> {
    public constructor(props) {
        super(props);

        // this.customOnClick = this.customOnClick.bind(this);
    }

    public render(): JSX.Element {
        const {singleText} = this.props;
        const {multiText} = this.props;
        const {rulesText} = this.props;
        const {leadersText} = this.props;
        const {profileText} = this.props;

        return (
            <MainWrapper>
                <Header auth={false} logo={'Tron 2D'}/>
                <div className='main-content'>
                    <Button
                        link={<Link to={PATHS.SINGLE_PLAYER} className={'button'}>{singleText}</Link>}
                    />
                    {userService.isLogIn() ? (
                        <Button
                            link={<Link to={PATHS.MULTI_PLAYER} className={'button'}>{multiText}</Link>}
                        />) : ''}
                    <Button
                        link={<Link to={PATHS.ABOUT} className={'button'}>{rulesText}</Link>}
                    />
                    <Button
                        link={<Link to={PATHS.HIGH_SCORE} className={'button'}>{leadersText}</Link>}
                    />
                    {userService.isLogIn() ? (
                        <Button
                            link={<Link to={PATHS.PROFILE} className={'button'}>{profileText}</Link>}
                        />
                    ) : ''}
                </div>
                <Footer/>

            </MainWrapper>
        );
    }
}

const mapStateToProps = (state: { lang: ILangReducer; }) => {
    return {
        singleText: state.lang.langObject['main.singleplayer'][state.lang.lang],
        multiText: state.lang.langObject['main.multiplayer'][state.lang.lang],
        loginText: state.lang.langObject['main.signIn'][state.lang.lang],
        regText: state.lang.langObject['main.signUp'][state.lang.lang],
        rulesText: state.lang.langObject['main.rules'][state.lang.lang],
        leadersText: state.lang.langObject['main.score'][state.lang.lang],
        profileText: state.lang.langObject['main.profile'][state.lang.lang],
    };
};

const mapDispatchToProps = dispatch => {
    return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(Main);
