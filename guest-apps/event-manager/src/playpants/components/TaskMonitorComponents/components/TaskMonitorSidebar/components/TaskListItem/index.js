import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import isEmpty from 'lodash/isEmpty';

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Collapse from '@material-ui/core/Collapse';
import Icon from '@material-ui/core/Icon';

import styles from './index.module.css';

const TaskListItem = ({
  classes,
  task: { id, title, state, children },
  handleOnSelectItem,
  selectedItemId,
}) => {
  const selectedTask = parseInt(selectedItemId, 10);
  const selected =
    id === selectedTask ||
    children.some(subtask => subtask.id === selectedTask);
  return (
    <>
      <ListItem
        button
        className={classes[`${state}-task-list-item`]}
        selected={selected}
        onClick={() => handleOnSelectItem(id)}
      >
        <ListItemText primary={`${title} (${id})`} />
        {!isEmpty(children) && (
          <ListItemIcon>
            <Icon>{selected ? 'expand_less' : 'expand_more'}</Icon>
          </ListItemIcon>
        )}
      </ListItem>
      <Collapse in={selected} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          {children.map(subTask => (
            <ListItem
              button
              onClick={() => handleOnSelectItem(subTask.id)}
              className={classNames(
                styles.nested,
                classes[`${subTask.state}-task-list-item`]
              )}
              key={subTask.id}
              selected={subTask.id === selectedItemId}
            >
              <ListItemText primary={subTask.title} />
            </ListItem>
          ))}
        </List>
      </Collapse>
    </>
  );
};

TaskListItem.propTypes = {
  classes: PropTypes.object.isRequired,
  task: PropTypes.object.isRequired,
  handleOnSelectItem: PropTypes.func.isRequired,
  selectedItemId: PropTypes.string.isRequired,
};

export default TaskListItem;
