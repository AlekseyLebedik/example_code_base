import React, { useCallback } from 'react';
import { useParams } from 'react-router-dom';
import { GVS_EDIT_CONFIGURATION } from '@demonware/devzone-core/access/PermissionCheck/permissions';
import { useCurrentEnvPermission, useSnackbar } from 'dw/core/hooks';
import ConfirmActionComponent from 'dw/core/components/ConfirmActionComponent';

import {
  useDrafts,
  useDeleteDraft,
} from 'dw/online-configuration/scenes/gvs/graphql/hooks';

const DeleteDraftButton = () => {
  const snackbar = useSnackbar();
  const { draftId } = useParams();
  const deleteDraftMutation = useDeleteDraft();
  const { refetch: refetchDrafts } = useDrafts();
  const onDelete = useCallback(async () => {
    let error;
    try {
      ({ error } = await deleteDraftMutation(draftId));
    } catch (err) {
      error = err;
    }
    if (error) {
      // eslint-disable-next-line
      console.log(error);
      snackbar.error('Something went wrong, see logs for details.');
    } else {
      await refetchDrafts();
      snackbar.success('Draft has been successfully deleted');
    }
  }, [snackbar, deleteDraftMutation, refetchDrafts]);
  const editConfigurationPermission = useCurrentEnvPermission([
    GVS_EDIT_CONFIGURATION,
  ]);
  return editConfigurationPermission ? (
    <ConfirmActionComponent
      onClick={onDelete}
      confirm={{
        title: 'Confirm Draft Delete',
        confirmMsg: (
          <>
            <p>Are you sure you want to delete the Draft?</p>
            <p>It will be deleted within all the edits you have made.</p>
          </>
        ),
        mainButtonLabel: 'Delete',
        variant: 'destructive',
      }}
      tooltip="Delete Draft"
      component="IconButton"
    >
      delete
    </ConfirmActionComponent>
  ) : null;
};

export default DeleteDraftButton;
