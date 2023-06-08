import React from 'react';
import UserAutoCompleteCore from 'dw/core/components/UserAutoComplete';
import UserAutoCompleteFormFieldCore from 'dw/core/components/FormFields/UserAutoComplete';
import { getAccounts } from 'dw/online-configuration/services/accounts';

const UserAutoComplete = props => (
  <UserAutoCompleteCore {...props} getAccountsApi={getAccounts} />
);

const UserAutoCompleteFormField = props => (
  <UserAutoCompleteFormFieldCore {...props} getAccountsApi={getAccounts} />
);

export default UserAutoComplete;
export { UserAutoCompleteFormField };
