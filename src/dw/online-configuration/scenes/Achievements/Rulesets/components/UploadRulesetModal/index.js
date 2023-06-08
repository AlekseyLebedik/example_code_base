import React from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';

import Button from '@material-ui/core/Button';
import Dialog from 'dw/core/components/Dialog';
import { uploadRulesetModalStateSelector } from 'dw/online-configuration/scenes/Achievements/Rulesets/selectors';
import Form from '../UploadRulesetForm';

const UploadFileModal = ({ onCancel, onRemoteSubmit, onSubmit }) => {
  const { visible, loading } = useSelector(uploadRulesetModalStateSelector);

  const footerButtons = [
    <Button key="cancel" onClick={onCancel}>
      Cancel
    </Button>,
    <Button key="primary" color="primary" focusRipple onClick={onRemoteSubmit}>
      {loading ? 'Uploading...' : 'Upload Ruleset'}
    </Button>,
  ];

  return (
    <div className="ruleset-details__tabs__user-files__upload-file-modal">
      <Dialog
        title="Upload Ruleset"
        actions={footerButtons}
        modal
        open={visible}
        onRequestClose={onCancel}
        contentStyle={{ width: '350px' }}
      >
        <Form onSubmit={onSubmit} />
      </Dialog>
    </div>
  );
};
UploadFileModal.propTypes = {
  onCancel: PropTypes.func.isRequired,
  onRemoteSubmit: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
};

export default UploadFileModal;
