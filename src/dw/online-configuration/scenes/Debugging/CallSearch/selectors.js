import { createSelector } from 'reselect';
import { formatDateTimeSelector } from 'dw/core/helpers/date-time';

export const selectedCall = state =>
  state.Scenes.Debugging.CallSearch.selectedCall;

const mmpCallsSelector = state => state.Scenes.Debugging.CallSearch.calls;

const mmpCallsFormattedSelector = createSelector(
  mmpCallsSelector,
  formatDateTimeSelector,
  (mmpCalls, formatDateTime) =>
    mmpCalls.map(mmpCall => ({
      ...mmpCall,
      startTime: formatDateTime(mmpCall.startTime),
    }))
);

export default mmpCallsFormattedSelector;
