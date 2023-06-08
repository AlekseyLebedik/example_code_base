import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from 'dw/core/components/Dialog';

import Form from '../AddFileForm';
import { UPLOAD_FILE_MODAL_TITLE } from '../../constants';

const UploadFileModal = props => {
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
        title={UPLOAD_FILE_MODAL_TITLE}
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

export default UploadFileModal;
