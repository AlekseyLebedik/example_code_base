import React, { useEffect } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import * as GlobalSnackBarActions from '@demonware/devzone-core/components/GlobalSnackBar/actions';

import {
  activitySettingsSelector,
  getBaseURL,
  hasCurrentProjectSettingsSelector,
  projectSettingsIdSelector,
} from 'playpants/components/App/selectors';
import { useEMPermissionsResult } from 'playpants/hooks';
import * as actions from './actions';

import StatelessProjectSettings from './presentational';

export const ProjectSettings = props => {
  const permissions = useEMPermissionsResult();

  useEffect(() => {
    props.onFetchAvailableUsers();
  }, []);

  return <StatelessProjectSettings {...props} permissions={permissions} />;
};

ProjectSettings.propTypes = {
  onFetchAvailableUsers: PropTypes.func.isRequired,
};

const mapStateToProps = (state, ownProps) => {
  const { history, match } = ownProps;
  return {
    activitySettings: activitySettingsSelector(state),
    baseUrl: getBaseURL(state),
    hasCurrentProjectSettings: hasCurrentProjectSettingsSelector(state),
    history,
    match,
    projectSettingsID: projectSettingsIdSelector(state),
  };
};

const mapDispatchToProps = dispatch => ({
  addUserToast: message =>
    dispatch(GlobalSnackBarActions.show(message, 'success')),
  onFetchAvailableUsers: bindActionCreators(
    actions.fetchAvailableUsers,
    dispatch
  ),
  updateProjectSetting: bindActionCreators(
    actions.updateProjectSetting,
    dispatch
  ),
});

const mergeProps = (stateProps, dispatchProps, ownProps) => ({
  ...ownProps,
  ...stateProps,
  ...dispatchProps,
  updateProjectSetting: (setting, data) =>
    dispatchProps.updateProjectSetting(
      stateProps.projectSettingsID,
      setting,
      data
    ),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
  mergeProps
)(ProjectSettings);
