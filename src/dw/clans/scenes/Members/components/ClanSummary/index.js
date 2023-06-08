import React, { useCallback, useContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import { useMutation } from '@apollo/client';
import isEmpty from 'lodash/isEmpty';

import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TextField from '@material-ui/core/TextField';
import IconButton from 'dw/core/components/IconButton';

import { useGraphMutationSnackbar } from 'dw/core/hooks';
import { formatDateTimeSelector } from 'dw/core/helpers/date-time';
import UnoAccountSelector from 'dw/player-tooling/components/UnoAccountSelector';
import ClanTableHeader from 'dw/clans/components/ClanTableHeader';
import PlayerViewLink from 'dw/clans/components/PlayerViewLink';
import PrivacyLevelSelector from 'dw/clans/components/PrivacyLevelSelector';
import { ClansContext } from 'dw/clans/components/ClansProvider';
import { ADD_CLAN_MEMBERS, MUTATE_CLAN_DETAILS } from 'dw/clans/mutations';
import {
  CLAN_DATA_PROPTYPE,
  CLANS_PERMISSIONS,
  PRIVACY_LEVELS,
} from 'dw/clans/constants';

const useStyles = makeStyles({
  clansSummaryContainer: {
    display: 'flex',
    flexWrap: 'wrap',
    width: '100%',
    overflowX: 'auto',
  },
  tableContainer: { overflow: 'visible' },
  table: { border: 'solid #e2e2e2 1px', minWidth: 650 },
  tableHead: { background: '#e2e2e2' },
  tableRow: {
    '& th, td': { fontSize: 13, padding: '0 16px', height: 32 },
    '& th': { color: 'rgba(0, 0, 0, .54)' },
  },
  accountsSelector: { maxWidth: 300 },
});

const ClanSummary = ({ clanData, clansPermissions, refetch }) => {
  const classes = useStyles();
  const graphMutationSnackbar = useGraphMutationSnackbar();
  const formatDateTime = useSelector(formatDateTimeSelector);
  const { accountsServiceConfigId, clanId, titleId, env } =
    useContext(ClansContext);
  const [editMode, setEditMode] = useState(false);
  const [name, setName] = useState(clanData.name);
  const [tag, setTag] = useState(clanData.tag);
  const [privacyLevel, setPrivacyLevel] = useState(clanData.privacyLevel);
  const [owner, setOwner] = useState(clanData.owner);

  const [addClanMember, { error: addError }] = useMutation(ADD_CLAN_MEMBERS);
  const [updateClans, { error: updateError }] =
    useMutation(MUTATE_CLAN_DETAILS);

  useEffect(() => {
    if (addError) graphMutationSnackbar.error(addError);
    if (updateError) graphMutationSnackbar.error(updateError);
  }, [addError, updateError]);

  const onSelectAccount = useCallback(
    account => {
      const { value: userID, username } = account || {};
      if (userID && userID !== owner.userID)
        setOwner({ userID, username, accountType: 'uno' });
    },
    [owner, setOwner]
  );

  const handleSubmit = async () => {
    const body = {
      ...(name !== clanData.name && { clanName: name }),
      ...(tag !== clanData.tag && { clanTag: tag }),
      ...(privacyLevel !== clanData.privacyLevel && {
        privacyLevel: PRIVACY_LEVELS[privacyLevel],
      }),
    };
    let refetchRequired = false;
    if (owner.userID !== clanData.owner.userID) {
      refetchRequired = true;
      body.owner = {
        accountType: 'uno',
        userID: owner.userID,
      };
      if (
        !clanData.members.some(({ player }) => player.userID === owner.userID)
      ) {
        // Need to add user as member before can set owner
        await addClanMember({
          variables: {
            titleId,
            env,
            clanId,
            members: [{ userID: owner.userID }],
          },
        });
      }
    }
    if (!isEmpty(body)) {
      const res = await updateClans({
        variables: { titleId, env, clanId, clanData: body },
      });
      if (res) graphMutationSnackbar.success('Clan update');
    }
    setEditMode(false);
    if (refetchRequired) await refetch();
  };

  const { bans, createdTimestamp, id, memberCount, proposalCount, tags } =
    clanData;

  return (
    <div className={classes.clansSummaryContainer}>
      <ClanTableHeader
        title="Summary"
        {...(clansPermissions.canEditClans && {
          actionButtons: editMode ? (
            <IconButton
              color="primary"
              icon="done"
              onClick={handleSubmit}
              tooltip="Submit changes"
            />
          ) : (
            <IconButton
              color="primary"
              icon="edit"
              onClick={() => setEditMode(true)}
              tooltip="Edit clan details"
            />
          ),
        })}
      />
      <TableContainer
        className={classes.tableContainer}
        data-cy="clansSummaryTable"
      >
        <Table className={classes.table}>
          <TableHead className={classes.tableHead}>
            <TableRow className={classes.tableRow}>
              <TableCell>Clan ID</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Tag</TableCell>
              <TableCell>Owner</TableCell>
              <TableCell>Owner Account Type</TableCell>
              <TableCell>Member Count</TableCell>
              <TableCell>Proposal Count</TableCell>
              <TableCell>Banned Member Count</TableCell>
              <TableCell>Privacy Level</TableCell>
              <TableCell>Created Timestamp</TableCell>
              <TableCell>Search Tags</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow className={classes.tableRow}>
              <TableCell>{id}</TableCell>
              <TableCell>
                {editMode ? (
                  <TextField
                    value={name}
                    onChange={({ target: { value } }) => setName(value)}
                  />
                ) : (
                  name
                )}
              </TableCell>
              <TableCell>
                {editMode ? (
                  <TextField
                    value={tag}
                    onChange={({ target: { value } }) => setTag(value)}
                  />
                ) : (
                  tag
                )}
              </TableCell>
              <TableCell>
                {editMode ? (
                  <UnoAccountSelector
                    accountsServiceConfigId={accountsServiceConfigId}
                    classes={{ root: classes.accountsSelector }}
                    hideServiceConfigs
                    label=""
                    onSelectAccount={onSelectAccount}
                    unoUserData={{
                      accountID: owner.userID,
                      username: owner.username,
                    }}
                    valuesOnly={false}
                  />
                ) : (
                  <PlayerViewLink
                    accountsServiceConfigId={accountsServiceConfigId}
                    user={owner}
                    text={`${owner.username} | ${owner.userID}`}
                  />
                )}
              </TableCell>
              <TableCell>{owner.accountType}</TableCell>
              <TableCell>{memberCount}</TableCell>
              <TableCell>{proposalCount}</TableCell>
              <TableCell>{bans.length}</TableCell>
              <TableCell>
                {editMode ? (
                  <PrivacyLevelSelector
                    hideLabel
                    privacyLevel={privacyLevel}
                    setPrivacyLevel={setPrivacyLevel}
                  />
                ) : (
                  privacyLevel
                )}
              </TableCell>
              <TableCell>{formatDateTime(createdTimestamp)}</TableCell>
              <TableCell>{tags?.map(t => t.value).join(', ')}</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

ClanSummary.propTypes = {
  clanData: CLAN_DATA_PROPTYPE.isRequired,
  clansPermissions: CLANS_PERMISSIONS.isRequired,
  refetch: PropTypes.func.isRequired,
};

export default ClanSummary;
