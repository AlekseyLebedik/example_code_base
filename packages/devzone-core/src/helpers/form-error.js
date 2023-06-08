import get from 'lodash/get';

const errorRegex = /Error:ClientError:[a-zA-Z]*:BadRequest/;

export function getFormError(error) {
  const {
    response: { status, data },
  } = error;
  if (
    !(
      status === 400 &&
      data.error &&
      (data.error.name === 'Error:ClientError:InvalidRequest' ||
        errorRegex.test(data.error.name))
    )
  ) {
    return undefined;
  }
  const errors = {};
  data.error.invalid.forEach(e => {
    errors[e.field || 'error'] = `${e.msg}`;
  });
  return errors;
}

export function getFormErrorMsg(errors) {
  return Object.entries(errors).reduce(
    (acc, [key, value]) => `${acc}${key}: ${value} `,
    ''
  );
}

const formatInvalidFieldsArray = (invalidFields, fileFieldName) => {
  const errors = {};
  let errorCount = 0;
  invalidFields.forEach(e => {
    if (e.field) {
      errors[e.field] = `${e.msg}`;
    } else {
      if (errorCount < 10)
        errors[fileFieldName] = `${
          errors[fileFieldName] || 'Unexpected properties: '
        }  [${e.path}]`;
      else if (errorCount === 10)
        errors[fileFieldName] = `${errors[fileFieldName]}...`;
      errorCount += 1;
    }
  });
  if (errorCount > 10) errors[fileFieldName] += ` and ${errorCount - 10} more`;
  return errors;
};

export function getFormFileFormatError(error, fileFieldName) {
  const {
    response: { status, data },
  } = error;
  if (
    !(
      status === 400 &&
      data.error &&
      (data.error.name === 'Error:ClientError:InvalidRequest' ||
        errorRegex.test(data.error.name))
    )
  ) {
    return undefined;
  }
  if (data.error.invalid.length < 1) return { [fileFieldName]: data.error.msg };

  return formatInvalidFieldsArray(data.error.invalid, fileFieldName);
}

export function getInvalidFieldsErrorMessage(err) {
  const invalid = get(err, 'response.data.error.invalid', false);
  const mainMsg = get(err, 'response.data.error.msg', '');
  if (invalid && Array.isArray(invalid)) {
    const invalidMsgs = invalid.length > 3 ? invalid.slice(0, 3) : invalid;
    return [
      mainMsg,
      invalidMsgs.reduce((acc = '', val) => acc.concat(val.msg)).msg,
    ].join(' ');
  }
  return mainMsg;
}
