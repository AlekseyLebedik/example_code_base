import { TITLE_MAX_CHAR_LENGTH } from 'playpants/constants/validation';
import * as helpers from '../helpers';

describe('Helpers Tests:', () => {
  describe('maxLength()', () => {
    it('returns error and error text when input exceeds 255 characters', () => {
      const input = 'z'.repeat(256);
      expect(helpers.maxLength(input, TITLE_MAX_CHAR_LENGTH)).toMatchObject({
        error: true,
        helperText: `Must be ${TITLE_MAX_CHAR_LENGTH} characters or less`,
      });
    });
    it('returns empty object when input does not exceed 255 characters', () => {
      const input = 'z'.repeat(255);
      expect(helpers.maxLength(input, TITLE_MAX_CHAR_LENGTH)).toMatchObject({});
    });
  });

  describe('required()', () => {
    it('returns error when there is no input', () => {
      const input = '';
      expect(helpers.required(input)).toMatchObject({
        error: true,
        helperText: 'Required',
      });
    });
    it('returns empty object when input of any size is passed', () => {
      const input = 'z';
      expect(helpers.required(input)).toMatchObject({});
    });
  });

  describe('validateEventName()', () => {
    it('finds the first failing validation and returns its state', () => {
      const expected = helpers.required('');
      const input = [helpers.maxLength('test', 255), helpers.required('')];
      expect(helpers.validateEventName(input)).toMatchObject(expected);
    });
    it('returns an empty object when no validations fail', () => {
      const input = [helpers.maxLength('test', 255), helpers.required('z')];
      expect(helpers.validateEventName(input)).toBe(undefined);
    });
    it('returns undefined when passed no validations', () => {
      const input = [];
      expect(helpers.validateEventName(input)).toBe(undefined);
    });
  });
});
