import React from 'react';
import { shallow } from 'enzyme';

import DesignView from '../index';

describe('ABTesting Design', () => {
  it('renders design snapshot', () => {
    expect(shallow(<DesignView />)).toMatchSnapshot();
  });
});
