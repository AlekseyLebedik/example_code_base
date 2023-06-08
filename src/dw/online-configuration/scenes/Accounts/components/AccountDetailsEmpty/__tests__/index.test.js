import React from 'react';
import { shallow } from 'enzyme';

import AccountDetailsEmpty from '../index';

describe('AccountDetailsEmpty', () => {
  it('renders without crashing', () => {
    expect(shallow(<AccountDetailsEmpty />)).toMatchSnapshot();
  });
});
