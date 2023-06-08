import React from 'react';
import { shallow } from 'enzyme';

import {
  tagFiltersProps as props,
  mockState,
} from 'dw/core/components/EventsCalendar/testData';

import CustomTags from '../index';

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

describe('CustomTags', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = shallow(<CustomTags {...props} />);
  });

  it('renders default CustomTags', () => {
    expect(wrapper).toMatchSnapshot();
  });

  it('renders correctly with no userTags', () => {
    shallow(<CustomTags {...props} />).setProps({
      eventsCalendarSettings: {
        ...props.eventsCalendarSettings,
        filters: {
          ...props.eventsCalendarSettings.filters,
          customTags: {
            userTags: {},
            unspecified:
              props.eventsCalendarSettings.filters.customTags.unspecified,
          },
        },
      },
    });
    expect(wrapper).toMatchSnapshot();
  });
});
