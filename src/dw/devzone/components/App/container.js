import React from 'react';
import PropTypes from 'prop-types';

import { connect } from '@demonware/devzone-core';
import { usePermissions } from '@demonware/devzone-core/access/CheckPermissions';
import { withRouter } from 'react-router-dom';
import { hasFeaturesEnabledFuncSelector } from '@demonware/devzone-core/access/FeatureSwitchesCheck/selectors';
import { PERMS_EDIT_MEMBERSHIPS } from '@demonware/devzone-core/access/PermissionCheck/permissions';

import getRoutes from 'dw/devzone/routes';

import { criticalFetchFailedSelector, limitedModeSelector } from './selector';

import StatelessApp from './presentational';

const App = props => {
  const { hasFeatureSwitchesAccessFunc, isAdminOrStaff } = props;

  const [, , result] = usePermissions([PERMS_EDIT_MEMBERSHIPS], ['company.*']);

  const hasEditMembershipsPermission = result?.data?.permission;

  const routes = getRoutes(
    hasFeatureSwitchesAccessFunc,
    isAdminOrStaff,
    hasEditMembershipsPermission
  );

  return (
    <StatelessApp
      criticalFetchFailed={props.criticalFetchFailed}
      limitedMode={props.limitedMode}
      routes={routes}
    />
  );
};
App.propTypes = {
  criticalFetchFailed: PropTypes.bool.isRequired,
  limitedMode: PropTypes.bool.isRequired,

  hasFeatureSwitchesAccessFunc: PropTypes.func.isRequired,
  isAdminOrStaff: PropTypes.bool,
};

App.defaultProps = {
  isAdminOrStaff: false,
};

const stateToProps = state => ({
  criticalFetchFailed: criticalFetchFailedSelector(state),
  limitedMode: limitedModeSelector(state),
  hasFeatureSwitchesAccessFunc: hasFeaturesEnabledFuncSelector(state),
});

export default withRouter(connect(stateToProps)(App));
