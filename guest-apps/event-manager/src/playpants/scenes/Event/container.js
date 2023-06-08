import React, { useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators, compose } from 'redux';
import isEmpty from 'lodash/isEmpty';

import { joinPath } from 'dw/core/helpers/path';
import { withUserProfileActions } from '@demonware/devzone-core/modules/user/HOC';
import { formatDateTimeSelector } from 'playpants/helpers/dateTime';
import { prettyPrint } from 'playpants/helpers/json';

import {
  allowDetachedEventsSelector,
  getBaseURL,
  currentUserSelector,
  shouldUseProfileSettingsSelector,
} from 'playpants/components/App/selectors';
import { fetchConflicts } from 'playpants/scenes/Event/components/Conflicts/actions';
import { currentProjectIdSelector } from 'playpants/components/App/components/ProjectSelector/selectors';

import { resetFeedback } from 'playpants/components/FeedbackWrapper/actions';
import { conflictsSelector } from 'playpants/scenes/Event/components/Conflicts/selectors';
import { useInterval, useEMPermissionsResult } from 'playpants/hooks';
import {
  REFETCH_STATUSES,
  USER_EVENT_SETTINGS,
} from 'playpants/constants/event';

import * as actions from './actions';
import * as selectors from './selectors';
import StyledEventStateless from './presentational';

const useUnlockEvent = props => {
  const propsRef = useRef();
  useEffect(() => {
    propsRef.current = props;
  }, [props.eventData.is_deleted, props.lockedBy, props.currentUser.id]);
  useEffect(
    () => () => {
      const { currentUser, eventData, eventId, lockedBy, onUnlockThenClear } =
        propsRef.current;
      const canUnlock =
        !eventData.is_deleted && lockedBy && lockedBy.id === currentUser.id;
      onUnlockThenClear(canUnlock, eventId);
    },
    []
  );
};

const useCreateUserSettings = (
  createUserSetting,
  eventId,
  userLastVisits,
  useProfileSettings
) => {
  useEffect(() => {
    if (eventId && !userLastVisits && useProfileSettings) {
      createUserSetting({
        key: `${USER_EVENT_SETTINGS.lastVisit.key}${eventId}`,
        value: prettyPrint(USER_EVENT_SETTINGS.lastVisit.value),
      });
    }
  }, [eventId]);
};

export const EventBase = props => {
  const {
    _onFetchUserResponsibilities,
    allowDetachedEvents,
    baseUrl,
    currentProjectId,
    disabled,
    editAuths,
    editEvent,
    eventData,
    eventId,
    eventLoading,
    history,
    isEventManagerEvent,
    loadConflicts,
    loadDiscussion,
    loadEvent,
    match,
    onResetFeedback,
    onUnlockThenDelete,
    user: {
      actions: { createUserProfileSetting, updateUserProfileSetting },
    },
    useProfileSettings,
    userLastVisits,
    viewType,
  } = props;

  const permissions = useEMPermissionsResult();
  const [primaryTab, setPrimaryTab] = useState('details');
  const [secondaryTab, setSecondaryTab] = useState(
    match ? match.params.tab : undefined
  );
  const [secondaryTabId, setSecondaryTabId] = useState(
    match ? match.params.tabId : undefined
  );

  useEffect(() => {
    _onFetchUserResponsibilities({ project: currentProjectId });
    onResetFeedback();
    loadDiscussion();
    loadEvent();
  }, []);
  useEffect(() => {
    const defaultTab = isEventManagerEvent ? 'activities' : 'conflicts';
    if (!eventLoading && !isEmpty(eventData) && !secondaryTab) {
      setSecondaryTab(defaultTab);
    }
  }, [eventId, eventLoading, isEventManagerEvent]);

  // unlock event on unmount as user leaves the page
  useUnlockEvent(props);
  // creating user settings if none already available
  useCreateUserSettings(
    createUserProfileSetting,
    eventData.id,
    userLastVisits,
    useProfileSettings
  );
  // Re-fetch event details to maintain live data
  useInterval(
    () => {
      if (eventData && REFETCH_STATUSES.includes(eventData.status)) loadEvent();
    },
    eventData && eventData.status === 'pending' ? 60000 : 10000
  );
  // clears old change status, loads event, discussion
  useEffect(() => {
    // only load conflicts if the event is not a template
    if (!eventData.is_template) {
      loadConflicts();
    }
    onResetFeedback();
    loadDiscussion();
    loadEvent();
  }, [eventId]);
  // Redirects to the secondary tab on change
  useEffect(() => {
    if (history && !eventLoading && !isEmpty(eventData) && secondaryTab) {
      const pathList = [baseUrl, viewType, eventId, secondaryTab];
      if (secondaryTabId) pathList.push(secondaryTabId);
      history.push(joinPath(...pathList));
    }
  }, [secondaryTab]);

  const handleSetPrimaryTab = (_, value) => setPrimaryTab(value);
  const handleSetSecondaryTab = (_, value, idValue = undefined) => {
    setSecondaryTab(value);
    setSecondaryTabId(idValue);
  };

  const onSave = (path, data) => {
    if (path === 'authorizations') {
      editAuths(eventId, data);
    } else if (eventData[path] !== data) {
      editEvent(eventId, {
        [path]: data === 'retry-publish' ? 'approved' : data,
      });
    }
  };

  const onDeleteEvent = () => {
    onUnlockThenDelete(eventId, () => history.push(baseUrl));
  };

  const newProps = {
    ...props,
    disabled:
      disabled ||
      !permissions?.eventWritePermission ||
      (!!eventData.is_schedule && !allowDetachedEvents),
    eventId,
    handleSetPrimaryTab,
    handleSetSecondaryTab,
    onDeleteEvent,
    onSave,
    permissions,
    primaryTab,
    secondaryTab,
    updateUserProfileSetting,
  };

  return <StyledEventStateless {...newProps} />;
};

