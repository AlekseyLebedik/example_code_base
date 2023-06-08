import React from 'react';
import PropTypes from 'prop-types';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import SearchableList from 'dw/core/components/SearchableList';
import TaskListItem from './components/TaskListItem';

const TaskMonitorSidebarStateless = ({
  classes,
  handleOnSelectItem,
  handleSetSelectedTab,
  selectedItemId,
  selectedTab,
  tabOptions,
  tasksData,
}) => (
  <div className="flex flex-col h-full">
    <AppBar position="static" color="default">
      {tabOptions.length > 1 && (
        <Tabs
          value={selectedTab}
          onChange={(_, value) => handleSetSelectedTab(value)}
          variant="fullWidth"
          textColor="primary"
        >
          {tabOptions.map(tab => (
            <Tab key={tab.label} value={tab.value} label={tab.label} />
          ))}
        </Tabs>
      )}
    </AppBar>
    <SearchableList
      items={tasksData}
      searchEnabled={false}
      showMore={false}
      toRenderFunc={task => (
        <TaskListItem
          classes={classes}
          handleOnSelectItem={handleOnSelectItem}
          key={task.id}
          selectedItemId={selectedItemId}
          task={task}
        />
      )}
    />
  </div>
);

TaskMonitorSidebarStateless.propTypes = {
  classes: PropTypes.object.isRequired,
  handleOnSelectItem: PropTypes.func.isRequired,
  handleSetSelectedTab: PropTypes.func.isRequired,
  selectedItemId: PropTypes.string.isRequired,
  selectedTab: PropTypes.string.isRequired,
  tabOptions: PropTypes.arrayOf(
    PropTypes.shape({ label: PropTypes.string, value: PropTypes.string })
  ).isRequired,
  tasksData: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default TaskMonitorSidebarStateless;
