import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import classNames from 'classnames';
import isEmpty from 'lodash/isEmpty';

import { withStyles } from '@material-ui/core/styles';
import Divider from '@material-ui/core/Divider';
import Grid from '@material-ui/core/Grid';
import Icon from '@material-ui/core/Icon';
import Tooltip from '@material-ui/core/Tooltip';

import EventDetailHeader from 'playpants/components/EventSummaryDialog/components/EventDetailHeader';
import EventDetailItem from 'playpants/components/EventSummaryDialog/components/EventDetailItem';
import EventItemChips from 'playpants/components/EventSummaryDialog/components/EventItemChips';
import eventSummaryStyles from 'playpants/components/EventSummaryDialog/styles';
import ModalWrapper from 'playpants/components/ModalWrapper';
import RenderGridIf from 'playpants/components/RenderGridIf';

import { displayViewEventDuration } from 'playpants/components/EventSummaryDialog/helpers';

const TYPE_NAME_MAP = {
  holidays: 'Holiday',
  'video-games': 'Video Game',
  sports: 'Sports',
  pmg: 'PMG',
};

const ExternalDetailsStateless = props => {
  const {
    cancelOnBackdropClick,
    classes,
    event: {
      description,
      end_at: endAt,
      event_type: type,
      publish_at: publishAt,
      tags,
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
  } = props;

  const renderTitle = () => (
    <EventDetailHeader
      avatarClassName={classNames(
        classes[`externalEvents-${type}`],
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
  const renderCountry = () => (
    <>
      <EventDetailItem icon="flag" primary="Countries" />
      <EventDetailItem
        primary={
          <EventItemChips
            classes={classes}
            uniqItems={tags
              .filter(t => t.tag_type === 'country')
              .map(t => t.value)}
          />
        }
      />
    </>
  );

  const renderTags = () => (
    <>
      <EventDetailItem icon="local_offer" primary="Tags" />
      <EventDetailItem
        primary={
          <EventItemChips
            classes={classes}
            uniqItems={tags
              .filter(t => t.type !== 'country')
              .map(t =>
                t.value.split('=').length === 1
                  ? `${t.tag_type}: ${t.value}`
                  : `${t.value.split('=')[0]}: ${t.value.split('=')[1]}`
              )}
          />
        }
      />
    </>
  );

  const renderDescription = () => (
    <EventDetailItem
      icon="description"
      primary="Description"
      secondary={description.split('\n').map(row => (
        <p>{row}</p>
      ))}
    />
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
      <RenderGridIf
        check={!isEmpty(tags.filter(t => t.tag_type === 'country'))}
        renderFn={renderCountry}
        item
        xs={12}
      />
      <RenderGridIf
        check={!isEmpty(tags.filter(t => t.tag_type !== 'country'))}
        renderFn={renderTags}
        item
        xs={12}
      />
      <RenderGridIf
        check={description}
        renderFn={renderDescription}
        item
        xs={12}
      />
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

ExternalDetailsStateless.propTypes = {
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
};

ExternalDetailsStateless.defaultProps = {
  cancelOnBackdropClick: true,
  primaryAction: 'Change',
  primaryActionHandler: () => {},
  secondaryAction: 'Cancel',
  secondaryActionHandler: () => {},
};

export default withStyles(eventSummaryStyles)(ExternalDetailsStateless);
