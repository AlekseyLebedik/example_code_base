import React, { useContext, useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import { useMutation } from '@apollo/client';

import { useGraphMutationSnackbar } from 'dw/core/hooks';
import { ClansContext } from 'dw/clans/components/ClansProvider';
import IconButton from 'dw/core/components/IconButton';
import ClanTableHeader from 'dw/clans/components/ClanTableHeader';
import ClanMembersTable from 'dw/clans/components/ClanMembersTable';
import { CLANS_PERMISSIONS, BANS_PROP } from 'dw/clans/constants';
import { UNBAN_CLAN_MEMBERS } from 'dw/clans/mutations';

export const BANNED_COLUMNS = [
  {
    headerName: 'Player',
    field: 'player',
    checkboxSelection: true,
    cellRenderer: 'playerCellRenderer',
    minWidth: 250,
    wrapText: true,
    autoHeight: true,
  },
  {
    headerName: 'Account Type',
    maxWidth: 150,
    valueGetter: params => params.data.player.accountType,
    wrapText: true,
    autoHeight: true,
  },
  {
    headerName: 'Ban Timestamp',
    field: 'banTimestamp',
    valueFormatter: params => params.context.formatDateTime(params.value),
    wrapText: true,
    autoHeight: true,
  },
  {
    headerName: 'End Ban Timestamp',
    field: 'banEndTimestamp',
    valueFormatter: params => params.context.formatDateTime(params.value),
    wrapText: true,
    autoHeight: true,
  },
  {
    headerName: 'Clan ID',
    field: 'clanID',
    wrapText: true,
    autoHeight: true,
  },
];

const ClanBans = ({ clansPermissions, classes, formatDateTime, rowData }) => {
  const apiRef = useRef();
  const graphMutationSnackbar = useGraphMutationSnackbar();
  const { titleId, env, clanId } = useContext(ClansContext);
  const [selectedMembers, setSelectedMembers] = useState([]);
  const handleSelectMember = ({ api }) => {
    const rows = api.getSelectedRows();
    setSelectedMembers(rows);
  };

  const [unbanClanMembers, { error: unbanError }] =
    useMutation(UNBAN_CLAN_MEMBERS);

  useEffect(() => {
    if (unbanError) graphMutationSnackbar.error(unbanError);
  }, [unbanError]);

  const handleUnbanMembers = async () => {
    const res = await unbanClanMembers({
      variables: {
        titleId,
        env,
        clanId,
        members: selectedMembers.map(m => ({ userID: m.player.userID })),
      },
    });
    if (res?.data?.unbanClanMembers?.ok) {
      graphMutationSnackbar.success('Unban clan members');
      apiRef.current.applyTransaction({ remove: selectedMembers });
    }
  };

  return (
    <div className={classes.clanInnerTable} data-cy="clanBansTable">
      <ClanTableHeader
        title="Banned"
        actionButtons={
          clansPermissions.canEditClans && (
            <IconButton
              color="primary"
              disabled={!selectedMembers.length}
              icon="remove_circle_outline"
              onClick={handleUnbanMembers}
              tooltip={
                !selectedMembers.length
                  ? 'Select members to unban first'
                  : `Unban selected clan member${
                      selectedMembers.length > 1 ? 's' : ''
                    }`
              }
            />
          )
        }
      />
      <ClanMembersTable
        apiRef={apiRef}
        classes={classes}
        columnDefs={BANNED_COLUMNS}
        getRowId={({ data }) => data.player.userID}
        formatDateTime={formatDateTime}
        handleSelectMember={handleSelectMember}
        rowData={rowData}
      />
    </div>
  );
};

ClanBans.propTypes = {
  clansPermissions: CLANS_PERMISSIONS.isRequired,
  classes: PropTypes.object.isRequired,
  formatDateTime: PropTypes.func.isRequired,
  rowData: BANS_PROP.isRequired,
};

export default ClanBans;
