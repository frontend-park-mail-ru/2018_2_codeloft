import * as React from 'react';
import { connect } from 'react-redux';
import PreSinglePlayer from '../../components/PreSinglePlayer/PreSinglePlayer';
import GameInfo from '../../components/GameInfo/GameInfo';
import GameResults from '../../components/GameResults/GameResults';
import SinglePlayerHandler from '../../game/SinglePlayer/SinglePlayerHandler';
import GameBlock from '../../components/GameBlock/GameBlock';
import { ILangReducer } from '../../redux/lang/lang.reducer';
import langService from '../../service/LangService/LangService';

import './SinglePlayer.scss';
import eventBus from '../../modules/EventBus';
import { Redirect } from 'react-router';
import { PATHS } from '../../routes';
import ImagePopUp from '../../components/ImagePop/ImagePopUp';
import userService from '../../service/UserService/UserService';

const SINGLE_PLAYER_GAME_FIELD = 'singleplayer-block__game-field';

interface IProps {
    scoreTip: string;
    controlTip: string;
    goalTip: string;
    mainLabel: string;
    playText: string;
    backText: string;
    playAgainText: string;
    resBackText: string;
}

interface IState {
    preSingleMode: boolean;
    gameMode: boolean;
    resultsMode: boolean;
    needRedirect: boolean;
}

class SinglePlayer extends React.Component<IProps, IState> {
    private gameHandler: SinglePlayerHandler;
    private timerLabel: HTMLCollectionOf<HTMLElement>;
    private scoreLabel: HTMLCollectionOf<HTMLElement>;
    private resGoalsLabel: HTMLCollectionOf<HTMLElement>;
    private resScoreLabel: HTMLCollectionOf<HTMLElement>;
    private readonly timerHandler: () => void;
    private readonly resultsHandler: () => void;
    private readonly scoreHandler: (value) => void;

    public constructor(props) {
        super(props);
        this.state = {
            preSingleMode: true,
            gameMode: false,
            resultsMode: false,
            needRedirect: false,
        };
        this.onPlayClick = this.onPlayClick.bind(this);
        this.quitWithEscape = this.quitWithEscape.bind(this);
        this.scoreHandler = this.redrawScore.bind(this);
        this.timerHandler = this.redrawTimer.bind(this);
        this.resultsHandler = this.showResults.bind(this);
        this.quit = this.quit.bind(this);
        this.playAgain = this.playAgain.bind(this);
        eventBus.on('scoreRedraw', this.scoreHandler);
        eventBus.on('timerTick', this.timerHandler);
        eventBus.on('timerStop', this.resultsHandler);
    }

    public render(): JSX.Element {
        const {scoreTip} = this.props;
        const {controlTip} = this.props;
        const {goalTip} = this.props;
        const {mainLabel} = this.props;
        const {playText} = this.props;
        const {backText} = this.props;
        const {resBackText} = this.props;
        const {playAgainText} = this.props;

        return (
            <div className='singleplayer-block with-border'>
                {this.state.preSingleMode ?
                    <PreSinglePlayer
                        scoreTip={scoreTip}
                        controlTip={controlTip}
                        goalTip={goalTip}
                        mainLabel={mainLabel}
                        playText={playText}
                        backText={backText}
                        playClick={this.onPlayClick}
                    /> : ''
                }
                {!this.state.needRedirect ? '' : <Redirect to={PATHS.MENU}/>}
                {this.state.gameMode? <ImagePopUp src={'../../statics/imgs/control.jpg'}/>: ''}
                {this.state.gameMode? <ImagePopUp top={true} src={'../../statics/imgs/escape.jpg'}/>: ''}
                <GameBlock shown={this.state.gameMode} className={SINGLE_PLAYER_GAME_FIELD}/>
                <GameInfo shown={this.state.gameMode}/>
                <GameResults
                    shown={this.state.resultsMode}
                    backText={resBackText}
                    againText={playAgainText}
                    backClick={this.quit}
                    playClick={this.playAgain}
                />
            </div>
        );
    }

    public componentWillMount(): void {
        window.addEventListener('keydown', this.quitWithEscape);
    }

    public componentWillUnmount(): void {
        window.removeEventListener('keydown', this.quitWithEscape);
        if (this.gameHandler) {
            this.endGame();
        }
        eventBus.off('timerStop', this.resultsHandler);
        eventBus.off('timerTick', this.timerHandler);
        eventBus.off('scoreRedraw', this.scoreHandler);
    }