const mapStateToProps = (state, { match, history, isTemplateView }) => {
  const baseUrl = getBaseURL(state);
  const path = isTemplateView ? 'templates' : 'events';
  const { tab, eventId } = match.params;
  const eventUrl = joinPath(baseUrl, path, eventId);
  return {
    allowDetachedEvents: allowDetachedEventsSelector(state),
    badgeCount: selectors.badgeCountSelector(state),
    baseUrl,
    conflicts: conflictsSelector(state),
    currentProjectId: currentProjectIdSelector(state),
    currentUser: currentUserSelector(state),
    dateTime: formatDateTimeSelector(state),
    disabled: selectors.disabledSelector(state),
    eventData: selectors.eventDataSelector(state),
    eventId: parseInt(eventId, 10),
    eventLoading: selectors.eventLoadingSelector(state),
    eventUrl,
    history,
    isEventManagerEvent: selectors.eventManagerTypeSelector(state),
    isTemplateView,
    lockedBy: selectors.lockedBySelector(state),
    match,
    status: selectors.statusSelector(state),
    tabUrl: joinPath(eventUrl, tab),
    useProfileSettings: shouldUseProfileSettingsSelector(state),
    userLastVisits: selectors.userLastVisitsSelector(state),
    viewType: path,
  };
};

const mapDispatchToProps = dispatch => ({
  _onFetchUserResponsibilities: bindActionCreators(
    actions.fetchUserResponsibilities,
    dispatch
  ),
  deleteEvent: bindActionCreators(actions.deleteEvent, dispatch),
  editAuths: bindActionCreators(actions.editAuths, dispatch),
  editEvent: bindActionCreators(actions.editEvent, dispatch),
  loadConflicts: bindActionCreators(fetchConflicts, dispatch),
  loadDiscussion: bindActionCreators(actions.fetchDiscussion, dispatch),
  loadEvent: bindActionCreators(actions.fetchEvent, dispatch),
  onResetFeedback: () => dispatch(resetFeedback()),
  onUnlockThenClear: bindActionCreators(actions.unlockThenClear, dispatch),
  onUnlockThenDelete: bindActionCreators(actions.unlockThenDelete, dispatch),
});

const mergeProps = (propsFromState, propsFromDispatch) => ({
  ...propsFromState,
  ...propsFromDispatch,
  deleteEvent: eventId => propsFromDispatch.deleteEvent(eventId),
  loadConflicts: () => propsFromDispatch.loadConflicts(propsFromState.eventId),
  loadDiscussion: () =>
    propsFromDispatch.loadDiscussion(propsFromState.eventId),
  loadEvent: () => propsFromDispatch.loadEvent(propsFromState.eventId),
});

EventBase.propTypes = {
  _onFetchUserResponsibilities: PropTypes.func.isRequired,
  allowDetachedEvents: PropTypes.bool.isRequired,
  baseUrl: PropTypes.string.isRequired,
  currentProjectId: PropTypes.number.isRequired,
  currentUser: PropTypes.object.isRequired,
  dateTime: PropTypes.func.isRequired,
  deleteEvent: PropTypes.func.isRequired,
  disabled: PropTypes.bool,
  editAuths: PropTypes.func.isRequired,
  editEvent: PropTypes.func.isRequired,
  eventData: PropTypes.object.isRequired,
  eventId: PropTypes.number.isRequired,
  eventLoading: PropTypes.bool.isRequired,
  eventUrl: PropTypes.string.isRequired,
  history: PropTypes.object,
  isEventManagerEvent: PropTypes.bool.isRequired,
  loadConflicts: PropTypes.func.isRequired,
  loadDiscussion: PropTypes.func.isRequired,
  loadEvent: PropTypes.func.isRequired,
  match: PropTypes.object,
  onResetFeedback: PropTypes.func.isRequired,
  onUnlockThenDelete: PropTypes.func.isRequired,
  status: PropTypes.object,
  user: PropTypes.shape({
    actions: PropTypes.shape({
      createUserProfileSetting: PropTypes.func.isRequired,
      updateUserProfileSetting: PropTypes.func.isRequired,
    }).isRequired,
    profile: PropTypes.object.isRequired,
  }).isRequired,
  useProfileSettings: PropTypes.bool.isRequired,
  userLastVisits: PropTypes.object.isRequired,
  viewType: PropTypes.string.isRequired,
};

EventBase.defaultProps = {
  disabled: false,
  history: undefined,
  match: undefined,
  status: {},
};

export default compose(
  connect(mapStateToProps, mapDispatchToProps, mergeProps),
  withUserProfileActions
)(EventBase);
