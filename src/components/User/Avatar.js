import React from 'react';
import { Form, Button } from 'react-bootstrap';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import Nav from '../Nav';
import UserActions from '../../action/action';

let user = {};

class Profile extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      avatar: null,
      isUpload: false
    };
  }

  componentWillMount() {
    const { getUser } = this.props;
    getUser().then(data => {
      return this.getDataUser(data);
    });
  }

  handleSubmit = event => {
    event.preventDefault();
    const { upload } = this.props;
    const { avatar } = this.state;
    const data = new FormData();
    data.append('avatar', avatar);
    const config = {
      headers: {
        'content-type': 'multipart/form-data'
      }
    };
    upload(user.id, data, config);
    this.setState({
      isUpload: true
    });
  };

  getDataUser = data => {
    user = data;
    return user;
  };

  render() {
    const { isUpload } = this.state;
    if (isUpload) return <Redirect to="/" />;
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

            <Form.Group controlId="avatar">
              <Form.Label>Avatar</Form.Label>
              <Form.Control
                onChange={event => {
                  this.setState({ avatar: event.target.files[0] });
                }}
                type="file"
                name="avatar"
              />
            </Form.Group>

            <Button variant="light" block type="submit">
              Upload
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
  upload: UserActions.upload,
  getUser: UserActions.getUser
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Profile);
