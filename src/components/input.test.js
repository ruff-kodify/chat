import React from 'react';
import Input from './input';

function createInput(props) {
  const wrapper = mount(<Input { ...props } />);
  const input = wrapper.find('[data-test="input"]');
  const button = wrapper.find('[data-test="button"]');
  return {
    wrapper,
    input,
    button
  };
}

test('it should render properly', () => {
  const wrapper = shallow(<Input />);
  expect(wrapper).toMatchSnapshot();
});

test('it should call onSend if user clicks on the button', () => {
  const value = 'hello world';
  const props = {
    onSend: jest.fn()
  };
  const { input, button } = createInput(props);
  input.simulate('change', { target: { value } });
  button.simulate('click');
  expect(props.onSend).toHaveBeenCalledTimes(1);
  expect(props.onSend).toHaveBeenCalledWith(value);
});

test('it should call onSend if the user presses enter', () => {
  const value = 'hello world';
  const props = {
    onSend: jest.fn()
  };
  const { input } = createInput(props);
  input.simulate('change', { target: { value: 'hello world' } });
  input.simulate('keyup', { keyCode: 13 });
  expect(props.onSend).toHaveBeenCalledTimes(1);
  expect(props.onSend).toHaveBeenCalledWith(value);
});

test('it should call onType if the user is writing some text', () => {
  const props = {
    onType: jest.fn()
  };
  const { input } = createInput(props);
  input.simulate('keyup', { target: { value: 'h' } });
  input.simulate('keyup', { target: { value: 'he' } });
  input.simulate('keyup', { target: { value: 'hel' } });
  input.simulate('keyup', { target: { value: 'hell' } });
  input.simulate('keyup', { target: { value: 'hello' } });

  expect(props.onType).toHaveBeenCalledTimes(5);
  expect(props.onType).toHaveBeenCalledWith('h');
  expect(props.onType).toHaveBeenLastCalledWith('hello');
});
