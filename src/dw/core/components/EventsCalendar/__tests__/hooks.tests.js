import React from 'react';
import moment from 'moment-timezone';
import { getLocalTimezoneOffset } from '../helpers';
import { useCalendarDefaults } from '../hooks';

const mockState = { user: { profile: { timezone: 'UTC' } } };
jest.mock('react', () => ({
  ...jest.requireActual('react'),
  useMemo: fn => fn(),
}));

jest.mock('react-redux', () => ({
  useSelector: selector => selector(mockState),
  connect: mapState => Component => props => {
    const stateProps = mapState(mockState, props);
    return <Component {...props} {...stateProps} />;
  },
}));

describe('hooks', () => {
  it('useCalendarDefaults', () => {
    const expectedEventGroups = [
      { type: 'eventManager', eventTypes: [] },
      { type: 'abTesting', eventTypes: [] },
      { type: 'demonwareEvents', eventTypes: [] },
      { type: 'externalEvents', eventTypes: [] },
      { type: 'informationalEvents', eventTypes: [] },
    ];
    const result = useCalendarDefaults({
      eventGroups: expectedEventGroups,
      platforms: ['PS5', 'XBSX'],
    });

    expect(result).toEqual({
      datePickerProps: undefined,
      eventTimeOffset: getLocalTimezoneOffset('UTC'),
      filters: {
        customTags: { unspecified: true, userTags: {} },
        environments: { Certification: true, Development: true, Live: true },
        gamertags: undefined,
        platforms: { Multiple: true, PS5: true, Unspecified: true, XBSX: true },
        projects: {},
        sources: {},
        stories: { None: true },
      },
      groupLoadingStatuses: {
        abTesting: { error: null, isLoading: false },
        demonwareEvents: { error: null, isLoading: false },
        eventManager: { error: null, isLoading: false },
        externalEvents: { error: null, isLoading: false },
        informationalEvents: { error: null, isLoading: false },
      },
      numberOfDays: moment().daysInMonth(),
      selectedDay: moment().startOf('day'),
    });
  });
});
