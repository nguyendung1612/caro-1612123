import { connect } from 'react-redux';
import React from 'react';
import { Navbar, Nav, Dropdown, ButtonGroup, Button } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import UserActions from '../action/action';
import '../index.css';

let user = {};

class NavHeader extends React.PureComponent {
  componentWillMount() {
    const { getUser } = this.props;
    getUser().then(data => {
      return this.getDataUser(data);
    });
  }

  componentDidMount() {
    const { getUser } = this.props;
    getUser().then(data => {
      return this.getDataUser(data);
    });
  }

  getDataUser = data => {
    user = data;
    // console.log(user);
    return user;
  };

  handleSignOut = e => {
    e.preventDefault();
    const { signOut } = this.props;
    signOut();
  };

  render() {
    const { userState } = this.props;
    const { isLogin, username } = userState;

    return (
      <div>
        <Navbar sticky="top" bg="light" expand="lg">
          <LinkContainer to="/">
            <Navbar.Brand href="/">CARO</Navbar.Brand>
          </LinkContainer>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          {isLogin ? (
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="ml-auto">
                <Dropdown as={ButtonGroup}>
                  <Button variant="Secondary">
                    <div className="flex-nav">
                      <div xs={6} md={7}>
                        <img
                          className="thumbnail-image"
                          width={40}
                          height={40}
                          src={
                            user
                              ? `http://localhost:4040/${user.avatar}`
                              : 'http://localhost:4040/images/avatar.png'
                          }
                          alt=""
                        />
                      </div>
                      <div xs={6} md={5}>
                        <h5>{username}</h5>
                      </div>
                    </div>
                  </Button>

                  <Dropdown.Toggle
                    split
                    variant="Secondary"
                    id="dropdown-split-basic"
                  />

                  <Dropdown.Menu>
                    <LinkContainer to="/user/update">
                      <Dropdown.Item>Profile</Dropdown.Item>
                    </LinkContainer>
                    {/* <LinkContainer to={user ? `/user/avatar/${user.id}` : '/'}> */}
                    <Dropdown.Item
                      href={user ? `/user/avatar/${user.id}` : '/'}
                    >
                      Avatar
                    </Dropdown.Item>
                    {/* </LinkContainer> */}
                    <Dropdown.Divider />
                    <Dropdown.Item onClick={this.handleSignOut}>
                      Sign Out
                    </Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
              </Nav>
            </Navbar.Collapse>
          ) : (
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="ml-auto">
                <LinkContainer to="/user/register">
                  <Nav.Link>Sign up</Nav.Link>
                </LinkContainer>

                <LinkContainer to="/user/login">
                  <Nav.Link>Sign in</Nav.Link>
                </LinkContainer>
              </Nav>
            </Navbar.Collapse>
          )}
        </Navbar>
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
  signOut: UserActions.signOut,
  getUser: UserActions.getUser
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(NavHeader);
