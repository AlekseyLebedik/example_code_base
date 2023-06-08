import React from 'react';
import queryString from 'query-string';

import { connect } from 'dw/core/helpers/component';
import {
  formatDateTimeSelector,
  timezoneOrDefaultSelector as timezoneSelector,
} from 'dw/core/helpers/date-time';

import { fetchServerLogs } from '../ServerLogs/actions';
import ServerLogsStatelessComponent from './presentational';

const stateToProps = state => ({
  serverLogs: state.Scenes.Debugging.ServerLogs.serverLogs,
  nextPageToken: state.Scenes.Debugging.ServerLogs.nextPageToken,
  q: state.Scenes.Debugging.ServerLogs.q,
  formatDateTime: formatDateTimeSelector(state),
  timezone: timezoneSelector(state),
});

const dispatchToProps = dispatch => ({
  onShowMore: filters => {
    dispatch(fetchServerLogs(filters, true));
  },
  onSearch: filters => {
    dispatch(fetchServerLogs(filters));
  },
});

class ServerLogs extends React.Component {
  constructor(props) {
    super(props);
    const { history, match } = props;
    const { q } = queryString.parse(history.location.search);

    this.state = {
      filters: {
        endDate: Math.round(Date.now() / 1000) - 30,
        transId: q || match.params.id,
      },
    };
  }

  componentDidMount() {
    this.props.onSearch(this.state.filters);
  }

  onShowMore = nextPageToken => {
    this.props.onShowMore({ ...this.state.filters, nextPageToken });
  };

  onSearch = payload => {
    let newFilters = {};
    if (payload.default) {
      newFilters = { transId: payload.q };
    } else {
      newFilters = payload.values;
    }
    if (!newFilters.endDate) {
      newFilters.endDate = Math.round(Date.now() / 1000) - 30;
    }
    this.setState({ filters: newFilters });
    this.props.onSearch(newFilters);
  };

  render() {
    return (
      <ServerLogsStatelessComponent
        {...this.props}
        onShowMore={this.onShowMore}
        onSearch={this.onSearch}
      />
    );
  }
}

ServerLogs.propTypes = {
  ...ServerLogsStatelessComponent.propTypes,
};

export default connect(stateToProps, dispatchToProps, ServerLogs);
