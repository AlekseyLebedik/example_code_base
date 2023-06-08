import React, { useCallback, useMemo, useRef, useState } from 'react';
import Tooltip from '@material-ui/core/Tooltip';
import Icon from '@material-ui/core/Icon';
import IconButton from '@material-ui/core/IconButton';
import Button from '@material-ui/core/Button';
import { useCreateDraft, useDraftDetails } from '@gvs/graphql/hooks';
import { useSnackbar } from 'dw/core/hooks';

import DraftNameField from '@gvs/components/DraftNameField';
import { Dialog } from 'dw/core/components';

const RevertDraftButton = () => {
  const { diffs, name, loading } = useDraftDetails();
  const [open, setOpen] = useState(false);
  const draftNameRef = useRef();
  const [nameError, setNameError] = React.useState();
  const defaultDraftName = useMemo(
    () => (name ? `revert_${name}` : name),
    [name]
  );

  const edits = useMemo(
    () =>
      diffs?.map(({ populationType, populationValue, scopeURI, variables }) => {
        const perPlatform = {};
        variables.forEach(({ key, valuesPerPlatform }) => {
          valuesPerPlatform.forEach(({ platform, source }) => {
            const value = {
              key,
              ...(source === '__UNSET__' && { unset: true }),
              ...(source !== '__UNSET__' && { value: source }),
            };
            if (!(platform in perPlatform)) {
              perPlatform[platform] = [value];
            } else {
              perPlatform[platform].push(value);
            }
          });
        });
        const variablesPerPlatform = [];
        Object.keys(perPlatform).forEach(platform => {
          variablesPerPlatform.push({
            platform,
            values: perPlatform[platform],
          });
        });
        return {
          scopeURI,
          populationType,
          populationValue,
          variablesPerPlatform,
        };
      }),
    [diffs]
  );

  const [createDraft, { loading: createDraftLoading }] = useCreateDraft();
  const snackbar = useSnackbar();
  const onRevert = useCallback(async () => {
    setNameError();
    const err = draftNameRef?.current?.validate(true);
    if (err) {
      setNameError(err);
      return;
    }
    try {
      const {
        data: {
          gvsCreateDraft: { id },
        },
      } = await createDraft({
        draftData: {
          name: draftNameRef?.current?.getValue() || defaultDraftName,
        },
        edits,
      });
      if (id) {
        snackbar.success(
          `${draftNameRef.current.getValue()} draft successfully created.`
        );
      }
      setOpen(false);
    } catch (e) {
      // eslint-disable-next-line
      console.log(e);
      snackbar.error('Something went wrong, see logs for details');
    }
  }, [createDraft, defaultDraftName]);

  const actions = useMemo(
    () => [
      <Button onClick={() => setOpen(false)} disabled={createDraftLoading}>
        Cancel
      </Button>,
      <Button color="primary" onClick={onRevert} disabled={createDraftLoading}>
        {createDraftLoading ? 'Submitting ...' : 'Create Revert'}
      </Button>,
    ],
    [createDraftLoading, onRevert]
  );

  if (loading) return null;

  return (
    <>
      <Tooltip title="Revert Draft">
        <IconButton onClick={() => setOpen(true)}>
          <Icon>restore</Icon>
        </IconButton>
      </Tooltip>
      {open && (
        <Dialog
          title="Create Revert Draft"
          actions={actions}
          onRequestClose={() => setOpen(false)}
          open
        >
          <p>
            Creating this draft will revert any changes made in the original
            draft.
          </p>
          If any changes are made to the original draft after, will not be
          reflected in this Revert Draft.
          <DraftNameField
            ref={draftNameRef}
            initialValue={defaultDraftName}
            error={Boolean(nameError)}
            helperText={nameError}
            margin="dense"
            label="Draft Name"
            InputLabelProps={{ shrink: true }}
            fullWidth
          />
        </Dialog>
      )}
    </>
  );
};

export default RevertDraftButton;
