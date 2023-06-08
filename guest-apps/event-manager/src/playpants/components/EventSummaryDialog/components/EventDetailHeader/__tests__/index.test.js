import React from 'react';
import { shallow } from 'enzyme';

import { eventDetailHeaderProps as props } from 'playpants/testUtils/eventSummaryProps';

import EventDetailHeader from '../index';

describe('EventDetailHeader', () => {
  const root = shallow(<EventDetailHeader {...props} />);
  it('renders the EventDetailHeader correctly', () => {
    expect(root).toMatchSnapshot();
  });
});
