import React from 'react';
import { shallow } from 'enzyme';
import moment from 'moment-timezone';
import { DATE_TIME_FORMATS } from 'dw/core/helpers/date-time';

import CalendarComponent from '../container';

const NOW = moment('2019-04-03T00:00:00Z');
jest.spyOn(Date, 'now').mockImplementation(() => NOW.valueOf());

describe('Calendar - container', () => {
  const render = (newProps = {}) => {
    const props = {
      value: moment('2019-04-01T00:00:00Z'),
      onChange: jest.fn(),
      timezone: 'UTC',
      ...newProps,
    };
    const wrapper = shallow(<CalendarComponent {...props} />);

    return {
      props,
      wrapper,
    };
  };

  it('default state', () => {
    const { wrapper } = render();
    const { currentDate } = wrapper.state();
    expect(currentDate.format(DATE_TIME_FORMATS.DEFAULT)).toBe(
      'Apr 01, 2019 12:00 am UTC'
    );
  });

  it.skip('onChange changes date properly to 2019-04-15', () => {
    const {
      props: { timezone, onChange },
      wrapper,
    } = render();
    const instance = wrapper.instance();

    const changeDate = moment('2019-04-15').tz(timezone);
    instance.onChange(changeDate);
    const { selectedDate } = wrapper.state();
    expect(selectedDate.format(DATE_TIME_FORMATS.DEFAULT)).toBe(
      'Apr 15, 2019 12:00 am UTC'
    );
    expect(onChange.mock.calls[0][0].isSame(changeDate)).toBe(true);
  });

  it('go back one month changes date to 2019-03-01', () => {
    const {
      props: { onChange },
      wrapper,
    } = render();
    const instance = wrapper.instance();

    instance.backMonthHandler();
    const { currentDate, selectedDate } = wrapper.state();
    expect(currentDate.format(DATE_TIME_FORMATS.DEFAULT)).toBe(
      'Mar 01, 2019 12:00 am UTC'
    );
    expect(onChange).toHaveBeenCalledWith(selectedDate.subtract(1, 'month'));
  });

  it('go forward one month changes date to 2019-05-01', () => {
    const {
      props: { onChange },
      wrapper,
    } = render();
    const instance = wrapper.instance();

    instance.forwardMonthHandler();
    const { currentDate, selectedDate } = wrapper.state();
    expect(currentDate.format(DATE_TIME_FORMATS.DEFAULT)).toBe(
      'May 01, 2019 12:00 am UTC'
    );
    expect(onChange).toHaveBeenCalledWith(selectedDate.add(1, 'month'));
  });

  it('do not auto select date if autoOk prop is set', () => {
    const {
      props: { onChange },
      wrapper,
    } = render({ autoOk: true });
    const instance = wrapper.instance();

    instance.forwardMonthHandler();
    const { currentDate } = wrapper.state();
    expect(currentDate.format(DATE_TIME_FORMATS.DEFAULT)).toBe(
      'May 01, 2019 12:00 am UTC'
    );
    expect(onChange).not.toHaveBeenCalled();
  });

  it('changes month to June', () => {
    const {
      props: { onChange },
      wrapper,
    } = render();
    const instance = wrapper.instance();

    const month = 'June';
    instance.changeMonthHandler(month);
    const { currentDate, selectedDate } = wrapper.state();
    expect(currentDate.format(DATE_TIME_FORMATS.DEFAULT)).toBe(
      'Jun 01, 2019 12:00 am UTC'
    );
    expect(onChange).toHaveBeenCalledWith(selectedDate.set('month', month));
  });

  it('do not auto select date if it is after maxDate', () => {
    const {
      props: { onChange },
      wrapper,
    } = render({ maxDate: moment('2019-06-02T00:00:00Z') });
    const instance = wrapper.instance();

    instance.changeMonthHandler('July');
    const { currentDate } = wrapper.state();
    expect(currentDate.format(DATE_TIME_FORMATS.DEFAULT)).toBe(
      'Jul 01, 2019 12:00 am UTC'
    );
    expect(onChange).not.toHaveBeenCalled();
  });

  it('changes year to 2020', () => {
    const {
      props: { onChange },
      wrapper,
    } = render();
    const instance = wrapper.instance();

    const year = '2020';
    instance.changeYearHandler(year);
    const { currentDate, selectedDate } = wrapper.state();
    expect(currentDate.format(DATE_TIME_FORMATS.DEFAULT)).toBe(
      'Apr 01, 2020 12:00 am UTC'
    );
    expect(onChange).toHaveBeenCalledWith(selectedDate.set('year', year));
  });

  it('helper, returns now', () => {
    const { wrapper } = render();
    const instance = wrapper.instance();

    expect(
      instance.minMaxDateToMoment('now').format(DATE_TIME_FORMATS.DEFAULT)
    ).toBe('Apr 03, 2019 12:00 am UTC');
  });

  it('set timezone to America/Vancouver', () => {
    const props = {
      value: moment('2019-04-01T00:00:00Z'),
      timezone: 'America/Vancouver',
    };
    const wrapper = shallow(<CalendarComponent {...props} />);
    const { currentDate } = wrapper.state();
    expect(currentDate.format(DATE_TIME_FORMATS.DEFAULT)).toBe(
      'Mar 31, 2019 05:00 pm PDT'
    );
  });
});
