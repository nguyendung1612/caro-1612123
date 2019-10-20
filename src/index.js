import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import store from './store';
import Game from './components/Game';
import Home from './components/Home';
import Login from './components/Login';
import Register from './components/Register';

ReactDOM.render(
  <Provider store={store}>
    <Router>
      <Switch>
        <Route path="/register">
          <Register />
        </Route>
        <Route path="/login">
          <Login />
        </Route>
        <Route path="/">
          <Home />
        </Route>
      </Switch>
    </Router>
    {/* <Game /> */}
  </Provider>,
  document.getElementById('root')
);
