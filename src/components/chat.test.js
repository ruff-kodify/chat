import React from 'react';
import Chat from './chat';

test('it should render properly', () => {
  const wrapper = shallow(<Chat />);
  expect(wrapper).toMatchSnapshot();
});
