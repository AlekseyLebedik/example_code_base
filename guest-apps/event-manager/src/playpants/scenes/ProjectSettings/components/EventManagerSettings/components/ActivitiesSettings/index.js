import React, { useEffect, useMemo } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import isEmpty from 'lodash/isEmpty';

import { SERVICE_LABELS } from '@demonware/devzone-core/access/ServiceAvailability/constants';

import { activitySettingsSelector } from 'playpants/components/App/selectors';
import {
  clearProjectSchema,
  fetchProjectSchema,
} from 'playpants/scenes/ProjectSettings/actions';
import { settingSchemaSelector } from '../../selectors';
import { arrToObj, formatActivitiesSchema } from './helpers';

import SettingSchema from '../SettingSchema';

export const ActivitiesSettingsBase = ({
  activitySettings: rawSettings,
  clearSchema,
  fetchSchema,
  settingSchema,
  updateProjectSetting,
}) => {
  const activitySettings = useMemo(() => {
    if (!(settingSchema && settingSchema.items)) return rawSettings;
    const {
      items: {
        properties: {
          type: { enum: availableTypes },
          ...properties
        },
      },
    } = settingSchema;
    return [
      ...rawSettings,
      ...availableTypes
        .filter(type => !rawSettings.find(s => s.type === type))
        .map(type =>
          Object.entries(properties).reduce(
            (acc, [key, settings]) => {
              if (['type'].includes(key)) return acc;
              let value = settings?.default;
              switch (key) {
                case 'name':
                  value = SERVICE_LABELS[type] || type;
                  break;
                case 'context':
                  value = {};
                  break;
                default:
              }
              if (value === undefined) {
                switch (settings.type) {
                  case 'boolean':
                    value = false;
                    break;
                  case 'number':
                    value = 0;
                    break;
                  default:
                    value = null;
                }
              }
              return { ...acc, [key]: value };
            },
            { type }
          )
        ),
    ];
  }, [rawSettings, settingSchema]);
  useEffect(() => {
    fetchSchema('project_setting_activity_settings');
    return () => clearSchema();
  }, []);

  const handleSubmit = ({ formData }) => {
    updateProjectSetting(
      'activity_settings',
      Object.values(formData.activity_types)
    );
  };

  if (
    !isEmpty(settingSchema) &&
    settingSchema.description.includes('Activity Settings')
  ) {
    const activitySettingsSchema = formatActivitiesSchema(
      settingSchema,
      activitySettings
    );
    const formData = {
      activity_types: arrToObj(activitySettings, 'type'),
    };
    const formContext = {
      titleFields: ['activity_types'],
      listFields: Object.keys(
        activitySettingsSchema.properties.activity_types.properties
      ),
    };
    return (
      <SettingSchema
        formContext={formContext}
        formData={formData}
        handleSubmit={handleSubmit}
        settingSchema={activitySettingsSchema}
      />
    );
  }
  return null;
};

ActivitiesSettingsBase.propTypes = {
  activitySettings: PropTypes.arrayOf(PropTypes.object).isRequired,
  clearSchema: PropTypes.func.isRequired,
  fetchSchema: PropTypes.func.isRequired,
  settingSchema: PropTypes.object,
  updateProjectSetting: PropTypes.func.isRequired,
};
ActivitiesSettingsBase.defaultProps = {
  settingSchema: {},
};

const mapStateToProps = state => ({
  activitySettings: activitySettingsSelector(state),
  settingSchema: settingSchemaSelector(state),
});

const mapDispatchToProps = dispatch => ({
  clearSchema: bindActionCreators(clearProjectSchema, dispatch),
  fetchSchema: bindActionCreators(fetchProjectSchema, dispatch),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ActivitiesSettingsBase);
