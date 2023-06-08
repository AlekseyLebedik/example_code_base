import React from 'react';
import { shallow } from 'enzyme';
import { Provider } from 'react-redux';

import createStore from 'dw/core/helpers/__tests__';

import { eventFilterProps as props } from 'dw/core/components/EventsCalendar/testData';

import EventFilters from '../container';

const { eventsCalendarSettings } = props;
describe('EventFilters', () => {
  const { store } = createStore();
  let wrapper;
  beforeEach(() => {
    wrapper = shallow(
      <Provider store={store}>
        <EventFilters {...props} />
      </Provider>
    );
  });

  it('renders default EventFilters empty', () => {
    expect(wrapper).toMatchSnapshot();
  });

  it('renders default EventFilters with all filters.sources selected', () => {
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
