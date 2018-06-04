import React from 'react';
import Chat from './chat';

test('it should render properly', () => {
  const wrapper = shallow(<Chat />);
  expect(wrapper).toMatchSnapshot();
});

test('it should add a thought', () => {
  const wrapper = mount(<Chat />);
  const input = wrapper.find('[data-test="input"]');
  const button = wrapper.find('[data-test="button"]');
  const arg = 'Oops I did it again';

  expect(wrapper.find('.message--thought')).toHaveLength(0);

  input.simulate('change', { target: { value: `/think "${arg}"` } });
  button.simulate('click');

  expect(wrapper.find('.message--thought')).toHaveLength(1);
  expect(wrapper.find('.message--thought').text()).toBe(arg);
});

test('it should add a new user message', () => {
  const wrapper = mount(<Chat />);
  const input = wrapper.find('[data-test="input"]');
  const button = wrapper.find('[data-test="button"]');
  const message = 'Hello';

  expect(wrapper.find('.message')).toHaveLength(0);

  input.simulate('change', { target: { value: message } });
  button.simulate('click');

  expect(wrapper.find('.message')).toHaveLength(1);
  expect(wrapper.find('.message--user')).toHaveLength(1);
});
