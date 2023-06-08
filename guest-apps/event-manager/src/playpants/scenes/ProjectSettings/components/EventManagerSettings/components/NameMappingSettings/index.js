import React, { useEffect } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import isEmpty from 'lodash/isEmpty';

import {
  clearProjectSchema,
  fetchProjectSchema,
} from 'playpants/scenes/ProjectSettings/actions';
import { activitySettingsSelector } from 'playpants/components/App/selectors';
import { settingSchemaSelector } from '../../selectors';
import {
  formatVariableSchema,
  formatVariableFormData,
  getUpdatedActivitySettings,
} from './helpers';

import UploadVariables from './components/UploadVariables';

import SettingSchema from '../SettingSchema';

export const NameMappingSettingsBase = ({
  activitySettings,
  clearSchema,
  fetchSchema,
  settingSchema,
  updateProjectSetting,
}) => {
  useEffect(() => {
    fetchSchema('project_setting_activity_settings');
    return () => clearSchema();
  }, []);

  const handleSubmit = ({ formData }) => {
    const variables = formData['pubvars variable mapping'].variable_mapping;
    const updatedSettings = getUpdatedActivitySettings(
      activitySettings,
      variables
    );
    updateProjectSetting('activity_settings', updatedSettings);
  };

  if (
    !isEmpty(settingSchema) &&
    settingSchema.description.includes('Activity Settings')
  ) {
    const variableMapping = activitySettings.find(
      setting => setting.type === 'pubvars'
    ).variable_mapping;
    const variablesSchema =
      variableMapping && formatVariableSchema(variableMapping);
    const formData = variableMapping && formatVariableFormData(variableMapping);
    const formContext = {
      titleFields: ['pubvars variable mapping'],
      listFields: ['variable_mapping'],
    };

    return (
      <>
        <UploadVariables
          activitySettings={activitySettings}
          hasVariables={!!variableMapping}
          updateProjectSetting={updateProjectSetting}
        />
        {variableMapping && (
          <SettingSchema
            formContext={formContext}
            formData={formData}
            handleSubmit={handleSubmit}
            settingSchema={variablesSchema}
          />
        )}
      </>
    );
  }
  return null;
};

NameMappingSettingsBase.propTypes = {
  activitySettings: PropTypes.arrayOf(PropTypes.object).isRequired,
  clearSchema: PropTypes.func.isRequired,
  fetchSchema: PropTypes.func.isRequired,
  settingSchema: PropTypes.object,
  updateProjectSetting: PropTypes.func.isRequired,
};
NameMappingSettingsBase.defaultProps = {
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
)(NameMappingSettingsBase);
