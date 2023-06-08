import React from 'react';
import isEmpty from 'lodash/isEmpty';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { joinPath } from 'dw/core/helpers/path';
import FeedbackWrapper from 'playpants/components/FeedbackWrapper';
import DualTabulatedComponent from 'playpants/components/DualTabulatedComponent';

import Details from './components/Details';
import TaskMonitor from './components/TaskMonitor';
import ScheduleStoriesCalendar from './components/ScheduleStoriesCalendar';
import ScheduleStoriesStyles from './styles';

export const StatelessScheduleStoriesDetailBase = props => {
  const {
    allowDetachedEvents,
    baseUrl,
    classes,
    detachedSchedule,
    handleSetPrimaryTab,
    handleSetSecondaryTab,
    history,
    permissions,
    primaryTab,
    secondaryTab,
    selectedScheduleStory,
  } = props;
  const primaryTabOptions = [
    {
      badgeCount: null,
      hidden: false,
      label: 'Details',
      MainComponent: Details,
      value: 'details',
      componentProps: {
        classes,
        detachedSchedule,
        initialValues: {
          name: selectedScheduleStory.name,
          context: selectedScheduleStory.context,
          category: selectedScheduleStory.category || 'All',
          description: selectedScheduleStory.description,
          schedule: selectedScheduleStory.schedule,
          title_env: selectedScheduleStory.title_env,
          storyId: selectedScheduleStory.id,
        },
        history,
        selectedScheduleStory,
      },
    },
    // TODO: Remove once implemented
    ...(permissions.wipPermission
      ? [
          {
            badgeCount: null,
            hidden: false,
            label: 'Discussion',
            MainComponent: () => <div>Discussion</div>,
            value: 'discussion',
          },
        ]
      : []),
  ];
  const secondaryTabOptions = [
    {
      badgeInvisible: true,
      badgeVariant: 'dot',
      hidden: false,
      label: 'Tasks',
      MainComponent: TaskMonitor,
      value: 'tasks',
      componentProps: {
        classes,
        scheduleStoryUrl: joinPath(
          baseUrl,
          'timewarp',
          'schedules',
          selectedScheduleStory.id
        ),
        scheduleStory: selectedScheduleStory,
      },
    },
    {
      badgeInvisible: true,
      badgeVariant: 'dot',
      hidden: false,
      label: 'Calendar',
      MainComponent: ScheduleStoriesCalendar,
      value: 'calendar',
      componentProps: { detachedSchedule, allowDetachedEvents },
    },
    // TODO: Remove once implemented
    ...(permissions.wipPermission
      ? [
          {
            badgeInvisible: true,
            badgeVariant: 'dot',
            hidden: false,
            label: 'History',
            MainComponent: () => <div>History</div>,
            value: 'history',
          },
        ]
      : []),
  ];

  return (
    <FeedbackWrapper>
      {!isEmpty(selectedScheduleStory) && (
        <DualTabulatedComponent
          onSetPrimaryTab={handleSetPrimaryTab}
          onSetSecondaryTab={handleSetSecondaryTab}
          primarySelectedTab={primaryTab}
          primaryTabOptions={primaryTabOptions}
          resizablePanelProps={{ titles: ['details & discussion'] }}
          secondarySelectedTab={secondaryTab}
          secondaryTabOptions={secondaryTabOptions}
        />
      )}
    </FeedbackWrapper>
  );
};

StatelessScheduleStoriesDetailBase.propTypes = {
  allowDetachedEvents: PropTypes.bool.isRequired,
  baseUrl: PropTypes.string.isRequired,
  classes: PropTypes.object.isRequired,
  detachedSchedule: PropTypes.bool.isRequired,
  handleSetPrimaryTab: PropTypes.func.isRequired,
  handleSetSecondaryTab: PropTypes.func.isRequired,
  history: PropTypes.object.isRequired,
  permissions: PropTypes.object.isRequired,
  primaryTab: PropTypes.string.isRequired,
  secondaryTab: PropTypes.string.isRequired,
  selectedScheduleStory: PropTypes.object.isRequired,
};

export default withStyles(ScheduleStoriesStyles)(
  StatelessScheduleStoriesDetailBase
);
