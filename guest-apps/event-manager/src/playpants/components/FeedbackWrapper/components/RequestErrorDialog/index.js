import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';

import Button from '@material-ui/core/Button';
import Dialog from 'dw/core/components/Dialog';
import { withStyles } from '@material-ui/core/styles';

import { requestErrorDialogOpenSelector } from './selectors';
import { closeRequestErrorDialog } from './actions';

const styles = theme => ({
  paper: {
    borderTop: `${theme.palette.secondary.main} solid 6px`,
  },
});

const RequestErrorDialog = ({ onClose, isOpen, error, classes }) => {
  const footerButtons = [
    <Button key="cancel" onClick={onClose}>
      Cancel
    </Button>,
  ];

  return (
    <Dialog
      title="Error: Action required"
      actions={footerButtons}
      open={isOpen}
      contentStyle={{
        width: '450px',
      }}
      onRequestClose={onClose}
      classes={classes}
      cancelOnBackdropClick
    >
      {error}
    </Dialog>
  );
};

RequestErrorDialog.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  classes: PropTypes.object.isRequired,
  error: PropTypes.string.isRequired,
};

const mapStateToProps = state => ({
  isOpen: requestErrorDialogOpenSelector(state),
});

const mapDispatchToProps = dispatch => ({
  onClose: bindActionCreators(closeRequestErrorDialog, dispatch),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(RequestErrorDialog));
