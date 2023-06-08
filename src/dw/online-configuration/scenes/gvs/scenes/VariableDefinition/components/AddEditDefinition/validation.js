import long from 'long';
import set from 'lodash/set';
import { GVS_MAX_STRING_LENGTH } from '@demonware/devzone-core/config';
import { BOOL, CHAR, FLOAT, INT } from '../../constants';

const parseIntType = type => {
  const regex = /(int|uint)(\d+)/;
  const [, subtype, base] = regex.exec(type);
  return [subtype === 'uint', parseInt(base, 10)];
};

const keyRegexp = /^\w+$/;

const validateKey = (key, keys, isEdit) => {
  const errors = {};
  if (!key) errors.key = 'Required';
  if (!isEdit && keys.includes(key)) errors.key = 'The key already exists';
  if (!keyRegexp.test(key))
    errors.key = 'You can only use alphanumeric characters and underscores';
  return errors;
};

export const getIntRanges = type => {
  const [unsigned, base] = parseIntType(type);
  if (base !== 64) {
    const maxValue = 2 ** base;
    return unsigned
      ? [0, maxValue - 1]
      : [-1 * (maxValue / 2), maxValue / 2 - 1];
  }
  return unsigned
    ? [0, long.MAX_UNSIGNED_VALUE.toString()]
    : [long.MIN_VALUE.toString(), long.MAX_VALUE.toString()];
};

const float32Ranges = [-3.4e38, +3.4e38];

export const getRanges = type => {
  switch (type) {
    case BOOL:
      return [];
    case CHAR:
      return [0, GVS_MAX_STRING_LENGTH];
    case FLOAT:
      return float32Ranges;
    default:
      return getIntRanges(type);
  }
};

const intRegex = /^[-]?(0|[1-9]\d*)$/;

export const isFloat = n => {
  const [min, max] = float32Ranges;
  const value = parseFloat(n);
  // eslint-disable-next-line
  return !isNaN(value) && isFinite(n) && min <= value && value <= max;
};

export const getMinMaxValidator = type => strValue => {
  if (type === FLOAT) {
    return isFloat(strValue);
  }
  if (!intRegex.test(strValue)) return false;
  const value = [INT].includes(type) ? strValue : parseInt(strValue, 10);
  switch (type) {
    case CHAR:
      return value >= 0 && value <= GVS_MAX_STRING_LENGTH;
    case INT: {
      const [unsigned] = parseIntType(type);
      const longValue = long.fromString(strValue, unsigned);
      return longValue.toString() === strValue;
    }
    default:
      return false;
  }
};

export const getIntValidator = (type, min, max) => rawValue => {
  if (!intRegex.test(rawValue)) return false;
  if (type === INT) {
    const validator = getMinMaxValidator(type);
    if (!validator(rawValue)) return false;
    const [unsigned] = parseIntType(type);
    const longValue = long.fromValue(rawValue, unsigned);
    const longMin = long.fromValue(min, unsigned);
    const longMax = long.fromValue(max, unsigned);
    return longValue.comp(longMin) >= 0 && longValue.comp(longMax) <= 0;
  }
  const value = parseInt(rawValue, 10);
  return value >= min && value <= max;
};

const getMinMaxRanges = type => {
  switch (type) {
    case INT:
      return getIntRanges(type);
    case CHAR:
      return [0, GVS_MAX_STRING_LENGTH];
    case FLOAT:
      return float32Ranges;
    default:
      return [];
  }
};

export const validate = (keys, isEdit) => values => {
  const { key, type, validation } = values;
  const errors = { ...validateKey(key, keys, isEdit) };

  if (type !== BOOL) {
    const { min: minValue, max: maxValue } = validation;
    const [min, max] = getMinMaxRanges(type);
    const rangeValidator = getMinMaxValidator(type);
    if (minValue && !rangeValidator(minValue)) {
      set(
        errors,
        'validation.min',
        `Should be a number in range [${min}, ${max}]`
      );
    }
    if (maxValue && !rangeValidator(maxValue)) {
      set(
        errors,
        'validation.max',
        `Should be a number in range [${min}, ${max}]`
      );
    }
  }
  return errors;
};
