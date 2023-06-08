import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators, compose } from 'redux';
import PropTypes from 'prop-types';
import { FieldArray, isDirty } from 'redux-form';

import { getSecondsFromDuration } from 'playpants/helpers/dateTime';
import { withUserProfileActions } from '@demonware/devzone-core/modules/user/HOC';
import { shouldUseProfileSettingsSelector } from 'playpants/components/App/selectors';

import MasterDetailForm from 'playpants/components/MasterDetailForm';
import AccountsFormFields from '../AccountsFormFields';
import TimewarpSettingsFormFields from '../TimewarpSettingsFormFields';
import ToggleActiveGroup from './components/ToggleActiveGroup';

import {
  hiddenGroupsKeySelector,
  hiddenGroupsSelector,
  initialValuesSelector,
} from '../../selectors';
import * as actions from '../../actions';

const GamertagForm = ({
  _initialValues,
  _onFetchGroupAccounts,
  _onFetchGroupTimewarpSettings,
  _userHiddenGroupsKey,
  _userHiddenGroupsSettings,
  form,
  group,
  isLoading,
  onSave,
  selectedItem,
  user: {
    actions: { createUserProfileSetting, updateUserProfileSetting },
  },
  isTimewarpDirty,
  isAccountsDirty,
  _useProfileSettings,
}) => {
  const groupId = group && group.id && group.id.toString();
  // creating active group settings if none already exists
  useEffect(() => {
    if (!_userHiddenGroupsSettings && _useProfileSettings) {
      createUserProfileSetting({
        key: _userHiddenGroupsKey,
        value: '[]',
      });
    }
  }, []);
  // fetch group accounts and timewarp settings if group exists
  useEffect(() => {
    if (groupId) {
      _onFetchGroupAccounts(groupId);
      _onFetchGroupTimewarpSettings(groupId);
    }
  }, [groupId]);

  const handleToggleGroupActiveStatus = ({ target: { checked } }) => {
    const activeGroupList = new Set(_userHiddenGroupsSettings);
    if (checked) activeGroupList.add(groupId);
    else if (activeGroupList.has(groupId)) activeGroupList.delete(groupId);
    if (_useProfileSettings) {
      updateUserProfileSetting(_userHiddenGroupsKey, {
        value: JSON.stringify([...activeGroupList]),
      });
    }
  };

  const handleSave = ({
    accounts,
    color,
    date_time: dateTime,
    duration,
    id,
    negativeOffset,
    priority,
    type,
  }) => {
    const timewarpSettings = {
      id,
      type,
      color,
      priority,
      date_time: type === 'offset' ? null : dateTime,
      time_delta: type === 'offset' ? getSecondsFromDuration(duration) : null,
    };
    if (timewarpSettings.time_delta && negativeOffset) {
      timewarpSettings.time_delta = -timewarpSettings.time_delta;
    }
    onSave(timewarpSettings, accounts, isTimewarpDirty, isAccountsDirty);
  };

  return (
    <MasterDetailForm
      extraContent={
        groupId && (
          <ToggleActiveGroup
            value={group && !group.active}
            onChange={handleToggleGroupActiveStatus}
          />
        )
      }
      form={form}
      formFields={
        <>
          <FieldArray
            component={AccountsFormFields}
            name="accounts"
            props={{ form }}
          />
          {groupId && (
            <FieldArray
              component={TimewarpSettingsFormFields}
              name="settings"
              props={{ form }}
            />
          )}
        </>
      }
      initialValues={_initialValues}
      isLoading={isLoading}
      onSave={handleSave}
      selectedItem={selectedItem}
      title={selectedItem ? selectedItem.name : ''}
    />
  );
};

GamertagForm.propTypes = {
  _initialValues: PropTypes.object.isRequired,
  _onFetchGroupAccounts: PropTypes.func.isRequired,
  _onFetchGroupTimewarpSettings: PropTypes.func.isRequired,
  _userHiddenGroupsKey: PropTypes.string.isRequired,
  _userHiddenGroupsSettings: PropTypes.arrayOf(PropTypes.string),
  form: PropTypes.string.isRequired,
  group: PropTypes.object,
  isLoading: PropTypes.bool.isRequired,
  onSave: PropTypes.func.isRequired,
  selectedItem: PropTypes.object,
  user: PropTypes.shape({
    profile: PropTypes.object,
    actions: PropTypes.object,
  }),
  isTimewarpDirty: PropTypes.bool.isRequired,
  isAccountsDirty: PropTypes.bool.isRequired,
  _useProfileSettings: PropTypes.bool.isRequired,
};

GamertagForm.defaultProps = {
  _userHiddenGroupsSettings: null,
  group: null,
  selectedItem: {},
  user: {},
};

const stateToProps = (state, ownProps) => ({
  _initialValues: initialValuesSelector(state),
  _userHiddenGroupsKey: hiddenGroupsKeySelector(state),
  _userHiddenGroupsSettings: hiddenGroupsSelector(state),
  isTimewarpDirty: isDirty(ownProps.form)(
    state,
    'type',
    'priority',
    'color',
    'date_time',
    'negativeOffset',
    'duration',
    'id',
    'time_delta'
  ),
  isAccountsDirty: isDirty(ownProps.form)(state, 'accounts'),
  _useProfileSettings: shouldUseProfileSettingsSelector(state),
});

const dispatchToProps = dispatch => ({
  _onFetchGroupAccounts: bindActionCreators(
    actions.fetchGroupAccounts,
    dispatch
  ),
  _onFetchGroupTimewarpSettings: bindActionCreators(
    actions.fetchGroupTimewarpSettings,
    dispatch
  ),
});

export default compose(
  connect(stateToProps, dispatchToProps),
  withUserProfileActions
)(GamertagForm);
