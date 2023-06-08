import React from 'react';
import { shallow } from 'enzyme';

import Tabs from '../index';

describe('Tabs', () => {
  it('renders properly', () => {
    const props = {
      children: ['whatever'],
    };

    expect(shallow(<Tabs {...props} />)).toMatchSnapshot();
  });
});
