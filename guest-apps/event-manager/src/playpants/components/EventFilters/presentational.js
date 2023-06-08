import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Divider from '@material-ui/core/Divider';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';

import EventFilterGroup from './components/EventFilterGroup';
import styles from './presentational.module.css';

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    overflow: 'hidden',
    backgroundColor: theme.palette.background.paper,
    marginTop: '-4px',
    marginLeft: '-6px',
  },
  gridList: {
    width: 400,
  },
}));

const EventFiltersStateless = ({
  filterGroups,
  informationalEventsEnabled,
  eventManagerEventsEnabled,
  ...props
}) => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <GridList cellHeight="auto" className={classes.gridList} spacing={1}>
        {filterGroups.map(filterGroup => {
          if (
            (filterGroup.name === 'informationalEvents' &&
              !informationalEventsEnabled) ||
            (filterGroup.name === 'eventManager' && !eventManagerEventsEnabled)
          ) {
            return null;
          }

          const cols = ['environments', 'platforms'].includes(filterGroup.name)
            ? 1
            : 2;
          return (
            <GridListTile
              key={filterGroup.name}
              cols={cols}
              rows={cols}
              style={{ height: '100% !important' }}
            >
              {filterGroup.name === 'externalEvents' && (
                <Divider variant="middle" />
              )}
              {filterGroup.name === 'eventManager' && (
                <Divider variant="middle" className={styles.dividerEM} />
              )}
              <EventFilterGroup {...props} group={filterGroup} />
            </GridListTile>
          );
        })}
      </GridList>
    </div>
  );
};

EventFiltersStateless.propTypes = {
  filterGroups: PropTypes.array,
  informationalEventsEnabled: PropTypes.bool,
  eventManagerEventsEnabled: PropTypes.bool,
};

EventFiltersStateless.defaultProps = {
  filterGroups: [],
  informationalEventsEnabled: false,
  eventManagerEventsEnabled: false,
};

export default EventFiltersStateless;
