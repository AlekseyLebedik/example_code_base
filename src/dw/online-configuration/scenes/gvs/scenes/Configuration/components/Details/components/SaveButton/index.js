import React, { useCallback, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import hash from 'object-hash';
import Tooltip from '@material-ui/core/Tooltip';
import IconButton from '@material-ui/core/IconButton';
import Icon from '@material-ui/core/Icon';

import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogActions from '@material-ui/core/DialogActions';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core';
import {
  useCreateEdit,
  useRefreshConfigQueries,
} from '../../../../../../graphql/hooks';
import { useDraft } from '../../hooks';

const DRAFTS_QUERIES = ['DraftEditsDiff', 'DraftDiff'];

const useStyles = makeStyles(theme => ({
  error: {
    color: theme.palette.error.main,
  },
}));

const SaveButton = ({
  edits,
  toggleEditMode,
  refetchConfiguration,
  refetchDraft,
}) => {
  const classes = useStyles();
  const createEditMutation = useCreateEdit();
  const [open, setOpen] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState(null);
  const [comment, setComment] = useState('');
  const [commentError, setCommentError] = useState(null);
  const { draftId } = useDraft();

  const clear = useCallback(clearComment => {
    setSubmitting(false);
    setError(null);
    setCommentError(null);
    if (clearComment) setComment('');
  }, []);

  useEffect(() => {
    clear();
  }, [comment, clear]);

  const onSaveClick = useCallback(() => {
    clear(true);
    setTimeout(() => setOpen(true), 50);
  }, [clear]);

  const setRefetchQueries = useRefreshConfigQueries(draftId, true);

  const onSubmit = useCallback(async () => {
    clear();
    if (!comment) {
      setCommentError('Required');
      return;
    }
    setError(null);
    setSubmitting(true);
    try {
      const { error: mutationError } = await createEditMutation(edits, comment);
      if (mutationError) {
        setError(String(mutationError));
      } else {
        const extraQueries = DRAFTS_QUERIES.map(q => hash(`${q}-${draftId}`));
        setRefetchQueries(extraQueries);
        await refetchConfiguration({ variables: { edits: null } });
        await refetchDraft();
        toggleEditMode(false);
      }
    } catch (e) {
      setError(String(e));
    } finally {
      setSubmitting(false);
    }
  }, [
    edits,
    setError,
    setSubmitting,
    createEditMutation,
    toggleEditMode,
    comment,
    refetchConfiguration,
    refetchDraft,
  ]);

  return (
    <>
      <Tooltip title="Save Changes">
        <span>
          <IconButton
            onClick={onSaveClick}
            color="primary"
            disabled={edits.length === 0}
          >
            <Icon>save</Icon>
          </IconButton>
        </span>
      </Tooltip>
      <Dialog
        open={open}
        onClose={() => setOpen(false)}
        aria-labelledby="form-dialog-title"
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle id="form-dialog-title">Save Changes</DialogTitle>
        <DialogContent>
          {error ? (
            <DialogContentText key="error" className={classes.error}>
              {error}
            </DialogContentText>
          ) : null}
          <DialogContentText key="help">
            Add comment describing changes you have made
          </DialogContentText>
          <TextField
            value={comment}
            onChange={e => setComment(e.target.value)}
            error={Boolean(commentError)}
            helperText={commentError}
            rows={5}
            label="Comment"
            InputLabelProps={{ shrink: true }}
            fullWidth
            multiline
          />
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => setOpen(false)}
            color="default"
            disabled={submitting}
          >
            Cancel
          </Button>
          <Button onClick={onSubmit} color="primary" disabled={submitting}>
            {submitting ? 'Saving ...' : 'Save'}
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};
SaveButton.propTypes = {
  edits: PropTypes.arrayOf(PropTypes.object).isRequired,
  toggleEditMode: PropTypes.func.isRequired,
  refetchConfiguration: PropTypes.func.isRequired,
  refetchDraft: PropTypes.func.isRequired,
};
export default SaveButton;
