import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import Grid from '@material-ui/core/Grid';

import { STATUS_STATE } from '../../constants';

const EventStatus = ({ eventData, status, classes }) => (
  <>
    <Grid item xs={6} className={classes.grey}>
      Status
    </Grid>
    <Grid
      item
      xs={6}
      className={classNames(
        classes[STATUS_STATE[eventData.status]],
        classes.bold,
        classes.capitalize
      )}
    >
      {status.name}
    </Grid>
  </>
);

EventStatus.propTypes = {
  status: PropTypes.object.isRequired,
  eventData: PropTypes.object.isRequired,
  classes: PropTypes.object.isRequired,
};

export default EventStatus;
