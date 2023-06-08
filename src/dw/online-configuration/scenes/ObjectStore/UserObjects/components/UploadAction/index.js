import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { userObjectsLoadingSelector } from 'dw/online-configuration/scenes/ObjectStore/UserObjectsHOC/selectors';
import Icon from '@material-ui/core/Icon';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';

import ModalHandlers from 'dw/core/components/ModalHandlers';

import ModalForm from 'dw/core/components/ModalForm';
import AddFileForm from './components/AddFileForm';
import { FORM_NAME as ADD_FILE_FORM_NAME } from './components/AddFileForm/constants';

function UploadAction({
  isModalVisible,
  openModal,
  closeModal,
  onUploadFile,
  loading,
}) {
  return (
    <>
      <Tooltip title="Upload User Object" placement="bottom">
        <IconButton
          color="inherit"
          onClick={openModal}
          data-cy="objectStoreUserUploadButton"
        >
          <Icon>file_upload</Icon>
        </IconButton>
      </Tooltip>

      <ModalForm
        visible={isModalVisible}
        onCancel={closeModal}
        formName={ADD_FILE_FORM_NAME}
        FormComponent={AddFileForm}
        title="Upload File"
        submittingText="Uploading..."
        submitText="Upload"
        externalSubmit={onUploadFile}
        loading={loading}
      />
    </>
  );
}

UploadAction.propTypes = {
  isModalVisible: PropTypes.bool.isRequired,
  openModal: PropTypes.func.isRequired,
  closeModal: PropTypes.func.isRequired,
  onUploadFile: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
};

const stateToProps = state => ({
  isModalVisible: ModalHandlers.isVisibleSelector(state),
  loading: userObjectsLoadingSelector(state),
});

const dispatchToProps = dispatch => ({
  openModal: () => dispatch(ModalHandlers.open()),
  closeModal: () => dispatch(ModalHandlers.close()),
});

export default connect(stateToProps, dispatchToProps)(UploadAction);
