import React from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import Dialog from 'dw/core/components/Dialog';

const ModalForm = ({
  children,
  title,
  submitButtonText,
  visible,
  submitting,
  onCancel,
  onRemoteSubmit,
}) => {
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
    >
      {submitButtonText}
    </Button>,
  ];

  return (
    <Dialog
      className="common-modal-dialog add-challenge"
      title={title}
      actions={footerButtons}
      modal
      open={visible}
      onRequestClose={onCancel}
    >
      {children}
    </Dialog>
  );
};

ModalForm.propTypes = {
  title: PropTypes.string.isRequired,
  submitButtonText: PropTypes.string.isRequired,
  submitting: PropTypes.bool,
  visible: PropTypes.bool.isRequired,
  onCancel: PropTypes.func.isRequired,
  onRemoteSubmit: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired,
};

ModalForm.defaultProps = {
  submitting: false,
};

export default ModalForm;
