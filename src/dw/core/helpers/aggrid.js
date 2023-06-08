import { dateToUTCTimestamp } from 'dw/core/helpers/date-time';

export const comparatorFilter = (filter, value, filterText) => {
  const valueLowerCase = value.toLowerCase();
  const filterTextLowerCase = filterText.toLowerCase();
  switch (filter) {
    case 'contains':
      return valueLowerCase.indexOf(filterTextLowerCase) >= 0;
    case 'notContains':
      return valueLowerCase.indexOf(filterTextLowerCase) === -1;
    case 'equals':
      return valueLowerCase === filterTextLowerCase;
    case 'notEqual':
      return valueLowerCase !== filterTextLowerCase;
    case 'startsWith':
      return valueLowerCase.indexOf(filterTextLowerCase) === 0;
    case 'endsWith': {
      const index = valueLowerCase.lastIndexOf(filterTextLowerCase);
      return (
        index >= 0 &&
        index === valueLowerCase.length - filterTextLowerCase.length
      );
    }
    default: {
      // should never happen
      // eslint-disable-next-line no-console
      console.warn(`invalid filter type ${filter}`);
      return false;
    }
  }
};

export const dateComparator = (date1, date2) =>
  dateToUTCTimestamp(date1) - dateToUTCTimestamp(date2);

export const numberComparator = (n1, n2) => parseFloat(n1) - parseFloat(n2);
