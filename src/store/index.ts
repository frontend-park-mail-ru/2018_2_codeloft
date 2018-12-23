import { applyMiddleware, createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import { logger } from '../middleware';
import thunk from 'redux-thunk';

import rootReducer from '../redux/index';
import { TESTING_ENV } from '../service/Consts/Consts';

export function configureStore() {
  let middleware = applyMiddleware(thunk, logger);

  if (process.env.NODE_ENV === TESTING_ENV) {
    middleware = composeWithDevTools(middleware);
  }

  const store = createStore(rootReducer, middleware);

  if (module.hot) {
    module.hot.accept('../redux', () => {
      const nextReducer = require('../redux/index');
      store.replaceReducer(nextReducer);
    });
  }

  return store;
}
