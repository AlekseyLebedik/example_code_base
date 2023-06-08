import React, { useEffect } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import isEmpty from 'lodash/isEmpty';

import { globalSettingsSelector } from 'playpants/components/App/selectors';
import {
  clearProjectSchema,
  fetchProjectSchema,
} from 'playpants/scenes/ProjectSettings/actions';
import { settingSchemaSelector } from '../../selectors';

import SettingSchema from '../SettingSchema';

export const GlobalSettingsBase = ({
  clearSchema,
  fetchSchema,
  globalSettings,
  settingSchema,
  updateProjectSetting,
}) => {
  useEffect(() => {
    fetchSchema('project_setting_global_settings');
    return () => clearSchema();
  }, []);

  const handleSubmit = ({ formData }) =>
    updateProjectSetting('settings', formData);

  const formContext = {
    labeledFields:
      settingSchema.properties && Object.keys(settingSchema.properties),
  };

  return (
    !isEmpty(settingSchema) &&
    settingSchema.description.includes('Global Settings') && (
      <SettingSchema
        formContext={formContext}
        formData={globalSettings}
        handleSubmit={handleSubmit}
        settingSchema={settingSchema}
      />
    )
  );
};

GlobalSettingsBase.propTypes = {
  clearSchema: PropTypes.func.isRequired,
  fetchSchema: PropTypes.func.isRequired,
  globalSettings: PropTypes.object.isRequired,
  settingSchema: PropTypes.object,
  updateProjectSetting: PropTypes.func.isRequired,
};
GlobalSettingsBase.defaultProps = {
  settingSchema: {},
};

const mapStateToProps = state => ({
  globalSettings: globalSettingsSelector(state),
  settingSchema: settingSchemaSelector(state),
});

const mapDispatchToProps = dispatch => ({
  clearSchema: bindActionCreators(clearProjectSchema, dispatch),
  fetchSchema: bindActionCreators(fetchProjectSchema, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(GlobalSettingsBase);
