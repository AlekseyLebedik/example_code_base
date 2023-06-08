import startCase from 'lodash/startCase';
import isInteger from 'lodash/isInteger';
import capitalize from 'lodash/capitalize';

const timeFields = [
  'Last Update Timestamp',
  'Activation Timestamp',
  'Creation Timestamp',
  'Code Signature Timestamp',
];

const boolFields = ['Is Active'];

export const startCaseKeys = target => {
  if (!target) return target;
  const startCased = {};
  Object.entries(target).forEach(([key, value]) => {
    startCased[startCase(key)] = value;
  });
  return startCased;
};

export const formatRuleset = (ruleset, formatDateTime) => {
  if (!ruleset) return ruleset;
  const { code, ...rest } = ruleset;
  const newRuleset = startCaseKeys(rest);
  timeFields.forEach(field => {
    const value = newRuleset[field];
    newRuleset[field] = isInteger(value) ? formatDateTime(value) : value;
  });
  boolFields.forEach(field => {
    if (newRuleset[field]) {
      newRuleset[field] = capitalize(String(newRuleset[field]));
    }
  });
  return newRuleset;
};
