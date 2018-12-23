import * as React from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import './HighScore.scss';

import Button from '../../components/Button/Button';
import { IUserScore, ScoreTable } from '../../components/ScoreTable/ScoreTable';
import { ILangReducer } from '../../redux/lang/lang.reducer';
import { ChangeEvent } from 'react';
import Transport from '../../service/Transport/Transport';
import { PATHS } from '../../routes';
import { Link } from 'react-router-dom';
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';

/* tslint:disable:variable-name */
const HighScoreWrapper = styled.div`
  // some styles
`;

/* tslint:enable:variable-name */

interface IProps {
    backText?: string;
}

interface IState {
    numOfPages?: number;
    currentActive: number;
    pagesArray?: number[];
    minPage?: number;
    users?: IUserScore[];
}

class HighScore extends React.Component<IProps, IState> {
    private copyState: IState;

    public constructor(props) {
        super(props);
        this.copyState = {
            minPage: 1,
            users: [],
            pagesArray: [],
            currentActive: 1,
        };
        this.state = {
            minPage: 1,
            users: [],
            pagesArray: [],
            currentActive: 1,
            numOfPages: 1,
        };
        this.pageForward = this.pageForward.bind(this);
        this.pageBack = this.pageBack.bind(this);
    }

    public render(): JSX.Element {
        const paginateBack = '<<';
        const paginateForward = '>>';
        const {backText} = this.props;

        return (
            <HighScoreWrapper>
                <Header auth={false} logo={'Tron 2D'}/>
                <div className='main-content'>
                    <ScoreTable users={this.state.users}/>
                    <div className={'leaders-block__pagination-block'}>
                        <a onClick={this.pageBack}>{paginateBack}</a>
                        {this.state.pagesArray.map((i) => <a
                            key={i}
                            className={this.state.currentActive === i ? 'active' : ''}
                            onClick={() => {
                                this.copyState.currentActive = i;
                                this.paginate();
                            }}
                        >{i}
                        </a>)}
                        <a onClick={this.pageForward}>{paginateForward}</a>
                    </div>
                    <Button
                        link={<Link to={PATHS.MENU} className={'button'}>{backText}</Link>}
                    />
                </div>
                <Footer/>
            </HighScoreWrapper>
        );
    }

    public componentWillMount() {
        Transport.Get('/user').then((responseJSON) => responseJSON.json())
            .then((response) => {
                this.setState({numOfPages: response.pagesCount});
                this.copyState.numOfPages = response.pagesCount;
                this.paginate();
            });
    }

    private pageBack() {
        if (this.state.currentActive > 1) {
            this.copyState.currentActive = this.copyState.currentActive - 1;
            this.paginate();
        }
    }

    private pageForward() {
        if (this.copyState.currentActive < this.copyState.numOfPages) {
            this.copyState.currentActive = this.copyState.currentActive + 1;
            this.paginate();
        }
    }

    private paginate() {
        if (this.copyState.currentActive - this.copyState.minPage > 2) {
            this.copyState.minPage += this.copyState.currentActive - this.copyState.minPage - 2;
        }
        if (this.copyState.currentActive - this.copyState.minPage < 2 && this.copyState.minPage > 1) {
            this.copyState.minPage -= (2 - (this.copyState.currentActive - this.copyState.minPage));
        }
        const tempPointers: number[] = [];
        for (let i = Math.max(1, this.copyState.minPage); i <= Math.min(this.copyState.minPage + 4, this.copyState.numOfPages); i++) {
            tempPointers.push(i);
        }
        this.setState({pagesArray: tempPointers});
        this.setState({currentActive: this.copyState.currentActive});
        const tempArray: IUserScore[] = [];
        Transport.Get(`/user?page=${this.copyState.currentActive}&page_size=5`)
            .then((responseJSON) => responseJSON.json())
            .then((response) => {
                response.users.forEach((user) => {
                    const tempUser: IUserScore = {
                        nick: user.login,
                        score: user.score,
                    };
                    tempArray.push(tempUser);
                });
                this.setState({users: tempArray});
            });
    }
}

const mapStateToProps = (state: { lang: ILangReducer }) => {
    return {
        backText: state.lang.langObject['buttonBack'][state.lang.lang],
    };
};

const mapDispatchToProps = dispatch => {
    return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(HighScore);
