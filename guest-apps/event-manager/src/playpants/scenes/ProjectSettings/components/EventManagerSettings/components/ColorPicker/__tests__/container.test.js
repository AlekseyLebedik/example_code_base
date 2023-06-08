import React from 'react';
import { shallow } from 'enzyme';
import { colorPickerProps as props } from 'playpants/testUtils/projectSettingsProps';

import { ColorPickerBase } from '../container';

describe('ColorPicker', () => {
  const stateSpy = jest.spyOn(ColorPickerBase.prototype, 'setState');
  const wrapper = shallow(<ColorPickerBase {...props} />);

  afterEach(() => {
    stateSpy.mockClear();
  });

  it('renders default values', () => {
    expect(wrapper).toMatchSnapshot();
  });

  describe('handleRowSelection', () => {
    const selectedTitle = 3;
    const selectedColor = '#000000';
    it('should call setState', () => {
      wrapper.instance().handleRowSelection(selectedTitle, selectedColor);
      expect(stateSpy).toHaveBeenCalledTimes(1);
    });

    it('should set open state to true', () => {
      wrapper.instance().handleRowSelection(selectedTitle, selectedColor);
      expect(wrapper.state('open')).toBe(true);
    });

    it('should set selectedTitle state to prop received', () => {
      wrapper.instance().handleRowSelection(selectedTitle, selectedColor);
      expect(wrapper.state('selectedTitle')).toBe(selectedTitle);
    });

    it('should set selectedColor state to true', () => {
      wrapper.instance().handleRowSelection(selectedTitle, selectedColor);
      expect(wrapper.state('selectedColor')).toBe(selectedColor);
    });
  });

  describe('handleChangeComplete', () => {
    const color = { hex: '#000000' };
    it('should call setState', () => {
      wrapper.instance().handleChangeComplete(color);
      expect(stateSpy).toHaveBeenCalledTimes(1);
    });

    it('should set selectedColor state to true', () => {
      wrapper.instance().handleChangeComplete(color);
      expect(wrapper.state('selectedColor')).toBe('#000000');
    });
  });

  describe('handleAccept', () => {
    const spy = jest.spyOn(props, 'updateProjectSetting');
    beforeEach(() => {
      wrapper.setState({
        selectedTitle: 1,
        selectedColor: 'red',
      });
      stateSpy.mockClear();
      spy.mockClear();
    });

    it('should call setState', () => {
      wrapper.instance().handleAccept();
      expect(stateSpy).toHaveBeenCalledTimes(1);
    });

    it('should set open state to false', () => {
      wrapper.instance().handleAccept();
      expect(wrapper.state('open')).toBe(false);
    });

    it('should call updateProjectSetting once', () => {
      wrapper.instance().handleAccept();
      expect(spy).toHaveBeenCalledTimes(1);
    });
  });

  describe('handleCancel', () => {
    it('should call setState', () => {
      wrapper.instance().handleCancel();
      expect(stateSpy).toHaveBeenCalledTimes(1);
    });

    it('should set open state to false', () => {
      wrapper.instance().handleCancel();
      expect(wrapper.state('open')).toBe(false);
    });
  });
});
