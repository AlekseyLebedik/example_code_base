import reducer from '../reducer';
import * as AT from '../actionTypes';

describe('TitleEnvStats', () => {
  describe('Reducer', () => {
    const initialState = reducer(undefined, {});
    const modifiedState = {
      ...initialState,
      incidents: [{ id: 1 }, { id: 2 }],
      maintenances: [{ id: 3 }, { id: 4 }],
      generalComments: [{ id: 5 }, { id: 6 }],
    };

    describe('default action', () => {
      it('returns default state', () => {
        const state = reducer(undefined, {});
        expect(state).toMatchSnapshot();
      });
    });

    describe('EVENTS_FETCH_SUCCESS', () => {
      it('append new events to its given type if append set to true', () => {
        const action = {
          type: AT.EVENTS_FETCH_SUCCESS,
          payload: {
            name: 'incidents',
            data: [{ id: 100 }, { id: 200 }],
          },
          append: true,
        };
        const state = reducer(modifiedState, action);
        expect(state).toMatchSnapshot();
      });
      it('override events in its given type', () => {
        const action = {
          type: AT.EVENTS_FETCH_SUCCESS,
          payload: {
            name: 'incidents',
            data: [{ id: 100 }, { id: 200 }],
          },
        };
        const state = reducer(modifiedState, action);
        expect(state).toMatchSnapshot();
      });
    });
  });
});
