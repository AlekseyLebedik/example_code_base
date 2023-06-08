import { Component } from 'react';
import { connect } from 'react-redux';

import AddFilenameModalStateless from './presentational';

const stateToProps = state => ({
  submitting:
    state.Scenes.Security.ACL.StorageFilenames.addFilenameModalSubmitting,
});

class AddFilenameModal extends Component {
  render() {
    return AddFilenameModalStateless(this.props);
  }
}

export default connect(stateToProps)(AddFilenameModal);
