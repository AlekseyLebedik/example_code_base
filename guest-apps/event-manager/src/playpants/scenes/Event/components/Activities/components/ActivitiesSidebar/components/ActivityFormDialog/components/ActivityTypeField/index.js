import React from 'react';
import PropTypes from 'prop-types';
import { Field } from 'redux-form';
import { required } from 'dw/core/components/FormFields/validation';
import CassetteSelect from 'playpants/components/FormFields/CassetteSelect';
import { useActivityPermissions } from 'playpants/hooks';

const ActivityTypeField = ({ activitySettings, detachedEvent }) => {
  const activityPermissionsMap = useActivityPermissions();
  return (
    <Field
      component={CassetteSelect}
      fullWidth
      helperText="Activity Type"
      name="activityType"
      options={activitySettings.map(activity => ({
        label: activity.name,
        value: activity.type,
        disabled: detachedEvent
          ? activity.type !== 'client_commands'
          : !activityPermissionsMap[activity.type],
      }))}
      validate={[required]}
    />
  );
};

ActivityTypeField.propTypes = {
  activitySettings: PropTypes.arrayOf(PropTypes.object).isRequired,
  detachedEvent: PropTypes.bool.isRequired,
};

export default ActivityTypeField;
