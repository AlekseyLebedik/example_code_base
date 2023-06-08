import React from 'react';
import { mount } from 'enzyme';

import { revertProps as props } from 'playpants/testUtils/eventProps';

import { RevertBase } from '../index';

describe('Revert', () => {
  const wrapper = mount(<RevertBase {...props} />);
  // const iconButton = wrapper.find('WithStyles(WrappedIcon)');

  it('renders correctly', () => {
    expect(wrapper).toMatchSnapshot();
  });

  // describe('handleClick', () => {
  //   it('should call onRevertActivity', () => {
  //     iconButton.simulate('click');
  //     expect(props.onRevertActivity).toHaveBeenCalledTimes(1);
  //   });
  // });

  // it('should not render if it is an end activity', () => {
  //   wrapper.setProps({
  //     originalSetting: {},
  //     selectedActivity: { ...props.selectedActivity, publish_on: 'on_end' },
  //   });
  //   expect(wrapper).toMatchSnapshot();
  // });
});
