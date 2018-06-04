import React from 'react';
import PartnerInfo from './partner-info';
import Messages from './messages';
import Input from './input';
import { isCommand, parseCommand } from '../utils/command';

class Chat extends React.Component {
  static displayName = 'Chat'
  render() {
    return (
      <div className="chat">
        <PartnerInfo />
        <Messages messages={ this.props.messages } />
        <Input
          onSend={ (message) => {
            if (isCommand(message)) {
              const command = parseCommand(message);
              console.log(command);
            }
          } }
        />
      </div>
    );
  }
}

export default Chat;
