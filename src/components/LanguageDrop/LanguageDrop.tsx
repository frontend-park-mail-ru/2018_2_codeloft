import * as React from 'react';

import './LanguageDrop.scss';

interface IProps {
    onClick?: (event) => void;
}

export default class LanguageDrop extends React.Component<IProps> {
    public constructor(props: IProps) {
        super(props);
        this.onCLick = this.onCLick.bind(this);
    }

    public render(): JSX.Element {

        return (
            <div className='dropUp'>
                <a className='dropUp__button'>En</a>
                <div className='dropUp__content'>
                    <a className={ 'dropUp__content__links' }>Ru</a>
                    <a className={ 'dropUp__content__links' }>En</a>
                </div>
            </div>
        );
    }

    private onCLick(event) {
        const {onClick} = this.props;

        if (onClick) {
            onClick(event);
        }
    }
}
