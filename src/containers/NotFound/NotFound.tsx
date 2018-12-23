import * as React from 'react';
import { Helmet } from 'react-helmet';

interface IProps {

}

interface IState {

}

export default class NotFound extends React.Component<IProps, IState> {
  public render(): JSX.Element {
    return (
      <React.Fragment>
        <Helmet>
          <title>[Заголовок] Страница не найдена</title>
        </Helmet>
        
        <span>Страница не найдена</span>
      </React.Fragment>
    );
  }
}
