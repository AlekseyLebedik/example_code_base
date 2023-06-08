import React from 'react';
import PropTypes from 'prop-types';

import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from '@material-ui/core/Button';

import styles from '../../index.module.css';

const LoginQueueDialog = ({
  handleClose,
  handleSave,
  openDialog,
  subText,
  children,
}) => (
  <Dialog
    open={openDialog}
    onClose={handleClose}
    aria-labelledby="alert-dialog-title"
    aria-describedby="alert-dialog-description"
    className={styles.loginQueueDialog}
  >
    <DialogTitle
      id="alert-dialog-title"
      className={styles.loginQueueDialogTitle}
    >
      Confirm Login Queue Changes
    </DialogTitle>
    <DialogContent>
      <DialogContentText
        id="alert-dialog-description"
        className={styles.loginQueueDialogText}
        component="div"
      >
        <div className={styles.loginQueueDialogHeader}>
          Please confirm you are happy to make these changes to the Login
          Queue&apos;s Settings
        </div>
        <h6 className={styles.loginQueueDialogSubText}>{subText}</h6>
        <table className={styles.dialogTable}>
          <thead>
            <tr className={styles.dialogTableRow}>
              <th className={styles.dialogTableHead}>Field</th>
              <th className={styles.dialogTableHead}>From</th>
              <th className={styles.dialogTableHead}>To</th>
            </tr>
          </thead>
          <tbody>{children}</tbody>
        </table>
      </DialogContentText>
    </DialogContent>
    <DialogActions>
      <Button onClick={handleClose} className={styles.loginQueueDialogBtn}>
        Cancel
      </Button>
      <Button onClick={handleSave} color="primary" autoFocus>
        Save
      </Button>
    </DialogActions>
  </Dialog>
);

LoginQueueDialog.propTypes = {
  handleClose: PropTypes.func.isRequired,
  handleSave: PropTypes.func.isRequired,
  openDialog: PropTypes.bool.isRequired,
  subText: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
};

export default LoginQueueDialog;
