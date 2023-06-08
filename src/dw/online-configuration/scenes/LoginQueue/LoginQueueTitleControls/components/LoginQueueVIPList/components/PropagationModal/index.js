import React, { useState, useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';

import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogActions from '@material-ui/core/DialogActions';
import TextField from '@material-ui/core/TextField';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';

import {
  getLoginQueueStatusTitleEnv,
  getLoginQueueVIPListTitleEnv,
  propagateLoginQueueVIPListTitleEnv,
} from 'dw/online-configuration/services/loginqueue';
import { nonCriticalHTTPError } from '@demonware/devzone-core/helpers/errors';

import { useCancellablePromise, useSnackbar } from 'dw/core/hooks';
import ConfirmActionComponent from 'dw/core/components/ConfirmActionComponent';

import styles from './index.module.css';

const getEnvIdentifier = titleEnv => `${titleEnv.title}-${titleEnv.env}`;

const PropagationModal = ({
  open,
  onClose,
  validPropagateTitles,
  selectedQueue,
}) => {
  const currentTitleId = useSelector(
    state => state.Components?.TitleSelector?.currentTitle?.id
  );
  const currentTitleEnv = useSelector(
    state => state.Components?.TitleSelector?.currentEnv?.shortType
  );

  const [savingPropagate, setSavingPropagate] = useState(false);
  const [fetchingQueueList, setFetchingQueueList] = useState(false);
  const [fetchingQueue, setFetchingQueue] = useState(false);
  const [validQueues, setValidQueues] = useState([]);
  const [selectedTitleEnv, setSelectedTitleEnv] = useState(
    getEnvIdentifier(validPropagateTitles[0]) || {}
  );
  const [targetQueue, setTargetQueue] = useState('');
  const [vipList, setVIPList] = useState(null);
  const [targetTitleId, targetTitleEnv] = selectedTitleEnv.split('-');

  const dispatch = useDispatch();
  const snackbar = useSnackbar();
  const cancellablePromise = useCancellablePromise();

  useEffect(() => {
    const fetchQueues = async () => {
      if (open) {
        setFetchingQueueList(true);
        try {
          const resp = await cancellablePromise(
            getLoginQueueStatusTitleEnv,
            targetTitleId,
            targetTitleEnv
          );
          setValidQueues(resp.data.queues.map(q => q?.queue_id?.toString()));
          setTargetQueue(resp.data.queues[0].queue_id?.toString());
          setFetchingQueueList(false);
        } catch (err) {
          if (err.isCanceled) return;
          setTargetQueue('');
          setValidQueues([]);
          setVIPList(null);
          setFetchingQueueList(false);
          dispatch(nonCriticalHTTPError(err));
        }
      }
    };
    fetchQueues();
  }, [selectedTitleEnv, open]);

  useEffect(() => {
    const fetchQueueVIPList = async () => {
      if (targetQueue === null || targetQueue === '') return;
      setFetchingQueue(true);
      try {
        const resp = await cancellablePromise(
          getLoginQueueVIPListTitleEnv,
          targetTitleId,
          targetTitleEnv,
          targetQueue
        );
        setVIPList(resp?.data);
        setFetchingQueue(false);
      } catch (err) {
        if (err.isCanceled) return;
        setVIPList(null);
        setFetchingQueue(false);
        dispatch(nonCriticalHTTPError(err));
      }
    };
    fetchQueueVIPList();
  }, [selectedTitleEnv, targetQueue]);

  const onSave = useCallback(async () => {
    setSavingPropagate(true);
    try {
      await cancellablePromise(
        propagateLoginQueueVIPListTitleEnv,
        targetTitleId,
        targetTitleEnv,
        targetQueue,
        currentTitleId,
        currentTitleEnv,
        selectedQueue
      );
      onClose();
      snackbar.success(
        `Login Queue VIP list propagated from ${currentTitleId} ${currentTitleEnv.toUpperCase()}, queue ${selectedQueue}, to ${targetTitleId} ${targetTitleEnv.toUpperCase()}, queue ${targetQueue}.`
      );
    } catch (err) {
      if (err.isCanceled) return;
      dispatch(nonCriticalHTTPError(err));
    }
    setSavingPropagate(false);
  }, [
    targetTitleId,
    targetTitleEnv,
    targetQueue,
    currentTitleId,
    currentTitleEnv,
    selectedQueue,
  ]);

  const vipListEmptyMessage =
    (vipList && vipList.length === 0 && 'Queue ID to propagate to') ||
    (vipList &&
      vipList.length > 0 &&
      `Propagating to this queue will overwrite the current VIP list (${vipList?.length} gamertags)`) ||
    (!vipList && 'No VIP data found');

  const queueHelpText =
    (fetchingQueueList && 'Fetching queue list...') ||
    (fetchingQueue && 'Checking queue...') ||
    (vipList === null && 'No valid queues') ||
    vipListEmptyMessage;

  const saveDisabled =
    savingPropagate ||
    fetchingQueueList ||
    fetchingQueue ||
    selectedTitleEnv === undefined ||
    targetQueue === '' ||
    targetQueue === null ||
    targetQueue === undefined;

  return (
    <Dialog
      open={open}
      onClose={onClose}
      PaperProps={{ className: styles.propagationModal }}
    >
      <DialogTitle>Propagate VIP gamertags to</DialogTitle>
      <div className={styles.loginQueueFormItem}>
        <InputLabel id="titleEnv" className={styles.loginQueueFormLabel}>
          Title Env
        </InputLabel>
        <TextField
          select
          SelectProps={{
            MenuProps: {
              anchorOrigin: {
                vertical: 'bottom',
                horizontal: 'left',
              },
              getContentAnchorEl: null,
            },
          }}
          className={styles.loginQueueFormInput}
          value={selectedTitleEnv}
          key="titleEnv"
          name="titleEnv"
          error={false}
          helperText="Title Env to propagate to"
          onChange={e => {
            setSelectedTitleEnv(e.target.value);
            setTargetQueue(null);
          }}
          disabled={false}
        >
          {validPropagateTitles.map(t => (
            <MenuItem key={getEnvIdentifier(t)} value={getEnvIdentifier(t)}>
              {t.name}
            </MenuItem>
          ))}
        </TextField>
      </div>
      <div className={styles.loginQueueFormItem}>
        <InputLabel id="queue" className={styles.loginQueueFormLabel}>
          Queue
        </InputLabel>
        <TextField
          select
          SelectProps={{
            MenuProps: {
              anchorOrigin: {
                vertical: 'bottom',
                horizontal: 'left',
              },
              getContentAnchorEl: null,
            },
          }}
          className={styles.loginQueueFormInput}
          value={targetQueue}
          key="queue"
          name="queue"
          error={false}
          helperText={queueHelpText}
          onChange={e => {
            setTargetQueue(e.target.value);
          }}
          disabled={
            !validQueues.length > 0 && !fetchingQueue && !fetchingQueueList
          }
        >
          {validQueues.map(q => (
            <MenuItem key={q} value={q.toString()}>
              Queue {q}
            </MenuItem>
          ))}
        </TextField>
      </div>
      <DialogActions>
        <Button
          onClick={onClose}
          className={styles.loginQueueDialogBtn}
          disabled={savingPropagate}
        >
          Cancel
        </Button>
        {vipList?.length === 0 ? (
          <Button
            onClick={onSave}
            className={styles.loginQueueDialogBtn}
            color="primary"
            disabled={saveDisabled}
          >
            {savingPropagate ? 'Propagating...' : 'Propagate'}
          </Button>
        ) : (
          <ConfirmActionComponent
            component={Button}
            className={styles.loginQueueDialogBtn}
            color="primary"
            onClick={onSave}
            disabled={saveDisabled}
            confirm={{
              title: 'Confirm Propagate',
              confirmMsg: `Are you sure you want to propagate this list of VIP gamertags? The target list (${vipList?.length} gamertags) will be deleted.`,
              mainButtonLabel: 'Propagate',
              destructive: true,
            }}
          >
            {savingPropagate ? 'Propagating...' : 'Propagate'}
          </ConfirmActionComponent>
        )}
      </DialogActions>
    </Dialog>
  );
};

PropagationModal.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  validPropagateTitles: PropTypes.array.isRequired,
  selectedQueue: PropTypes.number.isRequired,
};

export default PropagationModal;
