import React from 'react';
import { useConfiguration } from 'dw/online-configuration/scenes/gvs/graphql/hooks';

import Details from 'dw/online-configuration/scenes/gvs/scenes/Configuration/components/Details';
import { GLOBAL_PLAYERS } from '@gvs/constants';

const population = GLOBAL_PLAYERS;

const draftId = undefined;

const Configuration = () => {
  const { data } = useConfiguration({
    draftId,
    populationOverride: population,
    fetchPolicy: 'network-only',
  });
  return (
    <Details
      data={data}
      populationOverride={population}
      editable={false}
      draftSelector={false}
    />
  );
};

export default Configuration;
