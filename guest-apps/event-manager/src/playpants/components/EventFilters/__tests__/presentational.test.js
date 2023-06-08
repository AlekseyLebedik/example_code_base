import React from 'react';
import { shallow } from 'enzyme';

import { eventCalendarTestProps as props } from 'dw/core/components/EventsCalendar/testData';

import EventFiltersStateless from '../presentational';

describe('EventFilters', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = shallow(<EventFiltersStateless {...props} />);
  });

  it('renders default EventFilters empty', () => {
    expect(wrapper).toMatchSnapshot();
  });
});
