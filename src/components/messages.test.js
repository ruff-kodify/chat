import React from 'react';
import Messages from './messages';

test('it should render properly', () => {
  const wrapper = shallow(
    <Messages
      users={[
        {
          id: '1',
          name: 'Unknown'
        }
      ]}
      messages={[
        {
          id: '1',
          type: 'user',
          body: 'foo',
          senderId: '1',
          sentAt: 1528221843537,
        },
        {
          id: '2',
          type: 'user',
          body: 'bar',
          senderId: '1',
          sentAt: 1528221843537,
        }
      ]}
    />
  );
  expect(wrapper).toMatchSnapshot();
});
