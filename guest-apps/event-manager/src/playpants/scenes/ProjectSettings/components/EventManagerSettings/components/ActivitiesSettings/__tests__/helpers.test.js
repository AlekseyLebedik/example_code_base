import { activitiesSettingsProps as props } from 'playpants/testUtils/projectSettingsProps';

import { arrToObj, formatActivitiesSchema } from '../helpers';

const { activitySettings, settingSchema } = props;

describe('ActivitiesSettings helpers', () => {
  describe('arrToObj', () => {
    it('returns the schema formatted as an object', () => {
      const expectedObj = {
        motd: {
          type: 'motd',
          enabled: false,
          name: 'Message of The Day',
          allow_multi_titles: true,
          allow_duplication: true,
          allow_revert: false,
          context: { is_enabled: false, type: 'title' },
        },
        playlist: {
          type: 'playlist',
          enabled: false,
          name: 'Playlists',
          allow_multi_titles: true,
          allow_duplication: true,
          allow_revert: false,
          context: { is_enabled: false, type: 'title' },
        },
        pubvars: {
          type: 'pubvars',
          enabled: true,
          name: 'Publisher Variables',
          allow_multi_titles: false,
          allow_duplication: true,
          allow_revert: true,
          context: { is_enabled: false, type: 'title' },
          variable_mapping: {
            LKKNORQKTP: 'mp_xp_mult_scale',
            MSTMLNKSSO: 'mp_weapon_xp',
          },
        },
        pubstorage: {
          type: 'pubstorage',
          enabled: true,
          name: 'Publisher Storage',
          allow_multi_titles: false,
          allow_duplication: false,
          allow_revert: true,
          context: { is_enabled: false, type: 'title' },
        },
        pyscript: {
          type: 'pyscript',
          enabled: true,
          name: 'Python Script',
          allow_multi_titles: false,
          allow_duplication: true,
          allow_revert: true,
          context: { is_enabled: false, type: 'title' },
        },
        ae: {
          type: 'ae',
          enabled: true,
          name: 'Achievements Engine',
          allow_multi_titles: false,
          allow_duplication: true,
          allow_revert: true,
          context: { is_enabled: true, type: 'title' },
        },
        publisher_objects: {
          type: 'publisher_objects',
          enabled: true,
          name: 'Publisher Objects',
          allow_multi_titles: false,
          allow_duplication: true,
          allow_revert: true,
          context: { is_enabled: true, type: 'title' },
        },
      };
      expect(arrToObj(activitySettings, 'type')).toStrictEqual(expectedObj);
    });
  });

  describe('formatActivitiesSchema', () => {
    it('returns the schema formatted as an object', () => {
      const activitySchemaData = {
        properties: {
          allow_duplication: {
            type: 'boolean',
          },
          allow_multi_titles: {
            type: 'boolean',
          },
          allow_revert: {
            type: 'boolean',
          },
          enabled: {
            type: 'boolean',
          },
          name: {
            type: 'string',
          },
        },
        required: [
          'type',
          'name',
          'allow_multi_titles',
          'allow_duplication',
          'allow_revert',
          'enabled',
          'context',
        ],
      };
      const expectedSchema = {
        $schema: 'http://json-schema.org/draft-07/schema#',
        additionalProperties: false,
        description: 'Project Setting - Activity Settings',
        properties: {
          activity_types: {
            type: 'object',
            additionalProperties: false,
            properties: {
              ae: activitySchemaData,
              motd: activitySchemaData,
              playlist: activitySchemaData,
              publisher_objects: activitySchemaData,
              pubstorage: activitySchemaData,
              pubvars: activitySchemaData,
              pyscript: activitySchemaData,
            },
          },
        },
        type: 'object',
        version: 1,
      };
      expect(
        formatActivitiesSchema(settingSchema, activitySettings)
      ).toStrictEqual(expectedSchema);
    });
  });
});
