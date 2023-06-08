import * as AT from './actionTypes';

const INITIAL_STATE = {
  franchises: null,
  franchiseData: {},
};

export default function reducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case AT.REPORTING_FETCH_FRANCHISES_SUCCESS:
      return {
        ...state,
        franchises: action.data,
      };
    case AT.REPORTING_FETCH_FRANCHISES_FAILED:
      return {
        ...state,
        franchises: [],
      };
    case AT.FETCH_FRANCHISE_DATA:
      return {
        ...state,
        franchiseData: {
          id: action.id,
          start: action.start,
          end: action.end,
          stats: {},
        },
      };
    case AT.FETCH_FRANCHISE_DATA_SUCCESS:
      return state.franchiseData.id === action.id
        ? {
            ...state,
            franchiseData: {
              ...state.franchiseData,
              stats: {
                ...state.franchiseData.stats,
                [action.statName]: action.data,
              },
            },
          }
        : state;
    default:
      return {
        ...state,
      };
  }
}
