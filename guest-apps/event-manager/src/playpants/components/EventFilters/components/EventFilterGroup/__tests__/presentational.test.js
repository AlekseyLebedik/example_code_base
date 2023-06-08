import React from 'react';
import { shallow } from 'enzyme';

import { eventCalendarTestProps as props } from 'dw/core/components/EventsCalendar/testData';

import EventFilterGroupStateless from '../presentational';

describe('EventFilterGroupStateless', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = shallow(<EventFilterGroupStateless {...props} />);
  });

  it('renders default EventFilterGroupStateless empty', () => {
    expect(wrapper).toMatchSnapshot();
  });
});
