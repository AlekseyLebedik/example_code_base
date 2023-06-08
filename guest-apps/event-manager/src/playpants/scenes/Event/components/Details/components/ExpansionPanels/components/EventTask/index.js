import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import Grid from '@material-ui/core/Grid';
import Tooltip from '@material-ui/core/Tooltip';
import Badge from '@material-ui/core/Badge';

import { TASK_STATE } from '../../constants';

const EventTask = ({ badgeCount: { tasksBool }, classes, eventData }) => (
  <>
    <Grid item xs={6} className={classes.grey}>
      Task
    </Grid>
    <Grid item xs={6}>
      <Badge variant="dot" invisible={!tasksBool}>
        <Tooltip title={eventData.task.title}>
          <div
            className={classNames(
              classes[TASK_STATE[eventData.task.state]],
              classes.bold,
              classes.capitalize
            )}
          >
            {eventData.task.state}
          </div>
        </Tooltip>
      </Badge>
    </Grid>
  </>
);

EventTask.propTypes = {
  badgeCount: PropTypes.object.isRequired,
  classes: PropTypes.object.isRequired,
  eventData: PropTypes.object.isRequired,
};

export default EventTask;
