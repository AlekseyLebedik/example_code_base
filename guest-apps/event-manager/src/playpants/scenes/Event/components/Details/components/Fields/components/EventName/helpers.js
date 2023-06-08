import find from 'lodash/find';
import isEmpty from 'lodash/isEmpty';

export const maxLength = (input, max) =>
  input && input.length > max
    ? {
        error: true,
        helperText: `Must be ${max} characters or less`,
      }
    : {};

export const required = input =>
  input && input.length ? {} : { error: true, helperText: 'Required' };

// find first failing validation (order-sensitive)
export const validateEventName = validations =>
  validations && find(validations, val => !isEmpty(val));
