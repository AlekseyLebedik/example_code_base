import React, { useMemo, useState } from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';

import { formatDateTimeSelector } from 'dw/core/helpers/date-time';
import KeyValue from 'dw/core/components/KeyValue';
import ShowMore from 'dw/player-tooling/components/ShowMore';

const FILTERED_FIELDS = ['titleID', 'titleName'];

const useStyles = makeStyles({
  container: {
    paddingBottom: '10px',
  },
  heading: {
    width: '100%',
    color: 'rgba(0,0,0,.6)',
  },
  key: {
    padding: '0 !important',
    paddingLeft: '10px !important',
  },
  value: {
    padding: '0 !important',
  },
});

export const formatTitleLogins = (
  formatDateTime,
  hasPIIPermission,
  logins = []
) =>
  logins.map(({ client, firstParty, tid, timestamp, title }) => ({
    titleID: tid,
    titleName: title?.name,
    'Last authentication attempt': formatDateTime(timestamp),
    Platform: firstParty?.platform?.toUpperCase(),
    ...(hasPIIPermission && {
      'Country/IP': `${client.geo?.countryIsoCode || 'N/A'}/${
        client.ips?.toString() || 'N/A'
      }`,
    }),
  }));

const RecentAuthentication = ({ data, hasPIIPermission }) => {
  const [expanded, setExpanded] = useState(false);
  const classes = useStyles();
  const formatDateTime = useSelector(formatDateTimeSelector);
  const formattedTitleLogins = useMemo(
    () => formatTitleLogins(formatDateTime, hasPIIPermission, data),
    [data, hasPIIPermission]
  );
  const MIN = 2;
  const MAX = 5;
  return useMemo(
    () => (
      <>
        {formattedTitleLogins.slice(0, !expanded ? MIN : MAX).map(login => (
          <div key={login.titleID} className={classes.container}>
            <div className={classes.heading}>{login.titleName}</div>
            <KeyValue
              classes={classes}
              item={Object.entries(login)
                .filter(([key]) => !FILTERED_FIELDS.includes(key))
                .reduce(
                  (acc, [key, value]) => ({
                    ...acc,
                    [key]: value,
                  }),
                  {}
                )}
            />
          </div>
        ))}
        {formattedTitleLogins.length > MIN ? (
          <ShowMore
            key="show-more-button-authentications"
            expanded={expanded}
            handleClick={setExpanded}
            lessMsg="Show Fewer Authentication Attempts"
            moreMsg="Show More Authentication Attempts"
          />
        ) : null}
      </>
    ),
    [formattedTitleLogins, expanded]
  );
};

RecentAuthentication.propTypes = {
  data: PropTypes.arrayOf(PropTypes.object).isRequired,
  hasPIIPermission: PropTypes.bool.isRequired,
};

export default RecentAuthentication;
