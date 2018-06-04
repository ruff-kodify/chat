import React from 'react';
import Message from './message';

test('it should render properly', () => {
  const wrapper = shallow(<Message />);
  expect(wrapper).toMatchSnapshot();
});
