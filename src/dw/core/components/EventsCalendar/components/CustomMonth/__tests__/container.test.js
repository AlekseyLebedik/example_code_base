import React from 'react';
import { shallow } from 'enzyme';
import moment from 'moment-timezone';
import range from 'lodash/range';

import { dateToUTCTimestamp } from 'dw/core/helpers/date-time';
import { customMonthTestProps as props } from 'dw/core/components/EventsCalendar/testData';

import { CustomMonth } from '../container';

describe('CustomMonth', () => {
  let instance;
  let wrapper;
  beforeEach(() => {
    wrapper = shallow(<CustomMonth {...props} />);
    instance = wrapper.instance();
  });

  it('renders default', () => {
    expect(wrapper).toMatchSnapshot();
  });

  it('filterWeekEvents filters out events not in week', () => {
    const week = [
      moment('2018-12-30T00:00:00Z').toDate(),
      moment('2018-12-31T00:00:00Z').toDate(),
      moment('2019-01-01T00:00:00Z').toDate(),
      moment('2019-01-02T00:00:00Z').toDate(),
      moment('2019-01-03T00:00:00Z').toDate(),
      moment('2019-01-04T00:00:00Z').toDate(),
      moment('2019-01-05T00:00:00Z').toDate(),
    ];

    expect(instance.filterWeekEvents(props.events, week)).toEqual([
      {
        created_at: dateToUTCTimestamp(new Date(2019, 0, 1)),
        end: moment('2019-01-01T00:00:00Z').toDate(),
        publish_at: dateToUTCTimestamp(new Date(2019, 0, 1)),
        start: moment('2019-01-01T00:00:00Z').toDate(),
        status: 'pending',
        title: 'Test 1',
        type: 'eventManager',
      },
      {
        created_at: dateToUTCTimestamp(new Date(2019, 0, 1)),
        end: moment('2019-01-01T00:00:00Z').toDate(),
        publish_at: dateToUTCTimestamp(new Date(2019, 0, 1)),
        start: moment('2019-01-01T00:00:00Z').toDate(),
        status: 'approved',
        title: 'Test 2',
        type: 'eventManager',
      },
      {
        created_at: dateToUTCTimestamp(new Date(2019, 0, 1)),
        end: moment('2019-01-01T00:00:00Z').toDate(),
        publish_at: dateToUTCTimestamp(new Date(2019, 0, 1)),
        start: moment('2019-01-01T00:00:00Z').toDate(),
        status: 'pending',
        title: 'Test 3',
        type: 'eventManager',
      },
    ]);
  });

  describe('monthRange', () => {
    it('monthRange returns the correct date range for a standard month view', () => {
      const { customViewOn, numberOfDays, selectedDay } =
        props.eventsCalendarSettings;
      let currentDate = moment('2018-12-29T00:00:00Z').toDate();
      const expectedRange = range(0, 35).map(() => {
        currentDate = moment(currentDate).startOf('day').add(1, 'day').toDate();
        return currentDate;
      });

      expect(
        instance.monthRange(customViewOn, numberOfDays, selectedDay)
      ).toEqual(expectedRange);
    });

    it('monthRange returns the correct date range for a custom month view', () => {
      const updatedCalendarSettings = {
        customViewOn: true,
        numberOfDays: 20,
        selectedDay: moment(new Date(2019, 0, 1)).tz('UTC'),
      };
      wrapper.setProps({
        eventsCalendarSettings: updatedCalendarSettings,
      });
      let currentDate = moment('2018-12-29T00:00:00Z').toDate();
      const expectedRange = range(0, 28).map(() => {
        currentDate = moment(currentDate).startOf('day').add(1, 'day').toDate();
        return currentDate;
      });

      expect(
        instance.monthRange(
          updatedCalendarSettings.customViewOn,
          updatedCalendarSettings.numberOfDays,
          updatedCalendarSettings.selectedDay
        )
      ).toEqual(expectedRange);
    });
  });
});
