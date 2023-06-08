import React from 'react';
import { shallow } from 'enzyme';
import moment from 'moment-timezone';
import pick from 'lodash/pick';

import DateTimeCalendarStateless from '../presentational';

describe('DateTimeCalendar - presentational', () => {
  const render = () => {
    const props = {
      value: moment('2019-04-05T00:00:00Z'),
      timezone: 'UTC',
      onDateTextChange: jest.fn(),
      onDateChange: jest.fn(),
      onTimeChange: jest.fn(),
      changeTimezoneHandler: jest.fn(),
      classes: { dateTimeCalendar: 'blah' },
      calendarProps: {
        minDate: moment('2019-04-01T00:00:00Z'),
        maxDate: moment('2019-04-10T00:00:00Z'),
        renderDay: jest.fn(),
      },
    };
    const wrapper = shallow(<DateTimeCalendarStateless {...props} />);

    return { props, wrapper };
  };

  it('renders structure', () => {
    const { wrapper } = render();
    expect(wrapper.find('div').hasClass('blah')).toBe(true);
    expect(wrapper.find('WithStyles(DateTextBase)')).toHaveLength(1);
    expect(wrapper.find('CalendarComponent')).toHaveLength(1);
    expect(wrapper.find('WithStyles(Time)')).toHaveLength(1);
  });

  it('DateText props', () => {
    const { props, wrapper } = render();
    const { minDate, maxDate } = props.calendarProps;
    expect(wrapper.find('WithStyles(DateTextBase)').props()).toStrictEqual({
      ...pick(props, [
        'value',
        'timezone',
        'onDateTextChange',
        'changeTimezoneHandler',
      ]),
      minDate,
      maxDate,
    });
  });

  it('CalendarComponent props', () => {
    const { props, wrapper } = render();
    const { minDate, maxDate, renderDay } = props.calendarProps;
    expect(wrapper.find('CalendarComponent').props()).toStrictEqual({
      ...pick(props, ['value', 'timezone', 'classes']),
      renderDay,
      minDate,
      maxDate,
      onChange: props.onDateChange,
      onMonthChange: undefined,
      autoOk: false,
    });
  });

  it('Time props', () => {
    const { props, wrapper } = render();
    const { minDate, maxDate } = props.calendarProps;
    expect(wrapper.find('WithStyles(Time)').props()).toStrictEqual({
      ...pick(props, ['value', 'timezone', 'onTimeChange']),
      minDate,
      maxDate,
    });
  });
});
