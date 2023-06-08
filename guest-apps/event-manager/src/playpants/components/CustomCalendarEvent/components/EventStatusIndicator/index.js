import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import camelCase from 'lodash/camelCase';
import upperCase from 'lodash/upperCase';

import StatusDot from 'playpants/components/StatusDot';
import { EVENT_TASK_STATES_TO_SIGNAL } from 'playpants/constants/event';

import Avatar from '@material-ui/core/Avatar';
import { PlatformIcon } from 'dw/core/components';

import styles from './index.module.css';

export const EventStatusDot = ({ taskStatus, classes, type }) =>
  EVENT_TASK_STATES_TO_SIGNAL.includes(taskStatus) ? (
    <StatusDot
      iconClassName={classNames(
        classes[`${type}-${camelCase(taskStatus)}-task`],
        styles.scheduleEventTaskStatusDot
      )}
    />
  ) : (
    '\u00a0'
  );

EventStatusDot.propTypes = {
  classes: PropTypes.object.isRequired,
  taskStatus: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
};

export const EventStatusIndicator = ({
  classes,
  displayTimeWithTitle,
  envType,
  isCalendarView,
  isListView,
  parentClasses,
  platforms,
  taskStatus,
  type,
}) => {
  const statusDotProps = {
    classes,
    taskStatus,
    type,
  };
  const hasTaskStatus = !isCalendarView && !!taskStatus;
  const platform = platforms.length === 1 ? platforms[0] : 'default';
  const environmentAvatar = envType === 'Unknown' ? 'X' : upperCase(envType[0]);
  return (
    <div
      className={classNames(styles.noEndIndicator, parentClasses, {
        [styles.iconContainer]: isCalendarView || isListView,
        [styles.eventStatusEventListNoTask]: !hasTaskStatus,
      })}
    >
      {envType && (
        <Avatar
          className={classNames({
            [styles.envTypeIcon]: displayTimeWithTitle,
            [styles.envTypeIconListView]: !displayTimeWithTitle,
          })}
        >
          {environmentAvatar}
        </Avatar>
      )}
      {!!platforms && platforms.length > 0 && (
        <Avatar className={styles.envTypeIcon}>
          <PlatformIcon color="#616161" platform={platform} size={15} />
        </Avatar>
      )}
      <EventStatusDot {...statusDotProps} />
    </div>
  );
};

EventStatusIndicator.propTypes = {
  classes: PropTypes.object.isRequired,
  displayTimeWithTitle: PropTypes.bool.isRequired,
  envType: PropTypes.string.isRequired,
  isCalendarView: PropTypes.bool.isRequired,
  isListView: PropTypes.bool,
  parentClasses: PropTypes.string,
  platforms: PropTypes.arrayOf(PropTypes.string).isRequired,
  taskStatus: PropTypes.string,
  type: PropTypes.string,
};

EventStatusIndicator.defaultProps = {
  parentClasses: '',
  taskStatus: '',
  type: '',
  isListView: false,
};

export default EventStatusIndicator;
