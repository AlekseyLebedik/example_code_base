import React from 'react';
import { shallow } from 'enzyme';

import { eventItemChipsProps as props } from 'playpants/testUtils/eventSummaryProps';

import EventItemChips from '../index';

describe('EventItemChips', () => {
  const root = shallow(<EventItemChips {...props} />);
  it('renders the EventItemChips correctly', () => {
    expect(root).toMatchSnapshot();
  });
});
