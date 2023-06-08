import React from 'react';
import PropTypes from 'prop-types';

import TextField from '@material-ui/core/TextField';

const PyscriptConflicts = props => {
  const { activity, classes, details } = props;
  const parsedActivity = JSON.parse(activity.activity);
  const { name, template_id: tempId, version } = parsedActivity;
  const isConflict = details.find(detail => detail === tempId);
  const pyscriptFieldClass = isConflict
    ? classes.activityConflictFieldInConflict
    : classes.activityConflictField;

  return (
    <>
      <TextField
        disabled
        FormHelperTextProps={{
          className: pyscriptFieldClass,
        }}
        helperText={isConflict && 'Templates in conflict!'}
        InputProps={{
          className: pyscriptFieldClass,
          disableUnderline: true,
        }}
        InputLabelProps={{
          className: pyscriptFieldClass,
        }}
        label="Template"
        value={name || 'N/A'}
      />
      <TextField
        disabled
        InputProps={{
          className: classes.activityConflictField,
          disableUnderline: true,
        }}
        InputLabelProps={{
          className: classes.activityConflictField,
        }}
        label="Version"
        value={version || 'N/A'}
      />
    </>
  );
};

PyscriptConflicts.propTypes = {
  activity: PropTypes.object.isRequired,
  classes: PropTypes.object.isRequired,
  details: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default PyscriptConflicts;
