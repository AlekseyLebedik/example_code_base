import React from 'react';
import { shallow } from 'enzyme';

import { eventCalendarTestProps as props } from 'dw/core/components/EventsCalendar/testData';

import { Toolbar } from '../container';

describe('Toolbar', () => {
  let instance;
  let wrapper;
  beforeEach(() => {
    wrapper = shallow(<Toolbar {...props} />);
    instance = wrapper.instance();
  });

  it('renders component', () => {
    expect(wrapper).toMatchSnapshot();
  });

  it('changeNumberOfDays calls setCalendarSettings to change the custom number of days', () => {
    instance.changeNumberOfDays(1);
    expect(props.setCalendarSettings).toHaveBeenCalledTimes(1);
    instance.changeNumberOfDays(10);
    expect(props.setCalendarSettings).toHaveBeenCalledTimes(2);
    instance.changeNumberOfDays(99);
    expect(props.setCalendarSettings).toHaveBeenCalledTimes(3);
  });

  it('getNonCustomDays calls setCalendarSettings to change the number of custom days and the view', () => {
    instance.setNonCustomDays('day');
    expect(props.setCalendarSettings).toHaveBeenCalledTimes(4);
    instance.setNonCustomDays('week');
    expect(props.setCalendarSettings).toHaveBeenCalledTimes(5);
    instance.setNonCustomDays('month');
    expect(props.setCalendarSettings).toHaveBeenCalledTimes(6);
  });
});
