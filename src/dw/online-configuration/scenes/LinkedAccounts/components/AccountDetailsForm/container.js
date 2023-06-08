import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { reduxForm, change, propTypes as reduxFormPropTypes } from 'redux-form';

import { CHANGE_ACCOUNT_DETAILS_FORM_NAME } from 'dw/online-configuration/scenes/LinkedAccounts/constants';
import {
  fetchAccountDetails as fetchAccountDetailsAction,
  accountDetailsUpdate,
} from 'dw/online-configuration/scenes/LinkedAccounts/actions';

import {
  accountDetailsSelector,
  userExistsInMarketplaceSelector,
} from '../../selectors';
import AccountDetailsFormStateless from './presentational';

const stateToProps = (state, props) => {
  const { account } = props;
  const accountDetailsProps = {
    accountID: account.accountID,
  };
  return {
    accountDetails: accountDetailsSelector(state, accountDetailsProps),
    userExistsInMarketplace: userExistsInMarketplaceSelector(
      state,
      accountDetailsProps
    ),
    formName: CHANGE_ACCOUNT_DETAILS_FORM_NAME,
  };
};

const dispatchToProps = (dispatch, { account, formName }) => ({
  fetchAccountDetails: () =>
    dispatch(
      fetchAccountDetailsAction({
        account,
      })
    ),
  onSubmit: values => {
    dispatch(
      accountDetailsUpdate({
        urlID: account.accountID,
        params: {
          provider: account.provider,
          formName,
          payload: {
            username: values.username,
            tokenCount: values.tokenCount || undefined,
            removeHash: values.removeHash || false,
          },
        },
      })
    );
  },
});

class UpdateAccountDetails extends Component {
  componentDidMount() {
    const { fetchAccountDetails } = this.props;
    fetchAccountDetails();
    this.handleInitializeForm();
  }

  componentDidUpdate(prevProps) {
    const { accountDetails: prevAccountDetails } = prevProps;
    const { accountDetails, form, initialize } = this.props;
    if (
      !accountDetails.loading &&
      accountDetails.loading !== prevAccountDetails.loading
    ) {
      if (initialize) this.handleInitializeForm();
      else change(form, 'tokenCount', accountDetails.rename_token_count);
    }
  }

  handleInitializeForm() {
    const { accountDetails, initialize, account } = this.props;
    const [username, hashNumber] = account.username.split('#');
    const hash = hashNumber ? `#${hashNumber}` : undefined;
    initialize({
      username,
      hash,
      tokenCount: !accountDetails.loading && accountDetails.rename_token_count,
    });
  }

  render() {
    return <AccountDetailsFormStateless {...this.props} />;
  }
}

UpdateAccountDetails.propTypes = {
  fetchAccountDetails: PropTypes.func.isRequired,
  accountDetails: PropTypes.object.isRequired,
  account: PropTypes.object.isRequired,
  ...reduxFormPropTypes.form,
  ...reduxFormPropTypes.initialize,
};

export default compose(
  connect(stateToProps, dispatchToProps),
  reduxForm({
    form: CHANGE_ACCOUNT_DETAILS_FORM_NAME,
  })
)(UpdateAccountDetails);
