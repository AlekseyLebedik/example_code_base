import React from 'react';
import { shallow } from 'enzyme';

import Reporting from '../index';

it('Reporting unit rendered', () => {
  const wrapper = shallow(<Reporting />);
  expect(wrapper).toMatchSnapshot();
});
