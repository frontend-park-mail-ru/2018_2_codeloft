import * as React from 'react';

import './GameInfo.scss';

interface IProps {
    shown: boolean;
}

export default class GameInfo extends React.Component<IProps> {
    public constructor(props: IProps) {
        super(props);
    }

    public render(): JSX.Element {
        const {shown} = this.props;

        return (
            <div className={`game-stat ${shown? 'shown': 'hidden'}`}>
                <div className='game-stat__score-block'/>
                <div className='game-stat__timer-block'/>
            </div>
        );
    }
}
