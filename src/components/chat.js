import React from 'react';
import PartnerInfo from './partner-info';
import Messages from './messages';
import Input from './input';
import { isCommand, parseCommand } from '../utils/command';
import { createUser } from '../utils/user';

class Chat extends React.Component {
  static displayName = 'Chat'

  state = {
    messages: [],
    users: [],
  }

  componentDidMount() {
    this._user = createUser();
    this.setUser(this._user);
  }

  setUser = (user) => {
    this.setState((state) => ({
      users: state.users.concat(user),
    }));
  }

  setName = (name) => {
    this.setState((state) => ({
      users: state.users.map(user => {
        if (user.id === this._user.id) {
          return {
            ...user,
            name: name,
          };
        }
        return user;
      })
    }));
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
        if (!args) {
          alert('Invalid argument');
          return;
        }
        this.setName(args[0]);
        break;
      }
      case 'think': {
        if (!args) {
          alert('Invalid argument.');
          return;
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

  handleSendMessage = (message) => {
    this.addMessage(message);
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
            } else {
              this.handleSendMessage(message);
            }
          } }
        />
      </div>
    );
  }
}

export default Chat;
