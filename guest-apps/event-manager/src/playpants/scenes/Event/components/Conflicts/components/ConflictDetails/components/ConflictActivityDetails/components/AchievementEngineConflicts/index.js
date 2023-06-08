import React from 'react';
import PropTypes from 'prop-types';

import TextField from '@material-ui/core/TextField';

const AchievementEngineConflicts = props => {
  const { activity, classes, details } = props;
  const { label } = JSON.parse(activity.activity).ruleset_to_activate;
  const isConflict = details.find(detail => detail === label);
  const aeFieldClass = isConflict
    ? classes.activityConflictFieldInConflict
    : classes.activityConflictField;

  return (
    <TextField
      disabled
      FormHelperTextProps={{
        className: aeFieldClass,
      }}
      helperText={isConflict && 'Rulesets in conflict!'}
      InputProps={{
        className: aeFieldClass,
        disableUnderline: true,
      }}
      InputLabelProps={{
        className: aeFieldClass,
      }}
      label="Ruleset"
      value={label || 'N/A'}
    />
  );
};

AchievementEngineConflicts.propTypes = {
  activity: PropTypes.object.isRequired,
  classes: PropTypes.object.isRequired,
  details: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default AchievementEngineConflicts;
