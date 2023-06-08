import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Field, formValueSelector, change } from 'redux-form';
import uniqBy from 'lodash/uniqBy';
import classNames from 'classnames';

import Paper from '@material-ui/core/Paper';
import AutocompleteGeneral from 'dw/core/components/FormFields/AutocompleteGeneral';
import ConfirmActionComponent from 'dw/core/components/ConfirmActionComponent';
import IconButton from 'dw/core/components/IconButton';
import UserTable from './components/UserTable';
import OptionLabel from './components/OptionLabel';
import OptionChip from './components/OptionChip';

import {
  formatLinkedAccounts,
  mergeAccountResults,
  sortProviders,
} from './helpers';
import {
  asyncFetchAccountsGroup,
  asyncFetchLinkedAccountsList,
} from './actions';
import { LOOKUP_HELP } from '../../constants';

import styles from './index.module.css';

const selectStyles = {
  menuList: base => ({
    ...base,
    '& > div': {
      width: `100% !important`,
      padding: '6px 16px !important',
      justifyContent: 'flex-start !important',
    },
  }),
};

const LinkedAccountsFormFields = ({
  onAdd,
  onAsyncFetchAccountsGroup,
  onAsyncFetchLinkedAccountList,
  provider,
  selectedAccounts,
  ...props
}) => {
  const [inputValue, setInputValue] = useState('');
  const [overrideAccounts, setOverrideAccounts] = useState([]);
  // Force accounts react-select to reset on change
  const [resetKey, setResetKey] = useState(true);

  const resetAccountsSelect = () => {
    setResetKey(!resetKey);
    setInputValue('');
  };

  // Reset accounts select on provider change
  useEffect(() => {
    resetAccountsSelect();
  }, [provider]);

  useEffect(() => {
    if (selectedAccounts.length) {
      onAsyncFetchAccountsGroup(
        res => {
          setOverrideAccounts(res.filter(a => a.group));
        },
        selectedAccounts.map(account => ({ account, key: account.accountID }))
      );
    }
  }, [selectedAccounts]);

  const formatAccountsThenCallback = callback => results => {
    const data = mergeAccountResults(results, 'umbrellaID');
    const accountList = formatLinkedAccounts(data);
    if (accountList.length) {
      onAsyncFetchAccountsGroup(res => {
        const options = res.map(({ group, key, label, value }) => ({
          value,
          key,
          label: <OptionLabel label={label} group={group} />,
        }));
        callback(options);
      }, accountList);
    } else {
      callback();
    }
  };

  const loadOptions = (query, callback) => {
    onAsyncFetchLinkedAccountList(
      formatAccountsThenCallback(callback),
      provider,
      query
    );
  };

  const handleAddUsers = () => {
    const accounts = uniqBy(selectedAccounts, 'accountID');
    const filteredAccounts = accounts.filter(
      account => !props.items.some(a => a.account_id === account.accountID)
    );
    filteredAccounts.forEach(
      ({ accountID, linkedAccounts, provider: thisProvider, username }) =>
        onAdd({
          account_id: accountID,
          active: true,
          linked_accounts: linkedAccounts,
          provider: thisProvider,
          username,
        })
    );
    resetAccountsSelect();
  };

  const onInputChange = (query, { action }) => {
    // Prevents resetting our input after option has been selected
    if (action === 'input-change') {
      setInputValue(query);
      return query;
    }
    return inputValue;
  };

  /**
   * Filters options provided to the accounts react-selector.
   * If an accounts UNO id is already added then it should not
   * display as a selectable option anymore
   * @param {{}} option - Event handler
   * @param {[]} option - selectable option provided to react-select
   * @param {string} selectedList - list of all options selected aka the 'chips'
   */
  const filterSelectedOptions = (option, selectedList) =>
    selectedList.some(selected => selected.key === option.key) ||
    props.items.some(account => account.account_id === option.key);

  const AddAccountButton = extraProps => {
    const disabledButton = !selectedAccounts.length;
    return (
      <IconButton
        {...extraProps}
        className={classNames(styles.addAccountBtn, {
          [styles.btnPrimary]: selectedAccounts.length,
        })}
        color="primary"
        disabled={disabledButton}
        icon="add"
        text={`ADD ACCOUNT${selectedAccounts.length > 1 ? 'S' : ''}`}
        tooltip={disabledButton ? 'Select Account First' : 'Add Account'}
        type="fab"
        variant="extended"
      />
    );
  };

  return (
    <Paper className={styles.container}>
      <label className={styles.titleContent}>Gamertags</label>
      <div className={styles.addAccountContainer}>
        <Field
          component={AutocompleteGeneral}
          defaultValue={provider}
          fullWidth
          isClearable={false}
          key={provider}
          label="Provider"
          name="provider"
          options={sortProviders()}
          styles={selectStyles}
        />
        <div className={styles.accountSearchField}>
          <Field
            blurInputOnSelect={false}
            cacheOptions
            closeMenuOnSelect={false}
            component={AutocompleteGeneral}
            fullWidth
            getOptionValue={option => option.key}
            inputValue={inputValue}
            isClearable={false}
            isMulti
            isOptionSelected={filterSelectedOptions}
            key={resetKey}
            label="Accounts"
            loadOptions={loadOptions}
            name="accountOptions"
            onInputChange={onInputChange}
            placeholder="Gamertag or ID"
            regularInputMode
            styles={selectStyles}
            components={{ MultiValue: OptionChip }}
          />
          <div className={styles.infoButton}>
            <IconButton
              disabled
              icon="help"
              size="small"
              tooltip={LOOKUP_HELP}
            />
          </div>
        </div>
        {overrideAccounts.length ? (
          <ConfirmActionComponent
            confirm={{
              title: 'Confirm Update Accounts Group',
              confirmMsg: (
                <>
                  <p>
                    Adding the following accounts will remove them from their
                    previous group:
                  </p>
                  <strong>
                    {overrideAccounts.map(a => a.account.username).join(', ')}
                  </strong>
                </>
              ),
              mainButtonLabel: 'Confirm',
              confirmOpen: false,
              destructive: true,
            }}
            component={({ children, onClick }) => (
              <span onClick={onClick}>{children}</span>
            )}
            onClick={handleAddUsers}
          >
            <AddAccountButton />
          </ConfirmActionComponent>
        ) : (
          <AddAccountButton onClick={handleAddUsers} />
        )}
      </div>
      <UserTable {...props} />
    </Paper>
  );
};

