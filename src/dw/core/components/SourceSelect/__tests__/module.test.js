import reducer from '../reducer';
import * as AT from '../actionTypes';
import * as actions from '../actions';

const apiCall = jest.fn();
const input = '1234567890';
const data = {
  userName: 'rockstar_user',
  reputation: 15,
  userID: '1234567890',
};
const fetchAction = actions.fetch(apiCall, input);
const fetchSuccessAction = actions.fetchSuccess({ data: [data] });

describe('SourceSelect', () => {
  describe('Actions', () => {
    it('SOURCE_SELECT_FETCH', () => {
      expect(fetchAction).toHaveProperty('type', AT.SOURCE_SELECT_FETCH);
      expect(fetchAction).toHaveProperty('apiCall', apiCall);
      expect(fetchAction).toHaveProperty('input', input);
    });

    it('SOURCE_SELECT_FETCH_SUCCESS', () => {
      expect(fetchSuccessAction).toHaveProperty(
        'type',
        AT.SOURCE_SELECT_FETCH_SUCCESS
      );
      expect(fetchSuccessAction).toHaveProperty('data', [data]);
    });
  });

  describe('Reducer', () => {
    it('returns initial state', () => {
      expect(reducer(undefined, {})).toMatchSnapshot();
    });

    it('handles SOURCE_SELECT_FETCH_SUCCESS', () => {
      expect(reducer(undefined, fetchSuccessAction)).toMatchSnapshot();
    });
  });
});
