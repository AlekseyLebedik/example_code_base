import React from 'react';
import PropTypes from 'prop-types';

import {
  TextField,
  Button,
  Tooltip,
  InputLabel,
  ClickAwayListener,
} from '@material-ui/core';
import TitleEnvField from '../TitleEnvField';
import TimezoneField from '../TimezoneField';
import { getOAuthToken } from '../../../../auth/utils';
import styles from './index.module.css';

function UpdateProfileForm({ formik }) {
  const [openAlert, setOpen] = React.useState(false);

  const handleTooltipClose = () => {
    setOpen(false);
  };

  const handleTooltipOpen = () => {
    navigator.clipboard.writeText(getOAuthToken()?.accessToken);
    setOpen(true);
  };

  return (
    <form className="userProfile">
      <TextField
        id="username"
        label="Username"
        fullWidth
        {...formik.getFieldProps('username')}
      />
      <TextField
        id="name"
        label="Full Name"
        fullWidth
        {...formik.getFieldProps('name')}
      />
      <TitleEnvField formik={formik} />
      <TimezoneField formik={formik} />
      <InputLabel disabled className={styles.authTooltipClass}>
        Auth token valid for 30mins
      </InputLabel>
      <ClickAwayListener onClickAway={handleTooltipClose}>
        <Tooltip
          onClose={handleTooltipClose}
          open={openAlert}
          disableFocusListener
          disableHoverListener
          disableTouchListener
          title="Copied!"
          placement="right"
        >
          <Button
            variant="outlined"
            color="primary"
            size="small"
            onClick={handleTooltipOpen}
            className={styles.authTooltipClass}
          >
            Copy Bearer Auth Token
          </Button>
        </Tooltip>
      </ClickAwayListener>
    </form>
  );
}

UpdateProfileForm.propTypes = {
  formik: PropTypes.object.isRequired,
};

export default UpdateProfileForm;
