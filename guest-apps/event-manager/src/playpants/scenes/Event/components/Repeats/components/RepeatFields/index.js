import React from 'react';
import PropTypes from 'prop-types';

import Grid from '@material-ui/core/Grid';

import RepeatEndDate from './components/RepeatEndDate';
import RepeatFreq from './components/RepeatFreq';

const RepeatFieldsBase = props => (
  <Grid container spacing={2}>
    <Grid item xs={12}>
      <RepeatFreq {...props} />
    </Grid>
    <Grid item xs={12}>
      <RepeatEndDate {...props} label="Repeats end at" type="end_repeat_at" />
    </Grid>
  </Grid>
);

RepeatFieldsBase.propTypes = {
  classes: PropTypes.object.isRequired,
  eventData: PropTypes.object.isRequired,
};

export default RepeatFieldsBase;
