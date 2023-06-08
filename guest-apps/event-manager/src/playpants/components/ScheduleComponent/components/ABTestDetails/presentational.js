import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import classNames from 'classnames';

import isEmpty from 'lodash/isEmpty';
import startCase from 'lodash/startCase';

import { withStyles } from '@material-ui/core/styles';
import Divider from '@material-ui/core/Divider';
import Grid from '@material-ui/core/Grid';

import ModalWrapper from 'playpants/components/ModalWrapper';
import EventDetailHeader from 'playpants/components/EventSummaryDialog/components/EventDetailHeader';
import EventDetailItem from 'playpants/components/EventSummaryDialog/components/EventDetailItem';
import EventItemChips from 'playpants/components/EventSummaryDialog/components/EventItemChips';
import eventSummaryStyles from 'playpants/components/EventSummaryDialog/styles';
import StatusDot from 'playpants/components/StatusDot';

const ABTestDetailsStateless = props => {
  const {
    cancelOnBackdropClick,
    classes,
    event: { category, name, source, status, type },
    openEventInNewTab,
    creator,
    testLink,
    testPeriodToDate,
    testPeriodFromDate,
    eventDuration,
    onClose,
    baseModalId,
    primaryActionHandler,
    primaryAction,
    secondaryActionHandler,
    secondaryAction,
  } = props;

  const createdByMessage = creator ? `\nCreated by ${creator}` : '';
  const renderTitle = () => (
    <EventDetailHeader
      className={classes.eventSummaryTitleContainer}
      avatarClassName={classNames(
        classes[`${type}-${status}`],
        classes.eventSummaryTitleIcon
      )}
      primary={name}
      secondary={`${eventDuration}${createdByMessage}`}
    />
  );
  const renderABTestStatus = () => (
    <EventDetailItem
      iconClassName={classes[`${type}-${status}-details`]}
      primary="Status"
      secondary={
        <StatusDot
          iconClassName={classNames(
            classes[`${type}-${status}`],
            classes.eventSummaryStatusDot
          )}
          statusText={startCase(status)}
        />
      }
    />
  );

  const renderPeriodFrom = () => (
    <EventDetailItem
      icon="calendar_today"
      primary="Test Period From"
      secondary={testPeriodFromDate}
    />
  );

  const renderPeriodTo = () => (
    <EventDetailItem
      icon="calendar_today"
      primary="Test Period To"
      secondary={testPeriodToDate}
    />
  );

  const renderCategory = () => (
    <>
      <EventDetailItem icon="category" primary="Categories" />
      <EventDetailItem
        isHidden={isEmpty(category)}
        primary={<EventItemChips classes={classes} uniqItems={category} />}
      />
    </>
  );

  const renderSources = () => (
    <>
      <EventDetailItem icon="apps" primary="Sources" />
      <EventDetailItem
        isHidden={isEmpty(source)}
        primary={<EventItemChips classes={classes} uniqItems={source} />}
      />
    </>
  );

  const renderDialogContent = () => (
    <Grid container spacing={1}>
      <Grid item xs={12}>
        {renderTitle()}
      </Grid>
      <Grid item xs={12}>
        <Divider className={classes.eventSummaryDivider} variant="middle" />
      </Grid>
      <Grid item xs>
        {renderABTestStatus()}
      </Grid>
      <Grid item xs={12}>
        {renderPeriodFrom()}
      </Grid>
      <Grid item xs={12}>
        {renderPeriodTo()}
      </Grid>
      <Grid item xs={12}>
        {renderCategory()}
      </Grid>
      <Grid item xs={12}>
        {renderSources()}
      </Grid>
    </Grid>
  );

  return (
    <ModalWrapper
      baseModalId={baseModalId}
      cancelOnBackdropClick={cancelOnBackdropClick}
      Component={renderDialogContent}
      dialogClassName={classes.eventSummaryDialog}
      dialogContentStyle={{ padding: '24px 16px 16px' }}
      maxWidth="sm"
      onPrimaryAction={() => {
        if (!openEventInNewTab) {
          onClose();
        }
        primaryActionHandler();
      }}
      primaryActionText={primaryAction}
      primaryActionProps={{
        color: 'primary',
        component: Link,
        target: openEventInNewTab ? '_blank' : '',
        to: testLink,
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

ABTestDetailsStateless.propTypes = {
  cancelOnBackdropClick: PropTypes.bool,
  classes: PropTypes.object.isRequired,
  event: PropTypes.object.isRequired,
  openEventInNewTab: PropTypes.bool,
  creator: PropTypes.string.isRequired,
  testLink: PropTypes.string.isRequired,
  testPeriodToDate: PropTypes.string.isRequired,
  testPeriodFromDate: PropTypes.string.isRequired,
  eventDuration: PropTypes.string.isRequired,
  onClose: PropTypes.func.isRequired,
  baseModalId: PropTypes.string.isRequired,
  primaryActionHandler: PropTypes.func,
  primaryAction: PropTypes.string,
  secondaryActionHandler: PropTypes.func,
  secondaryAction: PropTypes.string,
};

ABTestDetailsStateless.defaultProps = {
  cancelOnBackdropClick: true,
  openEventInNewTab: false,
  primaryActionHandler: () => {},
  primaryAction: 'View',
  secondaryActionHandler: () => {},
  secondaryAction: 'Cancel',
};

export default withStyles(eventSummaryStyles)(ABTestDetailsStateless);
