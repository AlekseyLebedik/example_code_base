import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';

import GamertagForm from '../GamertagForm';
import * as actions from '../../actions';
import { GROUPS_FORM_NAME } from '../../constants';
import { makeSelectedItemSelector } from './selectors';

const GroupDetails = ({
  form,
  isLoading,
  onUpdateGroupAccounts,
  onUpdateGroupTimewarpSettings,
  selectedItem,
  selectedItemId,
}) => {
  const handleSave = (
    timewarpSettings,
    accounts,
    isTimewarpDirty,
    isAccountsDirty
  ) => {
    const accountsFormatted = accounts.map(a =>
      a.linked_accounts ? a : { ...a, linked_accounts: '[]' }
    );
    if (isTimewarpDirty && isAccountsDirty) {
      onUpdateGroupAccounts(selectedItemId, accountsFormatted);
      setTimeout(() => {
        onUpdateGroupTimewarpSettings(selectedItemId, timewarpSettings);
      }, 1000);
    } else if (isTimewarpDirty) {
      onUpdateGroupTimewarpSettings(selectedItemId, timewarpSettings);
    } else if (isAccountsDirty) {
      onUpdateGroupAccounts(selectedItemId, accountsFormatted);
    }
  };

  return (
    <GamertagForm
      form={form}
      group={selectedItem}
      isLoading={isLoading}
      onSave={handleSave}
      selectedItem={selectedItem}
    />
  );
};

GroupDetails.propTypes = {
  form: PropTypes.string.isRequired,
  isLoading: PropTypes.bool,
  onUpdateGroupAccounts: PropTypes.func.isRequired,
  onUpdateGroupTimewarpSettings: PropTypes.func.isRequired,
  selectedItem: PropTypes.object,
  selectedItemId: PropTypes.string,
};

GroupDetails.defaultProps = {
  isLoading: false,
  selectedItem: null,
  selectedItemId: null,
};

const makeMapStateToProps = () => {
  const selectedItemSelector = makeSelectedItemSelector();
  const mapStateToProps = (state, props) => ({
    selectedItem: selectedItemSelector(state, props),
    form: GROUPS_FORM_NAME,
  });
  return mapStateToProps;
};

const dispatchToProps = dispatch => ({
  onUpdateGroupAccounts: bindActionCreators(
    actions.updateGroupAccounts,
    dispatch
  ),
  onUpdateGroupTimewarpSettings: bindActionCreators(
    actions.updateGroupTimewarpSettings,
    dispatch
  ),
});

export default connect(makeMapStateToProps, dispatchToProps)(GroupDetails);
