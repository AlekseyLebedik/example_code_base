import React, {
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import PropTypes from 'prop-types';
import { useMutation } from '@apollo/client';

import { useGraphMutationSnackbar } from 'dw/core/hooks';
import IconButton from 'dw/core/components/IconButton';
import ConfirmActionComponent from 'dw/core/components/ConfirmActionComponent';
import { ClansContext } from 'dw/clans/components/ClansProvider';
import ClanTableHeader from 'dw/clans/components/ClanTableHeader';
import ClanMembersTable from 'dw/clans/components/ClanMembersTable';
import {
  ADD_CLAN_MEMBERS,
  BAN_CLAN_MEMBERS,
  REMOVE_CLAN_MEMBERS,
} from 'dw/clans/mutations';
import { CLANS_PERMISSIONS, MEMBERS_PROP } from 'dw/clans/constants';
import AddClanMembersDialog from './components/AddClanMembersDialog';

export const MEMBERS_COLUMNS = [
  {
    headerName: 'Player',
    field: 'player',
    checkboxSelection: true,
    cellClass: params =>
      params.data.role === 'OWNER' ? 'checkbox-disabled' : 'checkbox-enabled',
    cellRenderer: 'playerCellRenderer',
    minWidth: 250,
    wrapText: true,
    autoHeight: true,
  },
  {
    headerName: 'Role',
    field: 'role',
    maxWidth: 110,
    wrapText: true,
    autoHeight: true,
  },
  {
    headerName: 'Member Since',
    field: 'memberSince',
    valueFormatter: params => params.context.formatDateTime(params.value),
    wrapText: true,
    autoHeight: true,
  },
  {
    headerName: 'Last Updated',
    field: 'lastUpdated',
    valueFormatter: params => params.context.formatDateTime(params.value),
    wrapText: true,
    autoHeight: true,
  },
];

const ClanMembers = ({
  clansPermissions,
  classes,
  formatDateTime,
  refetch,
  rowData,
}) => {
  const apiRef = useRef();
  const graphMutationSnackbar = useGraphMutationSnackbar();
  const { titleId, env, clanId } = useContext(ClansContext);
  const [selectedMembers, setSelectedMembers] = useState([]);
  const [failedMembers, setFailedMembers] = useState([]);
  const [membersDialogOpen, setMembersDialogOpen] = useState(false);
  const [addClanMember, { error: addError }] = useMutation(ADD_CLAN_MEMBERS);
  const [banClanMembers, { error: banError }] = useMutation(BAN_CLAN_MEMBERS);
  const [removeClanMembers, { error: removeError }] =
    useMutation(REMOVE_CLAN_MEMBERS);

  useEffect(() => {
    if (addError) graphMutationSnackbar.error(addError);
    if (banError) graphMutationSnackbar.error(banError);
    if (removeError) graphMutationSnackbar.error(removeError);
  }, [addError, banError, removeError]);

  const handleSelectMember = useCallback(
    ({ api }) => {
      const rows = api.getSelectedRows();
      setSelectedMembers(rows);
    },
    [setSelectedMembers]
  );

  const handleAddClanMembers = async members => {
    const { data } = await addClanMember({
      variables: {
        titleId,
        env,
        clanId,
        members: members.map(m => ({ userID: m.player.userID, role: m.role })),
      },
    });
    const membersAdded = data?.addClanMembers?.members;
    if (membersAdded?.length) {
      graphMutationSnackbar.success(
        `${membersAdded.length}/${members.length} clan members additions`
      );
      apiRef.current.applyTransaction({
        add: membersAdded,
        addIndex: 0,
      });
    }
    const failedAdditions = data?.addClanMembers?.errors;
    if (failedAdditions?.length) {
      setFailedMembers(failedAdditions.map(e => e.userID));
      graphMutationSnackbar.warning(
        `${failedAdditions.length} clan members additions`
      );
    } else {
      setMembersDialogOpen(false);
    }
  };

  const handleBanMembers = async () => {
    const res = await banClanMembers({
      variables: {
        titleId,
        env,
        clanId,
        members: selectedMembers.map(m => ({ userID: m.player.userID })),
      },
    });
    if (res?.data?.banClanMembers?.bans?.length) {
      graphMutationSnackbar.success('Ban clan members');
      apiRef.current.applyTransaction({ remove: selectedMembers });
      await refetch();
    }
  };

  const handleRemoveMembers = async () => {
    const res = await removeClanMembers({
      variables: {
        titleId,
        env,
        clanId,
        members: selectedMembers.map(m => ({ userID: m.player.userID })),
      },
    });
    if (res?.data?.removeClanMembers?.ok) {
      graphMutationSnackbar.success('Remove clan members');
      apiRef.current.applyTransaction({ remove: selectedMembers });
    }
  };

  const disabledOptions = useMemo(
    () => rowData.map(member => member.player.userID),
    [rowData]
  );

  const handleCloseAddMembersModal = () => {
    setMembersDialogOpen(false);
    setFailedMembers([]);
  };

  return (
    <div className={classes.clanTableContainer} data-cy="clanMembersTable">
      <ClanTableHeader
        title="Members"
        actionButtons={
          clansPermissions.canEditClans && (
            <>
              <IconButton
                color="primary"
                icon="playlist_add"
                onClick={() => setMembersDialogOpen(true)}
                tooltip="Add clan member"
              />
              <ConfirmActionComponent
                tooltip={
                  !selectedMembers.length
                    ? 'Select members to ban first'
                    : `Ban selected clan member${
                        selectedMembers.length > 1 ? 's' : ''
                      }`
                }
                confirm={{
                  title: 'Confirm Ban Clan Members',
                  confirmMsg: (
                    <div>
                      Are you sure you want to ban these members? <br />
                      <br />
                      {selectedMembers.map(m => (
                        <div style={{ fontWeight: 'bold' }}>
                          {m.player.userID} | {m.player.username}
                        </div>
                      ))}
                    </div>
                  ),
                  mainButtonLabel: 'Ban',
                  destructive: true,
                }}
                color="secondary"
                component="IconButton"
                disabled={!selectedMembers.length}
                onClick={handleBanMembers}
              >
                remove_circle
              </ConfirmActionComponent>
              <ConfirmActionComponent
                tooltip={
                  !selectedMembers.length
                    ? 'Select members to remove first'
                    : `Remove selected clan member${
                        selectedMembers.length > 1 ? 's' : ''
                      }`
                }
                confirm={{
                  title: 'Confirm Remove Clan Members',
                  confirmMsg: (
                    <div>
                      Are you sure you want to remove these members? <br />
                      <br />
                      {selectedMembers.map(m => (
                        <div style={{ fontWeight: 'bold' }}>
                          {m.player.userID} | {m.player.username}
                        </div>
                      ))}
                    </div>
                  ),
                  mainButtonLabel: 'Remove',
                  destructive: true,
                }}
                color="secondary"
                component="IconButton"
                disabled={!selectedMembers.length}
                onClick={handleRemoveMembers}
              >
                delete
              </ConfirmActionComponent>
            </>
          )
        }
      />
      <ClanMembersTable
        apiRef={apiRef}
        columnDefs={MEMBERS_COLUMNS}
        formatDateTime={formatDateTime}
        getRowId={({ data }) => `${data.player.userID}-${data.role}`}
        handleSelectMember={handleSelectMember}
        isRowSelectable={rowNode => rowNode.data.role !== 'OWNER'}
        rowData={rowData}
      />
      <AddClanMembersDialog
        disabledOptions={disabledOptions}
        failedMembers={failedMembers}
        onClose={handleCloseAddMembersModal}
        onSubmit={handleAddClanMembers}
        open={membersDialogOpen}
      />
    </div>
  );
};

ClanMembers.propTypes = {
  clansPermissions: CLANS_PERMISSIONS.isRequired,
  classes: PropTypes.object.isRequired,
  formatDateTime: PropTypes.func.isRequired,
  refetch: PropTypes.func.isRequired,
  rowData: MEMBERS_PROP.isRequired,
};

export default ClanMembers;
