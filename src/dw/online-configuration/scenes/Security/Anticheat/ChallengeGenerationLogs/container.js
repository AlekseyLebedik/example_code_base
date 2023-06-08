import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { hasData } from 'dw/core/helpers/object';
import { timezoneOrDefaultSelector as timezoneSelector } from 'dw/core/helpers/date-time';
import * as Actions from './actions';
import { challengeGenerationLogsSelector } from './selectors';
import ChallengeGenerationLogsStatelessComponent from './presentational';

const stateToProps = state => ({
  challengeGenerationLogs: challengeGenerationLogsSelector(state),
  nextPageToken:
    state.Scenes.Security.Anticheat.ChallengeGenerationLogs.nextPageToken,
  filteringEnabled:
    state.Scenes.Security.Anticheat.ChallengeGenerationLogs.filteringEnabled,
  q: state.Scenes.Security.Anticheat.ChallengeGenerationLogs.q,
  order: state.Scenes.Security.Anticheat.ChallengeGenerationLogs.order,
  timezone: timezoneSelector(state),
});

const dispatchToProps = dispatch => ({
  onSearch: (props = {}, append = false) =>
    dispatch(Actions.fetchChallengeGenerationLogs(props, append)),
  onSearchParamsChange: q => dispatch(Actions.onSearchParamsChange(q)),
  onOrderChange: order => dispatch(Actions.onOrderChange(order)),
});

const initialState = ({ q, order }) => ({
  q,
  order,
});

class ChallengeGenerationLogs extends React.Component {
  static propTypes = {
    q: PropTypes.object,
    order: PropTypes.string,
    onSearch: PropTypes.func.isRequired,
    nextPageToken: PropTypes.string,
  };

  static defaultProps = {
    nextPageToken: null,
    order: null,
    q: {},
  };

  state = initialState(this.props);

  static getDerivedStateFromProps(nextProps, prevState) {
    const newState = {};
    if (nextProps.q !== prevState.q) {
      newState.q = nextProps.q;
    }
    if (nextProps.order !== prevState.order) {
      newState.order = nextProps.order;
    }
    if (hasData(newState)) {
      nextProps.onSearch({ q: nextProps.q, order: nextProps.order });
      return newState;
    }
    return null;
  }

  componentDidMount() {
    this.props.onSearch(this.state);
  }

  onShowMore = () => {
    this.props.onSearch(
      { nextPageToken: this.props.nextPageToken, ...this.state },
      true
    );
  };

  render() {
    return ChallengeGenerationLogsStatelessComponent({
      ...this.props,
      onShowMore: this.onShowMore,
    });
  }
}

export default connect(stateToProps, dispatchToProps)(ChallengeGenerationLogs);
