import * as React from 'react';

import './GameResults.scss';

interface IProps {
    shown: boolean;
    againText: string;
    backText: string;
    playClick: () => void;
    backClick: () => void;
}

export default class GameResults extends React.Component<IProps> {
    public constructor(props: IProps) {
        super(props);
    }

    public render(): JSX.Element {
        const {shown} = this.props;
        const {againText} = this.props;
        const {backClick} = this.props;
        const {backText} = this.props;
        const {playClick} = this.props;

        return (
            <div className={`${shown? 'results-block': 'hidden'}`}>
                <div className='results-block__score'/>
                <div className='results-block__goals'/>
                <div className='results-block__buttons'>
                    <span className='game-button again-button' onClick={playClick}>{againText}</span>
                    <span className='game-button back-button' onClick={backClick}>{backText}</span>
                </div>
            </div>
        );
    }
}
