import React from 'react';
import { shallow } from 'enzyme';
import moment from 'moment-timezone';

import MuiTextField from 'dw/__mocks__/@material-ui/TextField';
import MuiIconButton from 'dw/__mocks__/@material-ui/IconButton';
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
    const popper = wrapper.dive().find('WrappedPopper');
    const dateTimeFields = wrapper.dive().find('DateTimeField');

    return { props, wrapper, popper, dateTimeFields };
  };

  const getTextField = dateTimeField => dateTimeField.dive().find(MuiTextField);

  it('renders default structure', () => {
    const { dateTimeFields, popper } = render();
    expect(dateTimeFields).toHaveLength(1);
    expect(popper).toHaveLength(1);
  });

  it('renders ranged selector structure', () => {
    const { dateTimeFields, popper } = render({
      ranged: true,
      value: {
        startDate: moment('2019-04-15T03:40:00.000Z'),
        endDate: moment('2019-08-15T03:40:00.000Z'),
      },
    });
    expect(dateTimeFields).toHaveLength(2);
    expect(popper).toHaveLength(1);
  });

  it('renders disabled text field', () => {
    const { dateTimeFields } = render({ disabled: true });
    const TextField = getTextField(dateTimeFields);
    expect(TextField.props().disabled).toBe(true);
  });

  it('renders text field with clear button', () => {
    const { dateTimeFields } = render({ clearable: true });
    const TextField = getTextField(dateTimeFields);
    expect(TextField.props().InputProps.endAdornment).toMatchSnapshot();
  });

  it('renders text field with error', () => {
    const { dateTimeFields } = render({
      error: true,
      helperText: 'error text',
    });
    const TextField = getTextField(dateTimeFields);
    const HelperText = () => TextField.props().helperText;
    const span = shallow(<HelperText />);
    expect(TextField.props().error).toBe(true);
    expect(span.text()).toBe('error text');
  });

  it('by default modal dialog is closed', () => {
    const { popper } = render();
    expect(popper.props().open).toBe(false);
  });

  it('modal dialog is opened after clicking on text field calendar button', () => {
    const { dateTimeFields, wrapper } = render();
    const TextField = getTextField(dateTimeFields);
    const EndAdornment = () => TextField.props().InputProps.endAdornment;
    const endAdornment = shallow(<EndAdornment />);
    const calendarButton = endAdornment.find(MuiIconButton);
    calendarButton.prop('onClick')();
    wrapper.update();
    expect(wrapper.dive().find('WrappedPopper').props().open).toBe(true);
  });

  it('footer label is populated with default value', () => {
    const expectedText = 'Add';
    const { popper } = render();
    expect(popper.props().footerLabel).toBe(expectedText);
  });

  it('footer label is populated with input value', () => {
    const expectedText = 'Confirm';
    const { popper } = render({ footerLabel: expectedText });
    expect(popper.props().footerLabel).toBe(expectedText);
  });
});
