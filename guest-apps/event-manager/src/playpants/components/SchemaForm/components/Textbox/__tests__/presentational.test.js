import React from 'react';
import { shallow } from 'enzyme';

import TextField from '@material-ui/core/TextField';

import Textbox from '../presentational';

describe('PyScripts TextboxStateless', () => {
  const props = {
    label: 'test',
    onChange: jest.fn(),
    onSubmit: jest.fn(),
    onKeyDown: jest.fn(),
    value: 'old',
    handleDelete: jest.fn(),
    uniqueItems: true,
    properties: {},
    error: false,
    errorMessage: '',
  };

  const root = shallow(<Textbox {...props} />);
  const textbox = root.find(TextField);

  it('renders the textfield component correctly', () => {
    expect(textbox).toMatchSnapshot();
  });

  it('changes should trigger onChange', () => {
    textbox.simulate('change');
    expect(props.onChange).toHaveBeenCalledTimes(1);
  });

  it('blur should trigger onSubmit', () => {
    textbox.simulate('blur');
    expect(props.onSubmit).toHaveBeenCalledTimes(1);
  });

  it('keydown should trigger onKeyDown', () => {
    textbox.simulate('keyDown');
    expect(props.onKeyDown).toHaveBeenCalledTimes(1);
  });
});
