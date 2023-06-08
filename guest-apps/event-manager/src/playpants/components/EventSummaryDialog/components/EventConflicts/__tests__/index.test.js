import React from 'react';
import { shallow } from 'enzyme';

import { eventDetailConflictProps as props } from 'playpants/testUtils/eventSummaryProps';

import EventConflicts from '../index';

describe('EventConflicts', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = shallow(<EventConflicts {...props} />);
  });

  it('renders the EventConflicts correctly', () => {
    expect(wrapper).toMatchSnapshot();
  });

  it('renders with needsConfirmations false', () => {
    wrapper.setProps({
      needsConfirmations: { conflictsCheck: true },
    });
    expect(wrapper).toMatchSnapshot();
  });

  it('renders with no conflicts', () => {
    wrapper.setProps({
      conflicts: [],
    });
    expect(wrapper).toMatchSnapshot();
  });
});
