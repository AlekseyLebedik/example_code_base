import React from 'react';
import { shallow } from 'enzyme';

import { CalendarDatePicker } from '../index';

import { calendarDatePickerTestProps as props } from '../testProps';

describe('CalendarDatePicker component', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = shallow(<CalendarDatePicker {...props} />);
  });

  it('renders correctly', () => {
    expect(wrapper).toMatchSnapshot();
  });

  it('renders correctly with no start and end date', () => {
    wrapper.setProps({
      calendarPickerProps: {
        ...props.calendarPickerProps,
        endDate: null,
        startDate: null,
      },
    });
    expect(wrapper).toMatchSnapshot();
  });

  it('renders correctly with just start date', () => {
    wrapper.setProps({
      calendarPickerProps: {
        ...props.calendarPickerProps,
        endDate: null,
        startDate: 1572566400,
      },
    });
    expect(wrapper).toMatchSnapshot();
  });

  it('renders correctly with just end date', () => {
    wrapper.setProps({
      calendarPickerProps: {
        ...props.calendarPickerProps,
        endDate: 1573344000,
        startDate: null,
      },
    });
    expect(wrapper).toMatchSnapshot();
  });
});
