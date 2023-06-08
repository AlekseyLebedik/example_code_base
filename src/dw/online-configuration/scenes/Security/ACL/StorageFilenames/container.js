import React from 'react';
import PropTypes from 'prop-types';
import { submit } from 'redux-form';
import { selectedRowKeysSelector } from 'dw/core/components/TableHydrated';

import { connect } from 'dw/core/helpers/component';

import {
  fetchStorageFilenames,
  addStorageFilename,
  deleteStorageFilename,
  openAddFilenameModal,
  closeAddFilenameModal,
} from './actions';
import StorageFilenamesStatelessComponent from './presentational';
import { FORM_NAME as AddFilenameFormName } from './components/AddFilenameForm/constants';

const makeStateToProps = state => ({
  storageFilenames: state.Scenes.Security.ACL.StorageFilenames.storageFilenames,
  addFilenameModalVisible:
    state.Scenes.Security.ACL.StorageFilenames.addFilenameModalVisible,
  selectedRowKeys: selectedRowKeysSelector(state),
});

const dispatchToProps = dispatch => ({
  onLoad: () => dispatch(fetchStorageFilenames()),
  addOnRemoteSubmit: () => dispatch(submit(AddFilenameFormName)),
  onAddFilenameHandler: values => dispatch(addStorageFilename(values)),
  deleteFilename: filenameIds => dispatch(deleteStorageFilename(filenameIds)),
  openAddFilenameModalHandler: () => dispatch(openAddFilenameModal()),
  closeAddFilenameModalHandler: () => dispatch(closeAddFilenameModal()),
});

class StorageFilenames extends React.Component {
  componentDidMount() {
    const { onLoad } = this.props;

    onLoad();
  }

  render() {
    return (
      <StorageFilenamesStatelessComponent
        addFilenameModalProps={{
          addFilenameModalVisible: this.props.addFilenameModalVisible,
          openAddFilenameModalHandler: this.props.openAddFilenameModalHandler,
          closeAddFilenameModalHandler: this.props.closeAddFilenameModalHandler,
          addOnRemoteSubmit: this.props.addOnRemoteSubmit,
          onAddFilenameHandler: this.props.onAddFilenameHandler,
        }}
        reduxProps={{
          storageFilenames: this.props.storageFilenames,
          deleteFilename: this.props.deleteFilename,
          selectedRowKeys: this.props.selectedRowKeys,
        }}
      />
    );
  }
}

StorageFilenames.propTypes = {
  addFilenameModalVisible: PropTypes.bool,
  onLoad: PropTypes.func.isRequired,
  openAddFilenameModalHandler: PropTypes.func.isRequired,
  closeAddFilenameModalHandler: PropTypes.func.isRequired,
  addOnRemoteSubmit: PropTypes.func.isRequired,
  onAddFilenameHandler: PropTypes.func.isRequired,
  storageFilenames: PropTypes.arrayOf(
    PropTypes.oneOfType([PropTypes.object, PropTypes.string])
  ),
  deleteFilename: PropTypes.func,
  selectedRowKeys: PropTypes.arrayOf(PropTypes.string),
};
StorageFilenames.defaultProps = {
  addFilenameModalVisible: false,
  storageFilenames: [],
  deleteFilename: () => {},
  selectedRowKeys: [],
};

export default connect(makeStateToProps, dispatchToProps, StorageFilenames);
