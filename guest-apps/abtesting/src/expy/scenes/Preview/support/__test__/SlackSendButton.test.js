import React from 'react';
import { shallow } from 'enzyme';

import SlackSendButton from '../SlackSendButton';

describe('ABTesting Design - SlackSendButton', () => {
  it('renders slack send button snapshot', () => {
    expect(shallow(<SlackSendButton />)).toMatchSnapshot();
  });
});
