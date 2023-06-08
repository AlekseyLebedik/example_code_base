import React from 'react';
import { shallow } from 'enzyme';
import moment from 'moment-timezone';

import Select from '@material-ui/core/Select';

import { eventCalendarChildrenTestProps as props } from 'dw/core/components/EventsCalendar/testData';

import {
  DateSelector,
  getCustomDateRangeFormat,
  getDateFormat,
} from '../index';

describe('DateSelector', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = shallow(<DateSelector {...props} />);
  });

  it('renders date selectors properly', () => {
    expect(wrapper).toMatchSnapshot();
  });

  it('day view selected', () => {
    wrapper.setProps({ selectedView: 'day' });
    expect(wrapper).toMatchSnapshot();
  });

  it('week view selected', () => {
    wrapper.setProps({ selectedView: 'week' });
    expect(wrapper).toMatchSnapshot();
  });

  it('month view selected', () => {
    wrapper.setProps({ selectedView: 'month' });
    expect(wrapper).toMatchSnapshot();
  });

  it('custom week view selected', () => {
    wrapper.setProps({
      customViewOn: true,
      numberOfDays: 8,
      selectedView: 'week',
    });
    expect(wrapper).toMatchSnapshot();
  });

  it('custom month view selected', () => {
    wrapper.setProps({
      customViewOn: true,
      numberOfDays: 50,
      selectedView: 'month',
    });
    expect(wrapper).toMatchSnapshot();
  });

  describe('Select', () => {
    let SelectFilter;
    beforeEach(() => {
      SelectFilter = wrapper.find(Select);
    });

    it('should always render', () => {
      expect(SelectFilter).toMatchSnapshot();
    });

    it('should trigger action onChange and change the value of the displayed filter item', () => {
      SelectFilter.prop('onChange')({ target: { value: props.selectedDay } });
      expect(SelectFilter.props().value).toMatch(
        moment(new Date(2019, 0, 1)).format()
      );
    });
  });

  describe('getCustomDateRangeFormat', () => {
    it('should return the appropriate date range format', () => {
      expect(getCustomDateRangeFormat(new Date(2019, 0, 1), 1)).toEqual(
        'Tuesday January 1, 2019'
      );
      expect(getCustomDateRangeFormat(new Date(2019, 0, 10), 10)).toEqual(
        'Thu Jan 10, 2019 – Sat Jan 19, 2019'
      );
      expect(getCustomDateRangeFormat(new Date(2019, 1, 2), 65)).toEqual(
        'Sat Feb 2, 2019 – Sun Apr 7, 2019'
      );
    });
  });

  describe('getDateFormat', () => {
    it('should return the appropriate date format for a given view', () => {
      expect(getDateFormat(new Date(2019, 0, 1), 'day')).toEqual(
        'Tuesday, January 1, 2019'
      );
      expect(getDateFormat(new Date(2019, 0, 1), 'week')).toEqual(
        'December 30 – January 5'
      );
      expect(getDateFormat(new Date(2019, 0, 1), 'month')).toEqual(
        'January 2019'
      );
    });
  });
});
