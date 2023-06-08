import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import { LEGACY_HOST } from '../../../../../config';
import { convertDateLocal } from './helpers';
import ShowBanner from './ShowBanner';
import styles from './index.module.css';

function CriticalEvents({ criticalEventsList, showUnread }) {
  if (criticalEventsList && criticalEventsList.length > 0) {
    return (
      <div className={styles.criticalEventsContainer}>
        <span className={styles.header}>Critical Events</span>
        {criticalEventsList.map(item => (
          <div key={item.id}>
            <a
              className={styles.links}
              href={`${LEGACY_HOST}/admin/events/criticalevent/${item.id}/change/`}
              target="_blank"
              rel="noopener noreferrer"
            >
              {item.name}
              {item.read === false ? (
                <ShowBanner showUnread={showUnread} />
              ) : null}
            </a>
            <p className={styles.content}>{item.description}</p>
            <div className={styles.datesContainer}>
              <div className={styles.start}>
                <h5 className={styles.content}>Start</h5>
                {convertDateLocal(moment.unix(item.startTime))}
              </div>
              <div className={styles.end}>
                <h5 className={styles.content}>End</h5>
                {convertDateLocal(moment.unix(item.endTime))}
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  }
  return null;
}
CriticalEvents.propTypes = {
  criticalEventsList: PropTypes.arrayOf(PropTypes.object).isRequired,
  showUnread: PropTypes.object,
};

CriticalEvents.defaultProps = {
  showUnread: {},
};

function Maintenance({ maintenanceList, showUnread }) {
  return (
    <div className={styles.container}>
      <span className={styles.header}>Current Maintenance</span>
      {maintenanceList && maintenanceList.length > 0
        ? maintenanceList.map(item => (
            <div key={item.id}>
              <a
                className={styles.links}
                href={`${LEGACY_HOST}/admin/events/maintenance/${item.id}/change/`}
                target="_blank"
                rel="noopener noreferrer"
              >
                {item.subject}
                {item.read === false ? (
                  <ShowBanner showUnread={showUnread} />
                ) : null}
              </a>
              <p className={styles.content}>{item.purpose}</p>
              <div className={styles.datesContainer}>
                <div className={styles.start}>
                  <h5 className={styles.content}>Start</h5>
                  {convertDateLocal(item.start_time)}
                </div>
                <div className={styles.end}>
                  <h5 className={styles.content}>End</h5>
                  {convertDateLocal(item.end_time)}
                </div>
              </div>
            </div>
          ))
        : null}
    </div>
  );
}

Maintenance.propTypes = {
  maintenanceList: PropTypes.arrayOf(PropTypes.object).isRequired,
  showUnread: PropTypes.object,
};

Maintenance.defaultProps = {
  showUnread: {},
};

export { CriticalEvents, Maintenance };
