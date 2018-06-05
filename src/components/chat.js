import React from 'react';
import ReactDOM from 'react-dom';
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
    this.addUser({
      ...this._user,
      isMe: true
    });

    socket.on('connect', () => {
      this.setState({
        connected: true
      });
      this.updateUser(this._user.id, {
        connected: true
      });
      socket.emit('user:join', {
        ...this._user,
        connected: true,
      });
    });

    socket.on('users:get', (users) => {
      this.setState((state) => {
        return {
          users: state.users.concat(
            users.filter(user => user.id !== this._user.id)
          )
        };
      });
    });

    socket.on('user:join', (user) => {
      this.addUser(user);
    });

    socket.on('user:update', ({ id, props }) => {
      this.updateUser(id, props);
    });

    socket.on('user:leave', (id) => {
      this.removeUser(id);
    });

    socket.on('message', (message) => {
      this.addMessage(message);
    })
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

  removeUser = (id) => {
    this.setState((state) => ({
      users: state.users.map(user => {
        if (user.id === id) {
          return {
            ...user,
            connected: false
          };
        }
        return user;
      })
    }));
  }

  updateAndBroadcastUser = (id, props) => {
    this.updateUser(id, props);
    socket.emit('user:update', {
      id,
      props
    });
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
    }), () => {
      if (this.messages) {
        this.messages.scrollTop = this.messages.scrollHeight;
      }
    });
  }

  addAndBroadcastMessage = (message) => {
    this.addMessage(message);
    socket.emit('message', message);
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
        this.updateAndBroadcastUser(this._user.id, {
          name: args[0]
        });
        break;
      }
      case 'think': {
        if (!args) {
          alert('Invalid argument.');
          return;
        }
        this.addAndBroadcastMessage({
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
    this.addAndBroadcastMessage({
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
        <Messages
          users={ this.state.users }
          messages={ this.state.messages }
          ref={ el => {
            this.messages = ReactDOM.findDOMNode(el);
          } }
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
