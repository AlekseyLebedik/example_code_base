import React, { useEffect } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import isEmpty from 'lodash/isEmpty';

import { eventSettingsSelector } from 'playpants/components/App/selectors';
import {
  clearProjectSchema,
  fetchProjectSchema,
} from 'playpants/scenes/ProjectSettings/actions';
import { settingSchemaSelector } from '../../selectors';

import SettingSchema from '../SettingSchema';

export const EventSettings = ({
  clearSchema,
  eventSettings,
  fetchSchema,
  settingSchema,
  updateProjectSetting,
}) => {
  useEffect(() => {
    fetchSchema('project_setting_event_settings');
    return () => clearSchema();
  }, []);

  const handleSubmit = ({ formData }) =>
    updateProjectSetting('event_settings', formData);

  if (
    !isEmpty(settingSchema) &&
    settingSchema.description.includes('Event Settings')
  ) {
    const formContext = {
      titleFields: ['statuses'],
      listFields: Object.keys(settingSchema.properties.statuses.properties),
    };
    return (
      <SettingSchema
        formContext={formContext}
        formData={eventSettings}
        handleSubmit={handleSubmit}
        settingSchema={settingSchema}
      />
    );
  }
  return null;
};

EventSettings.propTypes = {
  clearSchema: PropTypes.func.isRequired,
  eventSettings: PropTypes.object.isRequired,
  fetchSchema: PropTypes.func.isRequired,
  settingSchema: PropTypes.object,
  updateProjectSetting: PropTypes.func.isRequired,
};
EventSettings.defaultProps = {
  settingSchema: {},
};

const mapStateToProps = state => ({
  eventSettings: eventSettingsSelector(state),
  settingSchema: settingSchemaSelector(state),
});

const mapDispatchToProps = dispatch => ({
  clearSchema: bindActionCreators(clearProjectSchema, dispatch),
  fetchSchema: bindActionCreators(fetchProjectSchema, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(EventSettings);
