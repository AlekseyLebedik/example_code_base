import React from 'react';
import { shallow } from 'enzyme';
import IconButton from 'dw/__mocks__/@material-ui/IconButton';
import Switch from '@material-ui/core/Switch';

import ConfirmActionComponent from '../container';

describe('ConfirmActionComponent', () => {
  it('renders ConfirmActionStateless component', () => {
    const props = {
      component: IconButton,
    };
    const wrapper = shallow(
      <ConfirmActionComponent {...props}>delete</ConfirmActionComponent>
    );

    expect(wrapper).toMatchSnapshot();
  });

  it('accepts disabled property as boolean', () => {
    const props = {
      component: IconButton,
      disabled: true,
    };
    const wrapper = shallow(
      <ConfirmActionComponent {...props}>delete</ConfirmActionComponent>
    );

    expect(wrapper.find('ConfirmActionStateless').props().disabled).toBe(true);
  });

  it('accepts disabled property as function', () => {
    const props = {
      component: IconButton,
      disabled: () => true,
    };
    const wrapper = shallow(
      <ConfirmActionComponent {...props}>delete</ConfirmActionComponent>
    );

    expect(wrapper.find('ConfirmActionStateless').props().disabled).toBe(true);
  });

  it('calls `onClick` handler without confirmation if `confirm` property is not set', () => {
    const onClick = jest.fn();
    const props = {
      onClick,
      component: IconButton,
    };
    const wrapper = shallow(
      <ConfirmActionComponent {...props}>delete</ConfirmActionComponent>
    );
    wrapper.find('ConfirmActionStateless').props().onClick();
    expect(onClick).toBeCalled();
  });

  it('sets `isOpen` to true for confirm dialog if `confirm` prop is provided', () => {
    const onClick = jest.fn();
    const props = {
      onClick,
      component: IconButton,
      confirm: {
        title: 'foo',
        confirmMsg: 'bar',
      },
    };
    const wrapper = shallow(
      <ConfirmActionComponent {...props}>delete</ConfirmActionComponent>
    );
    wrapper.find('ConfirmActionStateless').props().onClick();
    wrapper.update();

    expect(wrapper.find('ConfirmActionStateless').props().isOpen).toBe(true);
    expect(onClick).not.toBeCalled();
  });

  it('calls onChange handler if checkedOption is set', () => {
    const props = {
      component: IconButton,
      confirm: {
        title: 'foo',
        confirmMsg: 'bar',
        checkedOption: {
          label: 'label',
          visible: () => true,
        },
      },
    };
    const wrapper = shallow(
      <ConfirmActionComponent {...props}>delete</ConfirmActionComponent>
    );

    expect(wrapper.state().checkedOption).toBe(false);

    wrapper
      .find('ConfirmActionStateless')
      .props()
      .confirm.checkedOption.onChange({ target: { checked: true } });
    wrapper.update();

    expect(wrapper.state().checkedOption).toBe(true);
  });

  it('calls onClick handler on confirm if `actionTrigger` is not set', () => {
    const expectedArg = 'foo';
    const onClick = jest.fn();
    const props = {
      onClick,
      component: IconButton,
      confirm: {
        title: 'foo',
        confirmMsg: 'bar',
      },
    };
    const wrapper = shallow(
      <ConfirmActionComponent {...props}>delete</ConfirmActionComponent>
    );
    wrapper.find('ConfirmActionStateless').props().onClick(expectedArg);
    wrapper.update();
    wrapper.find('ConfirmActionStateless').props().handleConfirm();

    expect(onClick).toBeCalledWith(expectedArg);
  });

  it('calls `actionTrigger` without confirmation if `confirm` property not set', () => {
    const onChange = jest.fn();
    const props = {
      onChange,
      component: Switch,
      actionTrigger: 'onChange',
    };
    const wrapper = shallow(<ConfirmActionComponent {...props} />);
    wrapper.find('ConfirmActionStateless').props().onChange();
    expect(onChange).toBeCalled();
  });

  it('sets `isOpen` to true for confirm dialog if `confirm` and `actionTrigger` props are provided', () => {
    const onChange = jest.fn();
    const props = {
      onChange,
      actionTrigger: 'onChange',
      component: Switch,
      confirm: {
        title: 'foo',
        confirmMsg: 'bar',
      },
    };
    const wrapper = shallow(<ConfirmActionComponent {...props} />);
    wrapper.find('ConfirmActionStateless').props().onChange();
    wrapper.update();

    expect(wrapper.find('ConfirmActionStateless').props().isOpen).toBe(true);
    expect(onChange).not.toBeCalled();
  });

  it('calls `actionTrigger` on confirm if it is set', () => {
    const expectedArg = 'foo';
    const onChange = jest.fn();
    const props = {
      onChange,
      actionTrigger: 'onChange',
      component: Switch,
      confirm: {
        title: 'foo',
        confirmMsg: 'bar',
      },
    };
    const wrapper = shallow(<ConfirmActionComponent {...props} />);
    wrapper.find('ConfirmActionStateless').props().onChange(expectedArg);
    wrapper.update();
    wrapper.find('ConfirmActionStateless').props().handleConfirm();

    expect(onChange).toBeCalledWith(expectedArg);
  });

  it('allows to close confirm dialog', () => {
    const onClick = jest.fn();
    const props = {
      onClick,
      component: IconButton,
      confirm: {
        title: 'foo',
        confirmMsg: 'bar',
      },
    };
    const wrapper = shallow(
      <ConfirmActionComponent {...props}>delete</ConfirmActionComponent>
    );
    wrapper.setState({ confirmOpen: true });
    expect(wrapper.find('ConfirmActionStateless').props().isOpen).toBe(true);
    wrapper.find('ConfirmActionStateless').props().closeConfirm();
    wrapper.update();

    expect(wrapper.find('ConfirmActionStateless').props().isOpen).toBe(false);
  });
});
