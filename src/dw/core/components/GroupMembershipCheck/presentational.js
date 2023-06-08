import React from 'react';
import PropTypes from 'prop-types';

import CircularProgress from '@material-ui/core/CircularProgress';

const GroupMembershipCheckStateless = ({
  hasGroupMembershipAccess,
  children,
  noAccessComponent,
  showLoading,
}) => {
  if (hasGroupMembershipAccess === null)
    return showLoading ? <CircularProgress /> : noAccessComponent();
  return hasGroupMembershipAccess ? children : noAccessComponent();
};

GroupMembershipCheckStateless.propTypes = {
  hasGroupMembershipAccess: PropTypes.bool,
  showLoading: PropTypes.bool,
  children: PropTypes.node,
  noAccessComponent: PropTypes.elementType,
};

GroupMembershipCheckStateless.defaultProps = {
  hasGroupMembershipAccess: false,
  children: null,
  noAccessComponent: () => null,
  showLoading: false,
};

export default GroupMembershipCheckStateless;
