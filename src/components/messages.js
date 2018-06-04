import React from 'react';
import PropTypes from 'prop-types';
import Message, { messageShape } from './message';

const Messages = (props) => {
  return (
    <div className="messages">
      {
        props.messages.map((message) => (
          <Message { ...message } key={ message.id } />
        ))
      }
    </div>
  );
};

Messages.displayName = 'Messages';

Messages.propTypes = {
  messages: PropTypes.arrayOf(messageShape),
};

Messages.defaultProps = {
  messages: []
};

export default Messages;
