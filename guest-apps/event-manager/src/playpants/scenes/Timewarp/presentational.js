import React from 'react';
import PropTypes from 'prop-types';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import GamertagManagement from 'playpants/components/GamertagManagement';
import ScheduleStories from './components/ScheduleStories';
import Rules from './components/Rules';
import styles from './presentational.module.css';

const TabPanel = ({ children, value, index }) => (
  <div
    className={styles.timewarpTabPanel}
    role="tabpanel"
    hidden={value !== index}
  >
    {value === index && children}
  </div>
);

TabPanel.propTypes = {
  children: PropTypes.oneOfType([PropTypes.string, PropTypes.object])
    .isRequired,
  value: PropTypes.number.isRequired,
  index: PropTypes.number.isRequired,
};

const StatelessTimewarp = ({
  gamertagBaseUrl,
  handleChangeSelectedTab,
  onSelectGroup,
  selectedGroup,
  selectedTabIndex,
}) => (
  <>
    <AppBar position="absolute">
      <Tabs
        value={selectedTabIndex}
        onChange={(_, tabIndex) => handleChangeSelectedTab(tabIndex)}
      >
        <Tab label="Schedules" />
        <Tab label="Groups" />
        <Tab label="Rules / Client Events" />
      </Tabs>
    </AppBar>
    <TabPanel value={selectedTabIndex} index={0}>
      <ScheduleStories />
    </TabPanel>
    <TabPanel value={selectedTabIndex} index={1}>
      <GamertagManagement
        baseUrl={gamertagBaseUrl}
        selectedGroup={selectedGroup}
        onSelectGroup={onSelectGroup}
      />
    </TabPanel>
    <TabPanel value={selectedTabIndex} index={2}>
      <Rules />
    </TabPanel>
  </>
);

StatelessTimewarp.propTypes = {
  selectedTabIndex: PropTypes.number.isRequired,
  handleChangeSelectedTab: PropTypes.func.isRequired,
  gamertagBaseUrl: PropTypes.string.isRequired,
  selectedGroup: PropTypes.string,
  onSelectGroup: PropTypes.func.isRequired,
};

StatelessTimewarp.defaultProps = {
  selectedGroup: null,
};

export default StatelessTimewarp;
