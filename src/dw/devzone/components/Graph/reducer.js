import * as AT from './actionTypes';

const INITIAL_STATE = {
  graphs: {},
};

const reducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case AT.STAT_CLEAR_CHART: {
      const { graphs } = state;
      delete graphs[action.statName];
      return {
        ...state,
        graphs,
      };
    }
    case AT.STAT_DATA_INITIAL_FETCH_SUCCESS: {
      const graphUpdate = {};
      graphUpdate[action.statName] = {
        data: action.data,
        navigatorData: action.navigatorData,
        series: [...new Set(action.series)],
      };
      return {
        ...state,
        graphs: { ...state.graphs, ...graphUpdate },
      };
    }
    case AT.STAT_DATA_FETCH_SUCCESS: {
      const graphUpdate = {};
      graphUpdate[action.statName] = {
        ...state.graphs[action.statName],
        data: action.data,
        min: action.start,
        max: action.end,
      };
      return {
        ...state,
        graphs: { ...state.graphs, ...graphUpdate },
      };
    }
    case AT.STAT_DATA_FETCH_FAILED: {
      return {
        ...state,
        graphs: {
          ...state.graphs,
          [action.statName]: { ...state.graphs[action.statName], data: [] },
        },
      };
    }
    default:
      return state;
  }
};

export default reducer;
