import moment from 'moment';

import * as AT from './actionTypes';

const fetchFranchiseData = id => {
  const end = Date.now();
  const start = moment(end).subtract(5, 'weeks');
  return {
    type: AT.FETCH_FRANCHISE_DATA,
    id,
    start: start.valueOf(),
    end,
  };
};

const fetchFranchiseDataSuccess = ({ id, data, statName }) => ({
  type: AT.FETCH_FRANCHISE_DATA_SUCCESS,
  id,
  data,
  statName,
});

const fetchFranchiseDataFailed = () => ({
  type: AT.FETCH_FRANCHISE_DATA_FAIL,
});

export {
  fetchFranchiseData,
  fetchFranchiseDataSuccess,
  fetchFranchiseDataFailed,
};
