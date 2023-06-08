import React from 'react';
import { shallow } from 'enzyme';

import {
  eventCalendarTestProps as props,
  mockState,
} from 'dw/core/components/EventsCalendar/testData';

import ToolbarStateless from '../presentational';

jest.mock('react-redux', () => ({
  ...jest.requireActual('react-redux'),
  useSelector: selector => selector(mockState),
  connect: stateToProps => Component => componentProps =>
    (
      <Component
        {...componentProps}
        {...stateToProps(mockState, componentProps)}
      />
    ),
}));

describe('ToolbarStateless', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = shallow(<ToolbarStateless {...props} />);
  });

  it('day view clicked', () => {
    expect(wrapper).toMatchSnapshot();
  });

  it('week view clicked', () => {
    wrapper.setProps({ view: 'week' });
    expect(wrapper).toMatchSnapshot();
  });

  it('month view clicked', () => {
    wrapper.setProps({ view: 'month' });
    expect(wrapper).toMatchSnapshot();
  });

  it('views buttons do not show up when views prop is empty array', () => {
    wrapper.setProps({ views: {} });
    expect(wrapper).toMatchSnapshot();
  });
});
