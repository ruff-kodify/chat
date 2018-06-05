import React from 'react';
import PartnerInfo from './partner-info';
import Messages from './messages';
import Input from './input';
import { isCommand, parseCommand } from '../utils/command';
import { createUser } from '../utils/user';
import uuid from 'uuid/v4';
import createSocket from 'socket.io-client';

const socket = createSocket(process.env.REACT_APP_SOCKET_URL);

class Chat extends React.Component {
  static displayName = 'Chat'

  static defaultProps = {
    connected: false
  }

  state = {
    messages: [],
    users: [],
    connected: this.props.connected
  }

  componentDidMount() {
    this._user = createUser();
    this.addUser(this._user);

    socket.on('connect', () => {
      this.setState({
        connected: true
      });
      socket.emit('user:join', this._user);
    });

    socket.on('user:join', (user) => {
      this.addUser(user);
    });
  }

  addUser = (user) => {
    this.setState((state) => ({
      users: state.users.concat(user),
    }));
  }

  updateUser = (id, props) => {
    this.setState((state) => ({
      users: state.users.map(user => {
        if (user.id === id) {
          return {
            ...user,
            ...props,
          };
        }
        return user;
      })
    }));
  }

  addMessage = ({ body, type, senderId }) => {
    this.setState((state) => ({
      messages: state.messages.concat({
        id: uuid(),
        sentAt: Date.now(),
        body,
        type,
        senderId,
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
        this.updateUser(this._user.id, {
          name: args[0]
        });
        break;
      }
      case 'think': {
        if (!args) {
          alert('Invalid argument.');
          return;
        }
        this.addMessage({
          body: args[0],
          type: 'thought',
          senderId: this._user.id,
        });
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
    this.addMessage({
      body: message,
      type: 'user',
      senderId: this._user.id,
    });
  }

  render() {
    if (!this.state.connected) {
      return 'loading...';
    }
    return (
      <div className="chat">
        <PartnerInfo />
        <Messages
          users={ this.state.users }
          messages={ this.state.messages }
        />
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
