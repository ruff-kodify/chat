import React from 'react';
import Messages from './messages';

test('it should render properly', () => {
  const wrapper = shallow(
    <Messages
      messages={[
        {
          id: 1,
          type: 'user',
          body: 'foo'
        },
        {
          id: 2,
          type: 'user',
          body: 'bar'
        }
      ]}
    />
  );
  expect(wrapper).toMatchSnapshot();
});
