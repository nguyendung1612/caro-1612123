import React from 'react';
import { Button } from 'react-bootstrap';

export default class Input extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      message: ''
    };
  }

  enterKey = e => {
    if (e.keyCode === 13) {
      const { message } = this.state;
      const { sendMessage } = this.props;

      sendMessage(message);
    }
  };

  render() {
    const { sendMessage } = this.props;
    const { message } = this.state;
    return (
      <div className="bottom_wrapper clearfix">
        <div className="message_input_wrapper">
          <input
            onChange={event => {
              this.setState({ message: event.target.value });
            }}
            className="message_input"
            placeholder="Type message..."
            onKeyUp={e => this.enterKey(e)}
          />
        </div>
        <Button
          className="send_message"
          variant="outline-danger"
          size="sm"
          onClick={() => sendMessage(message)}
          ref={node => {
            this.imputMessage = node;
          }}
        >
          Send
        </Button>
      </div>
    );
  }
}
