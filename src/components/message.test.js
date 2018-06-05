import React from 'react';
import Message from './message';

test('it should render properly', () => {
  const wrapper = shallow(
    <Message
      id="1"
      type="user"
      body="hello world!"
      senderId="1"
      sentAt={ 1528221843537 }
      users={[
        {
          id: '1',
          name: 'Unknown'
        }
      ]}
    />
  );
  expect(wrapper).toMatchSnapshot();
});
