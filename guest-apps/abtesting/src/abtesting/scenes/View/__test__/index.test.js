import React from 'react';
import { shallow } from 'enzyme';

import ViewForm from '../index';

describe('ABTesting ViewForm', () => {
  it('renders default values', () => {
    expect(shallow(<ViewForm />)).toMatchSnapshot();
  });
});
