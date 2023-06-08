import React from 'react';
import { shallow } from 'enzyme';

import Textbox from '../container';

describe('PyScripts Textbox', () => {
  const props = {
    data: {
      id: 'double_xp',
      inputs: [{ key: 'attachments', value: ['old'] }],
    },
    label: 'test',
    handleChange: jest.fn(),
    value: 'old',
    handleDelete: jest.fn(),
    uniqueItems: true,
    properties: {},
  };

  const e = {
    target: {
      value: 'new',
      type: 'text',
      name: 'attachments 1',
      minLength: 2,
      maxLength: 10,
      min: 5,
      max: 50,
      step: 10,
    },
  };

  const stateSpy = jest.spyOn(Textbox.prototype, 'setState');
  const root = shallow(<Textbox {...props} />);

  it('renders the container component correctly', () => {
    expect(root).toMatchSnapshot();
  });

  describe('onChange', () => {
    it('should call set error state from validation and value from event', () => {
      root.instance().onChange(e);
      const [error, errorMessage] = root.instance().validate(e);
      expect(stateSpy).toHaveBeenCalledWith({
        error,
        errorMessage,
        value: e.target.value,
      });
    });
  });

  describe('onSubmit', () => {
    it('should not submit if no changes where made', () => {
      e.target.value = 'old';
      root.instance().onSubmit(e);
      expect(props.handleChange).not.toHaveBeenCalled();
    });

    it('should call handleChange if no errors', () => {
      e.target.value = 'new';
      root.instance().onSubmit(e);
      expect(props.handleChange).toHaveBeenCalled();
    });
  });

  describe('validate', () => {
    describe('text input', () => {
      it('should set an error if min length is not met', () => {
        e.target = {
          ...e.target,
          value: 'a',
        };
        const [error, errorMessage] = root.instance().validate(e);
        expect(error).toEqual(true);
        expect(errorMessage).toEqual(`Minimum length is ${e.target.minLength}`);
      });

      it('should set an error if max length is exceeded', () => {
        e.target = {
          ...e.target,
          value: 'this input will be too many characters',
        };
        const [error, errorMessage] = root.instance().validate(e);
        expect(error).toEqual(true);
        expect(errorMessage).toEqual(`Maximum length is ${e.target.maxLength}`);
      });
    });

    describe('number input', () => {
      it('should set an error if min value is not met', () => {
        e.target = {
          ...e.target,
          type: 'number',
          value: 3,
        };
        const [error, errorMessage] = root.instance().validate(e);
        expect(error).toEqual(true);
        expect(errorMessage).toEqual(`Minimum is ${e.target.min}`);
      });

      it('should set an error if max value is exceeded', () => {
        e.target = {
          ...e.target,
          type: 'number',
          value: 100,
        };
        const [error, errorMessage] = root.instance().validate(e);
        expect(error).toEqual(true);
        expect(errorMessage).toEqual(`Maximum is ${e.target.max}`);
      });

      it('should set an error if number is not a multiple of step', () => {
        e.target = {
          ...e.target,
          type: 'number',
          value: 15,
        };
        const [error, errorMessage] = root.instance().validate(e);
        expect(error).toEqual(true);
        expect(errorMessage).toEqual(`Must be multiple of ${e.target.step}`);
      });
    });

    it('should set an error if the input is not unique', () => {
      e.target.value = 'old';
      const [error, errorMessage] = root.instance().validate(e);
      expect(error).toEqual(true);
      expect(errorMessage).toEqual(`Items must be unique`);
    });
  });
});
