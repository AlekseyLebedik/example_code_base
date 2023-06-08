import { eventCalendarTestProps as props } from 'dw/core/components/EventsCalendar/testData';

import reducer from '../reducer';
import * as AT from '../actionTypes';

describe('EventsCalendar', () => {
  describe('Reducer', () => {
    const initialState = {
      ...reducer(undefined, {}),
      ...props.eventsCalendarSettings,
    };

    it('returns default state', () => {
      const state = reducer(initialState, {});
      expect(state).toMatchSnapshot();
    });

    describe('SET_EVENTS_CALENDAR_SETTINGS', () => {
      it('updates the passed calendarSettings', () => {
        const action = {
          type: AT.SET_EVENTS_CALENDAR_SETTINGS,
          calendarSettings: {
            selectedView: 'day',
          },
        };
        const state = reducer(initialState, action);
        expect(state).toMatchSnapshot();
      });
    });
  });
});
