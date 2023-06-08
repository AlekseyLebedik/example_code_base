import React from 'react';
import { shallow } from 'enzyme';

import { endNowConfirmationProps as props } from 'playpants/testUtils/eventSummaryProps';

import EndNowConfirmation from '../index';

describe('EndNowConfirmation', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = shallow(<EndNowConfirmation {...props} />);
  });

  it('renders the EndNowConfirmation correctly', () => {
    expect(wrapper).toMatchSnapshot();
  });

  it('renders with needsConfirmations empty', () => {
    wrapper.setProps({
      needsConfirmations: {},
    });
    expect(wrapper).toMatchSnapshot();
  });
});
