import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { connect } from 'dw/core/helpers/component';

import { SERVICE_NAMES } from '@demonware/devzone-core/access/ServiceAvailability/constants';
import { serviceEnabledSelector } from 'dw/core/helpers/title-env-selectors';

import AccountDetailsStateless from './presentational';

// This is actually ugly, but the parent components (Accounts), can't
// access `match.params.id` to trigger the initial loading. So we
// need to trigger the action here.
import { accountsListItemClick } from '../../actions';

const stateToProps = state => {
  const isServiceEnabled = serviceEnabledSelector(state);
  return {
    selectedAccount: state.Scenes.Accounts.selectedAccount,
    usesObjectStore: isServiceEnabled(SERVICE_NAMES.OBJECT_STORE),
  };
};

const dispatchToProps = dispatch => ({
  onLoad: account => dispatch(accountsListItemClick(account)),
});

class AccountDetails extends Component {
  componentDidMount() {
    const { onLoad, match } = this.props;
    onLoad({ userID: match.params.id });
  }

  render() {
    return <AccountDetailsStateless {...this.props} />;
  }
}

AccountDetails.propTypes = {
  ...AccountDetailsStateless.propTypes,
  onLoad: PropTypes.func.isRequired,
};

export default connect(stateToProps, dispatchToProps, AccountDetails);
