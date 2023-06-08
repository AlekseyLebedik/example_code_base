import get from 'lodash/get';
import capitalize from 'lodash/capitalize';

import {
  MAX_INTEGERS,
  MAX_UPLOAD_BYTES,
  MAX_UPLOAD_MB_SIZE,
} from './constants';

export const int = value => {
  const intRegex = /^[-+]?[0-9]*$/;
  return intRegex.test(String(value).trim()) ? Number(value) : Number.NaN;
};

const inIntRange = (value, type) => {
  const number = parseInt(value, 10);
  const key = `MAX_UINT_${type}_BIT`;
  return number <= MAX_INTEGERS[key] && number >= 0;
};

export const required = value =>
  (Array.isArray(value) && value.length === 0) || !(value || value === 0)
    ? 'Required'
    : undefined;

export const number = value =>
  Number.isNaN(Number(value)) ? 'Number' : undefined;

const integer = value => (Number.isNaN(int(value)) ? 'Integer' : undefined);

export const number16 = value =>
  Number.isNaN(Number(value)) || !inIntRange(value, '16')
    ? 'Integer 16-bit'
    : undefined;

export const number64 = value =>
  !Number.isSafeInteger(parseInt(value, 10)) || !inIntRange(value, '64')
    ? 'Integer 64-bit'
    : undefined;

export const positiveInt = value => {
  if (value === null || value === undefined || value === '') return value;
  const intValue = int(value);
  return !Number.isNaN(intValue) && intValue > 0
    ? undefined
    : 'Should be a positive number';
};

export const nonNegativeInt = value => {
  const intValue = int(value);
  return !Number.isNaN(intValue) && intValue >= 0
    ? undefined
    : 'Should be a non negative number';
};

export const clientType = value => {
  const intValue = int(value);
  return value === '*' ||
    (!Number.isNaN(intValue) && intValue >= 0 && intValue <= 255)
    ? undefined
    : "Enter a valid 'Client Type' consisting of '*' or an integer in the range (0 <= Client Type <= 255)";
};

export const intRangeValidator = (min, max) => value => {
  const intValue = int(value);
  return !Number.isNaN(intValue) && intValue >= min && intValue <= max
    ? undefined
    : `Should be in a range (${min} to ${max})`;
};

export const minValue = min => value => {
  const intValue = int(value);
  return !Number.isNaN(intValue) && intValue >= min
    ? undefined
    : `Should be an integer greater than or equal to ${min}`;
};

export const maxValue = max => value => {
  const intValue = int(value);
  return !Number.isNaN(intValue) && intValue <= max
    ? undefined
    : `Should be an integer less than or equal to ${max}`;
};

export const commaSeparated = (validator, msg) => value => {
  const values = value.split(',').map(validator);
  const invalidValues = values.filter(v => v !== undefined);
  if (invalidValues.length > 0) {
    return msg || `Should be a comma separated list of ${invalidValues[0]}s`;
  }
  return undefined;
};

export const commaSeparatedIntegers = commaSeparated(integer);

export const isValidJSON =
  ({ requiredFields }) =>
  value => {
    let obj;
    try {
      obj = JSON.parse(value);
    } catch (e) {
      return 'Make sure the input is a valid JSON';
    }
    if (requiredFields !== undefined) {
      const missingFields = requiredFields.filter(
        fieldName => obj[fieldName] === undefined
      );
      if (missingFields.length > 0) {
        return missingFields.length === 1
          ? `The field "${missingFields[0]}" is required`
          : `The fields "${missingFields.join(', ')}" are required`;
      }
    }
    return undefined;
  };

export const fileName = value => {
  const nameRegex = /^[\w\-.]+$/;
  return nameRegex.test(String(value).trim())
    ? undefined
    : "Enter a valid 'Filename' consisting of character from a-z, A-Z, 0-9, including the '_', '-' or '.' characters";
};

export const email = value => {
  const emailRegex =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return !value || emailRegex.test(String(value).trim())
    ? undefined
    : 'Enter a valid email address';
};

export const maxLength = max => value =>
  value && value.length > max ? `Must be ${max} characters or less` : undefined;

export const minLength = min => value =>
  value && value.length < min ? `Must be ${min} characters or more` : undefined;

export const isDirty = (_value, _, props) =>
  !props.dirty ? `You must change this value` : undefined;

export const fileSize = value =>
  value && value.file.size > MAX_UPLOAD_BYTES
    ? `Max file upload size is ${MAX_UPLOAD_MB_SIZE}MB`
    : undefined;

export const isAnyFileLoading = value =>
  (Array.isArray(value) && value.some(file => !file.base64)) ||
  (value && !value.base64)
    ? 'Uploading file(s). Please wait.'
    : undefined;

export const isPermissionInFormEmpty = (values, props) => {
  const errors = {
    ...values,
    contentTypes: get(values, 'contentTypes', []).map(ct => ({
      ...ct,
      selections: get(ct, 'selections', []).map(selection => {
        const error = {};
        if (get(selection, 'permissions', []).length === 0)
          error.permissions = 'Permission is required';
        if (get(selection, 'selectedDetails', []).length === 0)
          error.selectedDetails = `${capitalize(
            get(
              get(props, 'contentTypes', []).find(
                fullCt => fullCt.id === ct.cTypeId
              ),
              'model',
              'Content Type'
            )
          )} is required`;
        return error !== {} && error;
      }),
    })),
  };
  return errors;
};
