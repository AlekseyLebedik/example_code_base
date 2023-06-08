import React from 'react';
import PropTypes from 'prop-types';

import ModalForm from 'dw/core/components/ModalForm';
import { OpenModalButton } from 'dw/core/components/ModalForm/components';
import AddFileForm from './components/AddFileForm';

import { FORM_NAME as ADD_FILE_FORM_NAME } from './components/AddFileForm/constants';

const uploadButton = props => (
  <OpenModalButton
    title="Upload Publisher Object"
    placement="bottom"
    icon="file_upload"
    iconButtonProps={{ color: 'inherit' }}
    data-cy="objectStoreUploadButton"
    {...props}
  />
);

function UploadAction({ onUploadFile, groups, categories, selectedGroup }) {
  return (
    <ModalForm
      formName={ADD_FILE_FORM_NAME}
      FormComponent={AddFileForm}
      OpenModalComponent={uploadButton}
      title="Upload File"
      submittingText="Uploading..."
      submitText="Upload"
      externalSubmit={onUploadFile}
      groups={groups}
      categories={categories}
      selectedGroup={selectedGroup}
      disableEnforceFocus
    />
  );
}

UploadAction.propTypes = {
  onUploadFile: PropTypes.func,
  groups: PropTypes.arrayOf(PropTypes.object),
  categories: PropTypes.arrayOf(PropTypes.string),
  selectedGroup: PropTypes.object,
};

UploadAction.defaultProps = {
  onUploadFile: () => {},
  groups: undefined,
  categories: [],
  selectedGroup: null,
};

export default UploadAction;
