import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Tooltip from '@material-ui/core/Tooltip';
import Typography from '@material-ui/core/Typography';

import AsyncComponent from 'dw/core/components/AsyncComponent';

import styles from './index.module.css';

const Monaco = AsyncComponent(() =>
  import(
    /* webpackChunkName: "MonacoEditor" */ 'dw/core/components/FormFields/Monaco'
  )
);

class ViewConfig extends Component {
  state = {
    open: false,
  };

  handleOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  render() {
    const { config, configName } = this.props;
    const { open } = this.state;

    return (
      <>
        <Tooltip title={config ? 'View Config' : configName}>
          <div onClick={config && this.handleOpen}>{configName}</div>
        </Tooltip>
        {config && open && (
          <Dialog
            open={open}
            onClose={this.handleClose}
            scroll="paper"
            className={`${styles.viewConfigModal}`}
          >
            <DialogTitle>View Config</DialogTitle>
            <DialogContent className={styles.dialog}>
              <Typography gutterBottom>
                <strong>Name:</strong> {config.name}
              </Typography>
              <Typography gutterBottom>
                <strong>Target:</strong> {config.serviceID}
              </Typography>
              <Typography gutterBottom>
                Custom config (JSON structure):
              </Typography>
              <Monaco
                height={150}
                options={{
                  folding: false,
                  fontSize: 12,
                  lineNumbers: false,
                  minimap: { enabled: false },
                  readOnly: true,
                  scrollBeyondLastLine: false,
                  wordWrap: 'on',
                  wrappingIndent: 'indent',
                }}
                language="json"
                value={config.modifiers}
              />
            </DialogContent>
            <DialogActions>
              <Button onClick={this.handleClose}>Close</Button>
            </DialogActions>
          </Dialog>
        )}
      </>
    );
  }
}

ViewConfig.propTypes = {
  configName: PropTypes.string.isRequired,
  config: PropTypes.object,
};

ViewConfig.defaultProps = {
  config: undefined,
};

export default ViewConfig;
