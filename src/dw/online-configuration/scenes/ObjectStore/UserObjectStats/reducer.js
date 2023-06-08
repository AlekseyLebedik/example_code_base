import { uuid } from 'dw/core/helpers/uuid';
import {
  FETCH_OBJECT_STATS,
  FETCH_OBJECT_STAT_SUCCESS,
  UPDATE_STATISTIC_VALUE_SUCCESS,
  REFRESH_TABLE,
} from './constants';

const INITIAL_STATE = {
  objectStats: [],
  loading: false,
  tableRefreshKey: uuid(),
};

function reducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case FETCH_OBJECT_STATS:
      return {
        ...state,
        loading: true,
      };
    case FETCH_OBJECT_STAT_SUCCESS:
      return {
        ...state,
        loading: false,
        objectStats: action.payload,
      };
    case UPDATE_STATISTIC_VALUE_SUCCESS:
    case REFRESH_TABLE:
      return {
        ...state,
        tableRefreshKey: uuid(),
      };
    default:
      return state;
  }
}

export default reducer;
