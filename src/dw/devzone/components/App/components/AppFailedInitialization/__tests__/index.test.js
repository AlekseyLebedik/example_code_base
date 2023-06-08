import React from 'react';
import { shallow } from 'enzyme';

import AppFailedInitialization from '../index';

// Mock `getMailto` for predictive test results
jest.mock('dw/core/helpers/email');

describe('AppFailedInitialization', () => {
  it('renders without crashing', () => {
    expect(shallow(<AppFailedInitialization />)).toMatchSnapshot();
  });
});
