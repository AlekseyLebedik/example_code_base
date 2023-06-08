import React from 'react';
import { shallow } from 'enzyme';

import CreateView from '../index';

describe('ABTesting Design - Create', () => {
  it('renders design create snapshot', () => {
    expect(shallow(<CreateView />)).toMatchSnapshot();
  });
});