    private onPlayClick() {
        // document.body.style.cursor = 'none';
        this.setState({
            preSingleMode: false,
            gameMode: true,
        });
        if (!this.timerLabel) {
            this.timerLabel = document.getElementsByClassName('game-stat__timer-block') as HTMLCollectionOf<HTMLElement>;
        }
        if (!this.scoreLabel) {
            this.scoreLabel = document.getElementsByClassName('game-stat__score-block') as HTMLCollectionOf<HTMLElement>;
        }
        this.scoreLabel[0].innerText = `${langService.getWord('gameResults.score')} 0`;
        this.timerLabel[0].innerText = `${langService.getWord('game.time')} 30`;
        setTimeout(() => {
            this.gameHandler = new SinglePlayerHandler([], SINGLE_PLAYER_GAME_FIELD);
            this.gameHandler.startGame();
        }, 100);

    }

    private playAgain() {
        this.setState({
            gameMode: true,
            resultsMode: false,
        });
        if (!this.timerLabel) {
            this.timerLabel = document.getElementsByClassName('game-stat__timer-block') as HTMLCollectionOf<HTMLElement>;
        }
        if (!this.scoreLabel) {
            this.scoreLabel = document.getElementsByClassName('game-stat__score-block') as HTMLCollectionOf<HTMLElement>;
        }
        this.scoreLabel[0].innerText = `${langService.getWord('gameResults.score')} 0`;
        this.timerLabel[0].innerText = `${langService.getWord('game.time')} 30`;
        setTimeout(() => {
            this.gameHandler = new SinglePlayerHandler([], SINGLE_PLAYER_GAME_FIELD);
            this.gameHandler.startGame();
        }, 100);
    }

    private redrawTimer(value) {
        if (!this.timerLabel) {
            this.timerLabel = document.getElementsByClassName('game-stat__timer-block') as HTMLCollectionOf<HTMLElement>;
        }
        if (value < 10) {
            this.timerLabel[0].style.color = 'red';
            this.timerLabel[0].style.animation = '1s Always ease alternate infinite';
        } else {
            this.timerLabel[0].style.color = 'white';
            this.timerLabel[0].style.animation = '';
        }
        this.timerLabel[0].innerText = `${langService.getWord('game.time')} ${value}`;
    }

    private redrawScore(value) {
        if (!this.scoreLabel) {
            this.scoreLabel = document.getElementsByClassName('game-stat__score-block') as HTMLCollectionOf<HTMLElement>;
        }
        this.scoreLabel[0].innerText = `${langService.getWord('gameResults.score')} ${value}`;
    }

    private quitWithEscape(event) {
        if (event.key === 'Escape' && event.type === 'keydown') {
            this.endGame();
            this.setState({needRedirect: true});
        }
    }

    private quit() {
        this.endGame();
        this.setState({needRedirect: true});
    }

    private endGame() {
        document.body.style.cursor = 'default';
        if (this.gameHandler) {
            this.gameHandler.stopGame();
        }
    }

    private showResults() {
        this.endGame();
        this.setState({
            resultsMode: true,
            gameMode: false,
        });
        if (!this.resScoreLabel) {
            this.resScoreLabel = document.getElementsByClassName('results-block__score') as HTMLCollectionOf<HTMLElement>;
        }
        if (!this.resGoalsLabel) {
            this.resGoalsLabel = document.getElementsByClassName('results-block__goals') as HTMLCollectionOf<HTMLElement>;
        }
        this.resScoreLabel[0].innerHTML = `${langService.getWord('gameResults.score')} ${this.gameHandler.getScore()}`;
        this.resGoalsLabel[0].innerHTML = `${langService.getWord('gameResults.goals')} ${this.gameHandler.getGoalsPassed()}`;
        userService.updateScore(this.gameHandler.getScore().toString());
    }
}

const mapStateToProps = (state: { lang: ILangReducer }) => {
    return {
        scoreTip: state.lang.langObject['preSingle.scoreTip'][state.lang.lang],
        controlTip: state.lang.langObject['preSingle.controlTip'][state.lang.lang],
        goalTip: state.lang.langObject['preSingle.goalTip'][state.lang.lang],
        playText: state.lang.langObject['preSingle.play'][state.lang.lang],
        mainLabel: state.lang.langObject['preSingle.label'][state.lang.lang],
        backText: state.lang.langObject['buttonBack'][state.lang.lang],
        playAgainText: state.lang.langObject['playAgain'][state.lang.lang],
        resBackText: state.lang.langObject['goBack'][state.lang.lang],
    };
};

const mapDispatchToProps = dispatch => {
    return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(SinglePlayer);
