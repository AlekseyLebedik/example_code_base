import React from 'react';
import { shallow } from 'enzyme';

import SlackAction from '../SlackAction';

describe('ABTesting Design - SlackAction', () => {
  it('renders slack action snapshot', () => {
    expect(shallow(<SlackAction />)).toMatchSnapshot();
  });
});
