import reduceReducers from 'reduce-reducers';
import { createScheduleEventsReducerFor } from 'playpants/components/ScheduleComponent/reducerCreators';

import * as AT from './actionTypes';

export const INITIAL_STATE = {
  data: [],
  error: null,
  loading: false,
};

const reducer = reduceReducers(createScheduleEventsReducerFor(AT.SCOPE));

export default reducer;
