import React from 'react';
import PartnerInfo from './partner-info';
import Messages from './messages';
import Input from './input';

class Chat extends React.Component {
  static displayName = 'Chat'
  render() {
    return (
      <div className="chat">
        <PartnerInfo />
        <Messages messages={ this.props.messages } />
        <Input />
      </div>
    );
  }
}

export default Chat;
