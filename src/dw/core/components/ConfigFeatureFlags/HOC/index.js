import React from 'react';

import ConfigFeatureFlags from '..';

const withConfigFeatureFlags = (C, configFeatureFlags) => props =>
  (
    <ConfigFeatureFlags configFeatureFlags={configFeatureFlags}>
      <C {...props} />
    </ConfigFeatureFlags>
  );

export default withConfigFeatureFlags;
