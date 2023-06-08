import React from 'react';
import { shallow } from 'enzyme';

import { eventDetailActivityChipsProps as props } from 'playpants/testUtils/eventSummaryProps';

import EventDetailActivityChips from '../index';

describe('EventDetailActivityChips', () => {
  const root = shallow(<EventDetailActivityChips {...props} />);
  it('renders the EventDetailActivityChips correctly', () => {
    expect(root).toMatchSnapshot();
  });
});
