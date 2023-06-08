import React from 'react';
import PropTypes from 'prop-types';
import Grid from '@material-ui/core/Grid';
import DurationField from '../DurationField';

const Duration = ({ classes, duration, handleChange, useRedux }) => (
  <Grid container spacing={2} item xs={12} classes={classes}>
    <Grid item xs={3}>
      <DurationField
        defaultValue={duration.d}
        handleChange={handleChange}
        label="Day(s)"
        name="duration.d"
        type="days"
        useRedux={useRedux}
      />
    </Grid>
    <Grid item xs={3}>
      <DurationField
        defaultValue={{ value: duration.h, label: `${duration.h}` }}
        handleChange={handleChange}
        label="Hr(s)"
        name="duration.h"
        type="hours"
        useRedux={useRedux}
      />
    </Grid>
    <Grid item xs={3}>
      <DurationField
        defaultValue={{ value: duration.m, label: `${duration.m}` }}
        handleChange={handleChange}
        label="Min(s)"
        name="duration.m"
        type="minutes"
        useRedux={useRedux}
      />
    </Grid>
    <Grid item xs={3}>
      <DurationField
        defaultValue={{ value: duration.s, label: `${duration.s}` }}
        handleChange={handleChange}
        label="Sec(s)"
        name="duration.s"
        type="seconds"
        useRedux={useRedux}
      />
    </Grid>
  </Grid>
);

Duration.propTypes = {
  classes: PropTypes.object,
  duration: PropTypes.object.isRequired,
  handleChange: PropTypes.func,
  useRedux: PropTypes.bool,
};
Duration.defaultProps = {
  classes: {},
  handleChange: null,
  useRedux: true,
};

export default Duration;
