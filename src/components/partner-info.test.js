import React from 'react';
import PartnerInfo from './partner-info';

test('it should render properly', () => {
  const wrapper = shallow(<PartnerInfo />);
  expect(wrapper).toMatchSnapshot();
});
