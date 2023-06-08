import React from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import Dialog from 'dw/core/components/Dialog';

import Form from '../PropagateStoreForm';

const PropagateFileModal = props => {
  const {
    storeLabel,
    visible,
    submitting,
    onCancel,
    onRemoteSubmit,
    onSubmit,
  } = props;

  const footerButtons = [
    <Button key="cancel" onClick={onCancel} disabled={submitting}>
      Cancel
    </Button>,
    <Button
      key="primary"
      color="primary"
      focusRipple
      onClick={onRemoteSubmit}
      disabled={submitting}
    >
      {submitting ? 'Propagating...' : 'Propagate Store'}
    </Button>,
  ];

  return (
    <div className="stores__stores-details__propagate-store-modal">
      <Dialog
        title="Propagate store"
        actions={footerButtons}
        modal
        open={visible}
        onRequestClose={onCancel}
        contentStyle={{ width: '450px' }}
      >
        <Form initialValues={{ label: storeLabel }} onSubmit={onSubmit} />
      </Dialog>
    </div>
  );
};

PropagateFileModal.propTypes = {
  storeLabel: PropTypes.string,
  visible: PropTypes.bool,
  submitting: PropTypes.bool,
  onCancel: PropTypes.func.isRequired,
  onRemoteSubmit: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
};

PropagateFileModal.defaultProps = {
  storeLabel: undefined,
  visible: false,
  submitting: false,
};

export default PropagateFileModal;
