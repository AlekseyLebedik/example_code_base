import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';

import { useCancellablePromise, useSnackbar } from 'dw/core/hooks';
import { cloneCompanyGroup } from 'dw/permission-management/services/permissions';
import ConfirmActionComponent from 'dw/core/components/ConfirmActionComponent';
import { fetchGroups } from 'dw/permission-management/scenes/Groups/actions';

const CloneGroup = ({ itemId }) => {
  const cancellablePromise = useCancellablePromise();
  const snackbarActions = useSnackbar();
  const dispatch = useDispatch();

  const cloneGroup = useCallback(async () => {
    try {
      await cancellablePromise(cloneCompanyGroup, itemId);
      dispatch(fetchGroups());
      snackbarActions.success('Group successfully cloned.');
    } catch (e) {
      if (e.isCanceled) return;
      const {
        response: { data },
      } = e;
      snackbarActions.error(data?.error?.msg);
    }
  }, [itemId]);

  return (
    <ConfirmActionComponent
      onClick={cloneGroup}
      tooltip="Clone Group"
      confirm={{
        title: 'Confirm Permission Group Cloning',
        confirmMsg:
          'This will add new group with the same users and same permissions. Are you sure you want to clone?',
        mainButtonLabel: 'Clone',
      }}
      component="IconButton"
    >
      content_copy
    </ConfirmActionComponent>
  );
};

CloneGroup.propTypes = {
  itemId: PropTypes.number.isRequired,
};

export default CloneGroup;
