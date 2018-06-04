import React from 'react';
import Messages from './messages';

test('it should render properly', () => {
  const wrapper = shallow(<Messages />);
  expect(wrapper).toMatchSnapshot();
});
