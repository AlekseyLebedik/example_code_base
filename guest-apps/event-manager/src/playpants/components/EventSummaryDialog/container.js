import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import isEmpty from 'lodash/isEmpty';
import { timezoneOrDefaultSelector } from 'playpants/helpers/dateTime';
import ModalHandlers from 'dw/core/components/ModalHandlers';
import { fetchConflicts } from 'playpants/scenes/Event/components/Conflicts/actions';
import {
  makeEventTypeNameSelector,
  makeProjectNameSelector,
  isConfiguredSelector,
} from '../App/selectors';
import {
  displayViewDate,
  displayViewEventDuration,
  getEventActivityTitles,
  getEventSummaryTitles,
  getPartitionedPublishDateActivities,
  getUniqActivityTypes,
  setBaseUrl,
} from './helpers';
import EventSummaryDialogStateless from './presentational';

export const EventSummaryDialog = props => {
  const {
    conflicts,
    currentProject,
    event,
    eventFetchDetails,
    immediateEnd,
    immediatePublish,
    loadConflicts,
    onClearEventFetchDetails,
    onClose,
    openEventInNewTab,
    redirectToProject,
    userTimezone,
    visible,
  } = props;
  const eventDetails = {
    ...event,
    ...eventFetchDetails.data,
  };
  const {
    activities,
    auto_tags: autoTags = [],
    end_at: endAt,
    manual_tags: manualTags = [],
    publish_at: publishAt,
  } = eventDetails;

  const [needsConfirmations, setNeedsConfirmations] = useState({
    conflictsCheck: true,
    publishNowCheck: true,
    endNowCheck: true,
  });

  const activityTitleConflicts = conflicts.filter(
    ({ severity }) => severity === 'activity-title-conflict'
  );

  useEffect(() => {
    if (visible) {
      loadConflicts(eventDetails.id);
    }
  }, [visible]);

  const setDefaultConfirmations = () =>
    setNeedsConfirmations({
      ...needsConfirmations,
      conflictsCheck: !isEmpty(activityTitleConflicts),
      publishNowCheck: immediatePublish,
      endNowCheck: immediateEnd,
    });

  useEffect(() => {
    setDefaultConfirmations();
  }, [immediatePublish, conflicts]);

  const handleClose = () => {
    if (onClearEventFetchDetails) onClearEventFetchDetails();
    setDefaultConfirmations();
    onClose();
  };

  const eventActivityTitles = activities && getEventActivityTitles(activities);

  // List of activites that publish on start / end
  const [activitiesOnStart, activitiesOnEnd] =
    getPartitionedPublishDateActivities(activities);

  const newProps = {
    ...props,
    activitiesOnEnd,
    activitiesOnStart,
    activityTitleConflicts,
    blockPrimaryAction:
      immediateEnd || immediatePublish || !isEmpty(activityTitleConflicts),
    conflicts,
    endDate: displayViewDate(endAt, userTimezone),
    eventDetails,
    // Event duration format depends on if event has end
    eventDuration: displayViewEventDuration(endAt, publishAt, userTimezone),
    eventSummaryTitles: getEventSummaryTitles(
      currentProject.titles,
      eventActivityTitles
    ),
    handleClose,
    needsConfirmations,
    openEventInNewTab: openEventInNewTab || redirectToProject,
    primaryActionDisabled: Object.values(needsConfirmations).some(v => v),
    publishDate: displayViewDate(publishAt, userTimezone),
    setNeedsConfirmations,
    tags: [...autoTags, ...manualTags],
    // Takes the sorted activities and finds the unique activity types
    uniqOnEnd: getUniqActivityTypes(activitiesOnEnd),
    uniqOnStart: getUniqActivityTypes(activitiesOnStart),
  };

  return !isEmpty(eventDetails) ? (
    <EventSummaryDialogStateless {...newProps} />
  ) : null;
};

EventSummaryDialog.propTypes = {
  baseUrl: PropTypes.string.isRequired,
  conflicts: PropTypes.arrayOf(PropTypes.object),
  currentProject: PropTypes.object,
  event: PropTypes.object.isRequired,
  eventFetchDetails: PropTypes.object,
  immediateEnd: PropTypes.bool,
  immediatePublish: PropTypes.bool,
  loadConflicts: PropTypes.func.isRequired,
  onClearEventFetchDetails: PropTypes.func,
  onClose: PropTypes.func.isRequired,
  openEventInNewTab: PropTypes.bool,
  projectInfo: PropTypes.object,
  redirectToProject: PropTypes.bool,
  userTimezone: PropTypes.string.isRequired,
  visible: PropTypes.bool.isRequired,
};

EventSummaryDialog.defaultProps = {
  conflicts: [],
  currentProject: { titles: [] },
  eventFetchDetails: {},
  immediateEnd: false,
  immediatePublish: false,
  onClearEventFetchDetails: () => {},
  openEventInNewTab: false,
  projectInfo: null,
  redirectToProject: false,
};

const makeMapStateToProps = () => {
  const projectNameSelector = makeProjectNameSelector();
  const eventTypeNameSelector = makeEventTypeNameSelector();
  const mapStateToProps = (state, props) => {
    const { baseUrl, currentProject, event } = props;
    const redirectToProject = currentProject.id !== event.project;
    return {
      baseUrl: redirectToProject ? setBaseUrl(baseUrl, event) : baseUrl,
      eventTypeName: eventTypeNameSelector(state)(props.event.event_type),
      isConfigured: isConfiguredSelector(state),
      projectName: projectNameSelector(state)(props.event.project),
      redirectToProject,
      userTimezone: timezoneOrDefaultSelector(state),
      visible: ModalHandlers.isVisibleSelector(state, props.baseModalId),
    };
  };
  return mapStateToProps;
};

const mapDispatchToProps = (dispatch, props) => ({
  loadConflicts: bindActionCreators(fetchConflicts, dispatch),
  onClose: () => dispatch(ModalHandlers.close(props.baseModalId)),
  onOpen: () => dispatch(ModalHandlers.open(props.baseModalId)),
});

export default connect(
  makeMapStateToProps,
  mapDispatchToProps
)(EventSummaryDialog);
