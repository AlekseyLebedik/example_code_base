import reducer from '../reducer';
import * as AT from '../actionTypes';

describe('App', () => {
  describe('Reducer', () => {
    const initialState = reducer(undefined, {});
    const modifiedState = {
      ...initialState,
      servicesAvailability: [{ name: 'Service 1', configured: false }],
      currentTitleEnv: {
        id: 1,
        shortType: 'dev',
      },
    };

    describe('default action', () => {
      it('returns default state', () => {
        const state = reducer(undefined, {});
        expect(state).toMatchSnapshot();
      });
    });

    describe('APP_FETCH_SERVICES_AVAILABILITY_SUCCESS', () => {
      it('replaces servicesAvailability', () => {
        const action = {
          type: AT.APP_FETCH_SERVICES_AVAILABILITY_SUCCESS,
          services: [{ name: 'Service 2', configured: true }],
        };
        const state = reducer(modifiedState, action);
        expect(state).toMatchSnapshot();
      });
    });

    describe('APP_FETCH_TITLE_ENVIRONMENT_SUCCESS', () => {
      it('append new incidents to its given type', () => {
        const action = {
          type: AT.APP_FETCH_TITLE_ENVIRONMENT_SUCCESS,
          env: {
            id: 2,
            shortType: 'live',
          },
        };
        const state = reducer(modifiedState, action);
        expect(state).toMatchSnapshot();
      });
    });
  });
});
