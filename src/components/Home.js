import React from 'react';
import Nav from './Nav';
import Game from './Game';

class Home extends React.PureComponent {
  render() {
    return (
      <div className="App container">
        <Nav />
      </div>
    );
  }
}

export default Home;
