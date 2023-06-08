import React from 'react';
import { shallow } from 'enzyme';

import TestComponent from './index';

describe('Jest', () => {
  it('successfully create a snapshot with classname', () => {
    expect(shallow(<TestComponent />)).toMatchSnapshot();
  });
});
