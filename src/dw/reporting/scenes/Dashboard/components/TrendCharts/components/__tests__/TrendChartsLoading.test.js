import React from 'react';
import { shallow } from 'enzyme';

import TrendChartsLoading from '../TrendChartsLoading';

it('Reporting > TrendChartsLoading', () => {
  const wrapper = shallow(<TrendChartsLoading />);
  expect(wrapper).toMatchSnapshot();
});
