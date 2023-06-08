import React from 'react';
import { shallow } from 'enzyme';
import moment from 'moment-timezone';

import { eventCalendarChildrenTestProps as props } from 'dw/core/components/EventsCalendar/testData';

import { MiniCalendar } from '../index';

moment.tz.setDefault('UTC');

describe('MiniCalendar', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = shallow(<MiniCalendar {...props} />);
  });

  it('renders default MiniCalendar', () => {
    expect(wrapper).toMatchSnapshot();
  });

  it('changing selected day, changes both mini and big calendar', () => {
    wrapper.setProps({
      selectedDay: moment('2020-06-23T00:00:00.000Z').tz('UTC'),
    });

    expect(wrapper).toMatchSnapshot();
  });

  it('dots are properly rendered', () => {
    wrapper.setProps({
      daysWithEvents: {
        'Fri Mar 29 2019 00:00:00 GMT-0700': 1,
        'Sun Dec 30 2018 00:00:00 GMT-0700': 1,
        'Fri Jan 11 2019 00:00:00 GMT-0700': 2,
        'Tue Jan 15 2019 00:00:00 GMT-0700': 3,
        'Wed Jan 23 2019 00:00:00 GMT-0700': 1,
        'Mon Feb 04 2019 00:00:00 GMT-0700': 1,
        'Wed May 15 2019 00:00:00 GMT-0700': 2,
        'Sat Feb 01 2020 00:00:00 GMT-0700': 5,
      },
    });
    expect(wrapper).toMatchSnapshot();
  });
});
