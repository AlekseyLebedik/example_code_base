import React, { Component } from 'react';
import { connect } from 'react-redux';

import { beat } from './actions';
import HealthCheckStateless from './presentational';
import { INTERVAL } from './constants';

class HealthCheck extends Component {
  componentDidMount() {
    if (process.env.NODE_ENV === 'production') {
      this.interval = setInterval(this.props.onLoad, INTERVAL);
    }
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  render() {
    return <HealthCheckStateless {...this.props} />;
  }
}

HealthCheck.propTypes = {
  ...HealthCheckStateless.propTypes,
};

const stateToProps = state => ({
  visible: state.Components.HealthCheck.visible,
});

const dispatchToProps = dispatch => ({
  onLoad: () => dispatch(beat()),
});

export default connect(stateToProps, dispatchToProps)(HealthCheck);
