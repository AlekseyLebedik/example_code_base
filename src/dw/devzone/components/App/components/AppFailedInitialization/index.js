import React from 'react';

import { SUPPORT_EMAIL, SUPPORT_SLACK } from 'dw/config';
import { getMailto } from 'dw/core/helpers/email';

import styles from './index.module.css';

function AppFailedInitialization() {
  return (
    <div className={styles.container}>
      <div className={styles.title}>500</div>
      <div className={styles.subtitle}>Something went wrong</div>
      <div className={styles.description}>
        Try to refresh the page and if the problem persists
        <br />
        contact{' '}
        <a
          className={styles.link}
          href={getMailto(
            'Devzone Frontend Error Feedback',
            'Application failed to initialize'
          )}
        >
          {SUPPORT_EMAIL}
        </a>
        {' or our Slack channel '}
        <a
          className={styles.link}
          href={SUPPORT_SLACK.url}
          target="_blank"
          rel="noopener noreferrer"
        >
          {SUPPORT_SLACK.channel}
        </a>
      </div>
    </div>
  );
}

export default AppFailedInitialization;
