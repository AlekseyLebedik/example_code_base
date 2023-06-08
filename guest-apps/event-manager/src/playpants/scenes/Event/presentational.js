import React from 'react';
import PropTypes from 'prop-types';
import isEmpty from 'lodash/isEmpty';

import { withStyles } from '@material-ui/core/styles';
import FeedbackWrapper from 'playpants/components/FeedbackWrapper';
import DualTabulatedComponent from 'playpants/components/DualTabulatedComponent';
import MessagePanel from 'playpants/components/MessagePanel';

import Activities from './components/Activities';
import Conflicts from './components/Conflicts';
import Details from './components/Details';
import Discussion from './components/Discussion';
import HistoryLog from './components/HistoryLog';
import Repeats from './components/Repeats';
import TaskMonitor from './components/TaskMonitor';

import eventStyles from './styles';

export const EventStateless = props => {
  const {
    allowDetachedEvents,
    badgeCount,
    baseUrl,
    classes,
    conflicts,
    currentUser,
    dateTime,
    disabled,
    editEvent,
    eventData,
    eventId,
    eventUrl,
    handleSetPrimaryTab,
    handleSetSecondaryTab,
    isEventManagerEvent,
    lockedBy,
    isTemplateView,
    onDeleteEvent,
    onSave,
    permissions,
    primaryTab,
    secondaryTab,
    status,
    tabUrl,
    updateUserProfileSetting,
    userLastVisits,
  } = props;

  const {
    is_deleted: isDeleted,
    is_private: isPrivate,
    is_template: isTemplate,
    is_schedule: isSchedule,
  } = eventData;
  const isRepeat = !!eventData.repeat_event_settings;
  const detachedEvent = isSchedule && allowDetachedEvents;
  const primaryTabOptions = [
    {
      badgeCount: badgeCount.detailsCount,
      dataCy: 'detailsTab',
      hidden: false,
      label: 'Details',
      MainComponent: Details,
      value: 'details',
      componentProps: {
        badgeCount,
        baseUrl,
        classes,
        conflicts,
        currentUser,
        dateTime,
        detachedEvent,
        disabled,
        editEvent,
        eventData,
        isEventManagerEvent,
        isTemplateView,
        lockedBy,
        onDeleteEvent,
        onSave,
        permissions,
        status,
      },
    },
    {
      badgeCount: null,
      dataCy: 'repeatsTab',
      hidden: !isRepeat,
      label: 'Repeats',
      MainComponent: Repeats,
      value: 'repeats',
      componentProps: {
        baseUrl,
        classes,
        disabled,
        eventData,
        isEventManagerEvent,
        onSave,
        permissions,
        status,
        currentUser,
        dateTime,
      },
    },
    {
      badgeCount: badgeCount.discussionCount,
      dataCy: 'discussionTab',
      hidden: false,
      label: 'Discussion',
      MainComponent: Discussion,
      value: 'discussion',
      componentProps: {
        classes,
        currentUser,
        eventData,
        updateUserProfileSetting,
        userLastVisits,
      },
    },
  ];
  const secondaryTabOptions = [
    {
      badgeInvisible: true,
      badgeVariant: 'dot',
      hidden: !isEventManagerEvent,
      label: 'Activities',
      MainComponent: Activities,
      value: 'activities',
      componentProps: {
        classes,
        secondaryTab,
        tabUrl,
        eventUrl,
        onSave,
        disabled,
        eventData,
        permissions,
        detachedEvent,
      },
    },
    {
      badgeInvisible: !badgeCount.tasksBool,
      badgeVariant: 'dot',
      hidden: isTemplate || !isEventManagerEvent || isSchedule,
      label: 'Tasks',
      MainComponent: TaskMonitor,
      value: 'tasks',
      componentProps: {
        classes,
        eventId,
        eventUrl,
      },
    },
    {
      badgeCount: badgeCount.conflictsCount,
      badgeVariant: 'standard',
      hidden: isTemplate,
      label: 'Conflicts',
      MainComponent: Conflicts,
      value: 'conflicts',
      componentProps: {
        baseUrl,
        classes,
        dateTime,
        eventData,
        eventId,
        eventUrl,
        handleSetSecondaryTab,
        tabUrl,
      },
    },
    {
      badgeInvisible: true,
      badgeVariant: 'dot',
      hidden: isTemplate,
      label: 'History',
      MainComponent: HistoryLog,
      value: 'history',
      componentProps: {
        classes,
        eventData,
        dateTime,
        eventId,
      },
    },
  ];

  return (
    <FeedbackWrapper>
      {!isEmpty(eventData) && eventData.id === eventId && (
        <>
          <MessagePanel
            conditions={{ isDeleted, isRepeat, isPrivate, isTemplate }}
          />
          <DualTabulatedComponent
            onSetPrimaryTab={handleSetPrimaryTab}
            onSetSecondaryTab={handleSetSecondaryTab}
            primarySelectedTab={primaryTab}
            primaryTabOptions={primaryTabOptions}
            resizablePanelProps={{ titles: ['details & discussion'] }}
            secondarySelectedTab={secondaryTab}
            secondaryTabOptions={secondaryTabOptions}
          />
        </>
      )}
    </FeedbackWrapper>
  );
};

EventStateless.propTypes = {
  allowDetachedEvents: PropTypes.bool.isRequired,
  badgeCount: PropTypes.object.isRequired,
  baseUrl: PropTypes.string.isRequired,
  classes: PropTypes.object.isRequired,
  conflicts: PropTypes.arrayOf(PropTypes.object).isRequired,
  currentUser: PropTypes.object.isRequired,
  dateTime: PropTypes.func.isRequired,
  disabled: PropTypes.bool.isRequired,
  editEvent: PropTypes.func.isRequired,
  eventData: PropTypes.object.isRequired,
  eventId: PropTypes.number.isRequired,
  eventUrl: PropTypes.string.isRequired,
  handleSetPrimaryTab: PropTypes.func.isRequired,
  handleSetSecondaryTab: PropTypes.func.isRequired,
  isEventManagerEvent: PropTypes.bool.isRequired,
  lockedBy: PropTypes.object,
  isTemplateView: PropTypes.bool,
  onDeleteEvent: PropTypes.func.isRequired,
  onSave: PropTypes.func.isRequired,
  permissions: PropTypes.object.isRequired,
  primaryTab: PropTypes.string.isRequired,
  secondaryTab: PropTypes.string,
  status: PropTypes.object.isRequired,
  tabUrl: PropTypes.string.isRequired,
  updateUserProfileSetting: PropTypes.func.isRequired,
  userLastVisits: PropTypes.object,
};

EventStateless.defaultProps = {
  lockedBy: undefined,
  userLastVisits: undefined,
  isTemplateView: false,
  secondaryTab: undefined,
};

export default withStyles(eventStyles)(EventStateless);
