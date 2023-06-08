import React from 'react';
import PropTypes from 'prop-types';
import isEmpty from 'lodash/isEmpty';

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListSubheader from '@material-ui/core/ListSubheader';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Icon from '@material-ui/core/Icon';

import { STATE_ICON_MAP } from 'playpants/constants/tasks';

const SubTasks = ({ classes, subTasks, handleOnSelectItem }) =>
  !isEmpty(subTasks) && (
    <List
      component="nav"
      subheader={<ListSubheader component="div">Sub Tasks</ListSubheader>}
    >
      {subTasks.map(task => (
        <ListItem
          button
          key={task.id}
          onClick={() => handleOnSelectItem(task.id)}
        >
          <ListItemIcon>
            <Icon className={classes[`${task.state}-subtask-list-item-icon`]}>
              {STATE_ICON_MAP[task.state]}
            </Icon>
          </ListItemIcon>
          <ListItemText primary={task.title} />
        </ListItem>
      ))}
    </List>
  );

SubTasks.propTypes = {
  classes: PropTypes.object.isRequired,
  handleOnSelectItem: PropTypes.func.isRequired,
  subTasks: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default SubTasks;
