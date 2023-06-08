import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

import { Tooltip } from 'antd';

import { formatTooltipDateTime } from 'dw/core/components/EventsCalendar/components/EventsTimeline/helpers';
import { ENV_GROUPS, STATUS_GROUPS, SOURCE_GROUPS } from '../../constants';

import styles from '../../index.module.css';

const TimelineEvent = ({
  getEventColorClass,
  item,
  itemProps,
  userTimezone,
  width,
}) => (
  <Tooltip
    overlayClassName={styles.tooltip}
    placement="bottom"
    title={
      <>
        <small>
          {`${formatTooltipDateTime(item.start_time, userTimezone, false)} -
              ${formatTooltipDateTime(item.end_time, userTimezone, false)}`}
        </small>
        <p>
          <strong>Title:</strong> {item.title}
        </p>
        <p>
          <strong>Source:</strong> {SOURCE_GROUPS[item.type]}
        </p>
        {item.type === 'informationalEvents' && (
          <p>
            <strong>Type:</strong> {item.event_type}
          </p>
        )}
        <p>
          <strong>Status:</strong> {STATUS_GROUPS[item.status]}
        </p>
        <p>
          <strong>Environment:</strong> {ENV_GROUPS[item.env_type]}
        </p>
        {item.event_type &&
          (item.event_type === 'eventManager' ||
            item.event_type === 'informationalEvents') && (
            <p>
              <strong>Platforms:</strong> {item.platforms?.join(', ')}
            </p>
          )}
      </>
    }
  >
    <div
      {...itemProps}
      className={
        ('rct-item',
        classnames(
          styles.timelineEvent,
          getEventColorClass(item.type, item.status)
        ))
      }
    >
      {width > 25 && item.title}
    </div>
  </Tooltip>
);

TimelineEvent.propTypes = {
  getEventColorClass: PropTypes.func.isRequired,
  item: PropTypes.object.isRequired,
  itemProps: PropTypes.object.isRequired,
  userTimezone: PropTypes.string.isRequired,
  width: PropTypes.number.isRequired,
};

export default TimelineEvent;
