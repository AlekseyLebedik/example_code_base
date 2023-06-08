import React, { useCallback, useMemo } from 'react';
import PropTypes from 'prop-types';

import { useArchiveRestoreDefinitions } from 'dw/online-configuration/scenes/gvs/graphql/hooks';
import ConfirmActionComponent from 'dw/core/components/ConfirmActionComponent';
import { useSnackbar } from 'dw/core/hooks';
import { useHandleConflictError, useScopeURI } from '../../hooks';
import InfoButton from '../InfoButton';

const BaseButton = ({ isRestore, selected, gridApi, mutation, refetch }) => {
  const snackbar = useSnackbar();
  const handleError = useHandleConflictError();
  const onSubmit = useCallback(async () => {
    const keys = gridApi.getSelectedNodes().map(({ data: { key } }) => key);
    const plural = keys.length > 1;
    try {
      await mutation(keys);
      await refetch();
      gridApi.deselectAll();
      snackbar.success(
        `The selected key${plural ? 's were' : ' was'} successfully ${
          isRestore ? 'restored' : 'archived'
        }`
      );
    } catch (e) {
      handleError(e);
    }
  }, [mutation, isRestore, gridApi, refetch, snackbar, handleError]);
  return (
    <ConfirmActionComponent
      onClick={onSubmit}
      confirm={{
        title: `Confirm ${isRestore ? 'Restore' : 'Archive'} Definitions`,
        confirmMsg: `Are you sure you want to ${
          isRestore ? 'restore' : 'archive'
        } the selected definitions?`,
        destructive: false,
      }}
      tooltip={`${isRestore ? 'Restore' : 'Archive'} Definitions`}
      component="IconButton"
      disabled={selected.length === 0}
    >
      {isRestore ? 'restore' : 'archive'}
    </ConfirmActionComponent>
  );
};

BaseButton.propTypes = {
  isRestore: PropTypes.bool.isRequired,
  selected: PropTypes.array.isRequired,
  mutation: PropTypes.func.isRequired,
  gridApi: PropTypes.object,
  refetch: PropTypes.func.isRequired,
};
BaseButton.defaultProps = {
  gridApi: null,
};

export const ArchiveBtn = props => {
  const scopeURI = useScopeURI();
  const mutation = useArchiveRestoreDefinitions(scopeURI, false);
  return <BaseButton {...props} isRestore={false} mutation={mutation} />;
};

export const RestoreBtn = props => {
  const { selected } = props;
  const allArchived = useMemo(
    () => selected.every(({ data: { isArchived } }) => isArchived === true),
    [selected]
  );
  const scopeURI = useScopeURI();
  const mutation = useArchiveRestoreDefinitions(scopeURI, true);
  if (!allArchived) {
    return (
      <InfoButton
        icon="restore"
        tooltip="Restore Definitions"
        title="Restore Definitions"
      >
        Non archived definition cannot be restored.
      </InfoButton>
    );
  }
  return <BaseButton {...props} isRestore mutation={mutation} />;
};
RestoreBtn.propTypes = {
  selected: PropTypes.array.isRequired,
};
