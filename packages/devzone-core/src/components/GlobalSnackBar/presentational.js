import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import MuiSnackbar from '@material-ui/core/Snackbar';
import MuiSnackbarContent from '@material-ui/core/SnackbarContent';
import IconButton from '@material-ui/core/IconButton';
import Icon from '@material-ui/core/Icon';
import { withStyles } from '@material-ui/core/styles';

import * as Constants from './constants';

import styles from './presentational.module.css';

const Snackbar = withStyles({
  root: { position: 'relative', marginTop: '5px', top: 0 },
  anchorOriginBottomCenter: {
    transform: 'none',
    left: 'auto',
  },
})(MuiSnackbar);

const SnackbarContent = withStyles({
  root: {
    backgroundColor: 'rgb(49, 49, 49) !important',
    color: '#fff !important',
  },
  message: { maxWidth: '88%' },
  action: {
    top: '0',
    right: '0',
    padding: '0',
  },
})(MuiSnackbarContent);

const globalSnackBarStyles = theme => ({
  root: {
    zIndex: theme.zIndex.snackbar,
  },
});

function GlobalSnackBarStateless({
  messages,
  autoHideDuration,
  hide,
  classes,
}) {
  return (
    <div className={classNames(styles.container, classes.root)}>
      {messages.length > 1 && (
        <div
          className={styles.clearAll}
          onClick={() => messages.forEach(message => hide(message))}
        >
          Clear All
        </div>
      )}
      {messages.map(message => (
        <Snackbar
          open
          key={message.type}
          autoHideDuration={autoHideDuration}
          onClose={(event, reason) => reason !== 'clickaway' && hide(message)}
        >
          <SnackbarContent
            message={message.message}
            action={[
              <IconButton
                key="close"
                aria-label="Close"
                color="inherit"
                onClick={() => hide(message)}
              >
                <Icon>close</Icon>
              </IconButton>,
            ]}
          />
        </Snackbar>
      ))}
    </div>
  );
}

GlobalSnackBarStateless.propTypes = {
  messages: PropTypes.arrayOf(
    PropTypes.oneOfType([PropTypes.string, PropTypes.object])
  ).isRequired,
  autoHideDuration: PropTypes.number,
  hide: PropTypes.func,
  classes: PropTypes.object,
};

GlobalSnackBarStateless.defaultProps = {
  autoHideDuration: Constants.AUTO_HIDE_INTERVAL,
  hide() {},
  classes: {},
};

export default withStyles(globalSnackBarStyles)(GlobalSnackBarStateless);
