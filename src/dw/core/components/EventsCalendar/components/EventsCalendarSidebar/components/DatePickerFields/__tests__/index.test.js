import React from 'react';
import { mount } from 'enzyme';

import {
  datePickerFieldsProps as props,
  mockStateFn,
} from 'dw/core/components/EventsCalendar/testData';

import DatePickerFields from '../index';

const mockState = mockStateFn(props.eventsCalendarSettings);

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

describe('DatePickerFields component', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = mount(<DatePickerFields {...props} />);
  });

  it('renders correctly', () => {
    expect(wrapper).toMatchSnapshot();
  });
});
