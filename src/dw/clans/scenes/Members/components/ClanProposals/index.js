import React, { useRef, useState } from 'react';
import PropTypes from 'prop-types';

import ClanTableHeader from 'dw/clans/components/ClanTableHeader';
import ClanMembersTable from 'dw/clans/components/ClanMembersTable';
import { CLANS_PERMISSIONS, PROPOSALS_PROP } from 'dw/clans/constants';

export const PROPOSALS_COLUMNS = [
  {
    headerName: 'Player',
    field: 'targetPlayer',
    checkboxSelection: true,
    cellRenderer: 'playerCellRenderer',
    minWidth: 250,
    wrapText: true,
    autoHeight: true,
  },
  {
    headerName: 'Proposing Player',
    field: 'proposingPlayer',
    cellRenderer: 'playerCellRenderer',
    minWidth: 250,
    wrapText: true,
    autoHeight: true,
  },
  {
    headerName: 'Message',
    field: 'message',
    wrapText: true,
    autoHeight: true,
  },
  {
    headerName: 'Created Timestamp',
    field: 'createdTimestamp',
    valueFormatter: params => params.context.formatDateTime(params.value),
    wrapText: true,
    autoHeight: true,
  },
];

const ClanProposals = ({
  clansPermissions,
  classes,
  formatDateTime,
  rowData,
}) => {
  const apiRef = useRef();
  // TODO: Implement approve/reject on all selected
  // eslint-disable-next-line no-unused-vars
  const [selectedMembers, setSelectedMembers] = useState([]);
  const handleSelectMember = ({ api }) => {
    const rows = api.getSelectedRows();
    setSelectedMembers(rows);
  };
  return (
    <div className={classes.clanInnerTable} data-cy="clanProposalsTable">
      <ClanTableHeader
        title="Proposed Members"
        actionButtons={clansPermissions.canEditClans && <></>}
      />
      <ClanMembersTable
        apiRef={apiRef}
        classes={classes}
        columnDefs={PROPOSALS_COLUMNS}
        formatDateTime={formatDateTime}
        getRowId={({ data }) => data.targetPlayer.userID}
        handleSelectMember={handleSelectMember}
        isRowSelectable={() => false}
        rowData={rowData}
      />
    </div>
  );
};

ClanProposals.propTypes = {
  clansPermissions: CLANS_PERMISSIONS.isRequired,
  classes: PropTypes.object.isRequired,
  formatDateTime: PropTypes.func.isRequired,
  rowData: PROPOSALS_PROP.isRequired,
};

export default ClanProposals;
