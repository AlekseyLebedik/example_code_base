import { getFormError } from '../form-error';

describe('helpers/form-error', () => {
  it('validates getFormError', () => {
    const error = {
      response: {
        status: 400,
        data: {
          error: {
            invalid: [
              { field: 'field1', msg: 'err1' },
              { field: 'field2', msg: 'err2' },
            ],
            name: 'Error:ClientError:InvalidRequest',
          },
        },
      },
    };
    const expected = { field1: 'err1', field2: 'err2' };
    expect(getFormError(error)).toEqual(expected);
  });

  it('validates getFormError is undefined', () => {
    const error = {
      response: { status: 400, data: {} },
    };
    expect(getFormError(error)).toBeUndefined();
  });
});
