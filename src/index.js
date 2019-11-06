import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import store from './store';
import Home from './components/Home';
import Login from './components/User/Login';
import Register from './components/User/Register';
import Profile from './components/User/Profile';
import Avatar from './components/User/Avatar';

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
        <Route path="/user/update">
          <Profile />
        </Route>
        <Route path="/user/avatar/:id">
          <Avatar />
        </Route>
        <Route path="/">
          <Home />
        </Route>
      </Switch>
    </Router>
  </Provider>,
  document.getElementById('root')
);
