import React from 'react';
import PropTypes from 'prop-types';

import Button from '@material-ui/core/Button';
import Dialog from 'dw/core/components/Dialog';

const CreateGroupModal = props => {
  const {
    visible,
    loading,
    pristine,
    onCancel,
    onRemoteSubmit,
    onSubmit,
    fullWidth,
    maxWidth,
    Component,
    cancelOnBackdropClick,
  } = props;

  const footerButtons = [
    <Button key="cancel" onClick={onCancel}>
      Cancel
    </Button>,
    <Button
      key="primary"
      color="primary"
      disabled={loading || pristine}
      focusRipple
      onClick={onRemoteSubmit}
    >
      {loading ? 'Creating...' : 'Create Group'}
    </Button>,
  ];

  return (
    <div>
      <Dialog
        title="Create Group"
        actions={footerButtons}
        modal
        open={visible}
        onRequestClose={onCancel}
        fullWidth={fullWidth}
        maxWidth={maxWidth}
        cancelOnBackdropClick={cancelOnBackdropClick}
      >
        <Component onSubmit={onSubmit} />
      </Dialog>
    </div>
  );
};

CreateGroupModal.propTypes = {
  visible: PropTypes.bool.isRequired,
  loading: PropTypes.bool.isRequired,
  pristine: PropTypes.bool.isRequired,
  onCancel: PropTypes.func.isRequired,
  onRemoteSubmit: PropTypes.func.isRequired,
  onSubmit: PropTypes.func,
  fullWidth: PropTypes.bool,
  maxWidth: PropTypes.string,
  Component: PropTypes.elementType.isRequired,
  cancelOnBackdropClick: PropTypes.bool,
};

CreateGroupModal.defaultProps = {
  onSubmit: null,
  fullWidth: false,
  maxWidth: null,
  cancelOnBackdropClick: false,
};

export default CreateGroupModal;
