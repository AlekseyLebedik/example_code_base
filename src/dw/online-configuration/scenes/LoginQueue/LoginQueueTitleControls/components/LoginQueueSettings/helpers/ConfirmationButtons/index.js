import React from 'react';
import PropTypes from 'prop-types';

import Button from '@material-ui/core/Button';
import styles from '../../index.module.css';

const LoginQueueConfirmationButtons = ({
  handleCancel,
  handleSave,
  disableSave,
  disableCancel,
  submitting,
  idName,
}) => (
  <div className={styles.loginQueueButtonGroup} id={idName}>
    <Button
      className={styles.loginQueueButton}
      onClick={handleCancel}
      disabled={disableCancel}
    >
      Cancel
    </Button>
    <Button color="primary" onClick={handleSave} disabled={disableSave}>
      {submitting ? 'Saving...' : 'Save'}
    </Button>
  </div>
);

LoginQueueConfirmationButtons.propTypes = {
  handleCancel: PropTypes.func.isRequired,
  handleSave: PropTypes.func.isRequired,
  disableSave: PropTypes.bool.isRequired,
  disableCancel: PropTypes.bool.isRequired,
  submitting: PropTypes.bool.isRequired,
  idName: PropTypes.string.isRequired,
};

export default LoginQueueConfirmationButtons;
