import React from 'react';
import PropTypes from 'prop-types';

import { getMailto } from 'dw/core/helpers/email';
import { SUPPORT_EMAIL, SUPPORT_SLACK } from 'dw/config';
import MessagePanel from 'playpants/components/MessagePanel';

import styles from './index.module.css';

export default function MissingProjectPanel({ projectName }) {
  const customMsg = (
    <div className={styles.msgContainer}>
      <div className={styles.projectMsg}>
        Event Manager not Configured for <strong>{projectName}</strong>
      </div>
      <div className={styles.supportMsg}>
        for support contact{' '}
        <a
          href={getMailto(
            `Event Manager not Configured for ${projectName}`,
            undefined,
            SUPPORT_EMAIL
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
  return <MessagePanel customMsg={customMsg} />;
}

MissingProjectPanel.propTypes = {
  projectName: PropTypes.string,
};

MissingProjectPanel.defaultProps = {
  projectName: 'This Project',
};
