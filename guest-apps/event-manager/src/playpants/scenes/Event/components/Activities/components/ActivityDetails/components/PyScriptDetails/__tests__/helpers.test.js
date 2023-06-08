import { activitiesDetailsProps as props } from 'playpants/testUtils/eventProps';
import { pyScript } from 'playpants/testUtils/schemaFormProps';
import { prettyPrint } from 'playpants/helpers/json';
import * as helpers from '../helpers';

const { selectedActivity, eventId } = props;

describe('Activity', () => {
  describe('helpers', () => {
    describe('convertSchema', () => {
      it('returns current schema as an array of input objects', () => {
        const inputs = helpers.convertSchema(pyScript);
        expect(inputs).toEqual([
          { key: 'weapon_type', value: '' },
          { key: 'attachment_icons', value: [] },
          { key: 'cost', value: '' },
          { key: 'attachments', value: [] },
        ]);
      });
    });

    describe('getNewSchemaInputs', () => {
      const params = {
        selectedActivity,
        pyScript,
      };
      it('creates an array of invalid inputs that have values set', () => {
        const { invalid_inputs: invalidInputs } =
          helpers.getNewSchemaInputs(params);
        expect(invalidInputs).toEqual([{ key: 'invalid', value: 'test' }]);
      });

      it('creates an array of valid inputs to keep with values', () => {
        const { inputs } = helpers.getNewSchemaInputs(params);
        const updatedInputs = [
          { key: 'weapon_type', value: 'Gun' },
          { key: 'attachment_icons', value: [] },
          { key: 'cost', value: '' },
          { key: 'attachments', value: [] },
        ];
        expect(inputs).toEqual(updatedInputs);
      });
    });

    describe('formatSchemaModelParams', () => {
      const params = {
        selectedActivity,
        pyScript,
        eventId,
        inputs: [
          { key: 'weapon_type', value: '' },
          { key: 'cost', value: '' },
        ],
        invalid: false,
      };
      const newParams = {
        activityId: 12,
        eventId: 2,
        payload: {
          activity: prettyPrint({
            template_id: 'weapon-drop',
            name: 'Weapon Drop',
            version: 'v1.0.0',
            inputs: [
              { key: 'weapon_type', value: '' },
              { key: 'cost', value: '' },
            ],
          }),
          id: 12,
          title_envs: [4],
          type: 'pyscript',
          publish_on: 'on_start',
          exec_order: 1,
          updated_by: {
            id: 1,
            name: 'Initial User',
          },
        },
      };
      it('returns correctly formatted params for update call', () => {
        const returnValue = helpers.formatSchemaModelParams(params);
        expect(returnValue).toEqual(newParams);
      });
    });
  });
});
