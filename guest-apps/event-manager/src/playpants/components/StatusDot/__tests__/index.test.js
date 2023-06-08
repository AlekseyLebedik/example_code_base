import React from 'react';
import { shallow } from 'enzyme';

import { statusDotProps as props } from 'playpants/testUtils/eventSummaryProps';

import StatusDot from '../index';

describe('StatusDot', () => {
  const root = shallow(<StatusDot {...props} />);
  it('renders the StatusDot correctly', () => {
    expect(root).toMatchSnapshot();
  });
});
