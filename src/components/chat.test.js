import React from 'react';
import Chat from './chat';

const props = {
  connected: true
};

test('it should render loading state', () => {
  const wrapper = mount(<Chat />);
  expect(wrapper).toMatchSnapshot();
});

test('it should add a thought', () => {
  const wrapper = mount(<Chat { ...props } />);
  const input = wrapper.find('[data-test="input"]');
  const button = wrapper.find('[data-test="button"]');
  const arg = 'Oops I did it again';

  expect(wrapper.find('.message--thought')).toHaveLength(0);

  input.simulate('change', { target: { value: `/think "${arg}"` } });
  button.simulate('click');

  expect(wrapper.find('.message--thought')).toHaveLength(1);
  expect(wrapper.find('[data-test="body"]').text()).toBe(arg);
});

test('it should add a new user message', () => {
  const wrapper = mount(<Chat { ...props } />);
  const input = wrapper.find('[data-test="input"]');
  const button = wrapper.find('[data-test="button"]');
  const message = 'Hello';

  expect(wrapper.find('.message')).toHaveLength(0);

  input.simulate('change', { target: { value: message } });
  button.simulate('click');

  expect(wrapper.find('.message')).toHaveLength(1);
  expect(wrapper.find('.message--user')).toHaveLength(1);
});
