import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { Router } from 'react-router';
import history from './middleware/history';

import { configureStore } from './store';
import { routes } from './routes';

import App from './containers/App/App';
import userService from './service/UserService/UserService';
import serviceWorkerRegister from './modules/RegisterWorker';

import './statics/scss/main.scss';

const store = configureStore();

serviceWorkerRegister();

userService.checkAuth().then(() => {
    ReactDOM.render(
        <Provider store={ store }>
            <Router history={ history }>
                <div className='app'>
                    <App routes={ routes } />
                </div>
            </Router>
        </Provider>,
        document.getElementById('root'),
    );
});
