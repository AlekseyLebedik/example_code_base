import React from 'react';
import PropTypes from 'prop-types';

import Chip from '@material-ui/core/Chip';
import Grid from '@material-ui/core/Grid';
import Avatar from '@material-ui/core/Avatar';

const EventDetailActivityChips = ({ uniqActivities, activities, classes }) => (
  <Grid container spacing={1} className={classes.chipContainer}>
    {uniqActivities.map(uniqActivity => (
      <Grid item key={uniqActivity.type}>
        <Chip
          avatar={
            <Avatar className={classes.activityAvatar}>
              {
                activities.filter(
                  activity => activity.type === uniqActivity.type
                ).length
              }
            </Avatar>
          }
          label={uniqActivity.type}
          className={classes.activityChip}
        />
      </Grid>
    ))}
  </Grid>
);

EventDetailActivityChips.propTypes = {
  uniqActivities: PropTypes.arrayOf(PropTypes.object).isRequired,
  activities: PropTypes.arrayOf(PropTypes.object).isRequired,
  classes: PropTypes.object.isRequired,
};

export default EventDetailActivityChips;
