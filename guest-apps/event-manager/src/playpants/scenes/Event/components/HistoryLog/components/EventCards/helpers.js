import React from 'react';
import { dateToUTCTimestamp } from 'playpants/helpers/dateTime';
import { prettyPrint, isJSON } from 'playpants/helpers/json';

const prettyPrintJSON = value => {
  const json = JSON.parse(value);
  if (Array.isArray(json)) return json.join(', ');
  return <pre>{prettyPrint(json)}</pre>;
};

// TODO: Write function to convert stringified JSON
// into HTML tags with bolded change diffs
// eslint-disable-next-line no-unused-vars
const printJsonDiff = (newValue, oldValue) => prettyPrintJSON(newValue);

export const printValue = (dateTime, value, oldValue) => {
  if (new Date(value).getTime() > 0) {
    const timestamp = dateToUTCTimestamp(value);
    return dateTime(timestamp);
  }
  if (isJSON(value)) {
    if (oldValue) return printJsonDiff(value, oldValue);
    return prettyPrintJSON(value);
  }
  return value;
};
