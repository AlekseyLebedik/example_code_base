import React from 'react';
import { shallow } from 'enzyme';
import moment from 'moment-timezone';

import Time from '../index';

describe('DateTimeCalendar - Time component', () => {
  const render = (newProps = {}) => {
    const props = {
      value: moment('2019-04-15T03:40:55.000Z'),
      onTimeChange: () => jest.fn(),
      timezone: 'UTC',
      minDate: moment('2019-04-15T03:40:55.000Z'),
      ...newProps,
    };
    const wrapper = shallow(<Time {...props} />).shallow();

    return wrapper;
  };
  const wrapper = render();

  it('renders header', () => {
    expect(wrapper.find('Header')).toHaveLength(1);
  });

  it('renders hours time select', () => {
    expect(wrapper.find('TimeSelect').filter({ value: '03' })).toHaveLength(1);
  });

  it('renders minutes time select', () => {
    expect(wrapper.find('TimeSelect').filter({ value: '40' })).toHaveLength(1);
  });

  it('renders seconds time select', () => {
    expect(wrapper.find('TimeSelect').filter({ value: '55' })).toHaveLength(1);
  });

  it('default state', () => {
    expect(wrapper.state()).toStrictEqual({
      error: { hour: false, minute: false, second: false },
    });
  });

  it('set date-time with updated minutes', () => {
    const onTimeChange = jest.fn().mockReturnValue(jest.fn());
    const wrapper = render({
      minDate: moment('2019-04-15T03:30:00Z'),
      onTimeChange,
    });
    const instance = wrapper.instance();
    instance.onChange('minute')(35);

    const {
      error: { minute },
    } = wrapper.state();
    expect(minute).toBe(false);
    expect(onTimeChange).toHaveBeenCalledWith('minute');
  });

  it('date-time with updated minutes cannot be set if it is smaller than min date', () => {
    const onTimeChange = jest.fn().mockReturnValue(jest.fn());
    const wrapper = render({
      minDate: moment('2019-04-15T03:30:00Z'),
      onTimeChange,
    });
    const instance = wrapper.instance();
    instance.onChange('minute')(29);

    const {
      error: { minute },
    } = wrapper.state();
    expect(minute).toBe(true);
    expect(onTimeChange).not.toHaveBeenCalled();
  });

  it('date-time with updated seconds cannot be set if it is bigger than max date', () => {
    const onTimeChange = jest.fn().mockReturnValue(jest.fn());
    const wrapper = render({
      maxDate: moment('2019-04-15T03:40:56Z'),
      onTimeChange,
    });
    const instance = wrapper.instance();
    instance.onChange('second')(57);

    const {
      error: { second },
    } = wrapper.state();
    expect(second).toBe(true);
    expect(onTimeChange).not.toHaveBeenCalled();
  });

  it('errors are cleared if date-time with updated time is valid', () => {
    const onTimeChange = jest.fn().mockReturnValue(jest.fn());
    const wrapper = render({
      minDate: moment('2019-04-15T03:30:00Z'),
      onTimeChange,
    });
    const instance = wrapper.instance();
    instance.onChange('minute')(29);
    instance.onChange('hour')(2);

    expect(wrapper.state()).toStrictEqual({
      error: { hour: true, minute: true, second: true },
    });
    expect(onTimeChange).not.toHaveBeenCalled();

    instance.onChange('hour')(5);
    expect(onTimeChange).toHaveBeenCalled();
    wrapper.setProps({ value: moment('2019-04-15T05:29:55.000Z') });
    expect(wrapper.state()).toStrictEqual({
      error: { hour: false, minute: false, second: false },
    });
  });
});
