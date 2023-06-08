import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import moment from 'moment-timezone';
import { Link } from 'react-router-dom';

import { withStyles } from '@material-ui/core/styles';
import Icon from '@material-ui/core/Icon';
import IconButton from '@material-ui/core/IconButton';
import LinearProgress from '@material-ui/core/LinearProgress';
import Tooltip from '@material-ui/core/Tooltip';

import styles from './index.module.css';

const TASK_TYPES = {
  cancelled: 'Cancelled',
  failed: 'Failed',
  'in-progress': 'In Progress',
  succeeded: 'Succeeded',
  'timed-out': 'Timed Out',
};

const STATE_ICON_MAP = {
  cancelled: 'cancel',
  failed: 'error',
  'in-progress': 'watch_later',
  succeeded: 'check_circle',
  'timed-out': 'hourglass_empty',
};

const BorderLinearProgress = withStyles(() => ({
  root: { height: 12 },
}))(LinearProgress);

const getTaskLink = ({
  id: taskId,
  owner_id: ownerId,
  owner_type: ownerType,
  project,
}) =>
  ownerType === 'story'
    ? `/event-manager/${project}/timewarp/schedules/${ownerId}/tasks/${taskId}`
    : `/event-manager/${project}/events/${ownerId}/tasks/${taskId}`;

const TaskLink = ({ data }) => (
  <div className={styles.taskCellContent}>
    <Tooltip title="View Task">
      <IconButton component={Link} target="_blank" to={getTaskLink(data)}>
        <Icon>tab</Icon>
      </IconButton>
    </Tooltip>
  </div>
);

TaskLink.propTypes = {
  data: PropTypes.object.isRequired,
};

const TaskProgress = ({ data: { progress } }) => (
  <div className={styles.taskProgressContainer}>
    <div className={styles.taskProgressBar}>
      <BorderLinearProgress variant="determinate" value={progress * 100} />
    </div>
    <div className={styles.taskProgressValue}>
      {`${Number(progress * 100).toFixed(2)} %`}
    </div>
  </div>
);

TaskProgress.propTypes = {
  data: PropTypes.shape({
    progress: PropTypes.number.isRequired,
  }).isRequired,
};

const TaskTitle = ({ taskProps: { classes }, data: { state, title } }) => (
  <div className={styles.taskCellContent}>
    <Tooltip title={TASK_TYPES[state]}>
      <Icon
        className={classNames(classes[`task-${state}`], styles.taskTitleIcon)}
      >
        {STATE_ICON_MAP[state]}
      </Icon>
    </Tooltip>
    <div className={styles.taskTitle}>{title}</div>
  </div>
);

TaskTitle.propTypes = {
  taskProps: PropTypes.object.isRequired,
  data: PropTypes.shape({
    state: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
  }).isRequired,
};

const getTimeValue = (timestamp, userTimezone) =>
  timestamp !== null
    ? moment.tz(timestamp * 1000, userTimezone).format('MMM DD, YYYY hh:mm a z')
    : 'N/A';

export const getTaskIconStyle = (classes, tasks) => {
  if (tasks.find(t => t.state === 'failed')) return classes['task-failed'];
  if (tasks.find(t => t.state === 'timed-out'))
    return classes['task-timed-out'];
  if (tasks.find(t => t.state === 'in-progress'))
    return classes['task-in-progress'];
  return classes['task-succeeded'];
};

export const colDefs = ({ userTimezone, taskProps }) => ({
  columnDefs: [
    {
      cellRenderer: 'taskTitle',
      cellRendererParams: { taskProps },
      field: 'title',
      filter: 'agTextColumnFilter',
      headerName: 'Title',
      cellClass: [styles.noBorder],
    },
    {
      cellRenderer: 'taskProgress',
      field: 'progress',
      filter: 'agTextColumnFilter',
      headerName: 'Progress',
      cellClass: [styles.noBorder],
    },
    {
      field: 'created_at',
      filter: 'agTextColumnFilter',
      headerName: 'Created At',
      sort: 'desc',
      valueGetter: params => getTimeValue(params.data.created_at, userTimezone),
      cellClass: [styles.noBorder],
      width: 120,
    },
    {
      field: 'ended_at',
      filter: 'agTextColumnFilter',
      headerName: 'Ended At',
      valueGetter: params => getTimeValue(params.data.ended_at, userTimezone),
      cellClass: [styles.noBorder],
      width: 120,
    },
    {
      cellRenderer: 'taskLink',
      field: 'link',
      headerName: '',
      cellClass: [styles.noBorder],
      width: 30,
    },
  ],
  defaultColDef: {
    filter: true,
    lockPosition: true,
    menuTabs: ['filterMenuTab'],
    resizable: true,
    sortable: true,
  },
  domLayout: 'autoHeight',
  frameworkComponents: {
    taskLink: TaskLink,
    taskProgress: TaskProgress,
    taskTitle: TaskTitle,
  },
  onGridSizeChanged: params => params.api.sizeColumnsToFit(),
  pagination: true,
  paginationPageSize: 10,
  supressCellSelection: true,
});
