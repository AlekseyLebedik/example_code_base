import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import { COREVIZ_HOST } from '@demonware/devzone-core/config';

import styles from './index.module.css';

const MWInfo = props => (
  <div className={props.className}>
    <div className={styles.mwContainer}>
      <p>
        Dashboards are now handled by the Descriptive Analytics team. For
        support email{' '}
        <a href="mailto:descriptivegameanalyticsrequests@activision.com">
          (descriptivegameanalyticsrequests@activision.com)
        </a>
        .
        <br />
        Reports can now be found within the Analytics portal and Coreviz. The
        breakdown of the reports are as follows:
      </p>
      <div className={styles.row}>
        <div className={classNames(styles.column, styles.moreWidth)}>
          <h4 className={styles.textCenter}>Analytics Portal Dashboards</h4>
          <a
            href="https://analytics.activision.com"
            target="_blank"
            className={styles.styleLinks}
            rel="noopener noreferrer"
          >
            (https://analytics.activision.com)
          </a>
          <ul>
            <li>MW Executive Summary</li>
            <li>MW Engagement</li>
            <li>COD - Executive Title Comparisons (last 5 titles)</li>
            <li>MW Email Channel Performance</li>
            <li>MW IGC Channel Performance</li>
            <li>Video/Display Impressions Dashboard</li>
            <li>Game Analytics</li>
            <li>Marketing and Media Analytics</li>
          </ul>
        </div>
        <div className={classNames(styles.column, styles.borderLeft)}>
          <h4 className={styles.textCenter}>CoreViz Dashboards</h4>
          <a
            href={`${COREVIZ_HOST}/dashboards/191/`}
            target="_blank"
            className={styles.styleLinks}
            rel="noopener noreferrer"
          >
            ({COREVIZ_HOST}/dashboards/191/)
          </a>
          <ul>
            <li>Map Stats</li>
            <li>Mode Stats</li>
            <li>Weapon Usage</li>
            <li>Gunsmith Usage</li>
            <li>Player Progression</li>
            <li>Bad Spawns</li>
            <li>Attachment Performance</li>
            <li>Perk Usage</li>
            <li>Lethal Equipment Usage</li>
            <li>Killstreak Performance</li>
            <li>Cross Play Stats</li>
            <li>Studio Ops</li>
            <li>Online Concurrent Users</li>
          </ul>
        </div>
      </div>
      <br />
      <h4>
        <strong>Note for access to the Analytics Portal:</strong>
      </h4>
      <ul>
        <li>
          If you have used the analytics portal{' '}
          <a
            href="https://analytics.activision.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            (https://analytics.activision.com)
          </a>{' '}
          previously, you will continue to access it the same way with single
          sign on via OKTA.
        </li>
        <li>
          If you are a new user, you must first have our analytics app added to
          your OKTA using the steps below. Sign into OKTA.
          <a
            href="https://activision.okta.com/app/UserHome"
            target="_blank"
            rel="noopener noreferrer"
          >
            (https://activision.okta.com/app/UserHome)
          </a>
        </li>
        <li>In OKTA, click on the Add Apps button in the top right corner.</li>
        <li>Add the App, Tableau – Analytics. </li>
        <li>
          Support Services will set up the OKTA piece, and we will add you user
          to Tableau so you can access the portal. This can take a day, so plan
          ahead.
        </li>
      </ul>

      <p>Please let us know if you have any questions, concerns or issues.</p>
      <p>Descriptive Analytics Team</p>
    </div>
  </div>
);

MWInfo.propTypes = {
  className: PropTypes.string,
};
MWInfo.defaultProps = {
  className: undefined,
};

export default MWInfo;
