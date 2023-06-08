import React from 'react';
import { shallow } from 'enzyme';
import moment from 'moment-timezone';
import { DATE_TIME_FORMATS } from 'dw/core/helpers/date-time';

import DateTimeCalendarComponent from '../container';

describe.skip('DateTimeCalendarComponent - container', () => {
  const render = () => {
    const props = {
      value: moment('2019-04-01T00:00:00Z'),
      onChange: jest.fn(),
      timezone: 'UTC',
    };
    const wrapper = shallow(<DateTimeCalendarComponent {...props} />);

    return {
      props,
      wrapper,
    };
  };

  it('default state', () => {
    const { wrapper } = render();
    const { value } = wrapper.state();
    expect(value.format(DATE_TIME_FORMATS.DEFAULT)).toBe(
      'Apr 01, 2019 12:00 am UTC'
    );
  });

  it('instance onChange() calls props.onChange()', () => {
    const { props, wrapper } = render();
    const instance = wrapper.instance();

    const changeDate = moment('2019-04-15T00:00:00.000Z');
    instance.onChange(changeDate);
    expect(props.onChange.mock.calls[0][0].isSame(changeDate)).toBe(true);
  });

  it('sets two hours', () => {
    const { wrapper } = render();
    const instance = wrapper.instance();

    instance.onTimeChange('hour')(2);
    const { value } = wrapper.state();
    expect(value.format(DATE_TIME_FORMATS.DEFAULT)).toBe(
      'Apr 01, 2019 02:00 am UTC'
    );
  });

  it('sets five minutes', () => {
    const { wrapper } = render();
    const instance = wrapper.instance();

    instance.onTimeChange('minute')(5);
    const { value } = wrapper.state();
    expect(value.format(DATE_TIME_FORMATS.DEFAULT)).toBe(
      'Apr 01, 2019 12:05 am UTC'
    );
  });

  it('sets ten seconds', () => {
    const { wrapper } = render();
    const instance = wrapper.instance();

    instance.onTimeChange('second')(10);
    const { value } = wrapper.state();
    expect(value.format(DATE_TIME_FORMATS.DEFAULT_WITH_SECONDS)).toBe(
      'Apr 01, 2019 12:00:10 am UTC'
    );
  });

  it('changes date to 2019-05-05', () => {
    const { wrapper } = render();
    const instance = wrapper.instance();

    instance.onDateChange(moment('2019-05-05'));
    const { value } = wrapper.state();
    expect(value.format(DATE_TIME_FORMATS.DEFAULT_DATE)).toBe('May 05, 2019');
  });

  it('changes date-time to 2019-06-11 03:12', () => {
    const {
      props: { timezone },
      wrapper,
    } = render();
    const instance = wrapper.instance();

    const newDate = moment('May 11, 2019 03:12', DATE_TIME_FORMATS.DEFAULT).tz(
      timezone
    );
    instance.onDateTextChange(newDate);
    const { value } = wrapper.state();
    expect(value.format(DATE_TIME_FORMATS.DEFAULT)).toBe(
      'May 11, 2019 03:12 am UTC'
    );
  });
});
