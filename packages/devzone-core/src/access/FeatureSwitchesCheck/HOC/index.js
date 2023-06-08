import React from 'react';

import FeatureSwitchesCheck from '..';

const withFeatureSwitchesCheck = (C, featureSwitches) => props =>
  (
    <FeatureSwitchesCheck featureSwitches={featureSwitches}>
      <C {...props} />
    </FeatureSwitchesCheck>
  );

export default withFeatureSwitchesCheck;
