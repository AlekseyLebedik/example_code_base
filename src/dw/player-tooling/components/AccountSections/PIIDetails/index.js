import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';

import { hasData } from 'dw/core/helpers/object';
import Loading from 'dw/core/components/Loading';
import {
  DATE_TIME_FORMATS,
  dateToUTCTimestamp,
  formatDateTimeSelector,
} from 'dw/core/helpers/date-time';

import {
  AccountPIISelector,
  AccountPIILoadingSelector,
} from 'dw/player-tooling/scenes/PlayerAccounts/selectors';
import { fetchPIIDetails } from 'dw/player-tooling/scenes/PlayerAccounts/actions';

const useStyles = makeStyles({
  label: {
    padding: '0px 0 !important',
  },
  value: {
    padding: '0px 0 !important',
  },
  valueRed: {
    color: '#D30000 !important', // HACK: colour would not apply without important likely due to CSS specificity
    fontWeight: 700,
  },
});

const PIIDetails = ({
  accountsServiceConfigId,
  hasPIIPermission,
  playerAccounts,
  playerDataLoading,
  playerBans,
  unoUserData: { accountID, username, created, updated },
}) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const accountPII = useSelector(AccountPIISelector);
  const accountPIILoading = useSelector(AccountPIILoadingSelector);
  const formatDateTime = useSelector(formatDateTimeSelector);

  useEffect(() => {
    if (hasPIIPermission && accountID) {
      dispatch(
        fetchPIIDetails(accountID, {
          fields:
            'userName,dateOfBirth,email,address1,address2,city,state,country',
          accounts_service_config_id: accountsServiceConfigId,
        })
      );
    }
  }, [accountsServiceConfigId, dispatch, hasPIIPermission, accountID]);

  const data = {
    'Uno ID': accountID,
    username,
    ...(hasPIIPermission && accountPII),
    'Linked Accounts': playerAccounts.length - 1, // ignore uno account from count
  };

  if (created) {
    data.created = formatDateTime(dateToUTCTimestamp(created));
  }
  if (updated) {
    data.updated = formatDateTime(dateToUTCTimestamp(updated));
  }
  if (data.DOB) {
    data.DOB = formatDateTime(
      new Date(data.DOB, DATE_TIME_FORMATS.DEFAULT_DATE)
    );
  }

  return playerDataLoading || accountPIILoading ? (
    <Loading />
  ) : (
    <div className={classNames('common__keyvalue', classes.keyValueContainer)}>
      {Object.entries(data).map(([k, v]) => (
        <PIIDetailRow
          key={`PII-row-${k}`}
          classes={classes}
          label={k}
          value={v}
        />
      ))}
      {playerBans && !hasData(playerBans) && (
        <PIIDetailRow
          classes={{
            label: classes.label,
            value: classes.value,
          }}
          label="Banned"
          value="Not Banned"
        />
      )}
      {playerBans &&
        playerBans.map((ban, idx) => (
          <PIIDetailRow
            classes={{
              label: classes.label,
              value: classNames(classes.value, classes.valueRed),
            }}
            label={idx === 0 ? 'Banned' : undefined}
            value={ban.titleName}
          />
        ))}
    </div>
  );
};

PIIDetails.propTypes = {
  accountsServiceConfigId: PropTypes.string.isRequired,
  hasPIIPermission: PropTypes.bool.isRequired,
  playerAccounts: PropTypes.arrayOf(PropTypes.object).isRequired,
  playerDataLoading: PropTypes.bool.isRequired,
  playerBans: PropTypes.array,
  unoUserData: PropTypes.object.isRequired,
};
PIIDetails.defaultProps = {
  playerBans: [],
};

const PIIDetailRow = ({ classes, extraStyles, label, value }) => (
  <Grid container>
    <Grid item xs={4}>
      <div
        style={extraStyles ? extraStyles.label : null}
        className={classNames('key', classes.label)}
      >
        {label}
      </div>
    </Grid>
    <Grid item xs={8}>
      <div
        style={extraStyles ? extraStyles.value : null}
        className={classNames('value', classes.value)}
      >
        {value}
      </div>
    </Grid>
  </Grid>
);

PIIDetailRow.propTypes = {
  classes: PropTypes.object.isRequired,
  extraStyles: PropTypes.object,
  label: PropTypes.string,
  value: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
};
PIIDetailRow.defaultProps = {
  extraStyles: null,
  label: undefined,
  value: undefined,
};

export default PIIDetails;
