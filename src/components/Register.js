import React from 'react';
import { Form, Button } from 'react-bootstrap';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import Nav from './Nav';
import UserActions from '../action/action';

class Register extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      username: '',
      password: '',
      isSignUp: false
    };
  }

  handleSubmit = event => {
    event.preventDefault();
    const { signUp } = this.props;
    const { name, username, password } = this.state;
    signUp(name, username, password);
    this.setState({ isSignUp: true });
  };

  render() {
    const { isSignUp } = this.state;
    if (isSignUp) return <Redirect to="/user/login" />;

    return (
      <div className="App container">
        <Nav />
        <div className="Login">
          <Form noValidate onSubmit={this.handleSubmit}>
            <Form.Group controlId="yourname">
              <Form.Label>Your name</Form.Label>
              <Form.Control
                onChange={event => {
                  this.setState({ name: event.target.value });
                }}
                type="text"
                placeholder="Your name"
              />
            </Form.Group>

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
            {/* 
            <Form.Group controlId="cfpassword">
              <Form.Label>Confirm Password</Form.Label>
              <Form.Control type="password" placeholder="Confirm Password" />
            </Form.Group> */}

            <Button variant="light" block type="submit">
              Sign up
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
  signUp: UserActions.signUp
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Register);
