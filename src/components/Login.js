import { connect } from 'react-redux';
import React from 'react';
import { Form, Button } from 'react-bootstrap';
import { Redirect } from 'react-router-dom';
import Nav from './Nav';
import UserActions from '../action/action';

class Login extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: ''
    };
  }

  handleSubmit = event => {
    event.preventDefault();
    const { signIn } = this.props;
    const { username, password } = this.state;
    signIn(username, password);
  };

  render() {
    const { userState } = this.props;
    const { isLogin } = userState;

    if (isLogin) {
      return <Redirect to="/" />;
    }

    return (
      <div className="App container">
        <Nav />
        <div className="Login">
          <Form noValidate onSubmit={this.handleSubmit}>
            <Form.Group controlId="username">
              <Form.Label>Username</Form.Label>
              <Form.Control
                onChange={event => {
                  this.setState({ username: event.target.value });
                }}
                type="text"
                placeholder="Username"
              />
            </Form.Group>

            <Form.Group controlId="password">
              <Form.Label>Password</Form.Label>
              <Form.Control
                onChange={event => {
                  this.setState({ password: event.target.value });
                }}
                type="password"
                placeholder="Password"
              />
            </Form.Group>

            <Button variant="light" block type="submit">
              Sign in
            </Button>
          </Form>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    userState: state.user
  };
};

const mapDispatchToProps = {
  signIn: UserActions.signIn
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Login);
