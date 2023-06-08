import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

import { EDIT_LOGINQUEUE_MAX_CCU } from '@demonware/devzone-core/access/PermissionCheck/permissions';
import { useCurrentEnvPermission } from 'dw/core/hooks';

import LoginQueueDialog from '../../helpers/DialogBox';
import LoginQueueConfirmationButtons from '../../helpers/ConfirmationButtons';
import styles from '../../index.module.css';
import MaxCCU from './components/MaxCCU';

const LoginQueueSettings = ({
  targetOnlineUsers,
  editLoginQueueTitleSettings,
  currentTitleId,
  submitting,
  setSubmitting,
  error,
}) => {
  const [maxCCU, setMaxCCU] = useState(targetOnlineUsers);
  const [openDialog, setOpenDialog] = useState(false);
  const [maxCCUError, setMaxCCUError] = useState(undefined);
  const [disabledBtn, setDisabledBtn] = useState({
    save: true,
    cancel: true,
  });

  const canEditMaxCCU = useCurrentEnvPermission(EDIT_LOGINQUEUE_MAX_CCU);

  useEffect(() => {
    // We've submitted and got an error back
    if (submitting && error) {
      setSubmitting(false);
      setMaxCCUError(() =>
        error?.invalid
          ? error?.invalid.find(i => i.field === 'maxCCU')?.msg
          : undefined
      );
    }
  }, [submitting, error]);

  const handleSave = () => {
    setSubmitting(true);
    editLoginQueueTitleSettings({
      maxCCU,
    });
    setOpenDialog(false);
  };

  const handleCancel = () => {
    setDisabledBtn({ save: true, cancel: true });
    setMaxCCU(targetOnlineUsers);
  };

  const handleChange = value => {
    const newCCU = parseInt(value, 10);
    const checkUpdate = newCCU === targetOnlineUsers;
    setMaxCCU(newCCU);
    setDisabledBtn({
      save: checkUpdate || !newCCU,
      cancel: checkUpdate,
    });
  };

  return (
    <div className={styles.loginQueueForm}>
      <MaxCCU
        maxCCU={maxCCU}
        setMaxCCU={handleChange}
        canEditMaxCCU={canEditMaxCCU && !submitting}
        error={maxCCUError}
      />
      {canEditMaxCCU && (
        <LoginQueueConfirmationButtons
          idName="LoginQueueTitleSettings"
          handleCancel={handleCancel}
          handleSave={() => setOpenDialog(true)}
          disableCancel={submitting ? true : disabledBtn.cancel}
          disableSave={submitting ? true : disabledBtn.save}
          submitting={submitting}
        />
      )}
      <LoginQueueDialog
        handleClose={() => setOpenDialog(false)}
        handleSave={handleSave}
        openDialog={openDialog}
        subText={`All Queues for Title ${currentTitleId}`}
      >
        <tr className={styles.dialogTableRow}>
          <td className={styles.dialogTableData}>Max CCU</td>
          <td className={styles.dialogTableData}>
            {targetOnlineUsers.toLocaleString()}
          </td>
          <td className={styles.dialogTableData}>{maxCCU.toLocaleString()}</td>
        </tr>
      </LoginQueueDialog>
    </div>
  );
};

LoginQueueSettings.propTypes = {
  targetOnlineUsers: PropTypes.number.isRequired,
  currentTitleId: PropTypes.number.isRequired,
  editLoginQueueTitleSettings: PropTypes.func.isRequired,
  submitting: PropTypes.bool.isRequired,
  setSubmitting: PropTypes.func.isRequired,
  error: PropTypes.object,
};

LoginQueueSettings.defaultProps = {
  error: undefined,
};

export default LoginQueueSettings;
