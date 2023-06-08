import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import classNames from 'classnames';

import isEmpty from 'lodash/isEmpty';
import startCase from 'lodash/startCase';
import camelCase from 'lodash/camelCase';

import { withStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';
import Divider from '@material-ui/core/Divider';
import Grid from '@material-ui/core/Grid';
import Icon from '@material-ui/core/Icon';
import Tooltip from '@material-ui/core/Tooltip';

import { joinPath } from 'dw/core/helpers/path';
import IconButton from 'dw/core/components/IconButton';
import PlatformIcons from 'playpants/components/PlatformIcons';
import ModalWrapper from 'playpants/components/ModalWrapper';
import StatusDot from 'playpants/components/StatusDot';
import RenderGridIf from 'playpants/components/RenderGridIf';
import EventConflicts from './components/EventConflicts';
import EndNowConfirmation from './components/EndNowConfirmation';
import PublishNowConfirmation from './components/PublishNowConfirmation';
import EventDetailActivityChips from './components/EventDetailActivityChips';
import EventDetailHeader from './components/EventDetailHeader';
import EventDetailItem from './components/EventDetailItem';
import EventItemChips from './components/EventItemChips';

import { displayViewDate, getRepeatFrequencyStr } from './helpers';
import eventSummaryStyles from './styles';

const dialogContentStyle = {
  padding: '24px 16px 16px',
};

const EventSummaryDialogStateless = props => {
  const {
    activitiesOnEnd,
    activitiesOnStart,
    activityTitleConflicts,
    baseModalId,
    baseUrl,
    blockPrimaryAction,
    cancelOnBackdropClick,
    classes,
    conflicts,
    disabled,
    endDate,
    eventDetails: {
      created_by: createdBy,
      end_at: endAt,
      env_type: envType,
      id,
      is_schedule: isSchedule,
      platforms,
      project,
      repeat_event_settings: repeatEventSettings,
      status: eventStatus,
      story,
      task,
      title,
      type,
    },
    eventDuration,
    eventFetchDetails,
    eventSummaryTitles,
    eventTypeName,
    gutterTop,
    handleClose,
    hidden,
    icon,
    immediateEnd,
    immediatePublish,
    isConfigured,
    needsConfirmations,
    onFetchEventDetails,
    onOpen,
    openEventInNewTab,
    onCancel,
    primaryAction,
    primaryActionDisabled,
    primaryActionHandler,
    primaryActionRedirectDisabled,
    projectName,
    publishDate,
    secondaryAction,
    secondaryActionHandler,
    setNeedsConfirmations,
    tags,
    tooltip,
    uniqOnEnd,
    uniqOnStart,
    userTimezone,
  } = props;
  const { error: eventFetchError, loading: eventFetchLoading } =
    eventFetchDetails;

  const renderFetchStatus = () => {
    if (eventFetchLoading) {
      return (
        <EventDetailItem
          CustomIcon={() => (
            <CircularProgress disableShrink size={18} thickness={10} />
          )}
          primary="Loading"
          secondary={`Details for Event ID ${id} Loading...`}
        />
      );
    }
    if (eventFetchError) {
      return (
        <Tooltip placement="bottom" title="Click to retry event details fetch">
          <div
            className={classes.fetchErrorItem}
            onClick={() => onFetchEventDetails(id)}
          >
            <EventDetailItem
              icon="warning"
              iconClassName={classes.fetchErrorIcon}
              primary="Fetch Error"
              secondary={eventFetchError.message}
            />
          </div>
        </Tooltip>
      );
    }
    return null;
  };

  const { state: taskStatus, id: taskId } = task || {};
  const createdByMessage = createdBy ? `\nCreated by ${createdBy.name}` : '';
  const renderTitle = () => (
    <EventDetailHeader
      avatarClassName={classNames(
        classes[`${type}-${eventStatus}`],
        classes.eventSummaryTitleIcon
      )}
      className={classes.eventSummaryTitleContainer}
      primary={title}
      secondary={`${eventDuration}${createdByMessage}`}
    />
  );

  const renderEventStatus = () => (
    <EventDetailItem
      iconClassName={classes[`${type}-${eventStatus}-details`]}
      primary="Status"
      secondary={
        <StatusDot
          iconClassName={classNames(
            classes[`${type}-${eventStatus}`],
            classes.eventSummaryStatusDot
          )}
          statusText={startCase(eventStatus)}
        />
      }
      willDisplayIcon={false}
    />
  );

  const renderTaskStatus = () => (
    <EventDetailItem
      className={classes.taskStatus}
      iconClassName={classes[`${type}-${taskStatus}-task`]}
      linkTo={joinPath(baseUrl, 'events', id, 'tasks', taskId)}
      onClick={handleClose}
      primary="Task"
      secondary={
        <StatusDot
          iconClassName={classNames(
            classes[`${type}-${camelCase(taskStatus)}-task`],
            classes.eventSummaryStatusDot
          )}
          statusText={startCase(taskStatus)}
        />
      }
      willDisplayIcon={false}
    />
  );

  const renderStory = () => (
    <EventDetailItem
      className={classes.story}
      onClick={handleClose}
      icon="menu_book"
      linkTo={joinPath(baseUrl, isSchedule ? 'timewarp' : 'stories', story.id)}
      primary="Story"
      secondary={story.name}
    />
  );

  const renderActivities = () => (
    <>
      <EventDetailItem
        icon="calendar_today"
        primary="Publish Date"
        secondary={publishDate}
      />
      <EventDetailItem
        isHidden={isEmpty(activitiesOnStart)}
        iconClassName={classes[`${type}-${eventStatus}-details`]}
        disableTypography
        primary={
          <EventDetailActivityChips
            uniqActivities={uniqOnStart}
            activities={activitiesOnStart}
            classes={classes}
          />
        }
      />
    </>
  );

  const renderActivitiesEnd = () => (
    <>
      {endAt && (
        <EventDetailItem
          icon="calendar_today"
          primary="End Date"
          secondary={endDate}
        />
      )}
      <EventDetailItem
        isHidden={isEmpty(activitiesOnEnd)}
        iconClassName={classes[`${type}-${eventStatus}-details`]}
        disableTypography
        primary={
          <EventDetailActivityChips
            uniqActivities={uniqOnEnd}
            activities={activitiesOnEnd}
            classes={classes}
          />
        }
      />
    </>
  );

  const renderRepeatEvent = () => (
    <EventDetailItem
      icon="repeat"
      primary={`Repeats every ${getRepeatFrequencyStr(repeatEventSettings)}`}
      secondary={`Until ${displayViewDate(
        repeatEventSettings.end_repeat_at,
        userTimezone
      )}`}
    />
  );

  const renderProject = () => (
    <EventDetailItem
      icon="folder_open"
      primary="Project"
      secondary={project ? startCase(projectName) : 'Cross Project'}
    />
  );

  const renderEnvironment = () => (
    <EventDetailItem
      icon="eco"
      primary="Environment"
      secondary={envType === 'Unknown' ? 'Cross Platform' : envType}
    />
  );

  const renderTitles = () => (
    <>
      <EventDetailItem
        isHidden={isEmpty(eventSummaryTitles)}
        icon="gamepad"
        primary="Titles"
      />
      <EventDetailItem
        isHidden={isEmpty(eventSummaryTitles)}
        primary={<PlatformIcons titles={eventSummaryTitles} />}
      />
    </>
  );

  const renderPlatforms = () => (
    <>
      <EventDetailItem icon="games" primary="Platforms" />
      <EventDetailItem
        dataCy="eventSummaryPlatforms"
        isHidden={isEmpty(platforms)}
        primary={<EventItemChips classes={classes} uniqItems={platforms} />}
      />
    </>
  );

  const renderEventType = () => (
    <EventDetailItem
      icon="account_tree"
      primary="Event Type"
      secondary={eventTypeName}
    />
  );

  const renderTags = () => (
    <>
      <EventDetailItem icon="label" primary="Tags" />
      <EventDetailItem
        dataCy="eventSummaryTags"
        isHidden={isEmpty(tags)}
        primary={<EventItemChips classes={classes} uniqItems={tags} />}
      />
    </>
  );

  const renderConflictsConfirmation = () => (
    <>
      <EventDetailItem
        icon="warning"
        iconColor="error"
        primary="This event has conflicts with other events (click an event to view):"
      />
      <EventDetailItem
        primary={
          <EventConflicts
            baseUrl={baseUrl}
            classes={classes}
            conflicts={conflicts}
            eventId={id}
            needsConfirmations={needsConfirmations}
            onClick={handleClose}
            requiresConfirmation={!isEmpty(activityTitleConflicts)}
            setNeedsConfirmations={setNeedsConfirmations}
          />
        }
      />
    </>
  );

  const renderPublishNowConfirmation = () => (
    <>
      <EventDetailItem
        icon="warning"
        iconColor="error"
        primary="This will alter the publish date and immediately publish any start activities"
      />
      <EventDetailItem
        primary={
          <PublishNowConfirmation
            classes={classes}
            needsConfirmations={needsConfirmations}
            setNeedsConfirmations={setNeedsConfirmations}
          />
        }
      />
    </>
  );

  const renderEndNowConfirmation = () => (
    <>
      <EventDetailItem
        icon="warning"
        iconColor="error"
        primary="This will alter the end date and immediately publish any end activities"
      />
      <EventDetailItem
        primary={
          <EndNowConfirmation
            classes={classes}
            needsConfirmations={needsConfirmations}
            setNeedsConfirmations={setNeedsConfirmations}
          />
        }
      />
    </>
  );

  const renderDialogContent = () => (
    <Grid container spacing={1}>
      <RenderGridIf check={!hidden.title} renderFn={renderTitle} item xs={7} />
      <Grid container className={classes.statusGridContainer}>
        <RenderGridIf
          check={!hidden.status}
          renderFn={renderEventStatus}
          item
          xs={6}
        />
        <RenderGridIf
          check={!hidden.task && !!taskStatus}
          renderFn={renderTaskStatus}
          item
          xs={6}
        />
      </Grid>
      <Grid item xs={12}>
        <Divider className={classes.eventSummaryDivider} variant="middle" />
      </Grid>
      <RenderGridIf
        check={!!(eventFetchError || eventFetchLoading)}
        item
        renderFn={renderFetchStatus}
        xs={12}
      />
      <RenderGridIf
        check={!isEmpty(repeatEventSettings)}
        item
        renderFn={renderRepeatEvent}
      />
      <RenderGridIf
        check={!hidden.project}
        renderFn={renderProject}
        item
        xs={12}
      />
      <RenderGridIf
        check={!hidden.eventType && eventTypeName !== 'Event Manager'}
        renderFn={renderEventType}
        item
        xs={12}
      />
      <RenderGridIf
        check={!hidden.envType}
        renderFn={renderEnvironment}
        item
        xs={12}
      />
      <RenderGridIf
        check={!hidden.story && !!story && isConfigured.stories}
        renderFn={renderStory}
        item
        xs={12}
      />
      <RenderGridIf
        check={!hidden.activities}
        renderFn={renderActivities}
        item
        xs={12}
      />
      <RenderGridIf
        check={!hidden.activities}
        renderFn={renderActivitiesEnd}
        item
        xs={12}
      />
      <RenderGridIf
        check={!hidden.titles}
        renderFn={renderTitles}
        item
        xs={12}
      />
      <RenderGridIf
        check={!hidden.platforms}
        renderFn={renderPlatforms}
        item
        xs={12}
      />
      <RenderGridIf check={!hidden.tags} renderFn={renderTags} item xs={12} />
      <RenderGridIf
        check={!isEmpty(conflicts)}
        renderFn={renderConflictsConfirmation}
        item
        xs={12}
      />
      <RenderGridIf
        check={immediatePublish}
        renderFn={renderPublishNowConfirmation}
        item
        xs={12}
      />
      <RenderGridIf
        check={immediateEnd}
        renderFn={renderEndNowConfirmation}
        item
        xs={12}
      />
    </Grid>
  );

  const IconTrigger = () => (
    <IconButton
      tooltip={tooltip}
      className={classNames({ [classes.iconButton]: !gutterTop })}
      icon={icon}
      disabled={disabled}
      onClick={onOpen}
    />
  );

  const NewTabIcon = () => (
    <Tooltip title="Opens in new tab">
      <Icon className={classes.newTabIcon}>tab</Icon>
    </Tooltip>
  );

  return (
    <ModalWrapper
      baseModalId={baseModalId}
      cancelOnBackdropClick={cancelOnBackdropClick}
      Component={renderDialogContent}
      dialogClassName={classes.eventSummaryDialog}
      dialogContentStyle={dialogContentStyle}
      OpenModalComponent={icon && IconTrigger}
      onSecondaryAction={() => {
        handleClose();
        secondaryActionHandler();
      }}
      secondaryActionProps={{
        color: 'secondary',
      }}
      secondaryActionText={secondaryAction}
      onPrimaryAction={() => {
        if (!openEventInNewTab) {
          handleClose();
        }
        primaryActionHandler();
      }}
      maxWidth="sm"
      primaryActionText={primaryAction}
      primaryActionIcon={openEventInNewTab ? <NewTabIcon /> : null}
      primaryActionProps={{
        color: 'primary',
        component: primaryActionRedirectDisabled ? undefined : Link,
        disabled: blockPrimaryAction && primaryActionDisabled,
        target: openEventInNewTab ? '_blank' : '',
        to: joinPath(baseUrl, 'events', id),
      }}
      onCancel={onCancel}
    />
  );
};

EventSummaryDialogStateless.propTypes = {
  activitiesOnEnd: PropTypes.arrayOf(PropTypes.object).isRequired,
  activitiesOnStart: PropTypes.arrayOf(PropTypes.object).isRequired,
  activityTitleConflicts: PropTypes.arrayOf(PropTypes.object),
  baseModalId: PropTypes.string.isRequired,
  baseUrl: PropTypes.string.isRequired,
  blockPrimaryAction: PropTypes.bool.isRequired,
  cancelOnBackdropClick: PropTypes.bool,
  classes: PropTypes.object.isRequired,
  disabled: PropTypes.bool,
  endDate: PropTypes.string.isRequired,
  eventDetails: PropTypes.object.isRequired,
  eventDuration: PropTypes.string.isRequired,
  eventFetchDetails: PropTypes.object.isRequired,
  eventSummaryTitles: PropTypes.arrayOf(PropTypes.object).isRequired,
  eventTypeName: PropTypes.string,
  gutterTop: PropTypes.bool,
  handleClose: PropTypes.func.isRequired,
  hidden: PropTypes.object,
  icon: PropTypes.string,
  immediateEnd: PropTypes.bool,
  immediatePublish: PropTypes.bool,
  isConfigured: PropTypes.object.isRequired,
  needsConfirmations: PropTypes.object.isRequired,
  onFetchEventDetails: PropTypes.func,
  onOpen: PropTypes.func.isRequired,
  openEventInNewTab: PropTypes.bool,
  onCancel: PropTypes.func,
  primaryAction: PropTypes.string,
  primaryActionDisabled: PropTypes.bool.isRequired,
  primaryActionHandler: PropTypes.func,
  primaryActionRedirectDisabled: PropTypes.bool,
  projectName: PropTypes.string,
  publishDate: PropTypes.string.isRequired,
  secondaryAction: PropTypes.string,
  secondaryActionHandler: PropTypes.func,
  setNeedsConfirmations: PropTypes.func.isRequired,
  tags: PropTypes.arrayOf(PropTypes.string).isRequired,
  tooltip: PropTypes.string,
  uniqOnEnd: PropTypes.arrayOf(PropTypes.object).isRequired,
  uniqOnStart: PropTypes.arrayOf(PropTypes.object).isRequired,
  conflicts: PropTypes.arrayOf(PropTypes.object).isRequired,
  userTimezone: PropTypes.string.isRequired,
};

EventSummaryDialogStateless.defaultProps = {
  activityTitleConflicts: [],
  cancelOnBackdropClick: true,
  disabled: false,
  gutterTop: true,
  hidden: {
    activities: false,
    envType: false,
    eventType: false,
    platforms: false,
    project: false,
    status: false,
    tags: false,
    taskStatus: false,
    title: false,
    titles: false,
    story: false,
  },
  icon: null,
  immediateEnd: false,
  immediatePublish: false,
  onFetchEventDetails: null,
  openEventInNewTab: false,
  onCancel: () => {},
  primaryAction: 'Open',
  primaryActionHandler: () => {},
  primaryActionRedirectDisabled: false,
  projectName: null,
  secondaryAction: 'Close',
  secondaryActionHandler: () => {},
  tooltip: null,
  eventTypeName: undefined,
};

export default withStyles(eventSummaryStyles)(EventSummaryDialogStateless);
