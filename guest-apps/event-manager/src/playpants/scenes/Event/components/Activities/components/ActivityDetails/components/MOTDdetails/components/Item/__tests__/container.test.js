import React from 'react';
import { shallow } from 'enzyme';

import { motdItemProps as props } from 'playpants/testUtils/eventProps';

import Item from '../container';

describe.skip('Item', () => {
  const root = shallow(<Item {...props} />);
  const stateSpy = jest.spyOn(Item.prototype, 'setState');

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('renders Item correctly', () => {
    expect(root).toMatchSnapshot();
  });

  it('should change textInput state value onTextChange', () => {
    root.instance().onTextChange({ target: { value: 'test' } });
    expect(stateSpy).toBeCalledWith({
      textInput: 'test',
    });
  });

  it('should toggle editable state value onToggle', () => {
    root.instance().onToggle();
    expect(stateSpy).toHaveBeenCalled();
  });

  it('should update the motd on remove', () => {
    root.instance().handleRemove();
    expect(props.onUpdate).toHaveBeenCalledTimes(1);
  });

  describe('onLanguageChange', () => {
    it('should set duplication error if variable exists', () => {
      root.instance().onLanguageChange({ target: { value: 'ru' } });
      expect(stateSpy).toBeCalledWith({
        error: true,
        languageInput: 'ru',
        languageValidation: 'Same language exists',
      });
    });

    it('should update motd otherwise', () => {
      root.instance().onLanguageChange({ target: { value: 'en-us' } });
      expect(stateSpy).toBeCalledWith({
        error: null,
        languageInput: 'en-us',
        languageValidation: '',
      });
    });
  });

  describe('handleSubmit', () => {
    it('should return of error', () => {
      root.setState({ error: true });
      stateSpy.mockClear();
      root.instance().handleSubmit();
      expect(props.onUpdate).not.toBeCalled();
      expect(stateSpy).not.toBeCalled();
    });

    it('should set empty error if language input is empty', () => {
      props.language = '';
      const newRoot = shallow(<Item {...props} />);
      stateSpy.mockClear();
      newRoot.instance().handleSubmit();
      expect(stateSpy).toBeCalledWith({
        error: true,
        languageValidation: 'Must choose a language',
      });
      expect(props.onUpdate).not.toBeCalled();
    });

    it('should update motd otherwise and reset state after', () => {
      root.setState({ languageInput: 'en-us', error: false });
      stateSpy.mockClear();
      root.instance().handleSubmit();
      expect(props.onUpdate).toHaveBeenCalledTimes(1);
      expect(stateSpy).toBeCalledWith({
        error: null,
        isEditable: false,
        languageInput: '',
        languageValidation: '',
        textInput: '',
      });
    });
  });
});