LinkedAccountsFormFields.propTypes = {
  items: PropTypes.arrayOf(PropTypes.object).isRequired,
  onAdd: PropTypes.func.isRequired,
  onAsyncFetchAccountsGroup: PropTypes.func.isRequired,
  onAsyncFetchLinkedAccountList: PropTypes.func.isRequired,
  provider: PropTypes.string.isRequired,
  selectedAccounts: PropTypes.arrayOf(PropTypes.object),
};
LinkedAccountsFormFields.defaultProps = {
  selectedAccounts: [],
};

const createEventFormSelector = formName => formValueSelector(formName);

const mapStateToProps = (state, ownProps) => ({
  provider: createEventFormSelector(ownProps.form)(state, 'provider'),
  selectedAccounts: createEventFormSelector(ownProps.form)(
    state,
    'accountOptions'
  ),
});

const dispatchToProps = (dispatch, ownProps) => ({
  change: (form, name, values) => change(form, name, values),
  onAsyncFetchLinkedAccountList: (callback, provider, q) =>
    dispatch(
      asyncFetchLinkedAccountsList({
        callback,
        provider,
        q,
      })
    ),
  onAsyncFetchAccountsGroup: (callback, accountList) =>
    dispatch(
      asyncFetchAccountsGroup({
        callback,
        accountList,
      })
    ),
  onEdit: (index, active) => {
    const { form } = ownProps;
    dispatch(change(form, `accounts[${index}].active`, active));
  },
  onEditAll: active => {
    const { form, fields } = ownProps;
    fields.forEach(member => {
      dispatch(change(form, `${member}.active`, active));
    });
  },
});

const mergeProps = (stateProps, dispatchProps, ownProps) => {
  const { fields, items, onAdd, onRemove } = ownProps;
  return {
    ...ownProps,
    ...dispatchProps,
    ...stateProps,
    onAdd: item =>
      fields === undefined ? onAdd(item) : fields.insert(0, item),
    onRemove: removeItems => {
      if (fields === undefined) {
        onRemove(removeItems);
        return;
      }
      // Descending sort to remove fields without affecting index
      const ids = removeItems.map(i => i.idx).sort((a, b) => b - a);
      ids.forEach(id => {
        fields.remove(id);
      });
    },
    items: fields === undefined ? items : fields.getAll() || [],
  };
};

export default connect(
  mapStateToProps,
  dispatchToProps,
  mergeProps
)(LinkedAccountsFormFields);
