import React, { forwardRef, useCallback, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import moment from 'moment-timezone';
import isEmpty from 'lodash/isEmpty';

import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Icon from '@material-ui/core/Icon';
import IconButton from '@material-ui/core/IconButton';

import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-material.css';

import { useDispatch, useSelector } from '../../../AppStore';
import { tasksDataSelector } from '../../selectors';
import {
  currentProjectSelector,
  timezoneSelector,
} from '../../../modules/user/selectors';
import { fetchTasks } from '../../../modules/tasks/index';

import { colDefs, getTaskIconStyle } from './constants';

import styles from './index.module.css';

const TaskViewButton = forwardRef((props, ref) => {
  const { classes } = props;
  const currentProject = useSelector(currentProjectSelector);
  const tasks = useSelector(tasksDataSelector);
  const userTimezone = useSelector(timezoneSelector);
  const dispatch = useDispatch();

  const [isActive, setIsActive] = useState(true);

  const setActiveTab = () =>
    document.hidden ? setIsActive(false) : setIsActive(true);

  useEffect(() => {
    document.addEventListener('visibilitychange', setActiveTab);
    document.addEventListener('mozvisibilitychange', setActiveTab);
    document.addEventListener('msvisibilitychange', setActiveTab);
    document.addEventListener('webkitvisibilitychange', setActiveTab);
    return () => {
      document.removeEventListener('visibilitychange', setActiveTab);
      document.removeEventListener('mozvisibilitychange', setActiveTab);
      document.removeEventListener('msvisibilitychange', setActiveTab);
      document.removeEventListener('webkitvisibilitychange', setActiveTab);
    };
  }, []);

  const getTasks = useCallback(
    (project, activeTab) =>
      activeTab &&
      dispatch(
        fetchTasks({
          created_at__gte: moment().subtract(1, 'days').unix(),
          parent__isnull: true,
          project,
        })
      ),
    [dispatch]
  );

  const delay = 30000;

  useEffect(() => {
    getTasks(currentProject.id, isActive);
  }, [currentProject.id, isActive, getTasks]);

  useEffect(() => {
    const id = setInterval(() => getTasks(currentProject.id, isActive), delay);
    return () => clearInterval(id);
  }, [currentProject.id, delay, isActive, getTasks]);

  const [taskDialogOpen, setTaskDialogOpen] = useState(false);

  const onGridReady = ({ api }) => {
    api.sizeColumnsToFit();
  };

  const footerButtons = [
    <Button key="secondary" onClick={() => setTaskDialogOpen(false)}>
      Close
    </Button>,
  ];

  return (
    <>
      <Dialog
        fullWidth
        maxWidth="lg"
        onClose={() => setTaskDialogOpen(false)}
        open={taskDialogOpen}
      >
        <DialogTitle>Recent Tasks in the Past 24 Hours</DialogTitle>
        <DialogContent>
          <div className={classNames('ag-theme-material', styles.tasksList)}>
            <AgGridReact
              {...colDefs({ userTimezone, taskProps: props })}
              onGridReady={onGridReady}
              rowData={tasks}
              rowClass={styles.tasksListRow}
            />
          </div>
        </DialogContent>
        <DialogActions>{footerButtons}</DialogActions>
      </Dialog>
      {!isEmpty(tasks) && (
        <IconButton
          className={styles.pinningButton}
          onClick={() => setTaskDialogOpen(true)}
          style={{ cursor: 'pointer' }}
          color="primary"
          ref={ref}
        >
          <Icon
            className={classNames(
              getTaskIconStyle(classes, tasks),
              styles.taskIcon
            )}
          >
            lens
          </Icon>
        </IconButton>
      )}
    </>
  );
});

TaskViewButton.displayName = 'TaskViewButton';

TaskViewButton.propTypes = {
  classes: PropTypes.object,
};

TaskViewButton.defaultProps = {
  classes: {},
};

export default TaskViewButton;
