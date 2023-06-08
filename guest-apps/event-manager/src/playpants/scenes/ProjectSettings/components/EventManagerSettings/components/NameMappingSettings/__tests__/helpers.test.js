import { formatVariableSchema, formatVariableFormData } from '../helpers';

const variableMapping = {
  LKKNORQKTP: 'mp_xp_mult_sc',
  MSTMLNKSSO: 'mp_weapon_xp',
};

describe('NameMappingSettings helpers', () => {
  describe('formatVariableSchema', () => {
    it('returns the schema formatted as an object', () => {
      const expectedSchema = {
        $schema: 'http://json-schema.org/draft-07/schema#',
        type: 'object',
        properties: {
          'pubvars variable mapping': {
            type: 'object',
            properties: {
              variable_mapping: {
                type: 'object',
                properties: {
                  LKKNORQKTP: { type: 'string' },
                  MSTMLNKSSO: { type: 'string' },
                },
              },
            },
          },
        },
      };
      expect(formatVariableSchema(variableMapping)).toStrictEqual(
        expectedSchema
      );
    });
  });

  describe('formatVariableFormData', () => {
    it('returns the form data correctly formatted', () => {
      const expectedObj = {
        'pubvars variable mapping': {
          variable_mapping: variableMapping,
        },
      };
      expect(formatVariableFormData(variableMapping)).toStrictEqual(
        expectedObj
      );
    });
  });
});
