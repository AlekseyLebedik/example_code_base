import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import orderBy from 'lodash/orderBy';
import TaskMonitorSidebarStateless from './presentational';

function prepareFilteredTasksData(tasks, type) {
  const filteredTasksData = tasks.filter(task => task.type === type);
  return orderBy(filteredTasksData, ['id'], ['desc']);
}

export const TaskMonitorSidebarBase = props => {
  const {
    classes,
    initialTab,
    onSelectItem,
    selectedItemId,
    tabOptions,
    tasksData,
    baseUrl,
  } = props;
  const [selectedTab, setSelectedTab] = useState(initialTab);
  const [filteredTasksData, setFilteredTasksData] = useState([]);
  useEffect(() => {
    setFilteredTasksData(prepareFilteredTasksData(tasksData, selectedTab));
  }, [tasksData, selectedTab]);
  useEffect(() => {
    setSelectedTab(initialTab);
  }, [initialTab]);
  const handleOnSelectItem = id => onSelectItem(id, baseUrl);
  return (
    <TaskMonitorSidebarStateless
      classes={classes}
      handleOnSelectItem={handleOnSelectItem}
      selectedItemId={selectedItemId}
      selectedTab={selectedTab}
      handleSetSelectedTab={setSelectedTab}
      tabOptions={tabOptions}
      tasksData={filteredTasksData}
    />
  );
};

TaskMonitorSidebarBase.propTypes = {
  classes: PropTypes.object.isRequired,
  initialTab: PropTypes.string.isRequired,
  onSelectItem: PropTypes.func.isRequired,
  selectedItemId: PropTypes.string,
  tabOptions: PropTypes.arrayOf(
    PropTypes.shape({ label: PropTypes.string, value: PropTypes.string })
  ).isRequired,
  tasksData: PropTypes.arrayOf(PropTypes.object).isRequired,
  baseUrl: PropTypes.string.isRequired,
};

TaskMonitorSidebarBase.defaultProps = {
  selectedItemId: '',
};

export default React.memo(TaskMonitorSidebarBase);
