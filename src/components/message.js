import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

const Message = (props) => {
  return (
    <div
      data-id={ props.id }
      className={ classNames('message', {
        [`message--${props.type}`]: true,
      }) }
    >
      { props.body }
    </div>
  );
};

Message.displayName = 'Message';

const propTypes = {
  id: PropTypes.number.isRequired,
  type: PropTypes.string.isRequired,
  body: PropTypes.string.isRequired,
};

export const messageShape = PropTypes.shape(propTypes);

Message.propTypes = propTypes;

export default Message;
