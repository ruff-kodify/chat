import React from 'react';
import Input from './input';

test('it should render properly', () => {
  const wrapper = shallow(<Input />);
  expect(wrapper).toMatchSnapshot();
});
