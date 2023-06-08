import React from 'react';
import PropTypes from 'prop-types';
import slice from 'lodash/slice';
import moment from 'moment-timezone';
import IconMenu from 'dw/core/components/IconMenu';
import Grid from '@material-ui/core/Grid';
import ConfirmActionComponent from 'dw/core/components/ConfirmActionComponent';
import IconButton from 'dw/core/components/IconButton';
import EventSummary from 'playpants/components/EventSummaryDialog';
import TemplateFormDialog from 'playpants/components/TemplateFormDialog';
import { getNowTimestamp } from 'playpants/helpers/dateTime';
import DuplicateEvent from './components/DuplicateEvent';
import RetryPublishDialog from './components/RetryPublishDialog';

import {
  MAX_ICONS_WITHOUT_ACTION_MENU,
  MAX_ICONS_OUTSIDE_ACTION_MENU,
  REQUEST_APPROVAL_MODAL_ID,
  PUBLISH_NOW_MODAL_ID,
  RETRY_PUBLISH_MODAL_ID,
} from './constants';
import styles from './index.module.css';

const EventActionsBase = ({
  baseUrl,
  conflicts,
  currentProject,
  eventData,
  isEventManagerEvent,
  onDeleteEvent,
  onSave,
  permissions,
  status,
}) => {
  const {
    canCancel,
    canDelete,
    canDuplicate,
    canOpen,
    deleted,
    failed,
    locked,
    name,
    readOnly,
    showTemplates,
  } = status;
  const { adminPermission, eventWritePermission } = permissions;
  const disabled = locked || !eventWritePermission;
  const canPublishNow = name === 'Open' && adminPermission;
  const endingSoon =
    eventData.end_at && !(eventData.end_at - getNowTimestamp() > 1000);
  const canEndNow = name === 'Active' && adminPermission && !endingSoon;
  const canShowTemplate = showTemplates && adminPermission;
  const retryPublishOnStart =
    eventData.status === 'scheduled' && failed && 'Retry Starting Event';
  const retryPublishOnEnd =
    eventData.status === 'active' && failed && 'Retry Ending Event';
  const canRetryPublish =
    retryPublishOnStart ||
    retryPublishOnEnd ||
    (eventData.status === 'approved' && failed);

  const requestApprovalComponent = (
    <EventSummary
      conflicts={conflicts}
      disabled={disabled}
      event={{ ...eventData, type: 'eventManager' }}
      hidden={{
        activities: false,
        eventType: true,
        platforms: false,
        project: false,
        status: true,
        tags: true,
        title: false,
        titles: false,
      }}
      icon="assignment_turned_in"
      key="request-approval-button"
      primaryAction="Request"
      primaryActionHandler={() => onSave('status', 'pending')}
      secondaryAction="Cancel"
      tooltip="Request Approval"
      baseModalId={REQUEST_APPROVAL_MODAL_ID}
      baseUrl={baseUrl}
      currentProject={currentProject}
    />
  );

  const openForEditComponent = () =>
    status.name === 'Scheduled' || status.name === 'Approved' ? (
      <ConfirmActionComponent
        component="IconButton"
        confirm={{
          title: 'Confirm Open Edit',
          confirmMsg: `You are attempting to open a '${status.name}' event for edit. Continuing will delete the existing approvals received for this event and require re-approval.`,
          mainButtonLabel: 'Open',
          destructive: true,
        }}
        key="open-scheduled-for-edit-component"
        onClick={() => onSave('status', 'open')}
        tooltip="Open for Edit"
        cancelOnBackdropClick
      >
        lock_open
      </ConfirmActionComponent>
    ) : (
      <IconButton
        color="primary"
        icon="lock_open"
        key="open-for-edit-component"
        onClick={() => onSave('status', 'open')}
        tooltip="Open for Edit"
      />
    );

  const publishNowComponent = (
    <EventSummary
      conflicts={conflicts}
      disabled={disabled}
      event={{ ...eventData, type: 'eventManager' }}
      hidden={{
        activities: false,
        eventType: true,
        platforms: false,
        project: false,
        status: true,
        tags: true,
        title: false,
        titles: false,
      }}
      icon="offline_bolt"
      immediatePublish
      key="publish-now-component"
      primaryAction="Publish"
      primaryActionHandler={() => onSave('status', 'approved')}
      secondaryAction="Cancel"
      tooltip="Publish Now"
      baseModalId={PUBLISH_NOW_MODAL_ID}
      baseUrl={baseUrl}
      currentProject={currentProject}
    />
  );

  const endNowComponent = (
    <EventSummary
      disabled={disabled}
      event={{ ...eventData, type: 'eventManager' }}
      hidden={{
        activities: false,
        eventType: true,
        platforms: false,
        project: false,
        status: true,
        tags: true,
        title: false,
        titles: false,
      }}
      icon="fast_forward"
      immediateEnd
      key="end-now-component"
      primaryAction="End"
      primaryActionHandler={() => onSave('status', 'ended')}
      secondaryAction="Cancel"
      tooltip="End Now"
      baseUrl={baseUrl}
      currentProject={currentProject}
    />
  );

  const templateComponent = (
    <TemplateFormDialog
      action="save"
      baseUrl={baseUrl}
      key="save-as-template-component"
      icon="save"
      initialValues={{
        description: '',
        name: `${eventData.title} template`,
        restrict_activities: eventData.is_schedule,
        is_schedule: eventData.is_schedule,
        hasEndDate: !!eventData.end_at,
        duration: eventData.end_at
          ? {
              d: Math.floor(
                moment
                  .duration({
                    seconds: eventData.end_at - eventData.publish_at,
                  })
                  .asDays()
              ),
              h: moment
                .duration({
                  seconds: eventData.end_at - eventData.publish_at,
                })
                .hours(),
              m: moment
                .duration({
                  seconds: eventData.end_at - eventData.publish_at,
                })
                .minutes(),
              s: moment
                .duration({
                  seconds: eventData.end_at - eventData.publish_at,
                })
                .seconds(),
            }
          : { d: 3, h: 0, m: 0, s: 0 },
      }}
      submitText="Create"
      submittingText="Creating"
      title="Save Template"
    />
  );

  const duplicateComponent = (
    <DuplicateEvent
      disabled={disabled}
      eventData={eventData}
      key="duplicate-event-component"
    />
  );

  const retryPublishComponent =
    eventData.status === 'approved' ? (
      <ConfirmActionComponent
        className={styles.secondaryButton}
        component="IconButton"
        confirm={{
          title: 'Confirm Retry Publish',
          confirmMsg: 'Are you sure you want to retry to publish this event?',
          mainButtonLabel: 'Confirm',
          destructive: false,
        }}
        disabled={disabled}
        key="retry-event-component"
        onClick={() => onSave('status', 'retry-publish')}
        tooltip="Retry Publish"
        cancelOnBackdropClick
      >
        autorenew
      </ConfirmActionComponent>
    ) : (
      <RetryPublishDialog
        key="retry-publish-component"
        eventId={eventData.id}
        form={RETRY_PUBLISH_MODAL_ID}
        icon="autorenew"
        title={retryPublishOnStart || retryPublishOnEnd || 'Retry Publish'}
        task={eventData.task}
      />
    );

  const cancelEventComponent = (
    <ConfirmActionComponent
      className={styles.secondaryButton}
      component="IconButton"
      confirm={{
        title: 'Confirm Cancel',
        confirmMsg:
          "Once canceled you will not be able to reopen this event. Canceling will block any end activities from running but won't reset start activities that are already published. ",
        mainButtonLabel: 'Confirm',
        destructive: true,
      }}
      disabled={disabled}
      key="cancel-event-component"
      onClick={() => onSave('status', 'cancelled')}
      tooltip="Cancel Event"
      cancelOnBackdropClick
    >
      block
    </ConfirmActionComponent>
  );

  const deleteEventComponent = (
    <ConfirmActionComponent
      className={styles.secondaryButton}
      component="IconButton"
      confirm={{
        title: 'Confirm Event Deletion',
        confirmMsg:
          'This will delete the event along with any associated activities.',
        mainButtonLabel: 'Delete',
        destructive: true,
      }}
      disabled={disabled}
      key="delete-event-component"
      onClick={onDeleteEvent}
      tooltip="Delete Event"
      cancelOnBackdropClick
    >
      delete_forever
    </ConfirmActionComponent>
  );

  const eventActionComponentMap = [
    !readOnly && requestApprovalComponent,
    canOpen && openForEditComponent(),
    canPublishNow && publishNowComponent,
    canEndNow && endNowComponent,
    canShowTemplate && templateComponent,
    canDuplicate && duplicateComponent,
    canRetryPublish && retryPublishComponent,
    canCancel && !endingSoon && cancelEventComponent,
    canDelete && deleteEventComponent,
  ].filter(Boolean);

  const renderInsideActionMenu = components => (
    <IconMenu icon="more_vert">
      <Grid
        container
        spacing={2}
        className={styles.gridItem}
        direction="column"
      >
        {components.map(em => (
          <Grid item key={`action-menu-item-${em.key}`}>
            {em}
          </Grid>
        ))}
      </Grid>
    </IconMenu>
  );

  const renderActionBar = components => (
    <Grid container justify="flex-end" spacing={0} className={styles.grid}>
      {components.map(component => (
        <Grid key={component.key} item xs>
          {component}
        </Grid>
      ))}
    </Grid>
  );

  const renderWithActionMenu = components => {
    const outsideActionMenu = slice(
      components,
      0,
      MAX_ICONS_OUTSIDE_ACTION_MENU
    );
    const insideActionMenu = slice(components, MAX_ICONS_OUTSIDE_ACTION_MENU);

    return (
      <>
        {renderActionBar([
          ...outsideActionMenu,
          renderInsideActionMenu(insideActionMenu),
        ])}
      </>
    );
  };

  const renderEventActions = components =>
    components.length <= MAX_ICONS_WITHOUT_ACTION_MENU
      ? renderActionBar(components)
      : renderWithActionMenu(components);

  return (
    <div className={styles.actionPanel} data-cy="eventActionsPanel">
      {!eventData.is_template &&
        !deleted &&
        (isEventManagerEvent && !eventData.is_schedule
          ? renderEventActions(eventActionComponentMap)
          : deleteEventComponent)}
    </div>
  );
};

EventActionsBase.propTypes = {
  conflicts: PropTypes.arrayOf(PropTypes.object).isRequired,
  eventData: PropTypes.object.isRequired,
  isEventManagerEvent: PropTypes.bool.isRequired,
  onDeleteEvent: PropTypes.func.isRequired,
  onSave: PropTypes.func.isRequired,
  permissions: PropTypes.object.isRequired,
  status: PropTypes.object.isRequired,
  baseUrl: PropTypes.string.isRequired,
  currentProject: PropTypes.object.isRequired,
};

export default EventActionsBase;
