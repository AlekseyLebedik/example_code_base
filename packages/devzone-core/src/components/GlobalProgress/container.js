import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from '../../AppStore';

import GlobalProgressStateless from './presentational';
import * as C from './constants';

const INITIAL_STATE = {
  percent: 0,
  status: C.STATUS_ENUM.HIDDEN,
};

export class GlobalProgressBase extends Component {
  static propTypes = {
    // eslint-disable-next-line
    loading: PropTypes.number,
    maxProgress: PropTypes.number,
    progressIncrease: PropTypes.number,
    showFastActions: PropTypes.bool,
    updateTime: PropTypes.number,
  };

  static defaultProps = {
    loading: 0,
    maxProgress: C.MAX_PROGRESS,
    progressIncrease: C.PROGRESS_INCREASE,
    showFastActions: false,
    updateTime: C.UPDATE_TIME,
  };

  static shouldStart(props, state) {
    return (
      props.loading > 0 &&
      [C.STATUS_ENUM.HIDDEN, C.STATUS_ENUM.STOPPING].includes(state.status)
    );
  }

  static shouldStop(props, state) {
    return (
      props.loading === 0 &&
      [C.STATUS_ENUM.STARTING, C.STATUS_ENUM.RUNNING].includes(state.status)
    );
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    if (GlobalProgressBase.shouldStart(nextProps, prevState)) {
      return { status: C.STATUS_ENUM.STARTING };
    }

    if (GlobalProgressBase.shouldStop(nextProps, prevState)) {
      return { status: C.STATUS_ENUM.STOPPING };
    }

    return null;
  }

  state = INITIAL_STATE;

  componentDidMount() {
    if (this.state.status === C.STATUS_ENUM.STARTING) {
      this.start();
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.status !== this.state.status) {
      if (this.state.status === C.STATUS_ENUM.STARTING) {
        this.start();
      }

      if (this.state.status === C.STATUS_ENUM.STOPPING) {
        this.stop();
      }
    }
  }

  componentWillUnmount() {
    clearInterval(this.progressIntervalId);
    clearInterval(this.terminatingAnimationTimeoutId);
  }

  simulateProgress = () => {
    this.setState((prevState, { maxProgress, progressIncrease }) => {
      let { percent } = prevState;
      const newPercent = this.newPercent(percent, progressIncrease);

      if (newPercent <= maxProgress) {
        percent = newPercent;
      } else {
        percent = maxProgress;
      }

      return { percent };
    });
  };

  newPercent = (percent, progressIncrease) => {
    // Use cosine as a smoothing function
    // It could be any function to slow down progress near the ending 100%
    const smoothedProgressIncrease =
      progressIncrease * Math.cos(percent * (Math.PI / 2 / 100));

    return percent + smoothedProgressIncrease;
  };

  reset = (percent, maxProgress) => {
    if (percent >= maxProgress) {
      clearInterval(this.terminatingAnimationIntervalId);
      this.terminatingAnimationIntervalId = null;
      this.setState(INITIAL_STATE);
    } else {
      this.simulateProgress();
    }
  };

  start() {
    this.progressIntervalId = setInterval(
      this.simulateProgress,
      this.props.updateTime
    );
    this.setState({ status: C.STATUS_ENUM.RUNNING });
  }

  stop() {
    clearInterval(this.progressIntervalId);
    this.progressIntervalId = null;

    const terminatingAnimationDuration =
      this.isShown() || this.props.showFastActions
        ? C.TERMINATING_ANIMATION_DURATION
        : 0;

    this.terminatingAnimationIntervalId = setInterval(
      () => this.reset(this.state.percent, this.props.maxProgress),
      terminatingAnimationDuration
    );
  }

  isShown() {
    return (
      this.state.percent > 0 && this.state.percent < this.props.maxProgress
    );
  }

  render() {
    if (this.state.status === C.STATUS_ENUM.HIDDEN) {
      return null;
    }

    const animationDuration =
      this.state.status === C.STATUS_ENUM.STOPPING
        ? C.TERMINATING_ANIMATION_DURATION
        : C.ANIMATION_DURATION;

    return (
      <GlobalProgressStateless
        animationDuration={animationDuration}
        isShown={this.isShown()}
        percent={this.state.percent}
      />
    );
  }
}

const mapStateToProps = state => ({
  loading: state.Core.GlobalProgress.loading,
});

export default connect(mapStateToProps)(GlobalProgressBase);
