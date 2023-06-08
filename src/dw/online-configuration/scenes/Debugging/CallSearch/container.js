import React, { Component } from 'react';
import queryString from 'query-string';

import { joinQueryParams } from 'dw/core/helpers/path';
import { connect } from 'dw/core/helpers/component';
import { hasData } from 'dw/core/helpers/object';
import { getReactBaseURL } from 'dw/online-configuration/selectors';
import { timezoneOrDefaultSelector as timezoneSelector } from 'dw/core/helpers/date-time';

import { fetchCalls, callsListItemClick, setFilterParams } from './actions';
import mmpCallsSelector, { selectedCall } from './selectors';
import StatelessComponent from './presentational';

const queryParamsSelector = (state, props) => {
  const { history } = props;
  const {
    q = '',
    values = {},
    ...stateQ
  } = state.Scenes.Debugging.CallSearch.q || {};
  const isDefault = stateQ.default === undefined ? true : stateQ.default;
  const params = queryString.parse(history.location.search);
  const newQ = isDefault
    ? { default: isDefault, q }
    : { default: isDefault, values };
  if (hasData(params)) {
    if (params.q !== undefined) {
      newQ.q = params.q;
    } else {
      newQ.default = false;
      newQ.values = params;
    }
  }
  return newQ;
};

const stateToProps = (state, props) => {
  const { history, match } = props;
  return {
    history,
    match,
    calls: mmpCallsSelector(state),
    nextPageToken: state.Scenes.Debugging.CallSearch.nextPageToken,
    q: queryParamsSelector(state, props),
    selectedCall: selectedCall(state),
    baseUrl: `${getReactBaseURL(state)}debugging/server-logs/`,
    timezone: timezoneSelector(state),
  };
};

const dispatchToProps = dispatch => ({
  onLoad: ({ q = undefined, values = {} }) =>
    dispatch(fetchCalls({ q, ...values })),
  onShowMore: (nextPageToken, { q = undefined, values = {} }) =>
    dispatch(fetchCalls({ q, nextPageToken, ...values }, true)),
  onClickListItem: call => dispatch(callsListItemClick(call)),
  onSearch: params => dispatch(fetchCalls(params)),
  setFilterParams: params => dispatch(setFilterParams(params)),
});

const mergeProps = (stateProps, dispatchProps) => ({
  ...stateProps,
  ...dispatchProps,
  onSearch: payload => {
    const { history, match } = stateProps;
    const baseUrl = match.url.replace(`/${match.params.id}`, '');
    const searchParams =
      payload.default === false
        ? payload.values
        : (payload.q && { q: payload.q }) || {};
    const path = !hasData(searchParams)
      ? baseUrl
      : joinQueryParams(baseUrl, searchParams);
    history.replace(path);
    dispatchProps.onClickListItem(null);
    dispatchProps.onSearch(searchParams);
    dispatchProps.setFilterParams(payload);
  },
});

class Calls extends Component {
  componentDidMount() {
    const { onLoad, match, q } = this.props;
    const transactionId = match.params.id;

    if (q.q || hasData(q.values)) {
      onLoad(q);
    } else {
      onLoad({ q: transactionId || '' });
    }
  }

  onClickViewLogs = transactionId => {
    const { history, baseUrl } = this.props;
    history.push(`${baseUrl}?transId=${transactionId}`);
  };

  render() {
    return (
      <StatelessComponent
        {...this.props}
        onClickViewLogs={this.onClickViewLogs}
      />
    );
  }
}

Calls.propTypes = {
  ...StatelessComponent.propTypes,
};

export default connect(stateToProps, dispatchToProps, Calls, mergeProps);
