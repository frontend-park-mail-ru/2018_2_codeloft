import * as React from 'react';

function getKey(str: string) {
    let key = 0;
    for (let i = 0; i < str.length; i++) {
        key += str.charCodeAt(i);
    }
    return key.toString();
}

export interface IUserScore {
    nick: string;
    score: number;
}

interface IProps {
    users?: IUserScore[];
}

export class ScoreTable extends React.Component<IProps> {
    public constructor(props: IProps) {
        super(props);
    }

    public render(): JSX.Element {
        const {users} = this.props;

        return (
            <div className='leaders-block__users-block'>
                {users.map((user) => <p key={getKey(user.nick)}>{user.nick} {user.score}</p>)}
            </div>
        );
    }
}
