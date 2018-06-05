import uuid from 'uuid/v4';
import PropTypes from 'prop-types';

export const createUser = () => {
  return {
    id: uuid(),
    name: 'Unknown',
  };
};

export const userShape = PropTypes.shape({
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
});
