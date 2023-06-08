import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from 'dw/core/components/Dialog';
import AddFileForm from './AddFileForm';

const UploadFileModal = props => {
  const { visible, submitting, onCancel, onRemoteSubmit, onSubmit } = props;

  const footerButtons = [
    <Button key="cancel" disabled={submitting} onClick={onCancel}>
      Cancel
    </Button>,
    <Button
      key="upload"
      disabled={submitting}
      color="primary"
      focusRipple
      onClick={onRemoteSubmit}
    >
      {submitting ? 'Uploading...' : 'Upload'}
    </Button>,
  ];

  return (
    <div className="user-objects__upload-file-modal">
      <Dialog
        title="Upload File"
        actions={footerButtons}
        modal
        open={visible}
        onRequestClose={onCancel}
        contentStyle={{ width: '500px' }}
      >
        <AddFileForm externalSubmit={onSubmit} />
      </Dialog>
    </div>
  );
};

export default UploadFileModal;
