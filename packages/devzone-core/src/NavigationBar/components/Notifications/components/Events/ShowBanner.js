import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import styles from './index.module.css';

function ShowBanner({ showUnread }) {
  if (
    showUnread.Maintenance &&
    !showUnread.devzone &&
    !showUnread.EventManager &&
    !showUnread.Frameworks
  ) {
    // Maintenance Wins if there are no release notes
    return (
      <span className={classNames(styles.baseStyles, styles.orange)}>
        Unread
      </span>
    );
  }
  if (
    (!showUnread.Maintenance &&
      !showUnread.devzone &&
      !showUnread.EventManager &&
      !showUnread.Frameworks) ||
    !showUnread.Maintenance
  ) {
    return null;
  }
  // Release Notes wins if there is one single release note
  return (
    <span className={classNames(styles.baseStyles, styles.red)}>Unread</span>
  );
}

ShowBanner.propTypes = {
  showUnread: PropTypes.object,
};

ShowBanner.defaultProps = {
  showUnread: {},
};

export default ShowBanner;
