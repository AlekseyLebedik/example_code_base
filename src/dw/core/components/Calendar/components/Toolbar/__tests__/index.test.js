import React from 'react';
import { shallow } from 'enzyme';
import moment from 'moment-timezone';

import Toolbar from '../index';

describe('Calendar - Toolbar component', () => {
  const render = () => {
    const props = {
      currentDate: moment('2019-04-01T00:00:00Z'),
      backMonthHandler: jest.fn(),
      forwardMonthHandler: jest.fn(),
      changeMonthHandler: jest.fn(),
      changeYearHandler: jest.fn(),
    };
    const wrapper = shallow(<Toolbar {...props} />);

    return {
      props,
      wrapper,
    };
  };
  const { props, wrapper } = render();

  it('Go Back a Month button was clicked', () => {
    wrapper.find('IconBtn').first().simulate('click');
    expect(props.backMonthHandler).toHaveBeenCalled();
  });

  it('Go Forward a Month button was clicked', () => {
    wrapper.find('IconBtn').last().simulate('click');
    expect(props.forwardMonthHandler).toHaveBeenCalled();
  });

  it('disaplays selected month', () => {
    expect(
      wrapper
        .find('Downshift')
        .first()
        .shallow()
        .find('WithStyles(Select)')
        .props().selected
    ).toBe('April');
  });

  it('disaplays selected year', () => {
    expect(
      wrapper
        .find('Downshift')
        .last()
        .shallow()
        .find('WithStyles(Select)')
        .props().selected
    ).toBe(2019);
  });
});
