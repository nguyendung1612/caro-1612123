import { connect } from 'react-redux';
import React from 'react';
import { Navbar, Nav, NavDropdown } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import UserActions from '../action/action';

let user;

class NavHeader extends React.PureComponent {
  componentDidMount() {
    const { getUser } = this.props;
    // checkLogin();
    user = getUser();
  }

  handleSignOut = e => {
    e.preventDefault();
    const { signOut } = this.props;
    signOut();
  };

  render() {
    const { userState } = this.props;
    const { isLogin } = userState;
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
                <NavDropdown title={user.name} id="basic-nav-dropdown">
                  <LinkContainer to="/user/register">
                    <NavDropdown.Item>Profile</NavDropdown.Item>
                  </LinkContainer>
                  <NavDropdown.Divider />
                  {/* <LinkContainer to="/"> */}
                  <NavDropdown.Item to="/" onClick={this.handleSignOut}>
                    Sign Out
                  </NavDropdown.Item>
                  {/* </LinkContainer> */}
                </NavDropdown>
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
