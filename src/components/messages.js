import React from 'react';
import PropTypes from 'prop-types';
import Message, { messageShape } from './message';
import { userShape } from '../utils/user';

class Messages extends React.Component {
  render() {
    return (
      <div className="messages">
        {
          this.props.messages.map((message) => {
            return (
              <Message
                { ...message }
                key={ message.id }
                users={ this.props.users }
              />
            );
          })
        }
      </div>
    );
  }
}

Messages.displayName = 'Messages';

Messages.propTypes = {
  messages: PropTypes.arrayOf(messageShape),
  users: PropTypes.arrayOf(userShape),
};

Messages.defaultProps = {
  messages: [],
};

export default Messages;
