import React from 'react';
import { shallow } from 'enzyme';
import moment from 'moment-timezone';
import { DATE_TIME_FORMATS } from 'dw/core/helpers/date-time';

import TextField from 'dw/__mocks__/@material-ui/TextField';
import DateTimePicker from '../index';

describe('DateTimePicker component', () => {
  const render = (newProps = {}) => {
    const props = {
      value: moment('2019-04-15T03:40:00.000Z'),
      timezone: 'UTC',
      onChange: jest.fn(),
      ...newProps,
    };
    const wrapper = shallow(<DateTimePicker {...props} />);

    return { props, wrapper };
  };

  it('renders structure', () => {
    const { wrapper } = render();
    expect(wrapper.find(TextField)).toHaveLength(1);
    expect(wrapper.find('WrappedPopper')).toHaveLength(1);
  });

  it('renders disabled text field', () => {
    const { wrapper } = render({ disabled: true });
    expect(wrapper.find(TextField).props().disabled).toBe(true);
  });

  it('renders text field with clear button', () => {
    const { wrapper } = render({ clearable: true });
    expect(
      wrapper.find(TextField).props().InputProps.endAdornment
    ).toMatchSnapshot();
  });

  it('renders text field with error', () => {
    const { wrapper } = render({ error: true, helperText: 'error text' });
    expect(wrapper.find(TextField).props().error).toBe(true);
    expect(wrapper.find(TextField).props().helperText).toBe('error text');
  });

  it('by default modal dialog is closed', () => {
    const { wrapper } = render();
    expect(wrapper.find('WrappedPopper').props().open).toBe(false);
  });

  it('modal dialog is opened after clicking on text field', () => {
    const { wrapper } = render();
    wrapper.find(TextField).simulate('click', { currentTarget: {} });
    expect(wrapper.find('WrappedPopper').props().open).toBe(true);
  });

  it('text field is populated with the default value', () => {
    const { wrapper } = render();
    expect(wrapper.find(TextField).props().value).toBe(
      'Apr 15, 2019 03:40 am UTC'
    );
  });

  it('onClick handler', () => {
    const { wrapper } = render();
    const instance = wrapper.instance();

    instance.onClick({ currentTarget: {} });
    const { open } = wrapper.state();
    expect(open).toBe(true);
  });

  it('onClose handler', () => {
    const { wrapper } = render();
    const instance = wrapper.instance();

    instance.onClose();
    const { open } = wrapper.state();
    expect(open).toBe(false);
  });

  it('onDateTimeChange handler', () => {
    const {
      props: { timezone },
      wrapper,
    } = render();
    const instance = wrapper.instance();

    instance.onDateTimeChange(moment('2019-04-05T00:00:00.000Z').tz(timezone));
    const { selectedDate } = wrapper.state();
    expect(selectedDate.format(DATE_TIME_FORMATS.DEFAULT)).toBe(
      'Apr 05, 2019 12:00 am UTC'
    );
  });

  it('clear text field value', () => {
    const {
      props: { onChange },
      wrapper,
    } = render();
    const stopPropagation = jest.fn();
    const instance = wrapper.instance();

    instance.clearValue({ stopPropagation });
    expect(stopPropagation).toBeCalled();
    expect(onChange).toBeCalledWith('');
  });

  it('props.onChange handler is called with default value when submit is clicked', () => {
    const {
      props: { onChange },
      wrapper,
    } = render();
    const instance = wrapper.instance();

    instance.onSubmit();
    const { open } = wrapper.state();
    expect(open).toBe(false);
    expect(
      onChange.mock.calls[0][0].isSame(moment('2019-04-15T03:40:00.000Z'))
    ).toBe(true);
  });

  it('props.onChange handler is called with the value in timestamp format', () => {
    const {
      props: { onChange },
      wrapper,
    } = render({ returnTimestamp: true });
    const instance = wrapper.instance();

    instance.onSubmit();
    expect(onChange.mock.calls[0][0]).toBe(1555299600);
  });

  it('Europe/Dublin timezone', () => {
    const {
      props: { onChange },
      wrapper,
    } = render({ timezone: 'Europe/Dublin' });
    const instance = wrapper.instance();

    instance.onSubmit();
    expect(onChange.mock.calls[0][0].format(DATE_TIME_FORMATS.DEFAULT)).toBe(
      'Apr 15, 2019 04:40 am IST'
    );
  });

  it('date format', () => {
    const { wrapper } = render({ dateOnly: true });
    expect(wrapper.find(TextField).props().value).toBe('Apr 15, 2019');
  });

  it('auto accept date on selection', () => {
    const {
      props: { onChange },
      wrapper,
    } = render({ dateOnly: true, autoOk: true });
    const instance = wrapper.instance();

    const newDate = moment('2019-04-05T00:00:00.000Z');
    instance.onDateTimeChange(newDate);
    expect(onChange.mock.calls[0][0].isSame(newDate)).toBe(true);
  });

  it('footer label is populated with default value', () => {
    const expectedText = 'Add';
    const { wrapper } = render();
    expect(wrapper.find('WrappedPopper').props().footerLabel).toBe(
      expectedText
    );
  });

  it('footer label is populated with input value', () => {
    const expectedText = 'Confirm';
    const { wrapper } = render({ footerLabel: expectedText });
    expect(wrapper.find('WrappedPopper').props().footerLabel).toBe(
      expectedText
    );
  });
});
