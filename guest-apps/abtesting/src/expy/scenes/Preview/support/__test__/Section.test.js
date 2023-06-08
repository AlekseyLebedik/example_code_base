import React from 'react';
import { shallow } from 'enzyme';

import Section from '../Section';

describe('ABTesting Design - Section', () => {
  it('renders section snapshot', () => {
    expect(shallow(<Section />)).toMatchSnapshot();
  });
});
