import React from 'react';
import { shallow } from 'enzyme';

import AppLoading from '../index';

describe('AppLoading', () => {
  it('renders without crashing', () => {
    expect(shallow(<AppLoading />)).toMatchSnapshot();
  });
});
