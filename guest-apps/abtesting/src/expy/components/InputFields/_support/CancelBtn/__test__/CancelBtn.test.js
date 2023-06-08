import React from 'react';
import { shallow, mount } from 'enzyme';

import CancelBtn from '../index';

describe('Expy - Test Graduation - CancelBtn', () => {
  it('renders snapshot', () => {
    const props = {
      onClick: () => {},
      children: 'Cancel',
    };
    expect(shallow(<CancelBtn {...props} />)).toMatchSnapshot();
  });

  it('calls oncancel', () => {
    const onClick = jest.fn();
    const props = {
      onClick,
      children: 'Cancel',
    };
    const wrapper = mount(<CancelBtn {...props} />);
    wrapper.find('button').simulate('click');
    expect(onClick).toHaveBeenCalled();
  });
});
