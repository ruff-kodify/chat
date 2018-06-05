import React from 'react';
import PropTypes from 'prop-types';
import { userShape } from '../utils/user';

const TypingUser = (props) => {
  const user = props.users.find(user => user.id === props.id);
  return (
    <div className="typing-user">
      { user ? `${user.name} is typing...` : '' }
    </div>
  );
};

TypingUser.displayName = 'TypingUser';

TypingUser.propTypes = {
  users: PropTypes.arrayOf(userShape),
  id: PropTypes.string,
};

TypingUser.defaultProps = {
  users: []
};

export default TypingUser;
