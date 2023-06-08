import { Component } from 'react';
import PropTypes from 'prop-types';
import { generatePath } from 'react-router-dom';
import queryString from 'query-string';

import { connect } from 'dw/core/helpers/component';
import { joinQueryParams } from 'dw/core/helpers/path';

import { accountsLookup } from './actions';
import StatelessComponent from './presentational';
import {
  linkedAccountsSelector,
  nextPageSelector,
  qSelector,
  providerSelector,
  selectedItemSelector,
  loadingSelector,
} from './selectors';

class LinkedAccounts extends Component {
  state = {
    linkedAccounts: [],
    provider:
      queryString.parse(this.props.history.location.search).provider ||
      this.props.provider,
    q: queryString.parse(this.props.history.location.search).q || this.props.q,
  };

  componentDidMount() {
    this.onSearch();
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    const { linkedAccounts, match, history } = nextProps;
    const { q, provider } = prevState;

    if (
      linkedAccounts !== prevState.linkedAccounts &&
      linkedAccounts.length === 1
    ) {
      const path = generatePath(match.path, {
        ...match.params,
        id: linkedAccounts[0].umbrellaID,
      });
      history.push(
        joinQueryParams(path, {
          q: encodeURI(q).replace(/#/g, '%23'),
          provider,
        })
      );
      return { linkedAccounts, q };
    }
    return { q };
  }

  onSearch = (payload = {}) => {
    const { onSearch } = this.props;
    const { q, provider } = this.state;
    onSearch({ q }, provider, {
      ...payload.params,
      nextPage: payload.nextPageToken,
    });
  };

  search = payload =>
    this.setState({ q: payload.q }, () => this.onSearch(payload));

  changeProvider = event => this.setState({ provider: event.target.value });

  onShowMore = nextPage => {
    const { onShowMore } = this.props;
    const { q, provider } = this.state;
    onShowMore(nextPage, q, provider);
  };

  render() {
    const { provider, q } = this.state;
    return StatelessComponent({
      ...this.props,
      onSearch: this.search,
      onShowMore: this.onShowMore,
      q,
      provider,
      changeProvider: this.changeProvider,
    });
  }
}

LinkedAccounts.propTypes = {
  onSearch: PropTypes.func.isRequired,
  onShowMore: PropTypes.func.isRequired,
  history: PropTypes.object.isRequired,
  q: PropTypes.string,
  provider: PropTypes.string.isRequired,
  linkedAccounts: PropTypes.arrayOf(PropTypes.object).isRequired,
  match: PropTypes.object.isRequired,
};

LinkedAccounts.defaultProps = {
  q: undefined,
};

const stateToProps = (state, props) => ({
  linkedAccounts: linkedAccountsSelector(state),
  selectedItem: selectedItemSelector(state, props),
  nextPage: nextPageSelector(state),
  q: qSelector(state),
  provider: providerSelector(state),
  loading: loadingSelector(state),
  history: props.history,
  match: props.match,
});

const dispatchToProps = dispatch => ({
  onSearch: (payload, provider, params) =>
    dispatch(
      accountsLookup(!payload ? params : { ...params, q: payload.q, provider })
    ),
  onShowMore: (nextPage, q, provider) =>
    dispatch(accountsLookup({ nextPage, q, provider })),
});

const mergeProps = (stateProps, dispatchProps) => ({
  ...stateProps,
  ...dispatchProps,
  onSearch: (payload, provider, params) => {
    const { history, match } = stateProps;
    const path =
      !payload || !payload.q
        ? match.url
        : joinQueryParams(match.url, { q: payload.q, provider });
    history.replace(path);
    dispatchProps.onSearch(payload, provider, params);
  },
});

export default connect(
  stateToProps,
  dispatchToProps,
  LinkedAccounts,
  mergeProps
);
