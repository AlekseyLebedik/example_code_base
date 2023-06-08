import { Component } from 'react';
import { connect } from 'dw/core/helpers/component';

import ModalHandlers from 'dw/core/components/ModalHandlers';

import AddMonitoredUserModalStateless from './presentational';

const stateToProps = state => ({
  submitting: ModalHandlers.submittingSelector(state),
});

class AddMonitoredUserModal extends Component {
  render() {
    return AddMonitoredUserModalStateless(this.props);
  }
}

export default connect(stateToProps, null, AddMonitoredUserModal);
