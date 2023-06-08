import React from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';
import Dialog from 'dw/core/components/Dialog';

import Form from './Form';

import styles from './upload.module.css';

const RulesetUploadModal = props => {
  const { visible, submitting, onCancel, onSubmit, onRemoteSubmit, form } =
    props;

  const footerButtons = [
    <Button key="cancel" onClick={onCancel}>
      Cancel
    </Button>,
    <Button
      key="primary"
      color="primary"
      focusRipple
      onClick={onRemoteSubmit}
      disabled={submitting}
      className={styles.uploadButton}
    >
      {submitting ? <CircularProgress size={20} /> : 'Upload'}
    </Button>,
  ];

  return (
    <Dialog
      title="Upload Ruleset"
      actions={footerButtons}
      modal
      open={visible}
      onRequestClose={onCancel}
      contentStyle={{ width: '500px' }}
    >
      <Form externalSubmit={onSubmit} form={form} />
    </Dialog>
  );
};

RulesetUploadModal.propTypes = {
  visible: PropTypes.bool.isRequired,
  submitting: PropTypes.bool,
  onCancel: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  onRemoteSubmit: PropTypes.func.isRequired,
  form: PropTypes.string.isRequired,
};
RulesetUploadModal.defaultProps = {
  submitting: false,
};

export default RulesetUploadModal;
