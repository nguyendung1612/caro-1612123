import { connect } from 'react-redux';
import React from 'react';
import $ from 'jquery';
import Message from './message-item';
import Input from './Input';
import socket from '../../socket.io/socket.io';

import './Chat.css';

class Chat extends React.Component {
  constructor(props) {
    super(props);
    // Khởi tạo state,
    this.state = {
      messages: [],
      user: null
    };
  }

  // Connetct với server nodejs, thông qua socket.io
  componentWillMount() {
    const { username } = this.props;

    socket.emit('send-username', username);
    socket.on('id', res => this.setState({ user: res })); // lắng nghe event có tên 'id'
    socket.on('sv-send-mess', response => {
      this.newMessage(response);
    }); // lắng nghe event 'newMessage' và gọi hàm newMessage khi có event
  }

  // Khi có tin nhắn mới, sẽ push tin nhắn vào state mesgages, và nó sẽ được render ra màn hình
  newMessage = m => {
    const { messages, user } = this.state;

    const max = messages.length;
    messages.push({
      id: max + 1,
      userId: m.id,
      message: m.data
    });

    const objMessage = $('.messages');
    if (
      objMessage[0].scrollHeight - objMessage[0].scrollTop ===
      objMessage[0].clientHeight
    ) {
      this.setState({ messages });
      objMessage.animate({ scrollTop: objMessage.prop('scrollHeight') }, 300); // tạo hiệu ứng cuộn khi có tin nhắn mới
    } else {
      this.setState({ messages });
      if (m.id === user) {
        objMessage.animate({ scrollTop: objMessage.prop('scrollHeight') }, 300);
      }
    }
  };

  // Gửi event socket newMessage với dữ liệu là nội dung tin nhắn
  sendnewMessage = m => {
    if (m !== '') {
      socket.emit('client-send-mess', m); // gửi event về server
    }
  };

  render() {
    const { user, messages } = this.state;
    return (
      <div className="app__content">
        <div className="chat_window">
          {/* <MessageList user={user} messages={messages} /> */}
          <ul className="messages">
            {messages.map(item => (
              <Message
                key={item.id}
                user={item.userId === user}
                message={item.message}
              />
            ))}
          </ul>
          <Input sendMessage={m => this.sendnewMessage(m)} />
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    userState: state.user,
    playerState: state.player
  };
};

export default connect(mapStateToProps)(Chat);
