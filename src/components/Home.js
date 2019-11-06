import React from 'react';
import { connect } from 'react-redux';
import Login from './User/Login';
import Game from './Game';

class Home extends React.PureComponent {
  render() {
    const { userState } = this.props;
    const { isLogin } = userState;

    return <div>{isLogin ? <Game /> : <Login />}</div>;
  }
}

const mapStateToProps = state => {
  return {
    userState: state.user
  };
};

export default connect(mapStateToProps)(Home);
