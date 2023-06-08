import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import get from 'lodash/get';

import Button from '@material-ui/core/Button';
import Dialog from 'dw/core/components/Dialog';
import { withStyles } from '@material-ui/core/styles';

import { eventGroupErrorDialogOpenSelector } from './selectors';
import { closeEventGroupErrorDialog } from './actions';

const styles = theme => ({
  paper: {
    borderTop: `${theme.palette.secondary.main} solid 6px`,
  },
});

const EventGroupErrorDialog = ({ classes, error, isOpen, onClose }) => {
  const footerButtons = [
    <Button key="close" onClick={onClose}>
      Close
    </Button>,
  ];

  const errorTitle = get(error, 'response.data.error.name') || 'Error';

  const errorMsg = error
    ? get(error, 'response.data.error.msg') || get(error, 'response.statusText')
    : null;

  return (
    <Dialog
      actions={footerButtons}
      cancelOnBackdropClick
      classes={classes}
      contentStyle={{
        width: '450px',
      }}
      onRequestClose={onClose}
      open={isOpen}
      title={errorTitle}
    >
      {errorMsg}
    </Dialog>
  );
};

EventGroupErrorDialog.propTypes = {
  classes: PropTypes.object.isRequired,
  error: PropTypes.object,
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
};

EventGroupErrorDialog.defaultProps = {
  error: null,
};

const mapStateToProps = state => ({
  isOpen: eventGroupErrorDialogOpenSelector(state),
});

const mapDispatchToProps = dispatch => ({
  onClose: bindActionCreators(closeEventGroupErrorDialog, dispatch),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(EventGroupErrorDialog));
