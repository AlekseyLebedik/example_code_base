import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
import { withRouter, generatePath } from 'react-router-dom';

import { ApolloProvider } from '@apollo/react-hooks';
import { makeStyles } from '@material-ui/core/styles';
import ClansSelector from 'dw/clans/components/ClansSearch/components/ClansSelector';
import { ClansContext } from 'dw/clans/components/ClansProvider';
import setupApollo from 'dw/core/helpers/setupApollo';
import { ENV_SHORTTYPE_MAP } from './constants';

const useStyles = makeStyles({
  container: {
    marginLeft: '20px',
  },
});

const ClanSelector = props => {
  const classes = useStyles();
  const { playerId, match, history, location, onClanIDChange } = props;
  const {
    params: { titleId, env },
  } = match;

  const onClanChange = useCallback(clanId => {
    const pathname = generatePath(match.path, {
      ...match.params,
      userId: clanId,
      id: clanId,
    });
    onClanIDChange(clanId);
    history.push({ ...location, pathname });
  }, []);

  const value = {
    titleId,
    env: ENV_SHORTTYPE_MAP[env],
    clanId: playerId,
    onSelectClanId: onClanChange,
  };

  return (
    <ApolloProvider client={setupApollo()}>
      <ClansContext.Provider value={value}>
        <div className={classes.container}>
          <ClansSelector displayEnvSelector={false} />
        </div>
      </ClansContext.Provider>
    </ApolloProvider>
  );
};

ClanSelector.propTypes = {
  playerId: PropTypes.string,
  match: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired,
  onClanIDChange: PropTypes.func,
};

ClanSelector.defaultProps = {
  playerId: undefined,
  onClanIDChange: () => {},
};

export default withRouter(ClanSelector);
