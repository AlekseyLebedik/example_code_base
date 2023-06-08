import { Component } from 'react';
import { connect } from 'react-redux';

import ModalHandlers from 'dw/core/components/ModalHandlers';

import AddFunctionModalStateless from './presentational';

const stateToProps = state => ({
  submitting: ModalHandlers.submittingSelector(state),
});

class AddFunctionModal extends Component {
  render() {
    return AddFunctionModalStateless(this.props);
  }
}

export default connect(stateToProps)(AddFunctionModal);
