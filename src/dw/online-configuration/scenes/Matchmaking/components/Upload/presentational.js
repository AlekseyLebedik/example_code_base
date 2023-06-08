import React from 'react';
import PropTypes from 'prop-types';

import Tooltip from '@material-ui/core/Tooltip';
import IconButton from '@material-ui/core/IconButton';
import Icon from '@material-ui/core/Icon';
import CircularProgress from '@material-ui/core/CircularProgress';

import ModalForm from 'dw/core/components/ModalForm';
import UploadForm from './components/Form';
import { FORM_NAME } from './constants';

const OpenModalButton = ({ onClick }) => (
  <Tooltip title="Upload Ruleset">
    <IconButton onClick={onClick}>
      <Icon>file_upload</Icon>
    </IconButton>
  </Tooltip>
);
OpenModalButton.propTypes = {
  onClick: PropTypes.func.isRequired,
};

const Upload = ({ uploadRuleset }) => (
  <ModalForm
    formName={FORM_NAME}
    FormComponent={UploadForm}
    OpenModalComponent={OpenModalButton}
    title="Upload Ruleset"
    submittingText={<CircularProgress size={20} />}
    submitText="Upload"
    dialogContentStyle={{ width: '500px' }}
    externalSubmit={uploadRuleset}
    form={FORM_NAME}
  />
);

Upload.propTypes = {
  uploadRuleset: PropTypes.func.isRequired,
};

export default Upload;
