import React from 'react';
import PropTypes from 'prop-types';

const Countdown = (props) => (
  <div className="countdown">
    { props.value }
  </div>
);

Countdown.displayName = 'Countdown';

Countdown.propTypes = {
  value: PropTypes.number
};

export default Countdown;
