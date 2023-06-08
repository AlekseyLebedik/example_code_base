import { createSelector } from 'reselect';

import { getDateTimeFromTimestamp } from 'dw/core/helpers/date-time';

export const getFieldsFormated = createSelector(
  (object, timeSpanKeys) => ({ object, timeSpanKeys }),
  ({ object, timeSpanKeys }) =>
    Object.keys(object).map(key => {
      const value = object[key];
      const getValue = () =>
        timeSpanKeys.includes(key) ? getDateTimeFromTimestamp(value) : value;
      const getValueFormated =
        value !== undefined && value !== null ? getValue() : 'None';
      return { label: key, value: getValueFormated };
    })
);
