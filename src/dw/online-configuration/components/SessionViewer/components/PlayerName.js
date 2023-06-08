import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import CircularProgress from '@material-ui/core/CircularProgress';
import { playerNameSelector } from '../selectors';
import { loadDetails } from '../actions';

class PlayerName extends Component {
  static propTypes = {
    playerId: PropTypes.string.isRequired,
    playerName: PropTypes.string,
    loadDetails: PropTypes.func.isRequired,
  };

  static defaultProps = {
    playerName: undefined,
  };

  componentDidMount() {
    const { playerName, playerId } = this.props;
    if (playerName === undefined) {
      this.props.loadDetails([playerId]);
    }
  }

  render() {
    const { playerName } = this.props;
    return playerName ? (
      <span>{playerName}</span>
    ) : (
      <CircularProgress size={16} thickness={2} />
    );
  }
}

const stateToProps = (state, props) => ({
  playerName: playerNameSelector(state, props),
});

const dispatchToProps = {
  loadDetails,
};

export default connect(stateToProps, dispatchToProps)(PlayerName);
