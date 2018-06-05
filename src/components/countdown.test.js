import React from 'react';
import Countdown from './countdown';

test('it should render properly if value is set', () => {
  const wrapper = shallow(
    <Countdown
      value={ 5 }
    />
  );
  expect(wrapper).toMatchSnapshot();
});

test('it should render properly if value is not set', () => {
  const wrapper = shallow(
    <Countdown />
  );
  expect(wrapper).toMatchSnapshot();
});
