import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { connect } from 'dw/core/helpers/component';

import { hide } from './actions';
import { isCriticalErrorVisible } from './selectors';
import CriticalErrorStateless from './presentational';

const stateToProps = state => ({
  isVisible: isCriticalErrorVisible(state),
  error: state.Core.CriticalError.error,
  retry: state.Core.CriticalError.retry,
});

const dispatchToProps = dispatch => ({
  handleHideCriticalError: () => dispatch(hide()),
});

const mergeProps = (stateProps, dispatchProps, ownProps) => ({
  ...ownProps,
  ...stateProps,
  ...dispatchProps,
  handleGoBack: () => {
    ownProps.history.goBack();
  },
  retry: () => {
    dispatchProps.handleHideCriticalError();
    if (stateProps.retry) {
      stateProps.retry();
    }
  },
});

class CriticalError extends Component {
  static propTypes = {
    handleHideCriticalError: PropTypes.func.isRequired,
    history: PropTypes.object.isRequired,
  };

  componentDidMount() {
    this.unlisten = this.props.history.listen(() => {
      this.props.handleHideCriticalError();
    });
  }

  componentWillUnmount() {
    this.props.handleHideCriticalError();
    this.unlisten();
  }

  render() {
    return <CriticalErrorStateless {...this.props} />;
  }
}

export default connect(
  stateToProps,
  dispatchToProps,
  CriticalError,
  mergeProps
);
