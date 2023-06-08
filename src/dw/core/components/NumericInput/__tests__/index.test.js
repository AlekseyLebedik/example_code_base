import React from 'react';
import { shallow } from 'enzyme';

import TextField from 'dw/__mocks__/@material-ui/TextField';

import NumericInput from '../index';

describe('NumericInput', () => {
  it('renders props', () => {
    const props = {
      value: 8,
      floatingLabelText: 'Text',
    };
    expect(shallow(<NumericInput {...props} />)).toMatchSnapshot();
  });

  it('allows only numbers', () => {
    const onChange = jest.fn();
    const props = {
      onChange,
    };
    const wrapper = shallow(<NumericInput {...props} />);
    wrapper
      .find(TextField)
      .props()
      .onChange({ target: { value: 'invalid' } });
    expect(onChange).not.toBeCalled();

    wrapper
      .find(TextField)
      .props()
      .onChange({ target: { value: '1089282870379595904' } });
    expect(onChange).toBeCalledWith({
      target: { value: '1089282870379595904' },
    });
  });

  it('strips "." at the end', () => {
    const onBlur = jest.fn();
    const onChange = jest.fn();
    const props = {
      value: '123.',
      onBlur,
      onChange,
    };
    const wrapper = shallow(<NumericInput {...props} />);
    wrapper.find(TextField).props().onBlur();
    expect(onChange).toBeCalledWith({ target: { value: '123' } });
  });

  it('strips "-" in the input box', () => {
    const onBlur = jest.fn();
    const onChange = jest.fn();
    const props = {
      value: '-',
      onBlur,
      onChange,
    };
    const wrapper = shallow(<NumericInput {...props} />);
    wrapper.find(TextField).props().onBlur();
    expect(onChange).toBeCalledWith({ target: { value: '' } });
  });
});
