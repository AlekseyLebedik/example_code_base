import React from 'react';
import PropTypes from 'prop-types';
import sortBy from 'lodash/sortBy';

import Chip from '@material-ui/core/Chip';
import Grid from '@material-ui/core/Grid';

const EventItemChips = ({ uniqItems, classes }) => (
  <Grid container spacing={1} className={classes.chipContainer}>
    {sortBy(uniqItems).map(uniqItem => (
      <Grid item key={uniqItem}>
        <Chip label={uniqItem} className={classes.activityChip} />
      </Grid>
    ))}
  </Grid>
);

EventItemChips.propTypes = {
  classes: PropTypes.object.isRequired,
  uniqItems: PropTypes.arrayOf(PropTypes.string),
};

EventItemChips.defaultProps = {
  uniqItems: [],
};

export default EventItemChips;
