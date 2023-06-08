import React from 'react';
import PropTypes from 'prop-types';

import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import { makeStyles } from '@material-ui/core/styles';
import { useFormik } from 'formik';

import UpdateProfileForm from './components/UpdateProfileForm';

const useStyles = makeStyles(() => ({
  margin: {
    marginRight: 'auto',
  },
}));

function ProfilePopup({ open, onHide, data, onSubmit, logoutUser }) {
  const { name, userName: username, defaultTitleEnv, timezone } = data;
  const formik = useFormik({
    initialValues: {
      username,
      name,
      timezone,
      defaultTitleEnv: defaultTitleEnv?.id,
    },
    onSubmit,
  });
  const classes = useStyles();

  const footerButtons = [
    <Button
      key="reauthenticate"
      onClick={logoutUser}
      className={classes.margin}
      color="primary"
    >
      Reauthenticate
    </Button>,
    <Button key="cancel" onClick={onHide}>
      Cancel
    </Button>,
    <Button
      key="save"
      type="submit"
      color="primary"
      onClick={e => {
        formik.handleSubmit();
        onHide(e);
      }}
    >
      Save
    </Button>,
  ];

  return (
    <Dialog disableBackdropClick onClose={onHide} open={open}>
      <DialogTitle>Your Profile</DialogTitle>
      <DialogContent style={{ width: '500px' }}>
        <UpdateProfileForm formik={formik} />
      </DialogContent>
      <DialogActions>{footerButtons}</DialogActions>
    </Dialog>
  );
}

ProfilePopup.propTypes = {
  open: PropTypes.bool.isRequired,
  onHide: PropTypes.func.isRequired,
  data: PropTypes.object.isRequired,
  onSubmit: PropTypes.func.isRequired,
  logoutUser: PropTypes.func.isRequired,
};

export default ProfilePopup;
