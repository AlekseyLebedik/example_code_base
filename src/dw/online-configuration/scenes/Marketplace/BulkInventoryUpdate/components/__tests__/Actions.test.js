import React from 'react';

import { shallow } from 'enzyme';
import IconButton from '@material-ui/core/IconButton';
import ConfirmActionComponent from 'dw/core/components/ConfirmActionComponent';

import Actions from '../Actions';

const onSubmit = jest.fn();

const getDefaultProps = props => ({
  selected: props?.selected || [{ itemID: 123, name: 'super gun' }],
  tab: props?.tab || 'items',
  players: props?.players || ['123456'],
  onSubmit,
  playersError: props?.playersError,
});

describe('Actions', () => {
  beforeEach(() => {
    onSubmit.mockClear();
  });
  it('renders disabled buttons if no selected store items', () => {
    const props = getDefaultProps({ tab: 'items', selected: [] });
    const wrapper = shallow(<Actions {...props} />);
    const buttons = wrapper.find(IconButton);
    expect(buttons).toHaveLength(2);
    buttons.forEach(b => expect(b.props().disabled).toBeTruthy());
  });
  it('renders disabled buttons if no players', () => {
    const props = getDefaultProps({ tab: 'items', players: [] });
    const wrapper = shallow(<Actions {...props} />);
    const buttons = wrapper.find(IconButton);
    expect(buttons).toHaveLength(2);
    buttons.forEach(b => expect(b.props().disabled).toBeTruthy());
  });
  it('renders disabled buttons if there is players error', () => {
    const props = getDefaultProps({
      tab: 'items',
      playersError: 'Something gone wrong',
    });
    const wrapper = shallow(<Actions {...props} />);
    const buttons = wrapper.find(IconButton);
    expect(buttons).toHaveLength(2);
    buttons.forEach(b => expect(b.props().disabled).toBeTruthy());
  });
  describe('Items tab', () => {
    const props = getDefaultProps({ tab: 'items' });
    it('renders add and delete buttons', () => {
      const wrapper = shallow(<Actions {...props} />);
      const buttons = wrapper.find(IconButton);
      expect(buttons).toHaveLength(2);
      const addBtn = buttons.first();
      expect(addBtn.text()).toEqual('playlist_add');
      const deleteBtn = buttons.last();
      expect(deleteBtn.text()).toEqual('delete_sweep');
    });
    it('add button adds 1', () => {
      const wrapper = shallow(<Actions {...props} />);
      const btn = wrapper.find(IconButton).first();
      btn.props().onClick();
      expect(onSubmit).toBeCalledWith(1);
    });
    it('delete button removes 1', () => {
      const wrapper = shallow(<Actions {...props} />);
      const btn = wrapper.find(IconButton).last();
      btn.props().onClick();
      expect(onSubmit).toBeCalledWith(-1);
    });
  });
  describe('Products tab', () => {
    const props = getDefaultProps({ tab: 'products' });
    it('renders add button only', () => {
      const wrapper = shallow(<Actions {...props} />);
      const buttons = wrapper.find(IconButton);
      expect(buttons).toHaveLength(1);
      const addBtn = buttons.first();
      expect(addBtn.text()).toEqual('playlist_add');
    });
    it('add button adds 1', () => {
      const wrapper = shallow(<Actions {...props} />);
      const btn = wrapper.find(IconButton).first();
      btn.props().onClick();
      expect(onSubmit).toBeCalledWith(1);
    });
  });
  describe('Currencies tab', () => {
    const props = getDefaultProps({ tab: 'currencies' });
    it('renders add and delete buttons', () => {
      const wrapper = shallow(<Actions {...props} />);
      const buttons = wrapper.find(ConfirmActionComponent);
      expect(buttons).toHaveLength(2);
      const addBtn = buttons.first();
      expect(addBtn.children().text()).toEqual('playlist_add');
      const deleteBtn = buttons.last();
      expect(deleteBtn.children().text()).toEqual('delete_sweep');
    });
    it('add button adds 1', () => {
      const wrapper = shallow(<Actions {...props} />);
      const btn = wrapper.find(ConfirmActionComponent).first();
      btn.props().onClick();
      expect(onSubmit).toBeCalledWith(1);
    });
    it('delete button removes 1', () => {
      const wrapper = shallow(<Actions {...props} />);
      const btn = wrapper.find(ConfirmActionComponent).last();
      btn.props().onClick();
      expect(onSubmit).toBeCalledWith(-1);
    });
    it('allows to change submit value', () => {
      const expectedValue = 100;
      const wrapper = shallow(<Actions {...props} />);
      let btn = wrapper.find(ConfirmActionComponent).first();
      const text = shallow(btn.props().confirm.confirmMsg);
      text.props().onChange({ target: { value: expectedValue } });
      wrapper.update();
      btn = wrapper.find(ConfirmActionComponent).first();
      btn.props().onClick();
      expect(onSubmit).toBeCalledWith(expectedValue);
    });
    it('validates submit value', () => {
      const wrapper = shallow(<Actions {...props} />);
      let btn = wrapper.find(ConfirmActionComponent).last();
      let text = shallow(btn.props().confirm.confirmMsg);
      text.props().onChange({ target: { value: 'INVALID' } });
      wrapper.update();
      btn = wrapper.find(ConfirmActionComponent).first();
      text = shallow(btn.props().confirm.confirmMsg);
      expect(text.props().error).toBeTruthy();
      expect(text.props().helperText).toEqual('Should be a positive number');
    });
  });
});
