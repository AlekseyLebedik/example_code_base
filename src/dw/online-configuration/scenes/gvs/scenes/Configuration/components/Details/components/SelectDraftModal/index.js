import React, { useState, useCallback, useMemo } from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

import AutocompleteGeneral from 'dw/core/components/AutocompleteGeneral';
import { useQueryParam } from 'dw/core/hooks';
import { useDrafts, useCreateDraft } from '@gvs/graphql/hooks';
import { MAX_DRAFT_NAME_LENGTH } from '@gvs/constants';

const SelectDraftModal = ({ onChange, handleClose }) => {
  const { drafts, loading, refetch } = useDrafts();
  const [currentDraftId, onChangeDraftId] = useQueryParam('draftId');
  const [draftId, setDraftId] = useState(currentDraftId);
  const [error, setError] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  const [createDraftMutation] = useCreateDraft();

  const options = useMemo(
    () => (drafts ? drafts.map(d => ({ value: d.id, label: d.name })) : []),
    [drafts]
  );

  const defaultValue = useMemo(
    () => options.find(o => String(o.value) === String(currentDraftId)),
    [options, currentDraftId]
  );

  const validate = useCallback(
    draftName => {
      if (!draftName) {
        return 'Required';
      }
      if (draftName.length >= MAX_DRAFT_NAME_LENGTH) {
        return `Ensure draft is less than or equal to ${MAX_DRAFT_NAME_LENGTH} characters.`;
      }
      let draft = drafts?.find(d => String(d.id) === String(draftName));
      if (!draft) {
        draft = drafts?.find(d => d.name === String(draftName));
        if (draft) {
          return `The draft with name ${draft.name} already exists`;
        }
      }
      return null;
    },
    [drafts]
  );

  const [defaultInputValue, setDefaultInputValue] = useState();

  const onSubmit = useCallback(async () => {
    let id = draftId;
    const validationError = validate(draftId);
    if (validationError !== null) {
      setError(validationError);
      setDefaultInputValue(draftId);
      return;
    }
    const draft = drafts?.find(d => String(d.id) === String(draftId));
    if (!draft) {
      setError(null);
      setSubmitting(true);
      ({
        data: {
          gvsCreateDraft: { id },
        },
      } = await createDraftMutation({ draftData: { name: draftId } }));
      await refetch();
      setError(null);
      setSubmitting(false);
    }
    handleClose();
    setTimeout(() => {
      onChangeDraftId(id);
      onChange();
    }, 50);
  }, [
    draftId,
    drafts,
    setError,
    setSubmitting,
    createDraftMutation,
    onChangeDraftId,
    onChange,
    handleClose,
  ]);

  if (loading) return null;

  return (
    <Dialog open onClose={handleClose} aria-labelledby="form-dialog-title">
      <DialogTitle id="form-dialog-title">Select Draft for Edit</DialogTitle>
      <DialogContent>
        <DialogContentText>
          You may select existing draft from a list or type a new draft name and
          hit create in dropdown. It will create a new empty draft.
        </DialogContentText>
        <AutocompleteGeneral
          key={defaultInputValue}
          options={options}
          defaultValue={defaultValue}
          onChange={setDraftId}
          onAdd={() => {
            setError(null);
          }}
          error={Boolean(error)}
          helperText={error}
          defaultInputValue={defaultInputValue}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="default" disabled={submitting}>
          Cancel
        </Button>
        <Button onClick={onSubmit} color="primary" disabled={submitting}>
          {submitting ? 'Submitting ...' : 'Apply'}
        </Button>
      </DialogActions>
    </Dialog>
  );
};
SelectDraftModal.propTypes = {
  onChange: PropTypes.func.isRequired,
  handleClose: PropTypes.func.isRequired,
};

export default SelectDraftModal;
