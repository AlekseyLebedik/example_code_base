import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { matchPath } from 'react-router-dom';
import { joinPath } from 'dw/core/helpers/path';
import { connect } from 'dw/core/helpers/component';
import * as selectors from 'playpants/components/TaskMonitorComponents/selectors';
import { TASK_MONITOR_TAB_OPTIONS } from './constants';
import { taskMonitorSelector } from './selectors';
import * as actions from './actions';
import TaskMonitorStateless from './presentational';

const TaskMonitor = ({
  _onFetchStoryTasks,
  _onStartFetchTaskDetail,
  _onStopFetchTaskDetail,
  _onResetTaskMonitor,
  scheduleStory,
  scheduleStoryUrl,
  match,
  location,
  ...props
}) => {
  useEffect(() => {
    _onResetTaskMonitor();
  }, [scheduleStory.id]);
  useEffect(() => {
    _onFetchStoryTasks(scheduleStory.id);
  }, [scheduleStory]);

  useEffect(() => {
    const taskMonitorMatch = matchPath(location.pathname, {
      path: joinPath(scheduleStoryUrl, 'tasks', ':tabId?'),
    });
    if (!taskMonitorMatch) {
      _onStopFetchTaskDetail();
      _onResetTaskMonitor();
    } else {
      _onStopFetchTaskDetail();
      const { tabId } = taskMonitorMatch.params;
      if (tabId) {
        _onStartFetchTaskDetail(tabId);
      }
    }
  }, [location.pathname]);

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
      _baseUrl={joinPath(scheduleStoryUrl, 'tasks')}
      _tabOptions={TASK_MONITOR_TAB_OPTIONS}
    />
  );
};

TaskMonitor.propTypes = {
  _onFetchStoryTasks: PropTypes.func.isRequired,
  _onStartFetchTaskDetail: PropTypes.func.isRequired,
  _onStopFetchTaskDetail: PropTypes.func.isRequired,
  _onResetTaskMonitor: PropTypes.func.isRequired,
  scheduleStory: PropTypes.object.isRequired,
  scheduleStoryUrl: PropTypes.string.isRequired,
  match: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
  _overviewDetails:
    selectors.overviewDetailsSelector(taskMonitorSelector)(state),
  _taskDetails: selectors.taskDetailsSelector(taskMonitorSelector)(state),
  _tasksData:
    selectors.taskMonitorTasksDataSelector(taskMonitorSelector)(state),
  _subTasks: selectors.subTasksSelector(taskMonitorSelector)(state),
});

const mapDispatchToProps = dispatch => ({
  _onFetchStoryTasks: (id, type) => dispatch(actions.fetchStoryTasks(id, type)),
  _onResetTaskMonitor: () => dispatch(actions.resetTaskMonitor()),
  _onStartFetchTaskDetail: id =>
    dispatch(actions.startSelectedTaskDetailFetch(id)),
  _onStopFetchTaskDetail: () => dispatch(actions.stopSelectedTaskDetailFetch()),
});

export default connect(mapStateToProps, mapDispatchToProps, TaskMonitor);
