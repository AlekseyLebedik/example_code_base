import { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'dw/core/helpers/component';
import { hasData } from 'dw/core/helpers/object';

import * as Actions from './actions';
import * as filterActions from '../../actions';
import { anticheatStatisticsSelector } from './selectors';
import * as filterSelectors from '../../selectors';
import AnticheatStatisticsStatelessComponent from './presentational';

const stateToProps = state => ({
  anticheatStatistics: anticheatStatisticsSelector(state),
  nextPageToken:
    state.Scenes.Security.Anticheat.AnticheatStatistics.ByUser.nextPageToken,
  challengeId: filterSelectors.challengeIdSelector(state),
  date: filterSelectors.dateSelector(state),
});

const dispatchToProps = dispatch => ({
  onSearch: (params, append) =>
    dispatch(Actions.fetchAnticheatStatistics(params, append)),
  changeChallengeId: challengeId =>
    dispatch(filterActions.changeChallengeId(challengeId)),
  changeDate: date => dispatch(filterActions.changeDate(date)),
});

const initialState = ({ challengeId, date }) => ({
  challengeId,
  date,
});

class AnticheatStatistics extends Component {
  state = initialState(this.props);

  static getDerivedStateFromProps(nextProps, prevState) {
    const newState = {};
    if (nextProps.date !== prevState.date) {
      newState.date = nextProps.date;
    }
    if (nextProps.challengeId !== prevState.challengeId) {
      newState.challengeId = nextProps.challengeId;
    }
    if (hasData(newState)) {
      return newState;
    }
    return null;
  }

  componentDidMount() {
    this.onSearch();
  }

  onShowMore = () => {
    this.onSearch({ nextPageToken: this.props.nextPageToken });
  };

  onSearch = (props = {}) => {
    const { nextPageToken } = props;
    const { challengeId, date } = this.state;
    if (challengeId === null) return;
    const append = !!nextPageToken;
    const params = {
      nextPageToken,
      challengeId,
      date,
    };
    this.props.onSearch(params, append);
  };

  render() {
    return AnticheatStatisticsStatelessComponent({
      ...this.props,
      ...this.state,
      onShowMore: this.onShowMore,
      onSearch: this.onSearch,
    });
  }
}

AnticheatStatistics.propTypes = {
  challengeId: PropTypes.string.isRequired,
  date: PropTypes.object.isRequired,
  onSearch: PropTypes.func.isRequired,
  nextPageToken: PropTypes.string,
};

AnticheatStatistics.defaultProps = {
  nextPageToken: null,
};

export default connect(stateToProps, dispatchToProps, AnticheatStatistics);
