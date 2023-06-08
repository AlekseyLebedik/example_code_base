import mockState from 'playpants/testUtils/mockState';
import {
  parseDataFromSchema,
  parseTargets,
  parseUserParams,
  doesFormHaveError,
} from '../helpers';

describe('Thunderpants BuildModalForm helpers', () => {
  describe('parseDataFromSchema', () => {
    it('properly parses intial form data', () => {
      const schema =
        mockState.Scenes.Event.activity.thunderpants.userParamsSchema.data;
      const data = {
        max_instances_per_machine: 11,
      };

      expect(parseDataFromSchema(data, schema)).toEqual({
        max_instances_per_machine: 11,
        extra_cmdline_args: '',
      });
    });
  });

  describe('parseTargets', () => {
    it('properly transforms target into form-usable format', () => {
      const payload = 'ui:dev(mp)';
      expect(parseTargets(payload)).toEqual({
        value: payload,
        error: false,
      });
    });
  });

  describe('parseUserParams', () => {
    it('properly parses user params', () => {
      const userParams = { param1: 'value1' };
      expect(parseUserParams(userParams)).toEqual({
        param1: {
          value: 'value1',
          error: false,
        },
      });
    });
  });

  describe('doesFormHaveError', () => {
    const setFormState = jest.fn();
    it('returns true if there is an error in userParams', () => {
      const payload = {
        userParams: {
          test: { value: 1, error: true },
        },
        target: { value: { uidev: true, uicert: true } },
      };
      expect(doesFormHaveError(payload, setFormState)).toEqual(true);
    });
    it('returns false if there is no erro in userParams', () => {
      const payload = {
        userParams: {
          test: { value: 1, error: false },
        },
        target: { value: { uidev: true, uicert: true } },
      };
      expect(doesFormHaveError(payload, setFormState)).toEqual(false);
    });
    it('returns false if no target is selected', () => {
      const payload = {
        userParams: {},
        target: { value: { uidev: false, uicert: false } },
      };
      expect(doesFormHaveError(payload, setFormState)).toEqual(true);
    });
  });
});
