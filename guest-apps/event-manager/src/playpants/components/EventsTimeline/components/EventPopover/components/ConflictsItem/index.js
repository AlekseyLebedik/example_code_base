import React from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';

import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

import Link from 'dw/core/components/Link';
import { CONFLICT_TYPES } from 'playpants/constants/conflicts';

const useStyles = makeStyles(theme => ({
  message: {
    color: '#9a9a9a',
    fontWeight: 500,
  },
  remark: {
    color: '#c81418',
  },
  conflictsSummaryLinks: {
    display: 'flex',
    flexDirection: 'column',
    maxHeight: '200px',
    overflowY: 'scroll',
    paddingBottom: '10px',
  },
  ...Object.entries(theme.conflicts.palette).reduce(
    (acc, [key, color]) => ({
      ...acc,
      [`conflict-${key}`]: {
        borderLeft: `3px solid ${color}`,
        paddingLeft: '6px',
        marginBottom: '8px',
      },
    }),
    {}
  ),
  conflictLink: {
    color: theme.palette.primary.main,
  },
}));

const ConflictsItem = ({ conflicts, baseUrl, classes: parentClasses }) => {
  const classes = { ...parentClasses, ...useStyles() };
  return (
    <Grid item key="conflicts" xs={12}>
      <Typography
        component="span"
        variant="subtitle1"
        display="inline"
        classes={{
          root: classes.message,
        }}
      >
        This event has <span className={classes.remark}>conflicts</span> with
        other events (click an event to view):
      </Typography>
      <div className={classes.conflictsSummaryLinks}>
        {conflicts.map(({ conflicting_event: conflictingEvent, severity }) => (
          <div
            key={`conflictingEventLink/${conflictingEvent.id}`}
            className={cn(classes[`conflict-${severity}`], classes.statusDot)}
          >
            <Link
              to={`${baseUrl}/${conflictingEvent.id}`}
              classes={{ root: classes.conflictLink }}
            >
              Event #{conflictingEvent.id}: {conflictingEvent.title} (
              {CONFLICT_TYPES[severity]})
            </Link>
          </div>
        ))}
      </div>
    </Grid>
  );
};

ConflictsItem.propTypes = {
  conflicts: PropTypes.arrayOf(PropTypes.object),
  baseUrl: PropTypes.string.isRequired,
  classes: PropTypes.object,
};

ConflictsItem.defaultProps = {
  conflicts: [],
  classes: {},
};

export default ConflictsItem;
