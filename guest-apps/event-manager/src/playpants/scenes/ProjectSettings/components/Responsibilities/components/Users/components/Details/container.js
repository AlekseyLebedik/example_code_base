import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import {
  fetchResponsibilityGroups,
  updateResponsibilities,
} from 'playpants/scenes/ProjectSettings/components/Responsibilities/actions';
import {
  currentProjectIdSelector,
  getBaseURL,
} from 'playpants/components/App/selectors';
import {
  envTypesSelector,
  groupListSelector,
  optionTypesSelector,
  responsibilityGroupsListSelector,
  responsibilityOptionsSelector,
} from 'playpants/scenes/ProjectSettings/components/Responsibilities/selectors';
import { assignedGroupsSelector, initialValuesSelector } from '../../selectors';
import * as actions from '../../actions';
import { GROUP_TAB } from './constants';

import DetailsStateless from './presentational';

const Details = props => {
  const { selectedItemId: user, onFetchResponsibilityGroups, project } = props;
  const [selectedTab, setSelectedTab] = useState(GROUP_TAB);

  useEffect(() => {
    onFetchResponsibilityGroups({ user, group: null, project });
  }, [user, project]);

  const onTabChange = (_, newTab) => {
    setSelectedTab(newTab);
  };

  return (
    <DetailsStateless
      {...props}
      onTabChange={onTabChange}
      selectedTab={selectedTab}
    />
  );
};

Details.propTypes = {
  isLoading: PropTypes.bool,
  onFetchResponsibilityGroups: PropTypes.func.isRequired,
  project: PropTypes.number.isRequired,
  selectedItemId: PropTypes.string,
};

Details.defaultProps = {
  isLoading: false,
  selectedItemId: null,
};

const stateToProps = state => ({
  assignedGroups: assignedGroupsSelector(state),
  baseUrl: getBaseURL(state),
  optionTypes: optionTypesSelector(state),
  groups: groupListSelector(state),
  initialValuesAdvanced: envTypesSelector(state),
  initialValuesRespGroups: initialValuesSelector(state),
  project: currentProjectIdSelector(state),
  responsibilityGroups: responsibilityGroupsListSelector(state),
  responsibilityOptions: responsibilityOptionsSelector(state),
});

const dispatchToProps = dispatch => ({
  addUserToGroup: (userID, values, project) =>
    dispatch(actions.addUserToGroup(userID, values, project)),
  fetchAssignedGroups: (userID, project) =>
    dispatch(actions.fetchAssignedGroups({ userID, project })),
  onFetchResponsibilityGroups: params =>
    dispatch(fetchResponsibilityGroups(params)),
  onUpdateResponsibilities: (id, data) =>
    dispatch(updateResponsibilities({ id, data })),
});

const mergeProps = (stateProps, dispatchProps, ownProps) => ({
  ...stateProps,
  ...dispatchProps,
  ...ownProps,
  onSave: value => {
    value.envTypes.map(envType => {
      const dictResponsibilities = envType.responsibilities.map(
        responsibility => ({ id: responsibility })
      );
      return dispatchProps.onUpdateResponsibilities(envType.id, {
        responsibilities: dictResponsibilities,
      });
    });
  },
});

export default connect(stateToProps, dispatchToProps, mergeProps)(Details);
