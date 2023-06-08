import { Component } from 'react';
import { connect } from 'react-redux';

import ModalHandlers from 'dw/core/components/ModalHandlers';

import AddChallengeGeneratorModalStateless from './presentational';

const stateToProps = state => ({
  submitting: ModalHandlers.submittingSelector(state),
});

class AddChallengeGeneratorModal extends Component {
  render() {
    return AddChallengeGeneratorModalStateless(this.props);
  }
}

export default connect(stateToProps)(AddChallengeGeneratorModal);
