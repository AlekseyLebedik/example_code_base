import React, { Component } from 'react';
import { connect } from 'dw/core/helpers/component';

import ModalHandlers from 'dw/core/components/ModalHandlers';

import PropagateVariablesSetModalStateless from './presentational';

const stateToProps = state => ({
  submitting: ModalHandlers.submittingSelector(state),
});

class PropagateVariablesSetModal extends Component {
  state = {
    isAllowed: false,
  };

  setAllowed = event => this.setState({ isAllowed: event.target.checked });

  render() {
    const { isAllowed } = this.state;
    const newProps = {
      ...this.props,
      isAllowed,
      setAllowed: this.setAllowed,
    };
    return <PropagateVariablesSetModalStateless {...newProps} />;
  }
}

export default connect(stateToProps, null, PropagateVariablesSetModal);
