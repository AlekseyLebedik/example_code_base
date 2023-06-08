import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import classNames from 'classnames';

import { withStyles } from '@material-ui/core/styles';
import Divider from '@material-ui/core/Divider';
import Grid from '@material-ui/core/Grid';
import Icon from '@material-ui/core/Icon';
import Tooltip from '@material-ui/core/Tooltip';

import EventDetailHeader from 'playpants/components/EventSummaryDialog/components/EventDetailHeader';
import EventDetailItem from 'playpants/components/EventSummaryDialog/components/EventDetailItem';
import eventSummaryStyles from 'playpants/components/EventSummaryDialog/styles';
import ModalWrapper from 'playpants/components/ModalWrapper';
import RenderGridIf from 'playpants/components/RenderGridIf';
import { DEMONWARE_EVENTS_TYPE_NAME_MAP as TYPE_NAME_MAP } from 'playpants/components/ScheduleComponent/constants';

import { displayViewEventDuration } from 'playpants/components/EventSummaryDialog/helpers';

const DemonwareDetailsStateless = props => {
  const {
    cancelOnBackdropClick,
    classes,
    event: {
      description,
      end_at: endAt,
      endpoint,
      env_type: envType,
      event_type: type,
      impact,
      purpose,
      scope,
      publish_at: publishAt,
      title_id: titleID,
      titleName,
      title,
    },
    baseModalId,
    isStaff,
    onClose,
    primaryAction,
    primaryActionHandler,
    secondaryAction,
    secondaryActionHandler,
    userTimezone,
    loading,
  } = props;

  const renderTitle = () => (
    <EventDetailHeader
      avatarClassName={classNames(
        classes[`demonwareEvents-${type}`],
        classes.eventSummaryTitleIcon
      )}
      className={classes.eventSummaryTitleContainer}
      primary={title}
      secondary={displayViewEventDuration(endAt, publishAt, userTimezone)}
    />
  );
  const renderEventType = () => (
    <EventDetailItem
      icon="account_tree"
      primary="Event Type"
      secondary={TYPE_NAME_MAP[type]}
    />
  );
  const renderTitleID = () => (
    <EventDetailItem
      icon="gamepad"
      isHidden={!titleID}
      primary="Title"
      secondary={titleName}
    />
  );
  const renderEnvironment = () => (
    <EventDetailItem icon="eco" primary="Environment" secondary={envType} />
  );
  const renderDescription = () => (
    <EventDetailItem
      icon="description"
      primary="Description"
      secondary={description}
    />
  );
  const renderPurpose = () => (
    <EventDetailItem icon="assessment" primary="Purpose" secondary={purpose} />
  );
  const renderImpact = () => (
    <EventDetailItem
      icon="assignment_late"
      primary="Impact"
      secondary={impact}
    />
  );
  const renderScope = () => (
    <EventDetailItem icon="my_location" primary="Scope" secondary={scope} />
  );

  const renderDialogContent = () => (
    <Grid container spacing={1}>
      <Grid item xs={12}>
        {renderTitle()}
      </Grid>
      <Grid item xs={12}>
        <Divider className={classes.eventSummaryDivider} variant="middle" />
      </Grid>
      <Grid item xs={12}>
        {renderEventType()}
      </Grid>
      <RenderGridIf check={!!titleID} renderFn={renderTitleID} item xs={12} />
      <RenderGridIf
        check={envType !== 'Unknown'}
        renderFn={renderEnvironment}
        item
        xs={12}
      />
      <RenderGridIf
        check={description}
        renderFn={renderDescription}
        item
        xs={12}
      />
      <RenderGridIf check={purpose} renderFn={renderPurpose} item xs={12} />
      <RenderGridIf check={impact} renderFn={renderImpact} item xs={12} />
      <RenderGridIf check={scope} renderFn={renderScope} item xs={12} />

      {loading ? (
        <Grid item xs={12}>
          Loading more data ...
        </Grid>
      ) : null}
    </Grid>
  );

  const NewTabIcon = () => (
    <Tooltip title="Opens in new tab">
      <Icon className={classes.newTabIcon}>tab</Icon>
    </Tooltip>
  );

  return (
    <ModalWrapper
      baseModalId={baseModalId}
      blockPrimaryAction={!isStaff}
      cancelOnBackdropClick={cancelOnBackdropClick}
      Component={renderDialogContent}
      dialogClassName={classes.eventSummaryDialog}
      dialogContentStyle={{ padding: '24px 16px 16px' }}
      maxWidth="sm"
      onPrimaryAction={primaryActionHandler}
      primaryActionIcon={<NewTabIcon />}
      primaryActionText={primaryAction}
      primaryActionProps={{
        color: 'primary',
        component: Link,
        rel: 'noopener noreferrer',
        target: '_blank',
        href: endpoint,
      }}
      onSecondaryAction={() => {
        onClose();
        secondaryActionHandler();
      }}
      secondaryActionText={secondaryAction}
      secondaryActionProps={{
        color: 'secondary',
      }}
    />
  );
};

DemonwareDetailsStateless.propTypes = {
  baseModalId: PropTypes.string.isRequired,
  cancelOnBackdropClick: PropTypes.bool,
  classes: PropTypes.object.isRequired,
  event: PropTypes.object.isRequired,
  isStaff: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  primaryAction: PropTypes.string,
  primaryActionHandler: PropTypes.func,
  secondaryAction: PropTypes.string,
  secondaryActionHandler: PropTypes.func,
  userTimezone: PropTypes.string.isRequired,
  loading: PropTypes.bool.isRequired,
};

DemonwareDetailsStateless.defaultProps = {
  cancelOnBackdropClick: true,
  primaryAction: 'Change',
  primaryActionHandler: () => {},
  secondaryAction: 'Cancel',
  secondaryActionHandler: () => {},
};

export default withStyles(eventSummaryStyles)(DemonwareDetailsStateless);
