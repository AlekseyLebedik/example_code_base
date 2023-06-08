import React from 'react';
import { shallow } from 'enzyme';

import CloneForm from '../index';

describe('ABTesting CloneForm', () => {
  it('renders default values', () => {
    expect(shallow(<CloneForm />)).toMatchSnapshot();
  });
});
