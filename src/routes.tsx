import * as React from 'react';
import { Route, Switch } from 'react-router';

import Main from './containers/Main/Main';
import SignIn from './containers/SignIn/SignIn';
import SignUp from './containers/SignUp/SignUp';
import About from './containers/About/About';
import Profile from './containers/Profile/Profile';
import NotFound from './containers/NotFound/NotFound';
import HighScore from './containers/HighScore/HighScore';
import SinglePlayer from './containers/SinglePlayer/SinglePlayer';
import MultiPlayer from './containers/Multiplayer/MultiPlayer';

export const PATHS = {
  MENU: '/',
  SIGN_IN: '/login',
  SIGN_UP: '/register',
  PROFILE: '/profile',
  ABOUT: '/about',
  HIGH_SCORE: '/score',
  SINGLE_PLAYER: '/singleplayer',
  MULTI_PLAYER: '/multiplayer',
  CHAT: '/chat',
  ERROR: '/404',
};

/* tslint:disable:jsx-no-lambda */
export const routes: JSX.Element = (
  <Switch>
    <Route exact={ true } path={ PATHS.MENU } component={ Main } />
    <Route exact={ true } path={ PATHS.SIGN_IN } component={ SignIn } />
    <Route exact={ true } path={ PATHS.SIGN_UP } component={ SignUp } />
    <Route exact={ true } path={ PATHS.PROFILE } component={ Profile } />
    <Route exact={ true } path={ PATHS.ABOUT } component={ About } />
    <Route exact={ true } path={ PATHS.ERROR } component={ NotFound } />
    <Route exact={ true } path={ PATHS.HIGH_SCORE } component={ HighScore } />
    <Route exact={ true } path={ PATHS.SINGLE_PLAYER } component={ SinglePlayer } />
    <Route exact={ true } path={ PATHS.MULTI_PLAYER } component={ MultiPlayer } />
    <Route render={ () => <span>Тоже не найдено</span> } />
  </Switch>
);
