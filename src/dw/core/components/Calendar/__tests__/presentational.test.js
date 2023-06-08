import React from 'react';
import { shallow } from 'enzyme';
import moment from 'moment-timezone';
import pick from 'lodash/pick';

import CalendarStateless from '../presentational';

describe('Calendar - presentational', () => {
  const render = () => {
    const props = {
      currentDate: moment('2019-04-05T00:00:00Z'),
      selectedDate: moment('2019-04-06T00:00:00Z'),
      backMonthHandler: jest.fn(),
      forwardMonthHandler: jest.fn(),
      changeMonthHandler: jest.fn(),
      changeYearHandler: jest.fn(),
      onChange: jest.fn(),
      renderDay: jest.fn(),
      minDate: moment('2019-04-01T00:00:00Z'),
      maxDate: moment('2019-04-10T00:00:00Z'),
      classes: { calendar: 'blah' },
      timezone: 'UTC',
    };
    const wrapper = shallow(<CalendarStateless {...props} />);

    return { props, wrapper };
  };

  it('renders structure', () => {
    const { wrapper } = render();
    expect(wrapper.find('div').hasClass('blah')).toBe(true);
    expect(wrapper.find('Toolbar')).toHaveLength(1);
    expect(wrapper.find('Month')).toHaveLength(1);
  });

  it('Toolbar props', () => {
    const { props, wrapper } = render();
    expect(wrapper.find('Toolbar').props()).toStrictEqual(
      pick(props, [
        'currentDate',
        'backMonthHandler',
        'forwardMonthHandler',
        'changeMonthHandler',
        'changeYearHandler',
      ])
    );
  });

  it('Month props', () => {
    const { props, wrapper } = render();
    expect(wrapper.find('Month').props()).toStrictEqual(
      pick(props, [
        'currentDate',
        'selectedDate',
        'onChange',
        'renderDay',
        'minDate',
        'maxDate',
        'timezone',
      ])
    );
  });
});
