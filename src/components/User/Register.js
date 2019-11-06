import React from 'react';
import { Form, Button } from 'react-bootstrap';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import Nav from '../Nav';
import UserActions from '../../action/action';
import Validator from '../../utils/validator';

class Register extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      username: '',
      password: '',
      errors: {},
      isSignUp: false
    };
    const rules = [
      {
        field: 'name',
        method: 'isEmpty',
        validWhen: false,
        message: 'The name field is required.'
      },
      {
        field: 'name',
        method: 'isLength',
        args: [{ min: 5 }],
        validWhen: true,
        message: 'The name must be at least 5 characters.'
      },
      {
        field: 'username',
        method: 'isEmpty',
        validWhen: false,
        message: 'The username field is required.'
      },
      {
        field: 'username',
        method: 'isLength',
        args: [{ min: 5 }],
        validWhen: true,
        message: 'The username must be at least 5 characters.'
      },
      {
        field: 'password',
        method: 'isEmpty',
        validWhen: false,
        message: 'The password field is required.'
      },
      {
        field: 'password',
        method: 'isLength',
        args: [{ min: 5 }],
        validWhen: true,
        message: 'The password must be at least 5 characters.'
      }
    ];
    this.validator = new Validator(rules);
  }

  handleSubmit = event => {
    event.preventDefault();
    this.setState(prevState => ({
      errors: this.validator.validate(prevState)
    }));
    // const { errors } = this.state;
    // if (errors) return;
    const { signUp } = this.props;
    const { name, username, password } = this.state;
    signUp(name, username, password);
    this.setState({
      isSignUp: true
    });
  };

  render() {
    const { isSignUp, errors } = this.state;
    if (isSignUp) return <Redirect to="/user/login" />;

    return (
      <div className="App container">
        <Nav />
        <div className="Login">
          <Form
            noValidate
            onSubmit={this.handleSubmit}
            encType="multipart/form-data"
            method="post"
          >
            <Form.Group controlId="yourname">
              <Form.Label>Your name</Form.Label>
              <Form.Control
                onChange={event => {
                  this.setState({ name: event.target.value });
                }}
                type="text"
                placeholder="Your name"
              />
              {errors.name && (
                <div
                  className="validation"
                  style={{ display: 'block', color: 'red' }}
                >
                  {errors.name}
                </div>
              )}
            </Form.Group>

            <Form.Group controlId="username">
              <Form.Label>Username</Form.Label>
              <Form.Control
                onChange={event => {
                  this.setState({ username: event.target.value });
                }}
                type="text"
                placeholder="username"
              />
              {errors.username && (
                <div
                  className="validation"
                  style={{ display: 'block', color: 'red' }}
                >
                  {errors.username}
                </div>
              )}
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
              {errors.password && (
                <div
                  className="validation"
                  style={{ display: 'block', color: 'red' }}
                >
                  {errors.password}
                </div>
              )}
            </Form.Group>

            <Form.Group controlId="username">
              <Form.Label>Avatar</Form.Label>
              <Form.Control
                // onChange={event => {
                //   this.setState({ avatar: event.target.value });
                // }}
                type="file"
                name="avatar"
              />
            </Form.Group>
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
