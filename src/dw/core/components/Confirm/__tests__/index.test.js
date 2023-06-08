import React from 'react';
import { shallow } from 'enzyme';
import Confirm from '../index';

describe('Confirm', () => {
  it('renders default values', () => {
    const props = {
      open: false,
      onHide: jest.fn(),
      onConfirm: jest.fn(),
    };
    const wrapper = shallow(<Confirm {...props} />);
    expect(wrapper).toMatchSnapshot();
  });

  it('renders custom values', () => {
    const props = {
      title: 'Confirm Propagate',
      content: 'Are you sure you want to confirm Propagate?',
      mainButtonLabel: 'Propagate',
      open: true,
      onHide: jest.fn(),
      onConfirm: jest.fn(),
    };
    const wrapper = shallow(<Confirm {...props} />);
    expect(wrapper).toMatchSnapshot();
  });

  it('applies special class for destructive actions', () => {
    const props = {
      title: 'Confirm Delete',
      content: 'Are you sure you want to confirm Delete?',
      mainButtonLabel: 'Delete',
      destructive: true,
      open: true,
      onHide: jest.fn(),
      onConfirm: jest.fn(),
    };
    const wrapper = shallow(<Confirm {...props} />);
    expect(wrapper).toMatchSnapshot();
  });

  it('validates onConfirm', () => {
    const onHide = jest.fn();
    const onConfirm = jest.fn();
    const props = {
      open: true,
      onConfirm: onHide,
      onHide: onConfirm,
    };
    const wrapper = shallow(<Confirm {...props} />);
    wrapper.dive().instance().onConfirm();

    expect(onConfirm).toBeCalled();
    expect(onHide).toBeCalled();
  });
});
