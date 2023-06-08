import { createFetch } from '../../helpers/actions';
import { normalizeSwitches } from './helpers';
import { FEATURE_SWITCHES_LIST_PREFIX } from '../../constants';

const fetchFeatureSwitches = () =>
  createFetch(FEATURE_SWITCHES_LIST_PREFIX, null);

export const actions = {
  fetchFeatureSwitches,
};

export const INITIAL_STATE = {};

export default function reducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case `${FEATURE_SWITCHES_LIST_PREFIX}_FETCH_SUCCESS`:
      return { ...state, ...normalizeSwitches(action.data) };
    case `${FEATURE_SWITCHES_LIST_PREFIX}_FETCH_FAILED`:
      return { ...state, fetchFailed: true };
    default:
      return state;
  }
}
