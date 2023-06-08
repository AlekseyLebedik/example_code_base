import React from 'react';

import RouteLink from 'dw/core/components/RouteLink';
import { NAVBAR_ENTRIES } from 'dw/online-configuration/scenes/routes';

const Link = props => (
  <RouteLink
    {...props}
    baseUrl="online-configuration"
    routes={NAVBAR_ENTRIES}
  />
);

export default Link;
