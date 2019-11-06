import React from 'react';

export default class messageItem extends React.PureComponent {
  render() {
    const { user, message } = this.props;
    return (
      <li className={user ? 'message right appeared' : 'message left appeared'}>
        <div className="avatar">
          {/* <img src="http://localhost:4040/images/avatar.png" alt="user" /> */}
        </div>
        <div className="text_wrapper">
          <div className="text">{message}</div>
        </div>
      </li>
    );
  }
}
