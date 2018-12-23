import * as React from 'react';
import './UserInfo.scss';
import { ILangReducer } from '../../redux/lang/lang.reducer';
import { connect } from 'react-redux';

interface IProps {
    user?: string;
    email?: string;
    score?: string;
    userText?: string;
    scoreText?: string;
    className?: string;
}

interface IState {
}

class UserInfo extends React.Component<IProps, IState> {
    public static defaultProps: Partial<IProps> = {
        user: '',
        score: '',
    };

    public constructor(props: IProps) {
        super(props);
    }

    public render(): JSX.Element {
        const { user } = this.props;
        const { score } = this.props;
        const { userText } = this.props;
        const { scoreText } = this.props;

        return (
            <div className='profile-block__user-info'>
                <p className='user-info-label'>{ userText }: {user}</p>
                <p className='user-info-label'>{ scoreText }: {score}</p>
            </div>
        );
    }
}

const mapStateToProps = (state: { lang: ILangReducer; }) => {
    return {
        userText: state.lang.langObject['profile.userName'][state.lang.lang],
        scoreText: state.lang.langObject['profile.score'][state.lang.lang],
    };
};

const mapDispatchToProps = dispatch => {
    return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(UserInfo);
