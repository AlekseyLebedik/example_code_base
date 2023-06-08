import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import reduce from 'lodash/reduce';
import omit from 'lodash/omit';

import {
  EDIT_LOGINQUEUE_OPEN_STATE,
  EDIT_LOGINQUEUE_ERR_CODE,
  EDIT_LOGINQUEUE_MAX_LOGIN_RATE,
} from '@demonware/devzone-core/access/PermissionCheck/permissions';
import { useCurrentEnvPermission } from 'dw/core/hooks';

import LoginQueueDialog from '../../helpers/DialogBox';
import LoginQueueConfirmationButtons from '../../helpers/ConfirmationButtons';
import styles from '../../index.module.css';
import QueueStateSelector from './components/QueueStateSelector';
import MaxLoginRate from './components/MaxLoginRate';
import QueueClosedCode from './components/QueueClosedCode';

const UpdatedData = ({ fieldName, oldValue, newValue }) => (
  <tr className={styles.dialogTableRow}>
    <td className={styles.dialogTableData}>{fieldName}</td>
    <td className={styles.dialogTableData}>{oldValue}</td>
    <td className={styles.dialogTableData}>{newValue}</td>
  </tr>
);

UpdatedData.propTypes = {
  fieldName: PropTypes.string.isRequired,
  oldValue: PropTypes.string.isRequired,
  newValue: PropTypes.string.isRequired,
};

function calculateQueueDifference(oldData, newData) {
  return reduce(
    newData,
    (result, value, key) => {
      let newValue;
      if (key === 'open' && value !== oldData[key]) {
        newValue = value ? 0 : 1;
      } else if (value && value !== oldData[key]) {
        newValue = value;
      }
      return newValue === undefined
        ? omit(result, key)
        : { ...result, [key]: newValue };
    },
    {}
  );
}

const QueueSettings = ({
  queues,
  selectedQueue,
  editLoginQueueSettings,
  submitting,
  setSubmitting,
  error,
}) => {
  const [queueData, setQueueData] = useState({ ...queues[selectedQueue] });
  const setOpenClosed = value => setQueueData({ ...queueData, open: !!value });
  const setClosedCode = value =>
    setQueueData({ ...queueData, error_code: parseInt(value, 10) });
  const setLoginRate = value =>
    setQueueData({
      ...queueData,
      login_rate: value ? parseInt(value, 10) : null,
    });

  const [queueStateError, setQueueStateError] = useState('');
  const [maxLoginRateError, setMaxLoginRateError] = useState('');
  const [queueClosedCodeError, setQueueClosedCodeError] = useState('');

  const [openDialog, setOpenDialog] = useState(false);
  const [queueUpdatedData, setQueueUpdatedData] = useState({});
  const [disabledBtn, setDisabledBtn] = useState({
    save: true,
    cancel: true,
  });

  const [, , result] = useCurrentEnvPermission(
    [
      EDIT_LOGINQUEUE_MAX_LOGIN_RATE,
      EDIT_LOGINQUEUE_OPEN_STATE,
      EDIT_LOGINQUEUE_ERR_CODE,
    ],
    false
  );
  const canEditErrorCode = result?.data?.[EDIT_LOGINQUEUE_ERR_CODE] ?? false;
  const canEditQueueState = result?.data?.[EDIT_LOGINQUEUE_OPEN_STATE] ?? false;
  const canEditLoginRate =
    result?.data?.[EDIT_LOGINQUEUE_MAX_LOGIN_RATE] ?? false;

  useEffect(() => {
    setQueueData({ ...queues[selectedQueue] });
    setSubmitting(false);
  }, [selectedQueue]);

  useEffect(() => {
    // We've submitted and got an error back
    if (submitting && error) {
      setSubmitting(false);
      setQueueStateError(
        error?.invalid
          ? error?.invalid.find(i => i.field === 'queueState')?.msg
          : undefined
      );
      setMaxLoginRateError(
        error?.invalid
          ? error?.invalid.find(i => i.field === 'loginRate')?.msg
          : undefined
      );
      setQueueClosedCodeError(
        error?.invalid
          ? error?.invalid.find(i => i.field === 'queueErrorCode')?.msg
          : undefined
      );
    }
  }, [submitting, error]);

  useEffect(() => {
    const differenceValue = calculateQueueDifference(
      queues[selectedQueue],
      queueData
    );
    setQueueUpdatedData(differenceValue);
    if (Object.keys(differenceValue).length > 0) {
      setDisabledBtn({ save: false, cancel: false });
    } else if (
      !queueData.login_rate &&
      queues[selectedQueue].login_rate !== queueData.login_rate
    ) {
      setDisabledBtn({ save: true, cancel: false });
    } else {
      setDisabledBtn({ save: true, cancel: true });
    }
  }, [queueData.open, queueData.login_rate, queueData.error_code]);

  const handleSave = () => {
    setSubmitting(true);
    editLoginQueueSettings(selectedQueue, queueUpdatedData);
    setOpenDialog(false);
  };

  const handleCancel = () => {
    setDisabledBtn({ save: true, cancel: true });
    setQueueData({ ...queues[selectedQueue] });
  };

  return (
    <div className={styles.loginQueueForm}>
      <QueueStateSelector
        queueState={queueData.open}
        setQueueState={setOpenClosed}
        canEditQueueState={canEditQueueState && !submitting}
        error={queueStateError}
      />
      <MaxLoginRate
        targetRateLimit={
          queueData.login_rate === null ? '' : queueData.login_rate
        }
        setTargetRateLimit={setLoginRate}
        canEditLoginRate={canEditLoginRate && !submitting}
        error={maxLoginRateError}
      />
      <QueueClosedCode
        queueClosedCode={queueData.error_code}
        setQueueClosedCode={setClosedCode}
        canEditErrorCode={canEditErrorCode && !submitting}
        error={queueClosedCodeError}
      />
      {(canEditQueueState || canEditErrorCode || canEditLoginRate) && (
        <LoginQueueConfirmationButtons
          idName="LoginQueueSettings"
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
        subText={`Queue ${selectedQueue}'s Changes:`}
      >
        <>
          {queueUpdatedData?.open !== undefined && (
            <UpdatedData
              fieldName="Queue State"
              newValue={queueUpdatedData?.open === 0 ? 'Open' : 'Closed'}
              oldValue={queues[selectedQueue]?.open ? 'Open' : 'Closed'}
            />
          )}
          {queueUpdatedData?.login_rate && (
            <UpdatedData
              fieldName="Max Login Rate"
              newValue={`${queueUpdatedData?.login_rate?.toLocaleString()} / second`}
              oldValue={`${queues[
                selectedQueue
              ]?.login_rate?.toLocaleString()} / second`}
            />
          )}
          {queueUpdatedData?.error_code && (
            <UpdatedData
              fieldName="Queue Closed Code"
              newValue={queueUpdatedData?.error_code}
              oldValue={queues[selectedQueue]?.error_code}
            />
          )}
        </>
      </LoginQueueDialog>
    </div>
  );
};

QueueSettings.propTypes = {
  selectedQueue: PropTypes.number.isRequired,
  queues: PropTypes.array.isRequired,
  editLoginQueueSettings: PropTypes.func.isRequired,
  submitting: PropTypes.bool.isRequired,
  setSubmitting: PropTypes.func.isRequired,
  error: PropTypes.object,
};

QueueSettings.defaultProps = {
  error: undefined,
};

export default QueueSettings;
