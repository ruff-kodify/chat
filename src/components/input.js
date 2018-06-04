import React from 'react';
import PropTypes from 'prop-types';

const KEY_ENTER = 13;

class Input extends React.Component {

  static propTypes = {
    onSend: PropTypes.func,
    onType: PropTypes.func,
  }

  static defaultProps = {
    onSend: () => {},
    onType: () => {},
  }

  state = {
    value: '',
  }

  empty = () => {
    this.setState({
      value: ''
    });
  }

  send = (value) => {
    this.props.onSend(value);
    this.empty();
  }

  handleChange = (e) => {
    this.setState({
      value: e.target.value
    });
  }

  handleKeyUp = (e) => {
    if (e.keyCode === KEY_ENTER) {
      this.send(e.target.value);
    } else {
      this.props.onType(e.target.value);
    }
  }

  handleButtonClick = () => {
    this.send(this.state.value);
  }

  render() {
    return (
      <div className="input">
        <input
          data-test="input"
          type="text"
          value={ this.state.value }
          onChange={ this.handleChange }
          onKeyUp={ this.handleKeyUp }
        />
        <button
          data-test="button"
          onClick={ this.handleButtonClick }
        />
      </div>
    );
  }
}

Input.displayName = 'Input';

export default Input;
