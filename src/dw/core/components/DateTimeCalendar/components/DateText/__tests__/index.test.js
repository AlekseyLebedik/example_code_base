import React from 'react';
import { shallow } from 'enzyme';
import moment from 'moment-timezone';

import TextField from 'dw/__mocks__/@material-ui/TextField';

import { DateTextBase } from '../index';

describe('DateTimeCalendar - DateText component', () => {
  const render = () => {
    const props = {
      value: moment('2019-04-05T15:20:00Z'),
      timezone: 'Europe/Dublin',
      onDateTextChange: jest.fn(),
      changeTimezoneHandler: jest.fn(),
      minDate: moment('2019-04-01T00:00:00Z'),
      maxDate: moment('2019-04-10T00:00:00Z'),
      classes: {},
    };
    const wrapper = shallow(<DateTextBase {...props} />);

    return {
      props,
      wrapper,
    };
  };

  it('renders text field', () => {
    const { wrapper } = render();
    expect(wrapper.find(TextField)).toHaveLength(1);
  });

  it('renders text field timezone adornment', () => {
    const { wrapper } = render();
    expect(
      shallow(wrapper.find(TextField).props().InputProps.endAdornment)
        .find('Downshift')
        .props().selectedItem
    ).toBe('Europe/Dublin');
  });

  it('default state', () => {
    const { wrapper } = render();
    expect(wrapper.state()).toStrictEqual({
      value: 'Apr 05, 2019 15:20',
      oldValue: 'Apr 05, 2019 15:20',
      valid: true,
      prevPropsValue: moment('2019-04-05T15:20:00Z'),
    });
  });

  it('text input can be populated with any value', () => {
    const { wrapper } = render();
    const instance = wrapper.instance();

    instance.onChange({ target: { value: 'blah' } });
    const { value } = wrapper.state();
    expect(value).toBe('blah');
  });

  it('value is set after hitting Enter button', () => {
    const { wrapper } = render();
    const instance = wrapper.instance();

    instance.onKeyPress({
      target: { value: 'Apr 07, 2019 04:22' },
      keyCode: 13,
    });
    const { value } = wrapper.state();
    expect(value).toBe('Apr 07, 2019 04:22');
  });

  it('set new date time to Apr 08, 2019 04:22', () => {
    const {
      props: { onDateTextChange },
      wrapper,
    } = render();
    const instance = wrapper.instance();

    instance.setValue({ target: { value: 'Apr 08, 2019 04:22' } });
    const { value } = wrapper.state();
    expect(value).toBe('Apr 08, 2019 04:22');
    expect(onDateTextChange).toHaveBeenCalled();
  });

  it('invalid date-time is not set', () => {
    const {
      props: { onDateTextChange },
      wrapper,
    } = render();
    const instance = wrapper.instance();

    instance.setValue({ target: { value: 'Apr 80, 2019 04:22' } });
    const { value, valid } = wrapper.state();
    expect(value).toBe('Apr 05, 2019 15:20');
    expect(valid).toBe(false);
    expect(onDateTextChange).not.toHaveBeenCalled();
  });

  it('do not trigger change if date-time is not updated', () => {
    const {
      props: { onDateTextChange },
      wrapper,
    } = render();
    const instance = wrapper.instance();

    instance.setValue({ target: { value: 'Apr 05, 2019 15:20' } });
    expect(onDateTextChange).not.toHaveBeenCalled();
  });

  it('date-time cannot be set if it is smaller than min date', () => {
    const { wrapper } = render();
    const instance = wrapper.instance();

    instance.setValue({ target: { value: 'Mar 31, 2019 12:00' } });
    const { value, valid } = wrapper.state();
    expect(value).toBe('Apr 05, 2019 15:20');
    expect(valid).toBe(false);
  });

  it('date-time cannot be set if it is bigger than max date', () => {
    const { wrapper } = render();
    const instance = wrapper.instance();

    instance.setValue({ target: { value: 'Apr 11, 2019 12:00' } });
    const { value, valid } = wrapper.state();
    expect(value).toBe('Apr 05, 2019 15:20');
    expect(valid).toBe(false);
  });
});
