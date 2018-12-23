import * as React from 'react';

import './ImagePopUp.scss';

interface IProps {
    src?: string;
    top?: boolean;
}

interface IState {
    shown: boolean;
}

export default class ImagePopUp extends React.Component<IProps, IState> {
    public constructor(props: IProps) {
        super(props);
        this.state = {
            shown: true,
        };
    }

    public render(): JSX.Element {
        const {src} = this.props;
        const {top} = this.props;

        return (
            <div className={`control-pop-up-block ${top? 'top-pos': 'bottom-pos'}`}>
                {this.state.shown? <img className='cheat-image' src={src}/>: ''}
            </div>
        );
    }

    public componentDidMount() {
        setTimeout(() => this.setState({shown: false}), 3000);
    }
}
