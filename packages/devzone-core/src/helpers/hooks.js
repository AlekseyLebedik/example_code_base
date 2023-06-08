import { useRef } from 'react';
import isEqual from 'lodash/isEqual';

export const useCompare = value => {
  const ref = useRef();
  if (!isEqual(value, ref.current)) {
    ref.current = value;
  }
  return ref.current;
};

export const memoizeFn = fn => {
  const cache = {};
  return (...args) => {
    const argsString = JSON.stringify(args);
    cache[argsString] = cache[argsString] || fn.apply(this, args);
    return cache[argsString];
  };
};
