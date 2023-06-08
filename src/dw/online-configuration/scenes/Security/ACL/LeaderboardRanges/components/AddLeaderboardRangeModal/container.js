import { Component } from 'react';
import { connect } from 'react-redux';

import ModalHandlers from 'dw/core/components/ModalHandlers';

import AddLeaderboardRangeModalStateless from './presentational';

const stateToProps = state => ({
  submitting: ModalHandlers.submittingSelector(state),
});

class AddLeaderboardRangeModal extends Component {
  render() {
    return AddLeaderboardRangeModalStateless(this.props);
  }
}

export default connect(stateToProps)(AddLeaderboardRangeModal);
