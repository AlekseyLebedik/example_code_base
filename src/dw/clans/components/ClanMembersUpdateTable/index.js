import React, {
  useCallback,
  useEffect,
  useMemo,
  useState,
  useRef,
} from 'react';
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';

import IconButton from 'dw/core/components/IconButton';
import { formatDateTimeSelector } from 'dw/core/helpers/date-time';
import ClanTableHeader from 'dw/clans/components/ClanTableHeader';
import ClanMembersErrorTable from 'dw/clans/components/ClanMembersErrorTable';
import ClanMembersTable from 'dw/clans/components/ClanMembersTable';
import { MEMBERS_PROP } from 'dw/clans/constants';
import {
  PINNED_ROW_DEFAULT,
  MEMBERS_COLUMNS,
  FAILED_MEMBERS_COLUMNS,
} from './constants';
import styles from './index.module.css';

export const useStyles = makeStyles({
  clanTableContainer: {
    display: 'flex',
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  valueContainer: {
    '& p': {
      overflow: 'hidden',
      textOverflow: 'ellipsis',
    },
  },
});

const ClanMembersUpdateTable = ({
  disabledOptions,
  failedMembers,
  members,
  setMembers,
  setFailedMembers,
}) => {
  const classes = { ...useStyles(), accountsSelector: styles.accountsSelector };
  const apiRef = useRef();
  const formatDateTime = useSelector(formatDateTimeSelector);
  const [pinnedRow, setPinnedRow] = useState(PINNED_ROW_DEFAULT);
  const [selectedMembers, setSelectedMembers] = useState([]);
  const owner = useMemo(() => members.find(m => m.role === 'OWNER'), [members]);

  useEffect(() => {
    if (apiRef.current) apiRef.current.setPinnedTopRowData([pinnedRow]);
  }, [pinnedRow.player.userID, pinnedRow.role]);

  const addMember = member => {
    const now = parseInt(Date.now() / 1000, 10).toString();
    const newMember = { ...member, memberSince: now, lastUpdated: now };
    setMembers(prevRows => [newMember, ...prevRows]);
    apiRef.current.applyTransaction({
      add: [newMember],
      addIndex: 0,
    });
    setPinnedRow(PINNED_ROW_DEFAULT);
  };

  const handleSelectMember = useCallback(
    ({ api }) => {
      const rows = api.getSelectedRows();
      setSelectedMembers(rows);
    },
    [setSelectedMembers]
  );

  const handleRemoveMembers = async removeMembers => {
    apiRef.current.applyTransaction({
      remove: removeMembers || selectedMembers,
    });
    const rowData = [];
    apiRef.current.forEachNode(node => {
      rowData.push(node.data);
    });
    setMembers(rowData);
  };

  const editMember = member => {
    handleRemoveMembers([member]);
    setPinnedRow(member);
  };

  const columnProps = {
    addMember,
    classes,
    deleteMember: player => handleRemoveMembers([player]),
    disabledOptions,
    editMember,
    ownerDisabled: Boolean(owner),
    setPinnedRow,
  };

  return (
    <div className={classes.clanTableContainer}>
      {failedMembers.length ? (
        <ClanMembersErrorTable
          addMember={addMember}
          columnDefs={FAILED_MEMBERS_COLUMNS}
          failedMembers={failedMembers}
          formatDateTime={formatDateTime}
          rowHeight={50}
          setFailedMembers={setFailedMembers}
        />
      ) : null}
      <ClanTableHeader
        title="Members"
        actionButtons={
          <IconButton
            color="secondary"
            disabled={!selectedMembers.length}
            icon="delete"
            onClick={() => handleRemoveMembers()}
            tooltip={
              !selectedMembers.length
                ? 'Select members to remove first'
                : `Remove selected clan member${
                    selectedMembers.length > 1 ? 's' : ''
                  }`
            }
          />
        }
      />
      <ClanMembersTable
        apiRef={apiRef}
        columnDefs={MEMBERS_COLUMNS}
        columnProps={columnProps}
        formatDateTime={formatDateTime}
        getRowId={({ data }) => data.player.userID}
        handleSelectMember={handleSelectMember}
        pinnedTopRowData={[pinnedRow]}
        rowData={members}
        rowHeight={50}
      />
    </div>
  );
};

ClanMembersUpdateTable.propTypes = {
  disabledOptions: PropTypes.arrayOf(PropTypes.string),
  failedMembers: PropTypes.arrayOf(PropTypes.string),
  members: MEMBERS_PROP.isRequired,
  setMembers: PropTypes.func.isRequired,
  setFailedMembers: PropTypes.func,
};
ClanMembersUpdateTable.defaultProps = {
  disabledOptions: [],
  failedMembers: [],
  setFailedMembers: undefined,
};

export default ClanMembersUpdateTable;
