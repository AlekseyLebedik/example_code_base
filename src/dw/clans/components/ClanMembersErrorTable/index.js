/* eslint-disable no-await-in-loop */
import React, {
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import PropTypes from 'prop-types';
import { useMutation, useQuery } from '@apollo/react-hooks';
import { makeStyles } from '@material-ui/core/styles';
import { Typography } from '@material-ui/core';

import AGGrid from 'dw/core/components/AGGrid';
import Loading from 'dw/core/components/Loading';
import { useGraphMutationSnackbar } from 'dw/core/hooks';
import { CLAN_MEMBERS_QUERY } from 'dw/clans/queries';
import { REMOVE_CLAN_MEMBERS } from 'dw/clans/mutations';
import { ClansContext } from 'dw/clans/components/ClansProvider';
import ChangeOwnerForm from './ChangeOwnerForm';
import components from './cellRenderers';

const useStyles = makeStyles({
  errorTableContainer: {
    display: 'flex',
    flexDirection: 'column',
    height: 350,
    paddingBottom: 20,
  },
  errorTitle: { color: 'red' },
  table: {
    border: 'solid #EED5D6 1px',
    '& .ag-header-row': { backgroundColor: '#EED5D6' },
    '& .ag-status-bar': { height: 32 },
    '& .ag-status-name-value': { paddingTop: 8, paddingBottom: 8 },
  },
});

const ClanMembersErrorTable = ({
  addMember,
  columnDefs,
  failedMembers,
  formatDateTime,
  rowHeight,
  setFailedMembers,
}) => {
  const classes = useStyles({ rowHeight });
  const { titleId, env } = useContext(ClansContext);
  const graphMutationSnackbar = useGraphMutationSnackbar();
  const [selectedMembers, setSelectedMembers] = useState([]);
  const [ownerToEdit, setOwnerToEdit] = useState(null);
  const [changeOwnerOpen, setChangeOwnerOpen] = useState(false);
  const apiRef = useRef();
  const {
    error,
    data: detailedFailedMembers,
    loading,
  } = useQuery(CLAN_MEMBERS_QUERY, {
    skip: !failedMembers.length,
    variables: { titleId, env, members: failedMembers },
  });
  const [removeClanMembers, { error: removeError }] =
    useMutation(REMOVE_CLAN_MEMBERS);

  useEffect(() => {
    if (removeError) graphMutationSnackbar.error(removeError);
  }, [removeError]);

  const onGridReady = useCallback(({ api }) => {
    // eslint-disable-next-line no-param-reassign
    apiRef.current = api;
  }, []);

  const handleSelectMember = useCallback(
    ({ api }) => {
      const rows = api.getSelectedRows();
      setSelectedMembers(rows);
    },
    [setSelectedMembers]
  );

  const handleRemoveClanMember = async (member, newOwner) => {
    return removeClanMembers({
      variables: {
        titleId,
        env,
        clanId: member.clan.id,
        members: [{ userID: member.player.userID }],
        ...(newOwner && {
          newOwner: `${newOwner.player.accountType}-${newOwner.player.userID}`,
        }),
      },
    });
  };

  const handleChangeOwner = async (owner, newOwner, callback) => {
    const res = await handleRemoveClanMember(owner, newOwner);
    if (res?.data?.removeClanMembers?.ok) {
      graphMutationSnackbar.success('Clan owner update');
      apiRef.current.applyTransaction({
        // let pinned actions know it needs to update with row data
        update: [{ player: owner.player, actions: Math.random() }],
      });
      setOwnerToEdit(null);
      callback();
    }
  };

  const handleAddMembers = async addMembers => {
    const members = addMembers || selectedMembers;
    // eslint-disable-next-line no-restricted-syntax
    for (const member of members) {
      // skip clan removal if already handled on owner change
      const { data } = member.clan
        ? await handleRemoveClanMember(member)
        : { data: { removeClanMembers: { ok: true } } };
      if (data?.removeClanMembers?.ok) {
        apiRef.current.applyTransaction({ remove: [member] });
        addMember({ ...member, role: 'NORMAL' });
      }
    }
  };

  const handleRemoveMembers = removeMembers => {
    const members = removeMembers || selectedMembers;
    apiRef.current.applyTransaction({
      remove: members,
    });
    if (setFailedMembers) {
      const removedUserIDs = members.map(m => m.player.userID);
      const updatedFailedMembers = failedMembers.filter(
        m => !removedUserIDs.includes(m)
      );
      setFailedMembers(updatedFailedMembers);
    }
  };

  const columnProps = {
    addMember: player => handleAddMembers([player]),
    changeOwner: owner => {
      setOwnerToEdit(owner);
      setChangeOwnerOpen(true);
    },
    deleteMember: player => handleRemoveMembers([player]),
  };

  const rowData = useMemo(
    () =>
      !error && detailedFailedMembers?.clanMembers?.length
        ? detailedFailedMembers.clanMembers
        : failedMembers.map(userID => ({ player: { userID } })),
    [detailedFailedMembers, error, failedMembers]
  );

  return (
    <div className={classes.errorTableContainer}>
      <Typography variant="h6" className={classes.errorTitle}>
        Members in existing clans, either remove from list or confirm addition
        to this clan which will remove them from their old clan.
      </Typography>
      {loading && <Loading />}
      {!loading && (
        <AGGrid
          animateRows
          autoSizeColumns={false}
          className={classes.table}
          columnDefs={columnDefs}
          context={{ formatDateTime }}
          gridOptions={{
            defaultColDef: {
              ...columnProps,
            },
            components,
            headerHeight: 32,
            sideBar: null,
            suppressCellFocus: true,
            getRowId: ({ data }) =>
              `${data.player.userID}-${data.player.username}`,
          }}
          onGridReady={onGridReady}
          onRowSelected={handleSelectMember}
          rowData={rowData}
        />
      )}
      <ChangeOwnerForm
        onSubmit={handleChangeOwner}
        open={changeOwnerOpen}
        owner={ownerToEdit}
        setOpen={setChangeOwnerOpen}
      />
    </div>
  );
};

ClanMembersErrorTable.propTypes = {
  addMember: PropTypes.func.isRequired,
  columnDefs: PropTypes.arrayOf(PropTypes.object).isRequired,
  failedMembers: PropTypes.arrayOf(PropTypes.string),
  formatDateTime: PropTypes.func.isRequired,
  rowHeight: PropTypes.number,
  setFailedMembers: PropTypes.func,
};
ClanMembersErrorTable.defaultProps = {
  failedMembers: [],
  rowHeight: 32,
  setFailedMembers: undefined,
};

export default ClanMembersErrorTable;
