import mapValues from 'lodash/mapValues';
import groupBy from 'lodash/groupBy';

// Nested Level array of Object
export const nest = (seq, keys) => {
  if (!keys.length) return seq;
  const first = keys[0];
  const rest = keys.slice(1);
  return mapValues(groupBy(seq, first), value => nest(value, rest));
};
