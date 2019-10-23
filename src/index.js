import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import store from './store';
import Home from './components/Home';
import Login from './components/Login';
import Register from './components/Register';

require('bootstrap/dist/css/bootstrap.min.css');

ReactDOM.render(
  <Provider store={store}>
    <Router>
      <Switch>
        <Route path="/user/register">
          <Register />
        </Route>
        <Route path="/user/login">
          <Login />
        </Route>
        <Route path="/">
          <Home />
        </Route>
      </Switch>
    </Router>
  </Provider>,
  document.getElementById('root')
);
