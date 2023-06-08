import React from 'react';
import PropTypes from 'prop-types';
import isEmpty from 'lodash/isEmpty';
import CustomResizablePanels from 'playpants/components/CustomResizablePanels';
import Empty from 'dw/core/components/Empty';
import EventSummaryDialog from 'playpants/components/EventSummaryDialog';
import GroupStoriesDetail from './components/GroupStoriesDetail';
import GroupStoriesSidebar from './components/GroupStoriesSidebar';
import { GROUP_STORIES_SIDEBAR_EVENT_DETAIL_ID } from './constants';

const StatelessGroupStories = props => (
  <>
    <EventSummaryDialog
      baseModalId={GROUP_STORIES_SIDEBAR_EVENT_DETAIL_ID}
      event={props.eventDetailData}
      baseUrl={props.baseUrl}
      currentProject={props.currentProject}
    />
    <CustomResizablePanels titles={['Stories']}>
      <GroupStoriesSidebar {...props} />
      <div>
        {!isEmpty(props.selectedGroupStory) && props.match.params.storyId ? (
          <GroupStoriesDetail {...props} />
        ) : (
          <Empty>Select a group story to get more details</Empty>
        )}
      </div>
    </CustomResizablePanels>
  </>
);

StatelessGroupStories.propTypes = {
  baseUrl: PropTypes.string.isRequired,
  currentProject: PropTypes.object.isRequired,
  eventDetailData: PropTypes.object.isRequired,
  match: PropTypes.object.isRequired,
  selectedGroupStory: PropTypes.object.isRequired,
};

export default StatelessGroupStories;
