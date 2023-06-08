import React from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';

import Dialog from 'dw/core/components/Dialog';

import Form from '../AddScriptForm';
import { UPLOAD_SCRIPT_MODAL_TITLE } from '../../constants';

const UploadScriptModal = props => {
  const { visible, loading, onCancel, onRemoteSubmit, onSubmit } = props;

  const footerButtons = [
    <Button key="cancel" onClick={onCancel}>
      Cancel
    </Button>,
    <Button key="primary" color="primary" focusRipple onClick={onRemoteSubmit}>
      {loading ? 'Uploading...' : 'Upload'}
    </Button>,
  ];

  return (
    <div className="upload-file-modal">
      <Dialog
        title={UPLOAD_SCRIPT_MODAL_TITLE}
        actions={footerButtons}
        modal
        open={visible}
        onRequestClose={onCancel}
        contentStyle={{ width: '500px' }}
      >
        <Form externalSubmit={onSubmit} />
      </Dialog>
    </div>
  );
};

UploadScriptModal.propTypes = {
  visible: PropTypes.bool,
  loading: PropTypes.bool,
  onCancel: PropTypes.func,
  onRemoteSubmit: PropTypes.func,
  onSubmit: PropTypes.func,
};

UploadScriptModal.defaultProps = {
  visible: false,
  loading: false,
  onCancel: () => {},
  onRemoteSubmit: () => {},
  onSubmit: () => {},
};

export default UploadScriptModal;
