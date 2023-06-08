import React from 'react';
import { shallow } from 'enzyme';

import {
  eventCalendarTestProps as props,
  mockState,
} from 'dw/core/components/EventsCalendar/testData';

import { FiltersTableBase } from '../index';

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

const { eventsCalendarSettings } = props;

describe('FiltersTable', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = shallow(<FiltersTableBase {...props} />);
  });

  it('renders default FiltersTable with no choices selected', () => {
    expect(wrapper).toMatchSnapshot();
  });

  it('renders default FiltersTable with all filters.sources selected', () => {
    wrapper.setProps({
      eventsCalendarSettings: {
        ...eventsCalendarSettings,
        filters: {
          ...eventsCalendarSettings.filters,
          sources: {
            eventManager: {
              checkedByMe: true,
              statuses: {
                approved: true,
                expired: true,
                rejected: true,
              },
            },
          },
        },
      },
    });
    expect(wrapper).toMatchSnapshot();
  });

  it('renders default EventsCalendarSidebar with all filters.sources unselected', () => {
    wrapper.setProps({
      eventsCalendarSettings: {
        ...eventsCalendarSettings,
        filters: {
          ...eventsCalendarSettings.filters,
          sources: {
            eventManager: {
              checkedByMe: false,
              statuses: {
                approved: false,
                expired: false,
                rejected: false,
              },
            },
          },
        },
      },
    });
    expect(wrapper).toMatchSnapshot();
  });

  it('renders default EventsCalendarSidebar with tagText contents', () => {
    wrapper.setProps({
      eventsCalendarSettings: {
        ...props.eventsCalendarSettings,
        isCalendarView: false,
      },
    });
    expect(wrapper).toMatchSnapshot();
  });

  it('renders default EventsCalendarSidebar with event tags', () => {
    wrapper.setProps({
      eventsCalendarSettings: {
        ...props.eventsCalendarSettings,
        eventTags: ['PS4', 'XBOX1'],
      },
    });
    expect(wrapper).toMatchSnapshot();
  });

  it('renders List view EventsCalendarSidebar with no choices selected', () => {
    wrapper.setProps({
      eventsCalendarSettings: {
        ...eventsCalendarSettings,
        isCalendarView: false,
        filters: {
          ...eventsCalendarSettings.filters,
          sources: {
            eventManager: {
              checkedByMe: false,
              statuses: {
                approved: false,
                expired: false,
                rejected: false,
              },
            },
          },
        },
      },
    });
    expect(wrapper).toMatchSnapshot();
  });

  it('renders List view EventsCalendarSidebar with all choices selected', () => {
    wrapper.setProps({
      eventsCalendarSettings: {
        ...eventsCalendarSettings,
        isCalendarView: false,
        filters: {
          ...eventsCalendarSettings.filters,
          sources: {
            eventManager: {
              checkedByMe: true,
              statuses: {
                approved: true,
                expired: true,
                rejected: true,
              },
            },
          },
        },
      },
    });
    expect(wrapper).toMatchSnapshot();
  });

  it('renders List view EventsCalendarSidebar with tagText contents', () => {
    wrapper.setProps({
      eventsCalendarSettings: {
        ...props.eventsCalendarSettings,
        isCalendarView: false,
        tagText: 'test',
      },
    });
    expect(wrapper).toMatchSnapshot();
  });
});
