import { eventCalendarTestProps } from 'dw/core/components/EventsCalendar/testData';
import {
  selectGroup,
  getStartEndRange,
  isChecked,
  fetchEventGroups,
  setCalendarFilters,
  envSelector,
  eventHasEnvType,
  eventHasPlatform,
} from '../helpers';

describe('EventFilters helpers', () => {
  it('selectGroup should return correct group', () => {
    const { eventGroups } = eventCalendarTestProps;
    expect(selectGroup(eventGroups, 'eventManager')).toHaveProperty(
      'type',
      'eventManager'
    );
  });

  it('getStartEndRange should return range of dates', () => {
    const {
      eventsCalendarSettings: { selectedDay, numberOfDays },
    } = eventCalendarTestProps;
    expect(getStartEndRange(selectedDay, numberOfDays).length).toBe(2);
  });

  it('isChecked should return true if some value is true', () => {
    const {
      eventsCalendarSettings: {
        filters: { sources },
      },
    } = eventCalendarTestProps;
    expect(isChecked(sources)).toBe(true);
  });

  it('fetchEventGroups should call onFetchEvents', () => {
    const {
      onFetchEvents,
      eventGroups,
      eventsCalendarSettings: {
        filters: { sources },
        selectedDay,
        numberOfDays,
      },
    } = eventCalendarTestProps;
    fetchEventGroups(
      onFetchEvents,
      eventGroups,
      sources,
      selectedDay,
      numberOfDays
    );
    expect(onFetchEvents).toHaveBeenCalledTimes(1);
  });

  it('setCalendarFilters returns filter object', () => {
    const {
      eventGroups,
      eventsCalendarSettings: {
        filters,
        affiliatedProjects,
        platforms,
        gamertagGroups,
        disabledFilters,
      },
    } = eventCalendarTestProps;
    expect(
      setCalendarFilters(
        filters,
        eventGroups,
        affiliatedProjects,
        platforms,
        gamertagGroups,
        disabledFilters
      )
    ).toEqual({ ...filters, gamertags: undefined });
  });
  describe('envSelector', () => {
    it('using env_type long', () => {
      const expected = 'Certification';
      const event = {
        env_type: expected,
      };
      expect(envSelector(event)).toEqual(expected);
    });
    it('using env_type short', () => {
      const expected = 'Development';
      const event = {
        env_type: 'dev',
      };
      expect(envSelector(event)).toEqual(expected);
    });
    it('using environment long', () => {
      const expected = 'Live';
      const event = {
        environment: expected,
      };
      expect(envSelector(event)).toEqual(expected);
    });
    it('using environment short', () => {
      const expected = 'Certification';
      const event = {
        environment: 'cert',
      };
      expect(envSelector(event)).toEqual(expected);
    });
    it('Unspecified', () => {
      const event = {};
      expect(envSelector(event)).toEqual(undefined);
    });
  });
  describe('eventHasEnvType', () => {
    it('filter enabled', () => {
      const event = {
        env_type: 'Certification',
      };
      expect(eventHasEnvType(event, { Certification: true })).toEqual(true);
    });
    it('filter disabled', () => {
      const event = {
        environment: 'Live',
      };
      expect(eventHasEnvType(event, { Live: false })).toEqual(false);
    });
  });
  describe('eventHasPlatform', () => {
    it('filter enabled on event.platform', () => {
      const event = {
        platform: 'PS5',
      };
      expect(eventHasPlatform(event, { PS5: true })).toEqual(true);
    });
    it('filter enabled on event.platforms', () => {
      const event = {
        platforms: ['PS5'],
      };
      expect(eventHasPlatform(event, { PS5: true })).toEqual(true);
    });
    it('filter disabled', () => {
      const event = {
        platforms: ['PS5'],
      };
      expect(eventHasPlatform(event, { PS5: false })).toEqual(false);
    });
  });
});
