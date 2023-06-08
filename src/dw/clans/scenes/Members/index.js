import React, { useContext, useMemo } from 'react';
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import { useQuery } from '@apollo/react-hooks';
import { makeStyles } from '@material-ui/core/styles';
import orderBy from 'lodash/orderBy';

import { formatDateTimeSelector } from 'dw/core/helpers/date-time';
import Empty from 'dw/core/components/Empty';
import Loading from 'dw/core/components/Loading';

import ClansProvider, { ClansContext } from 'dw/clans/components/ClansProvider';
import ClansSearch from 'dw/clans/components/ClansSearch';
import { CLAN_QUERY } from 'dw/clans/queries';
import {
  CLAN_DATA_PROPTYPE,
  CLANS_PERMISSIONS,
  ROLES,
} from 'dw/clans/constants';
import ClanSummary from './components/ClanSummary';
import ClanMembers from './components/ClanMembers';
import ClanProposals from './components/ClanProposals';
import ClanBans from './components/ClanBans';
import { useClansPermissions } from './hooks';

const useStyles = makeStyles({
  clanBaseContainer: {
    flex: 1,
    padding: 20,
  },
  viewContainer: {
    display: 'flex',
    flexWrap: 'wrap',
    height: '100%',
    flexDirection: 'column',
  },
  clanMembersContainer: {
    display: 'flex',
    flex: 1,
    marginTop: 20,
    justifyContent: 'space-between',
  },
  clanTableContainer: {
    width: '49%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  clanInnerTable: { height: '48%', display: 'flex', flexDirection: 'column' },
});

const ClanViewError = error => (
  <Empty>
    {error.graphQLErrors.find(e => e.message.includes('UserNotFound')) ? (
      'Owner for clan could not be found'
    ) : (
      <>
        Clan data failed to load:{' '}
        {error.graphQLErrors.map(({ message }) => message).join(' ')}
      </>
    )}
  </Empty>
);

export const ClanView = ({ clanData, clansPermissions, refetch }) => {
  const classes = useStyles();
  const formatDateTime = useSelector(formatDateTimeSelector);

  const membersRowData = useMemo(
    () =>
      orderBy(
        clanData.members,
        [m => ROLES[m.role], 'lastUpdated'],
        ['desc', 'desc']
      ),
    [clanData.members, clanData.id]
  );

  const bansRowData = useMemo(
    () => clanData.bans.map(ban => ({ ...ban, clanID: clanData.id })),
    [clanData.bans, clanData.id]
  );

  return (
    <div className={classes.viewContainer}>
      <ClanSummary
        clanData={clanData}
        clansPermissions={clansPermissions}
        refetch={refetch}
      />
      <div className={classes.clanMembersContainer}>
        <ClanMembers
          clansPermissions={clansPermissions}
          classes={classes}
          formatDateTime={formatDateTime}
          refetch={refetch}
          rowData={membersRowData}
        />
        <div className={classes.clanTableContainer}>
          <ClanProposals
            clansPermissions={clansPermissions}
            classes={classes}
            formatDateTime={formatDateTime}
            rowData={clanData.proposals}
          />
          <ClanBans
            clansPermissions={clansPermissions}
            classes={classes}
            formatDateTime={formatDateTime}
            rowData={bansRowData}
          />
        </div>
      </div>
    </div>
  );
};

ClanView.propTypes = {
  clanData: CLAN_DATA_PROPTYPE.isRequired,
  clansPermissions: CLANS_PERMISSIONS.isRequired,
  refetch: PropTypes.func.isRequired,
};

const ClanContainer = () => {
  const classes = useStyles();
  const clansPermissions = useClansPermissions();

  const { clanId, titleId, env } = useContext(ClansContext);
  const { error, data, loading, refetch } = useQuery(CLAN_QUERY, {
    skip: !titleId || !env || !clanId,
    variables: { titleId, env, clanId },
  });

  return (
    <>
      <ClansSearch clansPermissions={clansPermissions} />
      {!titleId ? (
        <Empty>No Clans Service configured for this environment</Empty>
      ) : (
        <div className={classes.clanBaseContainer}>
          {error && ClanViewError(error)}
          {!error && (
            <>
              {loading && <Loading />}
              {!loading && (
                <>
                  {data?.clans?.length ? (
                    <ClanView
                      clanData={data.clans[0]}
                      clansPermissions={clansPermissions}
                      refetch={refetch}
                    />
                  ) : (
                    <Empty>
                      {clanId
                        ? 'Clan data unavailable'
                        : 'Please enter Clan Name, Clan ID, or Clan Tag'}
                    </Empty>
                  )}
                </>
              )}
            </>
          )}
        </div>
      )}
    </>
  );
};

const ClanContainerWithContext = () => (
  <ClansProvider>
    <ClanContainer />
  </ClansProvider>
);

export default ClanContainerWithContext;
