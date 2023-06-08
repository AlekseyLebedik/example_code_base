import React from 'react';
import { shallow } from 'enzyme';

import { publishNowConfirmationProps as props } from 'playpants/testUtils/eventSummaryProps';

import PublishNowConfirmation from '../index';

describe('PublishNowConfirmation', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = shallow(<PublishNowConfirmation {...props} />);
  });

  it('renders the PublishNowConfirmation correctly', () => {
    expect(wrapper).toMatchSnapshot();
  });

  it('renders with needsConfirmations empty', () => {
    wrapper.setProps({
      needsConfirmations: {},
    });
    expect(wrapper).toMatchSnapshot();
  });
});
