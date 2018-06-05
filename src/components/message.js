import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { userShape } from '../utils/user';
import format from 'date-fns/format';
import ColorHash from 'color-hash';

const colorHash = new ColorHash();

const Message = (props) => {
  const sender = props.users.find(user => user.id === props.senderId);
  return (
    <div
      data-id={ props.id }
      className={ classNames('message', {
        [`message--${props.type}`]: true,
        'message--me': !!sender.isMe,
        'message--user-disconnected': !sender.connected
      }) }
    >
      <div className="message-header">
        <div className="message-avatar"
          style={ {
            background: colorHash.hex(sender.id)
          } }
        />
        <div className="message-details">
          <div className="message-sender">
            { sender.name }
          </div>
          <div className="message-sent-at">
            { format(props.sentAt, 'YYYY. MM. DD. HH:mm') }
          </div>
        </div>
      </div>
      <div className="message-body" data-test="body">
        { props.body }
      </div>
    </div>
  );
};

Message.displayName = 'Message';

const propTypes = {
  id: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  body: PropTypes.string.isRequired,
  senderId: PropTypes.string.isRequired,
  sentAt: PropTypes.number.isRequired,
};

export const messageShape = PropTypes.shape(propTypes);

Message.propTypes = {
  ...propTypes,
  users: PropTypes.arrayOf(userShape).isRequired,
};

export default Message;
