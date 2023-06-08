import React, { Component } from 'react';
import PropTypes from 'prop-types';
import debounce from 'debounce-promise';
import axios from 'axios';
import { compose } from 'redux';
import sortBy from 'lodash/sortBy';

import Icon from '@material-ui/core/Icon';

import { withUserProfileActions } from '@demonware/devzone-core/modules/user/HOC';

import { makeCancelable } from 'dw/core/helpers/promise';
import AutoComplete from 'dw/core/components/AutocompleteGeneral';

import { getAccounts as getAccountsApi } from './services';

import styles from './index.module.css';

const initialState = props => {
  const { defaultValue, isMulti } = props;
  if (!defaultValue) {
    return {};
  }
  const loading = isMulti
    ? defaultValue.some(item => typeof item === 'string')
    : typeof defaultValue === 'string';
  return { defaultValue, loading };
};

const formatLabel = account => `${account.userName} | ${account.userID}`;

const formatValue = (value, accounts) => {
  const account = accounts.find(a => a.userID === value);
  return account
    ? { value, label: formatLabel(account) }
    : { value, label: value };
};

export class UserAutoCompleteComponent extends Component {
  static propTypes = {
    isMulti: PropTypes.bool,
    isClearable: PropTypes.bool,
    placeholder: PropTypes.string,
    context: PropTypes.string,
    getAccountsApi: PropTypes.func,
    textFieldProps: PropTypes.object,
    user: PropTypes.object,
  };

  static defaultProps = {
    isMulti: false,
    isClearable: false,
    placeholder: 'Start Typing ...',
    context: undefined,
    getAccountsApi,
    textFieldProps: {},
    user: PropTypes.object,
  };

  state = initialState(this.props);

  componentDidMount() {
    const { loading, defaultValue } = this.state;
    if (loading) {
      const { isMulti, context } = this.props;
      const ids = isMulti
        ? defaultValue.filter(value => typeof value === 'string')
        : [defaultValue];
      this.getAccountsPromise = makeCancelable(
        this.props.getAccountsApi({ id: ids.join(','), context })
      );
      this.getAccountsPromise.promise
        .then(accounts => {
          this.setState(state => ({
            loading: false,
            defaultValue: isMulti
              ? state.defaultValue.map(value => {
                  if (typeof value !== 'string') return value;
                  return formatValue(value, accounts.data.data);
                })
              : formatValue(state.defaultValue, accounts.data.data),
          }));
          this.getAccountsPromise = undefined;
        })
        .catch(reason => {
          if (reason.hasOwnProperty('isCanceled'))
            // eslint-disable-next-line
            console.log('Promise canceled', reason.isCanceled);
          else
            this.setState(state => ({
              loading: false,
              defaultValue: isMulti
                ? state.defaultValue.map(value =>
                    typeof value === 'string' ? { value, label: value } : value
                  )
                : { value: state.defaultValue, label: state.defaultValue },
            }));
        });
    }
  }

  componentWillUnmount() {
    if (this.getAccountsPromise) this.getAccountsPromise.cancel();
  }

  onBlur = () => {
    if (this.cancelTokenSource)
      this.cancelTokenSource.cancel('Canceled obsolete request');
  };

  loadUsers = async inputValue => {
    if (this.cancelTokenSource)
      this.cancelTokenSource.cancel('Canceled obsolete request');
    this.cancelTokenSource = axios.CancelToken.source();
    const { context, user } = this.props;
    const { favoritePlayers } = user.profile;
    const params = {
      q: inputValue,
      context,
      cancelToken: this.cancelTokenSource.token,
    };
    const {
      data: { data, nextPageToken },
    } = await this.props.getAccountsApi(params);
    const users = [
      ...sortBy(
        favoritePlayers.map(fp => ({
          label: `${fp.username} | ${fp.accountId}`,
          value: fp.accountId,
        })),
        fp => fp.label?.toLowerCase()
      ),
      ...data
        .filter(
          value => !favoritePlayers.find(fp => fp.accountId === value.userID)
        )
        .map(value => ({
          label: formatLabel(value),
          value: value.userID,
        })),
    ];
    if (nextPageToken) {
      return [...users, { label: 'and more ...', isDisabled: true }];
    }
    return users;
  };

  loadOptions = async (value, callback) => {
    if (!value) callback([]);
    const users = await this.loadUsers(value);
    callback(users);
  };

  toggleFavoritePlayer = (event, data, isFavorite) => {
    const { addUserProfileFavoritePlayer, removeUserProfileFavoritePlayer } =
      this.props.user.actions;
    event.stopPropagation();
    return isFavorite
      ? removeUserProfileFavoritePlayer(data)
      : addUserProfileFavoritePlayer(data);
  };

  formatOptionLabel = ({ label, value }, { context }) => {
    const username = label.split(' | ')[0];
    const isFavorite = this.props.user.profile.favoritePlayers.find(
      fp => fp.accountId === value && fp.username === username
    );
    return (
      <div className={styles.userAutocompleteLabelContainer}>
        <div className={styles.userAutocompleteLabelContainerLabel}>
          {label}
        </div>
        {context === 'menu' && (
          <Icon
            color={isFavorite ? 'primary' : 'inherit'}
            onClick={e =>
              this.toggleFavoritePlayer(
                e,
                {
                  account_id: value,
                  username,
                },
                isFavorite
              )
            }
          >
            {isFavorite ? 'star' : 'star_border'}
          </Icon>
        )}
      </div>
    );
  };

  render() {
    const { loading, defaultValue, isClearable } = this.state;
    const { textFieldProps, ...otherProps } = this.props;
    return (
      <AutoComplete
        {...otherProps}
        key={loading}
        defaultValue={defaultValue}
        loadOptions={debounce(this.loadOptions, 300)}
        isClearable={isClearable}
        isDisabled={loading}
        textFieldProps={{
          ...textFieldProps,
          'data-cy': 'userAutocomplete',
          onBlur: this.onBlur,
        }}
        formatOptionLabel={this.formatOptionLabel}
      />
    );
  }
}

const UserAutoComplete = compose(withUserProfileActions)(
  UserAutoCompleteComponent
);

export default UserAutoComplete;
