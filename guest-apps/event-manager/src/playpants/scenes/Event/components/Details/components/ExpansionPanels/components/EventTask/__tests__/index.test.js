import React from 'react';
import { shallow } from 'enzyme';

import { eventTaskProps as props } from 'playpants/testUtils/eventSummaryProps';
import EventTask from '../index';

describe('EventTask', () => {
  const root = shallow(<EventTask {...props} />);
  it('loads the EventTask component correctly', () => {
    expect(root).toMatchSnapshot();
  });
});
