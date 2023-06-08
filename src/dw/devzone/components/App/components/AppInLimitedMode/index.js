import React, { Component } from 'react';

import Icon from '@material-ui/core/Icon';
import Button from '@material-ui/core/Button';
import { SUPPORT_EMAIL, SUPPORT_SLACK } from 'dw/config';
import { getMailto } from 'dw/core/helpers/email';

import styles from './index.module.css';

class AppInLimitedMode extends Component {
  state = { expanded: false };

  handleClick = () =>
    this.setState(prevState => ({ expanded: !prevState.expanded }));

  render() {
    const { expanded } = this.state;

    return (
      <div className={styles.container}>
        <div className="flex items-center">
          <Icon fontSize="small" className={styles.icon}>
            warning
          </Icon>
          Limited Functionality
        </div>

        {expanded && (
          <p className={styles.help}>
            The application was not able to load your permissions successfully.
            Some functionality may not be available. Try to refresh the page and
            if the problem persists contacts{' '}
            <a
              className={styles.link}
              href={getMailto(
                'Devzone Frontend Error Feedback',
                'Application in limited mode'
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
          </p>
        )}

        <Button onClick={this.handleClick} className={styles.expandButton}>
          <Icon className={styles.expandIcon}>
            {expanded ? 'expand_less' : 'expand_more'}
          </Icon>
        </Button>
      </div>
    );
  }
}

export default AppInLimitedMode;
