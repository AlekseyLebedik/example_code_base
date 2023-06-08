import React, { useMemo, useCallback } from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';

import gql from 'graphql-tag';
import { useQuery } from '@apollo/react-hooks';

import { formatDateTimeSelector } from 'dw/core/helpers/date-time';
import Loading from 'dw/core/components/Loading';
import Empty from 'dw/core/components/Empty';
import { hasData } from 'dw/core/helpers/object';

import BansAccordion from './components/BansAccordion';
import BansHistory from './components/BansHistory';

const BANS_QUERY = gql`
  query PlayerBans($unoId: ID!, $accountsServiceConfigId: ID!) {
    player(unoId: $unoId, accountsServiceConfigId: $accountsServiceConfigId) {
      id
      bans {
        time
        reason
        reasonCode
        source
        infractionStart
        infractionEnd
      }
    }
  }
`;

export function sortByDate(a, b) {
  const timeA = new Date(a.time);
  const timeB = new Date(b.time);
  if (timeA === timeB) {
    return 0;
  }
  return timeA > timeB ? -1 : 1;
}

const REASON_MAPPING = {
  0: 'unknown',
  1: 'COD points fraud',
  2: 'cheating',
  3: 'threats',
  4: 'racism',
  5: 'profanity',
  6: 'hate speech',
  7: 'other fraud',
};

const Bans = ({ unoID, accountsServiceConfigId }) => {
  const { error, data, loading } = useQuery(BANS_QUERY, {
    variables: { unoId: unoID, accountsServiceConfigId },
  });

  const formatDateTime = useSelector(formatDateTimeSelector);
  const transformBanLogItem = useCallback(
    ({ time, reason, reasonCode, source, infractionStart, infractionEnd }) => ({
      date: formatDateTime(new Date(time)),
      source,
      reason: REASON_MAPPING[reason] || 'unknown',
      'infraction start': infractionStart,
      'infraction end': infractionEnd,
      'reason code': reasonCode,
    }),
    [formatDateTime]
  );

  const bansData = useMemo(() => {
    let tempData = [];
    if (data && data.player && data.player.bans) {
      tempData = [...data.player.bans];
      tempData.sort(sortByDate);
      tempData = tempData.map(transformBanLogItem);
    }
    return tempData;
  }, [data, transformBanLogItem]);
  return (
    <BansAccordion>
      {loading ? <Loading /> : null}
      {error ? 'There was an error retrieving bans data' : null}
      {!hasData(bansData) ? <Empty> No data found </Empty> : null}
      {data ? !error && <BansHistory data={bansData} /> : null}
    </BansAccordion>
  );
};

Bans.propTypes = {
  unoID: PropTypes.string.isRequired,
  accountsServiceConfigId: PropTypes.string.isRequired,
};

export default Bans;
