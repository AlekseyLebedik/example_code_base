import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import gql from 'graphql-tag';

import KeyValue from 'dw/core/components/KeyValue';
import GraphQLStateRenderer from 'dw/player-tooling/components/GraphQLStateRenderer';
import { ENVS } from 'dw/clans/components/ClansProvider/constants';
import { useServiceConfigs } from '../../UnoAccountSelector/components/ServiceConfigSelector';

const useStyles = makeStyles(theme => ({
  link: {
    color: theme.palette.primary.main,
  },
  empty: {
    paddingBottom: 16,
  },
  key: {
    padding: '0 !important',
    paddingLeft: '10px !important',
  },
  value: {
    padding: '0 !important',
  },
}));

const DetailsRenderer = ({ data, serviceConfigName }) => {
  const classes = useStyles();
  return useMemo(
    () =>
      data?.map(({ clanID, name }) => {
        const url = `/clans/members?clanId=${clanID}&env=${serviceConfigName}`;
        return (
          <KeyValue
            key={clanID}
            classes={classes}
            customFormats={{
              name: value => (
                <a
                  className={classes.link}
                  href={url}
                  target="_blank"
                  rel="noreferrer"
                >
                  {value}
                </a>
              ),
            }}
            item={{
              clanID,
              name,
            }}
          />
        );
      }),
    [data, serviceConfigName]
  );
};
DetailsRenderer.propTypes = {
  data: PropTypes.array.isRequired,
  serviceConfigName: PropTypes.string.isRequired,
};

const CLANS_QUERY = gql`
  query PlayerClans($unoID: ID!, $accountsServiceConfigId: ID!) {
    player(unoId: $unoID, accountsServiceConfigId: $accountsServiceConfigId) {
      id
      clans {
        clanID
        name
      }
    }
  }
`;

const envsRegexp = new RegExp('DEV|CERT|PROD');
const Clans = ({ variables }) => {
  const { id: accountsServiceConfigId, serviceConfigs } = useServiceConfigs();
  const serviceConfig = useMemo(
    () => serviceConfigs.find(sc => sc.id === accountsServiceConfigId),
    [serviceConfigs, accountsServiceConfigId]
  );
  const [serviceConfigName] = envsRegexp.exec(
    serviceConfig.name.toUpperCase()
  ) || [ENVS.PROD];
  const classes = useStyles();
  return (
    <GraphQLStateRenderer
      classes={{ empty: classes.empty }}
      detailsProps={{ serviceConfigName }}
      DetailsRenderer={DetailsRenderer}
      path="player.clans"
      query={CLANS_QUERY}
      variables={variables}
    />
  );
};

Clans.propTypes = {
  variables: PropTypes.shape({
    unoID: PropTypes.string.isRequired,
  }).isRequired,
};

export default Clans;
