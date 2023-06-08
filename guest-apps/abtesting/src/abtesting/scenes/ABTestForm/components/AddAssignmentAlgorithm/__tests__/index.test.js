import React from 'react';
import { shallow } from 'enzyme';

import AddAssignmentAlgorithm from '../index';

describe('ABTesting component AddAssignmentAlgorithm', () => {
  it('renders component', () => {
    expect(shallow(<AddAssignmentAlgorithm updateTest />)).toMatchSnapshot();
  });
});
