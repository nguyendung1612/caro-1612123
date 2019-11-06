import React from 'react';
import { Form, Button } from 'react-bootstrap';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import Nav from '../Nav';
import UserActions from '../../action/action';
import Validator from '../../utils/validator';

let user = {};

class Profile extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      username: '',
      errors: {},
      isUpdate: false
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
      }
    ];
    this.validator = new Validator(rules);
  }

  componentWillMount() {
    const { getUser } = this.props;
    getUser().then(data => {
      return this.getDataUser(data);
    });
  }

  handleSubmit = event => {
    event.preventDefault();
    this.setState(prevState => ({
      errors: this.validator.validate(prevState)
    }));
    const { update } = this.props;
    const { name, username } = this.state;
    update(user.id, name, username);
    this.setState({
      isUpdate: true
    });
  };

  getDataUser = data => {
    user = data;
    this.setState({
      name: data.name,
      username: data.username
    });
    return user;
  };

  render() {
    const { isUpdate, errors } = this.state;
    if (isUpdate) return <Redirect to="/" />;
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
            <Form.Group controlId="password">
              <Form.Label>Id</Form.Label>
              <Form.Control readOnly type="text" defaultValue={user.id} />
            </Form.Group>

            <Form.Group controlId="yourname">
              <Form.Label>Your name</Form.Label>
              <Form.Control
                defaultValue={user.name}
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
                defaultValue={user.username}
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

            <Button variant="light" block type="submit">
              Update
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
  update: UserActions.updateUserLocal,
  getUser: UserActions.getUser
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Profile);
