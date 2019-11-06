import { connect } from 'react-redux';
import React from 'react';
import { Form, Button, ButtonGroup } from 'react-bootstrap';
import { Redirect } from 'react-router-dom';
import { LinkContainer } from 'react-router-bootstrap';
import FacebookLogin from 'react-facebook-login';
import GoogleLogin from 'react-google-login';
import Nav from '../Nav';
import UserActions from '../../action/action';
import Validator from '../../utils/validator';

class Login extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
      errors: {}
    };
    const rules = [
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
    const { signIn } = this.props;
    const { username, password } = this.state;
    signIn(username, password);
  };

  facebook = response => {
    // const { signInFB } = this.props;
    // signInFB();
    console.log(response);
    return <Redirect to="/" />;
  };

  google = response => {
    // const { signInFB } = this.props;
    // signInFB();
    console.log(response);
    return <Redirect to="/" />;
  };

  render() {
    const { userState } = this.props;
    const { isLogin } = userState;
    const { errors } = this.state;

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

            <Button variant="secondary" block type="submit">
              Sign in
            </Button>
          </Form>
          <Form noValidate>
            <div className="d-flex flex-column">
              <ButtonGroup className="mt-3">
                <LinkContainer to="/auth/fb">
                  <Button variant="primary" onClick={() => this.facebook()}>
                    <FacebookLogin
                      appId="2508398732591082"
                      appSecret="45ba94bdda12df4f4312afc0e6bd0b1d"
                      fields="name,email,picture"
                      callback={() => this.facebook()}
                      cssClass="my-facebook-button-class"
                    />
                  </Button>
                </LinkContainer>

                <LinkContainer to="/auth/gg">
                  <Button variant="danger" onClick={() => this.google()}>
                    <GoogleLogin
                      clientId="85832695225-mudnsfchvjvph6vl0kkd4elkug2o3p1i.apps.googleusercontent.com" // CLIENTID NOT CREATED YET
                      buttonText="GOOGLE"
                      onSuccess={() => this.google()}
                      onFailure={() => this.google()}
                    />
                  </Button>
                </LinkContainer>
              </ButtonGroup>
            </div>
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
  signIn: UserActions.signIn,
  signInFB: UserActions.signInFB
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Login);
