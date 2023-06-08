import React from 'react';

import PropTypes from 'prop-types';
import ModalForm from 'dw/core/components/ModalForm';
import Tooltip from '@material-ui/core/Tooltip';
import Icon from '@material-ui/core/Icon';
import IconButton from '@material-ui/core/IconButton';
import UploadStringSetForm from './presentational';

const UploadStringSet = ({
  context,
  stringSetName,
  setUpload,
  visible,
  setOpen,
}) => {
  const ADD_STRING_SET = 'add-string-set-form';
  const addStringSetsButton = () => (
    <Tooltip title="Upload String Set" placement="bottom">
      <IconButton
        onClick={() => {
          setOpen(true);
        }}
        data-cy="upload-string-set-button"
      >
        <Icon color="primary">upload</Icon>
      </IconButton>
    </Tooltip>
  );
  return (
    <ModalForm
      formName={ADD_STRING_SET}
      FormComponent={UploadStringSetForm}
      OpenModalComponent={addStringSetsButton}
      title="Upload String Set"
      submittingText="Uploading..."
      submitText="Upload"
      disableEnforceFocus
      context={context}
      stringSetName={stringSetName}
      visible={visible}
      setOpen={setOpen}
      setUpload={setUpload}
    />
  );
};

UploadStringSet.propTypes = {
  context: PropTypes.string.isRequired,
  stringSetName: PropTypes.string.isRequired,
  setUpload: PropTypes.func.isRequired,
  visible: PropTypes.bool.isRequired,
  setOpen: PropTypes.func.isRequired,
};

export default UploadStringSet;
