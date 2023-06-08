import React from 'react';
import { shallow } from 'enzyme';

import LoadingImage from '../index';

describe('ABTesting Design', () => {
  it('renders design loading image', () => {
    expect(shallow(<LoadingImage />)).toMatchSnapshot();
  });
});
