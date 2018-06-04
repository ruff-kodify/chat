import React from 'react';
import PartnerInfo from './partner-info';
import Messages from './messages';
import Input from './input';
import { isCommand, parseCommand } from '../utils/command';

class Chat extends React.Component {
  static displayName = 'Chat'

  state = {
    messages: []
  }

  setName = () => {
    // to be implemented
  }

  addMessage = (body, type = 'user') => {
    this.setState((state) => ({
      messages: state.messages.concat({
        id: Date.now(),
        body,
        type
      })
    }))
  }

  removeLastMessage = () => {
    // to be implemented
  }

  handleCommand(command, args) {

    switch (command) {
      case 'nick': {
        this.setName();
        break;
      }
      case 'think': {
        if (!args) {
          alert('Invalid argument.')
        }
        this.addMessage(args[0], 'thought');
        break;
      }
      case 'oops': {
        this.removeLastMessage();
        break;
      }
      default:
        break;
    }

  }
  render() {
    return (
      <div className="chat">
        <PartnerInfo />
        <Messages messages={ this.state.messages } />
        <Input
          onSend={ (message) => {
            if (isCommand(message)) {
              const { command, args } = parseCommand(message);
              this.handleCommand(command, args);
            }
          } }
        />
      </div>
    );
  }
}

export default Chat;
