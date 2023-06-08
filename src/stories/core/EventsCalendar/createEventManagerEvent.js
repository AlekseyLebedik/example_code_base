import React from 'react';
import moment from 'moment-timezone';

import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import TextField from '@material-ui/core/TextField';

import styles from './eventsCalendar.module.css';

export const CreateEventManagerEventModal = props => {
  const { closeModal, isCreateEventVisible } = props;

  return (
    <Dialog
      className={styles.dialogBehind}
      onBackdropClick={closeModal}
      onEscapeKeyDown={closeModal}
      open={isCreateEventVisible}
      fullWidth
    >
      <DialogTitle>Create Event Manager Event</DialogTitle>
      <DialogContent>
        <TextField fullWidth placeholder="Title" style={{ marginTop: 10 }} />
        <TextField
          defaultValue={moment().format('dddd D, YYYY, h:mm A')}
          fullWidth
          placeholder="Start Date"
          style={{ marginTop: 10 }}
        />
        <TextField fullWidth placeholder="Notes" style={{ marginTop: 10 }} />
        <DialogActions>
          <Button onClick={closeModal}>Cancel</Button>
          <Button color="primary" onClick={closeModal} type="submit">
            Create
          </Button>
        </DialogActions>
      </DialogContent>
    </Dialog>
  );
};
