import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';

import isEmpty from 'lodash/isEmpty';

import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';

import { Account2FADataSelector } from 'dw/player-tooling/scenes/PlayerAccounts/selectors';
import { fetch2FADetails } from 'dw/player-tooling/scenes/PlayerAccounts/actions';

const useStyles = makeStyles(theme => ({
  container: {
    display: 'flex',
    justifyContent: 'space-between',
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    fontWeight: 'bold',
  },
}));

const Player2FA = ({ accountsServiceConfigId, unoID }) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const player2FA = useSelector(Account2FADataSelector);

  useEffect(() => {
    dispatch(
      fetch2FADetails(unoID, {
        accounts_service_config_id: accountsServiceConfigId,
      })
    );
  }, [accountsServiceConfigId, dispatch, unoID]);

  return (
    <div className={classes.container}>
      <Typography className={classes.heading}>
        Player Registered for 2FA
      </Typography>
      {isEmpty(player2FA)
        ? 'N/A'
        : `${player2FA.status === 'enrolled' ? 'YES' : 'NO'}`}
    </div>
  );
};

Player2FA.propTypes = {
  accountsServiceConfigId: PropTypes.string.isRequired,
  unoID: PropTypes.string.isRequired,
};

export default Player2FA;
