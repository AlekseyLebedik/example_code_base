import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import Drawer from '@material-ui/core/Drawer';
import Icon from '@material-ui/core/Icon';

import LoadingComponent from 'dw/core/components/Loading';

import styles from './index.module.css';

class ExpandedMessagePanel extends React.Component {
  renderMessages = () => {
    const { data, selectedMessageId, messageRef } = this.props;

    return (
      <div className={styles.messageList}>
        {data.map(item => {
          let style = styles.debugLogs;
          const type = item.level.toLowerCase();
          if (type === 'warning') {
            style = styles.warningLogs;
          } else if (type === 'debug') {
            style = styles.debugLogs;
          } else if (type === 'error') {
            style = styles.errorLogs;
          }
          return (
            <div
              key={item.id}
              ref={(item.id === selectedMessageId && messageRef) || undefined}
              className={classNames(styles.message, styles.log, style, {
                [styles.selectedLog]: item.id === selectedMessageId,
              })}
            >
              <p>
                {item.level} {item.program} {item.syslog_severity}
              </p>
              <p>{item.message}</p>
            </div>
          );
        })}
      </div>
    );
  };

  render() {
    const { isLoading, isOpen, toggleDrawer } = this.props;
    return (
      <div className={styles.details}>
        <Drawer
          anchor="right"
          open={isOpen}
          onClose={toggleDrawer}
          classes={{ paper: styles.paper }}
        >
          <div className={styles.drawerContent}>
            <Icon className={styles.clear} onClick={toggleDrawer}>
              clear
            </Icon>

            {isLoading ? <LoadingComponent /> : this.renderMessages()}
          </div>
        </Drawer>
      </div>
    );
  }
}

ExpandedMessagePanel.propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string,
      type: PropTypes.string,
      message: PropTypes.string,
    })
  ).isRequired,
  toggleDrawer: PropTypes.func,
  isOpen: PropTypes.bool,
  isLoading: PropTypes.bool,
  selectedMessageId: PropTypes.string,
  messageRef: PropTypes.func.isRequired,
};

ExpandedMessagePanel.defaultProps = {
  toggleDrawer: () => {},
  isOpen: false,
  isLoading: false,
  selectedMessageId: null,
};

export default ExpandedMessagePanel;
