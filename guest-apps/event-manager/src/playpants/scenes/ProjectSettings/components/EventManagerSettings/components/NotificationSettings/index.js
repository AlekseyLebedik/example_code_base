import React, { useEffect } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import isEmpty from 'lodash/isEmpty';

import { notificationSettingsSelector } from 'playpants/components/App/selectors';
import {
  clearProjectSchema,
  fetchProjectSchema,
} from 'playpants/scenes/ProjectSettings/actions';
import { settingSchemaSelector } from '../../selectors';

import SettingSchema from '../SettingSchema';

export const NotificationSettingsBase = ({
  clearSchema,
  notificationSettings,
  fetchSchema,
  settingSchema,
  updateProjectSetting,
}) => {
  useEffect(() => {
    fetchSchema('project_setting_notification_settings');
    return () => clearSchema();
  }, []);

  const handleSubmit = ({ formData }) =>
    updateProjectSetting('notification_settings', formData);

  if (
    !isEmpty(settingSchema) &&
    settingSchema.description.includes('Notification Settings')
  ) {
    const formContext = {
      titleFields: ['email', 'slack'],
      listFields: [
        ...Object.keys(
          settingSchema.properties.email.properties.type_settings.properties
        ),
      ],
      labeledFields: ['address', 'channel'],
    };

    return (
      <SettingSchema
        formContext={formContext}
        formData={notificationSettings}
        handleSubmit={handleSubmit}
        settingSchema={settingSchema}
        rootAsRow
        fieldsToTop={['address', 'channel']}
      />
    );
  }
  return null;
};

NotificationSettingsBase.propTypes = {
  clearSchema: PropTypes.func.isRequired,
  notificationSettings: PropTypes.object.isRequired,
  fetchSchema: PropTypes.func.isRequired,
  settingSchema: PropTypes.object,
  updateProjectSetting: PropTypes.func.isRequired,
};
NotificationSettingsBase.defaultProps = {
  settingSchema: {},
};

const mapStateToProps = state => ({
  notificationSettings: notificationSettingsSelector(state),
  settingSchema: settingSchemaSelector(state),
});

const mapDispatchToProps = dispatch => ({
  clearSchema: bindActionCreators(clearProjectSchema, dispatch),
  fetchSchema: bindActionCreators(fetchProjectSchema, dispatch),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(NotificationSettingsBase);
