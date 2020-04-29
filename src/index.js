// Configure Material-UI
import { MuiThemeProvider } from '@material-ui/core/styles';
import React from 'react';
import { render } from 'react-dom';
import { Router, Route, browserHistory } from 'react-router';
import { Provider } from 'react-redux';
import { applyMiddleware, createStore } from 'redux';
import thunkMiddleware from 'redux-thunk';
import { promiseMiddleware } from 'cooldux';
import logger from 'redux-logger';

import theme from './theme';
import reducers from './state';

import Home from './pages/home';
import App from './pages/app';
import Login from './pages/login';
import OauthTokenRedir from './pages/oauthLogin';

import { verify } from './state/user';
import './index.css';


const middlewares = [thunkMiddleware, promiseMiddleware];

if (process.env.NODE_ENV === 'development') {
  middlewares.push(logger);
}

const store = createStore(reducers, applyMiddleware(...middlewares));

async function requireAuth(nextState, replace, cb) {
  try{ 
    const ok = await store.dispatch(verify());
    if(!ok) {
      throw new Error('not logged in');
    }
    cb();
  }catch (e) {
    replace({ pathname: '/login' });
    cb();
  }
}

render(
  <Provider store={store}>
    <MuiThemeProvider theme={theme}>
    <Router history={browserHistory}>
        <div>
          <Route exact path="/" component={Home} />
          <Route path="/app" component={App} onEnter={requireAuth} />
          <Route path="/login" component={Login} />
          <Route path="/oauthtoken/:token" component={OauthTokenRedir} />
        </div>
      </Router>
    </MuiThemeProvider>
  </Provider>, document.getElementById('root'));
