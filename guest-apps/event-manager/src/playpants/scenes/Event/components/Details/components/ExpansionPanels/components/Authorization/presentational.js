import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import IconButton from 'dw/core/components/IconButton';
import Grid from '@material-ui/core/Grid';
import Tooltip from '@material-ui/core/Tooltip';
import Badge from '@material-ui/core/Badge';

import EventSummary from 'playpants/components/EventSummaryDialog';

import { getNowTimestamp } from 'playpants/helpers/dateTime';
import { RESPONSE, AUTHORIZATION_DETAIL_ID } from '../../constants';

import styles from './index.module.css';

const AuthorizationStateless = ({
  authsDisplayCount,
  classes,
  conflicts,
  currentUser,
  dateTime,
  eventData,
  handleAuthorizationChange,
  onCancel,
  status,
  baseUrl,
  currentProject,
  authStatus,
  statusState,
  filteredAuthorizers,
}) => {
  const {
    authorizations,
    authorizers = [],
    publish_at: eventPubDate,
  } = eventData;
  const renderResponse = userID => {
    const userData = authorizations.find(
      authorizer => authorizer.user.id === userID
    );
    const userStatus = (userData && userData.status) || '';

    if (userStatus && userStatus !== 'none') {
      return (
        <Tooltip title={userStatus}>
          <div className={classNames(classes[statusState], classes.bold)}>
            {dateTime(userData.timestamp)}
          </div>
        </Tooltip>
      );
    }
    if (currentUser.id === userID && status.allowAuths) {
      const timeExpired = getNowTimestamp() > eventPubDate;
      const expiredMsg = 'Publish date passed';
      return (
        <Badge variant="dot">
          <EventSummary
            baseModalId={AUTHORIZATION_DETAIL_ID}
            conflicts={conflicts}
            disabled={timeExpired}
            event={{ ...eventData, type: 'eventManager' }}
            gutterTop={false}
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
            icon="thumbs_up_down"
            onCancel={onCancel}
            primaryAction="Approve"
            primaryActionHandler={() => handleAuthorizationChange('approved')}
            secondaryAction="Reject"
            secondaryActionHandler={() => handleAuthorizationChange('rejected')}
            tooltip={timeExpired ? expiredMsg : 'Approve or Reject Event'}
            baseUrl={baseUrl}
            currentProject={currentProject}
          />
        </Badge>
      );
    }
    return (
      <IconButton
        icon={RESPONSE.undecided}
        className={styles.iconButton}
        tooltip="undecided"
        disabled
      />
    );
  };
  return (
    <>
      <Grid item xs={6} className={classNames(classes.bold, classes.darkGrey)}>
        Authorization
      </Grid>
      <Grid
        item
        xs={6}
        className={classNames(
          classes[statusState],
          classes.bold,
          classes.center
        )}
      >
        {authStatus}
        {authStatus !== 'Cancelled' &&
          authStatus !== 'Expired' &&
          ` (${authsDisplayCount} of ${authorizers.length})`}
      </Grid>
      <Grid container spacing={1} className={styles.authGridContainer}>
        {filteredAuthorizers.map(user => (
          <Fragment key={user.id}>
            <Grid item xs={6} className={classes.grey}>
              {user.name}
            </Grid>
            <Grid item xs={6} className={styles.responseContainer}>
              {renderResponse(user.id)}
            </Grid>
          </Fragment>
        ))}
      </Grid>
    </>
  );
};

AuthorizationStateless.propTypes = {
  authsDisplayCount: PropTypes.number.isRequired,
  authStatus: PropTypes.string.isRequired,
  baseUrl: PropTypes.string.isRequired,
  classes: PropTypes.object.isRequired,
  conflicts: PropTypes.arrayOf(PropTypes.object).isRequired,
  currentProject: PropTypes.object.isRequired,
  currentUser: PropTypes.object.isRequired,
  dateTime: PropTypes.func.isRequired,
  eventData: PropTypes.object.isRequired,
  filteredAuthorizers: PropTypes.arrayOf(PropTypes.object).isRequired,
  handleAuthorizationChange: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
  status: PropTypes.object.isRequired,
  statusState: PropTypes.string.isRequired,
};

export default AuthorizationStateless;
