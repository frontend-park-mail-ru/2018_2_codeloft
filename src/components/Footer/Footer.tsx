import * as React from 'react';

import LanguageDrop from '../LanguageDrop/LanguageDrop';
import './Footer.scss';
import { connect } from 'react-redux';
import { ILangReducer } from '../../redux/lang/lang.reducer';
import '../LanguageDrop/LanguageDrop.scss';
import langService from '../../service/LangService/LangService';
import { changeLang } from '../../redux/lang/lang.action';

interface IProps {
    className?: string;
    onClick?: (event) => void;
    lang?: string;
    setLang?: (lang: string) => void;
}

interface IState {
}

class Footer extends React.Component<IProps, IState> {
    public static defaultProps: Partial<IProps> = {
        className: '',
    };

    public constructor(props: IProps) {
        super(props);
        this.setEn = this.setEn.bind(this);
        this.setRu = this.setRu.bind(this);
    }

    public render(): JSX.Element {
        const {lang} = this.props;

        return (
            <div className={'footer'}>
                <p className={'footer__logo'}>CodeLoft®</p>
                <div className='dropUp'>
                    <a className='dropUp__button'>{ lang }</a>
                    <div className='dropUp__content'>
                        <a className={'dropUp__content__links'} onClick={this.setRu}>ru</a>
                        <a className={'dropUp__content__links'} onClick={this.setEn}>en</a>
                    </div>
                </div>
            </div>
        );
    }

    private setRu(event) {
        this.props.setLang('ru');
    }

    private setEn(event) {
        this.props.setLang('en');
    }
}

const mapStateToProps = (state: { lang: ILangReducer; }) => {
    return {
        lang: state.lang.lang,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        setLang(lang: string) {
            dispatch(changeLang(lang));
        },
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Footer);
