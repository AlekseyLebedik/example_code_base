import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Collapse from '@material-ui/core/Collapse';
import Icon from '@material-ui/core/Icon';

import {
  getConflictActivityInfo,
  getConflictEventInfo,
  isConflictingActivitySelected,
  isConflictingEventSelected,
  splitConflictUrlId,
} from 'playpants/scenes/Event/components/Conflicts/helpers';

import styles from './index.module.css';

const ConflictListItem = ({
  classes,
  conflict,
  handleConflictSelection,
  selectedItemId,
}) => {
  const { conflicting_event: conflictingEvent, conflicts, severity } = conflict;
  const isEventSelected = isConflictingEventSelected(
    conflictingEvent.id,
    selectedItemId &&
      selectedItemId.length &&
      splitConflictUrlId(selectedItemId)[0]
  );

  return (
    <>
      <ListItem
        button
        className={classes[`${severity}-list-item`]}
        onClick={() => handleConflictSelection(conflictingEvent.id, null, null)}
        selected={isEventSelected}
      >
        <ListItemText primary={getConflictEventInfo(conflictingEvent)} />
        {conflicts.length > 0 && (
          <ListItemIcon>
            <Icon>{isEventSelected ? 'expand_less' : 'expand_more'}</Icon>
          </ListItemIcon>
        )}
      </ListItem>
      {conflicts.length > 0 && (
        <Collapse in={isEventSelected} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            {conflicts.map(
              ({
                event_activity: eventActivity,
                overlapping_event_activity: overlappingActivity,
                severity: conflictSeverity,
              }) => (
                <ListItem
                  button
                  className={classNames(
                    styles.nested,
                    classes[`${conflictSeverity}-list-item`]
                  )}
                  key={`${eventActivity.id}/${overlappingActivity.id}`}
                  onClick={() =>
                    handleConflictSelection(
                      conflictingEvent.id,
                      eventActivity.id,
                      overlappingActivity.id
                    )
                  }
                  selected={isConflictingActivitySelected(
                    conflictingEvent.id,
                    eventActivity.id,
                    overlappingActivity.id,
                    ...splitConflictUrlId(selectedItemId)
                  )}
                >
                  <ListItemText
                    primary={getConflictActivityInfo(
                      eventActivity,
                      overlappingActivity
                    )}
                  />
                </ListItem>
              )
            )}
          </List>
        </Collapse>
      )}
    </>
  );
};

ConflictListItem.propTypes = {
  classes: PropTypes.object.isRequired,
  conflict: PropTypes.object.isRequired,
  handleConflictSelection: PropTypes.func.isRequired,
  selectedItemId: PropTypes.string,
};

ConflictListItem.defaultProps = {
  selectedItemId: '',
};

export default ConflictListItem;
