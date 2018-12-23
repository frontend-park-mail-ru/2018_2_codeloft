import * as React from 'react';
import { Redirect } from 'react-router';

import './PreSinglePlayer.scss';
import { PATHS } from '../../routes';

interface IProps {
    scoreTip: string;
    controlTip: string;
    goalTip: string;
    mainLabel: string;
    playText: string;
    backText: string;
    playClick?: () => void;
}

interface IState {
    needRedirect: boolean;
}

export default class PreSinglePlayer extends React.Component<IProps, IState> {
    public constructor(props: IProps) {
        super(props);
        this.state = {
            needRedirect: false,
        };
        this.onPlayClick = this.onPlayClick.bind(this);
        this.onBackClick = this.onBackClick.bind(this);
    }

    public render(): JSX.Element {
        const {mainLabel} = this.props;
        const {scoreTip} = this.props;
        const {controlTip} = this.props;
        const {goalTip} = this.props;
        const {playText} = this.props;
        const {backText} = this.props;
        const {playClick} = this.props;

        return (
            <div className='singleplayer-block__before-game-block'>
                {!this.state.needRedirect ?
                    <div className='before-game-block__logo-label'>{mainLabel}</div> :
                    <Redirect to={PATHS.MENU}/>
                }
                <div className='before-game-block__score-tip'>
                    <img src='../../statics/imgs/score.png' className='images-block__image'/>
                    <div className='images-block__rules-text'>
                        {scoreTip}
                    </div>
                </div>
                <div className='before-game-block__control-tip'>
                    <img src='../../statics/imgs/control.jpg' className='images-block__image'/>
                    <div className='images-block__rules-text'>
                        {controlTip}
                    </div>
                </div>
                <div className='before-game-block__goal-tip'>
                    <img src='../../statics/imgs/goal.png' className='images-block__image'/>
                    <div className='images-block__rules-text'>
                        {goalTip}
                    </div>
                </div>
                <div className='before-game-block__buttons-block'>
                    <div className='game-button' onClick={this.onBackClick}>{backText}</div>
                    <div className='play-button game-button' onClick={playClick}>{playText}</div>
                </div>
            </div>
        );
    }

    private onPlayClick() {
        const { playClick } = this.props;
        playClick();
    }

    private onBackClick() {
        this.setState({needRedirect: true});
    }
}
