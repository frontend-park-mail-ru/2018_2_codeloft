import * as React from 'react';
import { IUser } from 'customTypes';

import transport from '../../service/Transport/Transport';
import { API_ACTION, SET_INPUT_DATA, SET_LOADING, SET_USER } from './common.constants';

export function setInputData(value: string) {
  return {
    type: SET_INPUT_DATA,
    inputData: {value},
  };
}

export function toggleLoader(isActive: boolean) {
  return {
    type: SET_LOADING,
    loaderData: {isActive},
  };
}

export function setUser(userData: IUser) {
  return {
    type: SET_USER,
    userData,
  };
}

export function setUserName(name: string): (dispatch) => void {
  return async dispatch => {
    dispatch(toggleLoader(true));
    dispatch(setUser({name}));
    dispatch(toggleLoader(false));
  };
}
