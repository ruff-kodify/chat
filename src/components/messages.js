import React from 'react';
import PropTypes from 'prop-types';
import Message, { messageShape } from './message';
import { userShape } from '../utils/user';

const Messages = (props) => {
  return (
    <div className="messages">
      {
        props.messages.map((message) => {
          return (
            <Message
              { ...message }
              key={ message.id }
              users={ props.users }
            />
          );
        })
      }
    </div>
  );
};

Messages.displayName = 'Messages';

Messages.propTypes = {
  messages: PropTypes.arrayOf(messageShape),
  users: PropTypes.arrayOf(userShape),
};

Messages.defaultProps = {
  messages: [],
};

export default Messages;
