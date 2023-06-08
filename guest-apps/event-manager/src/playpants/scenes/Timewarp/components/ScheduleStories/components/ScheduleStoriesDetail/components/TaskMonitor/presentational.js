import React from 'react';
import PropTypes from 'prop-types';
import MasterDetail from 'dw/core/components/MasterDetail';
import MainDetailsEmpty from 'playpants/components/MainDetailsEmpty';
import {
  TaskMonitorDetail,
  TaskMonitorSidebar,
} from 'playpants/components/TaskMonitorComponents';
import { DEFAULT_SELECTED_TAB } from './constants';

const TaskMonitorStateless = props => {
  const {
    _tabOptions,
    _tasksData,
    _taskDetails,
    _overviewDetails,
    _baseUrl,
    _subTasks,
    classes,
  } = props;
  return (
    <MasterDetail
      master={({ actions: { onSelectItem }, selectedItemId }) => (
        <TaskMonitorSidebar
          baseUrl={_baseUrl}
          classes={classes}
          onSelectItem={onSelectItem}
          selectedItemId={selectedItemId}
          tabOptions={_tabOptions}
          tasksData={_tasksData}
          initialTab={DEFAULT_SELECTED_TAB}
        />
      )}
      detail={({ actions: { onSelectItem }, selectedItemId }) => (
        <TaskMonitorDetail
          baseUrl={_baseUrl}
          classes={classes}
          onSelectItem={onSelectItem}
          overviewDetails={_overviewDetails}
          selectedItemId={selectedItemId}
          subTasks={_subTasks}
          taskDetails={_taskDetails}
        />
      )}
      empty={() => <MainDetailsEmpty msg="Select a task to see more details" />}
      baseUrl={_baseUrl}
      classes={{
        drawer: classes.masterDetailDrawer,
        drawerPaper: classes.masterDetailDrawerPaper,
        contentShift: classes.masterDetailContentShift,
        expander: classes.masterDetailExpander,
      }}
    />
  );
};

TaskMonitorStateless.propTypes = {
  _baseUrl: PropTypes.string.isRequired,
  _overviewDetails: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string,
      value: PropTypes.any,
    })
  ).isRequired,
  _subTasks: PropTypes.arrayOf(PropTypes.object).isRequired,
  _tabOptions: PropTypes.arrayOf(
    PropTypes.shape({ label: PropTypes.string, value: PropTypes.string })
  ).isRequired,
  _taskDetails: PropTypes.arrayOf(
    PropTypes.shape({
      key: PropTypes.string,
      title: PropTypes.string,
      code: PropTypes.string,
      defaultExpanded: PropTypes.bool,
    })
  ).isRequired,
  _tasksData: PropTypes.arrayOf(PropTypes.object).isRequired,
  classes: PropTypes.object.isRequired,
};

export default TaskMonitorStateless;
