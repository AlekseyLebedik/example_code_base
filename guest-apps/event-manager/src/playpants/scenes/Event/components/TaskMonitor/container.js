import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { joinPath } from 'dw/core/helpers/path';
import { connect } from 'dw/core/helpers/component';
import * as selectors from 'playpants/components/TaskMonitorComponents/selectors';
import { TASK_MONITOR_TAB_OPTIONS } from './constants';
import {
  taskMonitorSelector,
  taskMonitorInitialTabSelector,
} from './selectors';
import * as actions from './actions';
import TaskMonitorStateless from './presentational';

const TaskMonitor = ({
  _onFetchEventTasks,
  _onResetTaskMonitor,
  _onStartFetchTaskDetail,
  _onStopFetchTaskDetail,
  eventId,
  eventUrl,
  match,
  ...props
}) => {
  useEffect(() => {
    _onFetchEventTasks(eventId);
  }, [eventId]);

  useEffect(() => {
    _onStopFetchTaskDetail();
    const { tab, tabId } = match.params;
    if (tab === 'tasks' && tabId) {
      _onStartFetchTaskDetail(tabId);
    }
  }, [match.params.tabId]);

  useEffect(
    () => () => {
      _onStopFetchTaskDetail();
      _onResetTaskMonitor();
    },
    []
  );

  return (
    <TaskMonitorStateless
      {...props}
      _baseUrl={joinPath(eventUrl, 'tasks')}
      _tabOptions={TASK_MONITOR_TAB_OPTIONS}
    />
  );
};
TaskMonitor.propTypes = {
  _onFetchEventTasks: PropTypes.func.isRequired,
  _onStartFetchTaskDetail: PropTypes.func.isRequired,
  _onStopFetchTaskDetail: PropTypes.func.isRequired,
  _onResetTaskMonitor: PropTypes.func.isRequired,
  eventId: PropTypes.number.isRequired,
  eventUrl: PropTypes.string.isRequired,
  match: PropTypes.object.isRequired,
};
const mapStateToProps = state => ({
  _initialTab: taskMonitorInitialTabSelector(state),

  _overviewDetails:
    selectors.overviewDetailsSelector(taskMonitorSelector)(state),
  _taskDetails: selectors.taskDetailsSelector(taskMonitorSelector)(state),
  _tasksData:
    selectors.taskMonitorTasksDataSelector(taskMonitorSelector)(state),
  _subTasks: selectors.subTasksSelector(taskMonitorSelector)(state),
});

const mapDispatchToProps = dispatch => ({
  _onResetTaskMonitor: () => dispatch(actions.resetTaskMonitor()),
  _onFetchEventTasks: (id, type) => dispatch(actions.fetchEventTasks(id, type)),
  _onStartFetchTaskDetail: id =>
    dispatch(actions.startSelectedTaskDetailFetch(id)),
  _onStopFetchTaskDetail: () => dispatch(actions.stopSelectedTaskDetailFetch()),
});

export default connect(mapStateToProps, mapDispatchToProps, TaskMonitor);
