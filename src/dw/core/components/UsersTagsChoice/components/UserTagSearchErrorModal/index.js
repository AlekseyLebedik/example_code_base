import React from 'react';
import PropTypes from 'prop-types';

import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import { withStyles } from '@material-ui/core/styles';

const styles = () => ({
  paper: {
    borderTop: `#b71c1c solid 6px`,
  },
});

const UserTagSearchErrorModal = props => {
  const { classes, errorDialogOpen, setErrorDialogOpen } = props;

  return (
    <Dialog
      classes={classes}
      onClose={() => setErrorDialogOpen(false)}
      open={errorDialogOpen}
    >
      <DialogTitle>Search Error</DialogTitle>
      <DialogContent>
        <div>
          Pooled Objects search requires at least one user or tag entry.
        </div>
      </DialogContent>
      <DialogActions>
        <Button autoFocus onClick={() => setErrorDialogOpen(false)}>
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
};

UserTagSearchErrorModal.propTypes = {
  classes: PropTypes.object.isRequired,
  errorDialogOpen: PropTypes.bool.isRequired,
  setErrorDialogOpen: PropTypes.func.isRequired,
};

export default withStyles(styles)(UserTagSearchErrorModal);
