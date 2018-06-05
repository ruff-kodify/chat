import React from 'react';
import PropTypes from 'prop-types';

const KEY_ENTER = 13;

const emojiMap = {
  '(smile)': '😀',
  '(wink)': '😉',
  '(sad)': '😔'
};

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

  handelEmojis(value) {
    const possibleEmojis = value.match(/\(([a-zA-Z0-9-\s]+)\)/g);
    let result = value;
    if (possibleEmojis) {
      possibleEmojis.forEach(emoji => {
        if (emojiMap[emoji]) {
          result = result.replace(emoji, emojiMap[emoji]);
        }
      });
    }
    return result;
  }

  handleChange = (e) => {
    let value = e.target.value;

    value = this.handelEmojis(value);

    this.setState({
      value
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
          className="send-button"
          data-test="button"
          onClick={ this.handleButtonClick }
        >
          Send
        </button>
      </div>
    );
  }
}

Input.displayName = 'Input';

export default Input;
