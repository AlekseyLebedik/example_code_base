import { Component } from 'react';
import PropTypes from 'prop-types';
import queryString from 'query-string';

import { connect } from 'dw/core/helpers/component';
import { joinQueryParam } from 'dw/core/helpers/path';

import {
  fetchAccounts,
  accountsListItemClick,
  exportAccounts,
} from './actions';
import StatelessComponent from './presentational';
import { makeGetTitleEnvOption } from '../../../core/helpers/title-env-selectors';

const stateToProps = (state, props) => ({
  history: props.history,
  match: props.match,
  accounts: state.Scenes.Accounts.accounts,
  nextPageToken: state.Scenes.Accounts.nextPageToken,
  q: state.Scenes.Accounts.q,
  exportAccountsOption: makeGetTitleEnvOption()(state, {
    titleEnvOption: 'enable_accounts_export',
  }),
});

const dispatchToProps = dispatch => ({
  onLoad: query => dispatch(fetchAccounts(!query ? {} : { q: query })),
  onShowMore: (nextPageToken, q) =>
    dispatch(fetchAccounts({ nextPageToken, q }, true)),
  onClickListItem: account => dispatch(accountsListItemClick(account)),
  onSearch: q => dispatch(fetchAccounts({ q })),
  onExport: fileType => dispatch(exportAccounts(fileType)),
});

const mergeProps = (stateProps, dispatchProps) => ({
  ...stateProps,
  ...dispatchProps,
  onSearch: payload => {
    const { history, match } = stateProps;
    const path = !payload.q
      ? match.url
      : joinQueryParam(match.url, 'q', payload.q);
    history.replace(path);
    dispatchProps.onSearch(payload.q);
  },
});

class Accounts extends Component {
  componentDidMount() {
    const { q } = queryString.parse(this.props.history.location.search);
    this.props.onLoad(q);
  }

  render() {
    return StatelessComponent(this.props);
  }
}

Accounts.propTypes = {
  ...StatelessComponent.propTypes,
  onLoad: PropTypes.func.isRequired,
};

export default connect(stateToProps, dispatchToProps, Accounts, mergeProps);
