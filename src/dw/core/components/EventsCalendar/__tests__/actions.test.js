import { SET_EVENTS_CALENDAR_SETTINGS } from '../actionTypes';
import * as actions from '../actions';

describe('EventsCalendar', () => {
  describe('Actions', () => {
    describe('setEventsCalendarSettings', () => {
      it('returns SET_EVENTS_CALENDAR_SETTINGS action', () => {
        expect(actions.setEventsCalendarSettings({})).toMatchObject({
          type: SET_EVENTS_CALENDAR_SETTINGS,
          calendarSettings: {},
        });
      });

      it('returns SET_EVENTS_CALENDAR_SETTINGS action with given properties', () => {
        expect(
          actions.setEventsCalendarSettings({
            selectedView: 'week',
            tagText: 'test',
          })
        ).toMatchObject({
          type: SET_EVENTS_CALENDAR_SETTINGS,
          calendarSettings: {
            selectedView: 'week',
            tagText: 'test',
          },
        });
      });
    });
  });
});
