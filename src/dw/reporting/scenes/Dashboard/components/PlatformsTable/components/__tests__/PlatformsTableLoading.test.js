import React from 'react';
import { shallow } from 'enzyme';

import PlatformsTableLoading from '../PlatformsTableLoading';

it('Reporting > PlatformsTableLoading', () => {
  const wrapper = shallow(<PlatformsTableLoading />);
  expect(wrapper).toMatchSnapshot();
});
