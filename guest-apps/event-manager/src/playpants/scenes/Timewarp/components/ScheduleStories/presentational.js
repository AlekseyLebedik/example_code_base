import React from 'react';
import PropTypes from 'prop-types';
import isEmpty from 'lodash/isEmpty';
import CustomResizablePanels from 'playpants/components/CustomResizablePanels';
import Empty from 'dw/core/components/Empty';
import ScheduleStoriesSidebar from './components/ScheduleStoriesSidebar';
import ScheduleStoriesDetail from './components/ScheduleStoriesDetail';

const StatelessScheduleStories = props => (
  <CustomResizablePanels titles={['Schedules']}>
    <ScheduleStoriesSidebar {...props} />
    <div>
      {!isEmpty(props.selectedScheduleStory) ? (
        <ScheduleStoriesDetail {...props} />
      ) : (
        <Empty>Select a story to get more detail</Empty>
      )}
    </div>
  </CustomResizablePanels>
);

StatelessScheduleStories.propTypes = {
  match: PropTypes.object.isRequired,
  selectedScheduleStory: PropTypes.object.isRequired,
  selectedStoryId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
};

StatelessScheduleStories.defaultProps = {
  selectedStoryId: null,
};

export default StatelessScheduleStories;
