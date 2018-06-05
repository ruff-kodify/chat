import React from 'react';
import ReactDOM from 'react-dom';
import Messages from './messages';
import Input from './input';
import { isCommand, parseCommand } from '../utils/command';
import { createUser } from '../utils/user';
import uuid from 'uuid/v4';
import createSocket from 'socket.io-client';
import TypingUser from './typing-user';
import debounce from 'lodash.debounce';
import validator from 'validator';
import prependHttp from 'prepend-http';
import Countdown from './countdown';

const socket = createSocket(process.env.REACT_APP_SOCKET_URL);

class Chat extends React.Component {
  static displayName = 'Chat'

  static defaultProps = {
    connected: false
  }

  state = {
    messages: [],
    users: [],
    connected: this.props.connected,
    typingUser: null,
    countdown: -1
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

    socket.on('user:typing', (id) => {
      this.setTypingUser(id);
    });

    socket.on('message', (message) => {
      this.addMessage(message);
    });

    socket.on('message:remove', (id) => {
      this.removeMessage(id);
    });

    socket.on('countdown', (data) => {
      this.startCountdown(data.from, data.url);
    });
  }

  componentWillMount() {
    if (this.timer) {
      clearTimeout(this.timer);
    }
    if (this.interval) {
      clearInterval(this.interval);
    }
  }

  setTypingUser = (id) => {

    if (this.timer) {
      clearTimeout(this.timer);
    }

    this.setState({
      typingUser: id
    }, () => {
      this.timer = setTimeout(() => {
        this.removeTypingUser(id);
      }, 1000);
    });
  }

  removeTypingUser(id) {
    this.setState({
      typingUser: null
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

  addMessage = ({ id, body, type, senderId }) => {
    this.setState((state) => ({
      messages: state.messages.concat({
        id,
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

  getLastMessage = () =>  {
    for (let i = this.state.messages.length - 1; i >= 0; i--) {
      if (this.state.messages[i].senderId === this._user.id) {
        return this.state.messages[i];
      }
    }
  }

  removeLastMessage = () => {
    const message = this.getLastMessage();
    if (message) {
      this.removeAndBroadcastMessage(message.id);
    }

  }

  removeMessage = (id) => {
    this.setState((state) => {
      return {
        messages: state.messages.filter(message => message.id !== id)
      };
    });
  }

  removeAndBroadcastMessage(id) {
    this.removeMessage(id);
    socket.emit('message:remove', id);
  }

  broadcastCountdown(from, url) {
    socket.emit('countdown', {
      from,
      url
    });
  }

  startCountdown(from, url) {
    this.setState({
      countdown: from
    }, () => {
      this.interval = setInterval(() => {
        this.setState((state) => ({
          countdown: state.countdown - 1
        }), () => {
          if (this.state.countdown < 0) {
            document.location.href = prependHttp(url);
          }
        });
      }, 1000);
    });
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
          id: uuid(),
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
      case 'countdown': {
        if (!args) {
          alert('Invalid argument.');
          return;
        }
        const from = +args[0];
        if (!from) {
          alert('Countdown should be bigger then 0.')
          return;
        }
        const url = args[1] || '';
        if (!validator.isURL(url)) {
          alert('Countdown: You should add a valid url.')
          return;
        }
        this.broadcastCountdown(from, url);
        break;
      }
      default:
        break;
    }

  }

  handleSendMessage = (message) => {
    this.addAndBroadcastMessage({
      id: uuid(),
      body: message,
      type: 'user',
      senderId: this._user.id,
    });
  }

  broadcastTyping = debounce(() => {
    socket.emit('user:typing', this._user.id);
  }, 100)

  render() {
    if (!this.state.connected) {
      return 'loading...';
    }
    return (
      <div className="chat">
        { this.state.countdown > 0 && <Countdown value={ this.state.countdown } /> }
        <Messages
          users={ this.state.users }
          messages={ this.state.messages }
          ref={ el => {
            this.messages = ReactDOM.findDOMNode(el);
          } }
        />
        <TypingUser
          id={ this.state.typingUser }
          users={ this.state.users }
        />
        <Input
          onType={ () => {
            this.broadcastTyping();
          } }
          onSend={ (message) => {
            if (!message) {
              return;
            }
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
