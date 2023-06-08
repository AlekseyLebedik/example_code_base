import React from 'react';
import { shallow } from 'enzyme';

import PropagateForm from '../index';

describe('ABTesting PropagateForm', () => {
  it('renders default values', () => {
    expect(shallow(<PropagateForm />)).toMatchSnapshot();
  });
});
