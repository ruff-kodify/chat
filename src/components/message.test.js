import React from 'react';
import Message from './message';

test('it should render properly', () => {
  const wrapper = shallow(
    <Message
      id={ 1 }
      type="user"
      body="hello world!"
    />
  );
  expect(wrapper).toMatchSnapshot();
});
