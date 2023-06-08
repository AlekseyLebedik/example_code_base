import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Tooltip from '@material-ui/core/Tooltip';
import Clipboard from 'react-clipboard.js';

import Button from '@material-ui/core/Button';

import clippy from '@demonware/devzone-core/themes/clippy.svg';
import {
  SUCCESS_MESSAGE_DELAY,
  SUCCESS_MESSAGE_TTL,
  LEAVE_DELAY,
} from './constants';

import styles from './index.module.css';

class ClipboardComponent extends Component {
  state = {
    copied: false,
  };

  componentWillUnmount() {
    clearTimeout(this.timeout);
  }

  onSuccess = () => {
    clearTimeout(this.timeout);
    this.timeout = setTimeout(() => {
      // Allow components to finish animation e.g. button click before changing to success message
      this.setState({ copied: true });

      this.timeout = setTimeout(() => {
        // Revert to the copy button
        this.setState({ copied: false });
      }, SUCCESS_MESSAGE_TTL);
    }, SUCCESS_MESSAGE_DELAY);
  };

  tooltip = () => {
    const { label, clipboardText } = this.props;
    const { copied } = this.state;
    return !copied ? (
      <>
        {label}: {clipboardText}
        <Clipboard
          data-clipboard-text={clipboardText}
          onSuccess={this.onSuccess}
          component="span"
          className={styles.button}
        >
          <Button
            size="small"
            style={{
              backgroundColor: 'rgba(255, 255, 255, 0.7)',
              hoverColor: 'rgba(255, 255, 255, 0.87)',
            }}
          >
            <img src={clippy} alt="" />
          </Button>
        </Clipboard>
      </>
    ) : (
      'Successfully copied to clipboard!'
    );
  };

  render() {
    const { children, element: Element, clipboardText } = this.props;
    return clipboardText ? (
      <Tooltip
        title={this.tooltip()}
        placement="top-end"
        interactive
        leaveDelay={LEAVE_DELAY}
      >
        <Element>{children}</Element>
      </Tooltip>
    ) : (
      <Element>{children}</Element>
    );
  }
}

ClipboardComponent.propTypes = {
  clipboardText: PropTypes.string,
  label: PropTypes.string,
  children: PropTypes.node,
  element: PropTypes.string,
};

ClipboardComponent.defaultProps = {
  clipboardText: undefined,
  label: undefined,
  element: 'div',
  children: null,
};

export default ClipboardComponent;
