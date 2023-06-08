/* eslint-disable react/no-array-index-key */
import React, { useState, useEffect, useCallback } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';

import debounce from 'lodash/debounce';

import ResponsibilitiesForm from 'playpants/scenes/ProjectSettings/components/Responsibilities/components/ResponsibilitiesForm';

import { fetchAvailableUsers } from 'playpants/scenes/ProjectSettings/actions';

import {
  fetchResponsibilityGroups,
  updateResponsibilities,
} from 'playpants/scenes/ProjectSettings/components/Responsibilities/actions';
import { currentProjectIdSelector } from 'playpants/components/App/selectors';
import {
  optionTypesSelector,
  responsibilityGroupsListSelector,
  responsibilityOptionsSelector,
} from 'playpants/scenes/ProjectSettings/components/Responsibilities/selectors';
import {
  makeSelectedItemSelector,
  availableUsersSelector,
  availableUsersNextSelector,
  initialValuesSelector,
} from '../../selectors';

import * as actions from '../../actions';
import { FORM_NAME } from '../../constants';

import UsersSelect from '../UsersSelect';

const Details = props => {
  const {
    availableUsers,
    availableUsersNext,
    optionTypes,
    form,
    initialValues,
    isLoading,
    onFetchGroupMembers,
    onFetchResponsibilityGroups,
    onSave,
    onSearchUsers,
    onShowMore,
    project,
    selectedItem,
    selectedItemId,
  } = props;

  useEffect(() => {
    onFetchGroupMembers(selectedItemId);
    onFetchResponsibilityGroups({
      group: selectedItemId,
      user: null,
      project,
    });
  }, [selectedItemId, project]);

  const [inputValue, setInputValue] = useState('');
  const onSearchUsersDebounced = useCallback(
    debounce(params => onSearchUsers(params), 1000),
    [onSearchUsers]
  );

  return (
    <ResponsibilitiesForm
      envTypes={optionTypes}
      form={form}
      initialValues={initialValues}
      isLoading={isLoading}
      onSave={onSave}
      selectedItem={selectedItem}
      extraFields={
        <UsersSelect
          availableUsers={availableUsers}
          availableUsersNext={availableUsersNext}
          onInputChange={q => {
            setInputValue(q);
            onSearchUsersDebounced({ q });
          }}
          onShowMore={onShowMore}
          inputValue={inputValue}
        />
      }
      title={selectedItem ? selectedItem.name : ''}
    />
  );
};

Details.propTypes = {
  availableUsers: PropTypes.arrayOf(PropTypes.object),
  availableUsersNext: PropTypes.string,
  form: PropTypes.string.isRequired,
  initialValues: PropTypes.object.isRequired,
  isLoading: PropTypes.bool,
  onFetchGroupMembers: PropTypes.func.isRequired,
  onFetchResponsibilityGroups: PropTypes.func.isRequired,
  onSave: PropTypes.func.isRequired,
  optionTypes: PropTypes.arrayOf(PropTypes.object).isRequired,
  project: PropTypes.number.isRequired,
  selectedItem: PropTypes.object,
  selectedItemId: PropTypes.string,
  onSearchUsers: PropTypes.func,
  onShowMore: PropTypes.func,
};

Details.defaultProps = {
  availableUsers: [],
  availableUsersNext: null,
  isLoading: false,
  selectedItem: null,
  selectedItemId: null,
  onSearchUsers: () => {},
  onShowMore: () => {},
};

const makeMapStateToProps = () => {
  const selectedItemSelector = makeSelectedItemSelector();
  const mapStateToProps = (state, props) => ({
    availableUsers: availableUsersSelector(state),
    availableUsersNext: availableUsersNextSelector(state),
    optionTypes: optionTypesSelector(state),
    form: FORM_NAME,
    initialValues: initialValuesSelector(state, props),
    project: currentProjectIdSelector(state),
    responsibilityGroups: responsibilityGroupsListSelector(state),
    responsibilityOptions: responsibilityOptionsSelector(state),
    selectedItem: selectedItemSelector(state, props),
  });
  return mapStateToProps;
};

const dispatchToProps = dispatch => ({
  onFetchGroupMembers: bindActionCreators(actions.fetchGroupMembers, dispatch),
  onUpdateGroupMembers: bindActionCreators(
    actions.updateGroupMembers,
    dispatch
  ),
  onFetchResponsibilityGroups: bindActionCreators(
    fetchResponsibilityGroups,
    dispatch
  ),
  onUpdateResponsibilities: (id, data) =>
    dispatch(updateResponsibilities({ id, data })),
  onSearchUsers: payload => dispatch(fetchAvailableUsers({ q: payload.q })),
  onShowMore: nextPage => dispatch(fetchAvailableUsers({ nextPage })),
});

const mergeProps = (stateProps, dispatchProps, ownProps) => ({
  ...stateProps,
  ...dispatchProps,
  ...ownProps,
  onSave: ({ envTypes, members }) => {
    envTypes.map(envType => {
      const dictResponsibilities = envType.responsibilities.map(
        responsibility => ({ id: responsibility })
      );
      return dispatchProps.onUpdateResponsibilities(envType.id, {
        responsibilities: dictResponsibilities,
      });
    });
    const { id } = stateProps.selectedItem;
    dispatchProps.onUpdateGroupMembers(id, { members });
  },
});

export default connect(
  makeMapStateToProps,
  dispatchToProps,
  mergeProps
)(Details);
