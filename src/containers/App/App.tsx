import * as React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { Switch } from 'react-router';

interface IProps {
  routes: JSX.Element;
  saveParams?: (name, params) => void;
}

interface IState {

}

export default class App extends React.Component<IProps, IState> {
  public render(): JSX.Element {
    return (
      <Switch>
        { this.props.routes }
      </Switch>
    );
  }
}
