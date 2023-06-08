import * as V from '../validation';
import {
  MAX_UINT_16_BIT,
  MAX_UINT_64_BIT,
  MAX_UPLOAD_BYTES,
  MAX_UPLOAD_MB_SIZE,
} from '../constants';

describe('Validation', () => {
  it('validate integer success', () => {
    expect(V.int(7)).toBe(7);
  });

  it('validate integer fail', () => {
    expect(Number.isNaN(V.int('a'))).toBe(true);
  });

  it('validate required success', () => {
    expect(V.required(7)).toBeUndefined();
  });

  it('validate required fail', () => {
    expect(V.required()).toBe('Required');
  });

  it('validate number success', () => {
    expect(V.number(-7.5)).toBeUndefined();
  });

  it('validate number fail', () => {
    expect(V.number('-7.5a')).toBe('Number');
  });

  it('validate number 16 success', () => {
    expect(V.number16(16)).toBeUndefined();
  });

  it('validate number 16 fail', () => {
    expect(V.number16(MAX_UINT_16_BIT + 1)).toBe('Integer 16-bit');
  });

  it('validate number 64 success', () => {
    expect(V.number64(16)).toBeUndefined();
  });

  it('validate number 64 fail', () => {
    expect(V.number64(MAX_UINT_64_BIT + 1)).toBe('Integer 64-bit');
  });

  it('validate positiveInt success', () => {
    expect(V.positiveInt(16)).toBeUndefined();
  });

  it('validate positiveInt with negative number fail', () => {
    expect(V.positiveInt(-16)).toBe('Should be a positive number');
  });

  it('validate positiveInt fail', () => {
    expect(V.positiveInt(0)).toBe('Should be a positive number');
  });

  it('validate nonNegativeInt success', () => {
    expect(V.nonNegativeInt(16)).toBeUndefined();
  });

  it('validate nonNegativeInt with 0 success', () => {
    expect(V.nonNegativeInt(0)).toBeUndefined();
  });

  it('validate nonNegativeInt fail', () => {
    expect(V.nonNegativeInt(-16)).toBe('Should be a non negative number');
  });

  it('validate clientType success', () => {
    expect(V.clientType(16)).toBeUndefined();
  });

  it('validate clientType with wildcard success', () => {
    expect(V.clientType('*')).toBeUndefined();
  });

  it('validate clientType fail', () => {
    expect(V.clientType(256)).toBe(
      "Enter a valid 'Client Type' consisting of '*' or an integer in the range (0 <= Client Type <= 255)"
    );
  });

  it('validate intRangeValidator success', () => {
    expect(V.intRangeValidator(1, 16)(5)).toBeUndefined();
  });

  it('validate intRangeValidator fail', () => {
    expect(V.intRangeValidator(1, 16)(17)).toBe(
      'Should be in a range (1 to 16)'
    );
  });

  it('validate minValue success', () => {
    expect(V.minValue(5)(16)).toBeUndefined();
  });

  it('validate minValue fail', () => {
    expect(V.minValue(16)(5)).toBe(
      'Should be an integer greater than or equal to 16'
    );
  });

  it('validate maxValue success', () => {
    expect(V.maxValue(16)(5)).toBeUndefined();
  });

  it('validate maxValue fail', () => {
    expect(V.maxValue(5)(16)).toBe(
      'Should be an integer less than or equal to 5'
    );
  });

  it('validate commaSeparatedIntegers success', () => {
    expect(V.commaSeparatedIntegers('5,16')).toBeUndefined();
  });

  it('validate commaSeparatedIntegers fail', () => {
    expect(V.commaSeparatedIntegers('5,16a')).toBe(
      'Should be a comma separated list of Integers'
    );
  });

  it('validate isValidJSON success', () => {
    expect(
      V.isValidJSON({ requiredFields: ['blah'] })('{"blah": "blah"}')
    ).toBeUndefined();
  });

  it('validate isValidJSON fail on incorrect JSON input', () => {
    expect(V.isValidJSON({ requiredFields: ['blah'] })('{blah: "blah"}')).toBe(
      'Make sure the input is a valid JSON'
    );
  });

  it('validate isValidJSON fail without required fields', () => {
    expect(
      V.isValidJSON({ requiredFields: ['test'] })('{"blah": "blah"}')
    ).toBe('The field "test" is required');
  });

  it('validate fileName success', () => {
    expect(V.fileName('test.txt')).toBeUndefined();
    expect(V.fileName('Test0_-txt')).toBeUndefined();
  });

  it('validate fileSize success', () => {
    expect(V.fileSize({ file: { size: 100 } })).toBeUndefined();
    expect(V.fileSize({ file: { size: MAX_UPLOAD_BYTES + 1 } })).toBe(
      `Max file upload size is ${MAX_UPLOAD_MB_SIZE}MB`
    );
  });

  it('validate fileName fail', () => {
    expect(V.fileName('test+txt')).toBe(
      "Enter a valid 'Filename' consisting of character from a-z, A-Z, 0-9, including the '_', '-' or '.' characters"
    );
  });
});
