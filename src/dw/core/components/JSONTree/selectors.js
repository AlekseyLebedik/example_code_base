import { createSelector } from 'reselect';
import endsWith from 'lodash/endsWith';
import startsWith from 'lodash/startsWith';
import { hasData } from 'dw/core/helpers/object';

import { parse } from 'lossless-json';

function convertLosslessNumber(_, value) {
  if (value && value.isLosslessNumber) {
    return String(value);
  }
  return value;
}
const normalizeObject = object => {
  if (!(object && hasData(object))) return JSON.stringify(object);
  if (Array.isArray(object)) return object.map(value => normalizeObject(value));
  if (typeof object === 'object') {
    return Object.entries(object).reduce(
      (acc, [key, value]) =>
        Object.assign(acc, { [key]: normalizeObject(value) }),
      {}
    );
  }
  if (startsWith(object, '{') && endsWith(object, '}')) {
    try {
      return normalizeObject(parse(object, convertLosslessNumber));
    } catch (e) {
      /* Eslint expects non empty block for error handling */
    }
  }
  return object;
};

const filterObject = (object, search) => {
  if (!(object && hasData(object))) return null;
  if (Array.isArray(object)) {
    const newObject = object
      .map(value => filterObject(value, search))
      .filter(value => value !== null);
    return newObject.length > 0 ? newObject : null;
  }
  if (typeof object === 'object') {
    const newObject = Object.entries(object).reduce((acc, [key, value]) => {
      const keyMatch = key.toLowerCase().includes(search);
      const valueMatch = filterObject(value, search);
      if (keyMatch) return Object.assign(acc, { [key]: value });
      if (valueMatch) return Object.assign(acc, { [key]: valueMatch });
      return acc;
    }, {});
    return hasData(newObject) ? newObject : null;
  }
  return String(object).toLowerCase().includes(search) ? object : null;
};

const normalizeJson = createSelector(
  ({ data }) => data,
  data => normalizeObject(data)
);

export const filteredJson = createSelector(
  ({ search }) => search && search.toLowerCase(),
  normalizeJson,
  (search, data) => {
    if (!search) return data;
    return filterObject(data, search);
  }
);

export const getExpandedNodes = (object, search, parent = null) => {
  let expandedNodes = [];
  if (Array.isArray(object)) {
    object.forEach((value, idx) => {
      const key = `${parent}-${idx}`;
      const expandedChildren = getExpandedNodes(value, search);
      if (expandedChildren.length > 0) {
        expandedNodes = [key, ...expandedNodes, ...expandedChildren];
      }
    });
  } else if (object && typeof object === 'object') {
    Object.entries(object).forEach(([key, value]) => {
      const expandedChildren = getExpandedNodes(value, search, key);
      if (
        expandedChildren.length > 0 ||
        key.toLowerCase().includes(search.toLowerCase())
      ) {
        expandedNodes = [key, ...expandedNodes, ...expandedChildren];
      }
    });
  } else if (String(object).toLowerCase().includes(search)) {
    expandedNodes.push(object);
  }
  return expandedNodes;
};
