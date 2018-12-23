import * as React from 'react';

import './Header.scss';
import HeaderRight from '../HeaderRight/HeaderRight';
import { PATHS } from '../../routes';

interface IProps {
    // text?: string;
    auth?: boolean;
    logo?: string;
    className?: string;
    onClick?: (event) => void;
}

interface IState {
}

export default class Header extends React.Component<IProps, IState> {
    public static defaultProps: Partial<IProps> = {
        logo: 'Logo',
        auth: false,
        className: '',
    };

    public constructor(props: IProps) {
        super(props);
        this.onCLick = this.onCLick.bind(this);
    }

    public render(): JSX.Element {
        // const { text } = this.props;
        const { className } = this.props;
        const { logo } = this.props;
        const { auth } = this.props;

        return (
            <header className='header'>
                <a href={ PATHS.MENU } className='header__logo'>{ logo }</a>
                <HeaderRight/>
            </header>
        );
    }

    private onCLick(event) {
        const {onClick} = this.props;

        if (onClick) {
            onClick(event);
        }
    }
}
