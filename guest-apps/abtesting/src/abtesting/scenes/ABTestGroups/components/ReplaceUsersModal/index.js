import React from 'react';
import PropTypes from 'prop-types';

import Button from '@material-ui/core/Button';
import Dialog from 'dw/core/components/Dialog';

import Form from '../ReplaceUsersForm';

const ReplaceUsersModal = props => {
  const { visible, loading, pristine, onCancel, onRemoteSubmit, onSubmit } =
    props;

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
      {loading ? 'Replacing...' : 'Replace Users'}
    </Button>,
  ];

  return (
    <div>
      <Dialog
        title="Replace Users"
        actions={footerButtons}
        modal
        open={visible}
        fullWidth
        maxWidth="md"
        onRequestClose={onCancel}
      >
        <Form onSubmit={onSubmit} />
      </Dialog>
    </div>
  );
};

ReplaceUsersModal.propTypes = {
  visible: PropTypes.bool.isRequired,
  loading: PropTypes.bool.isRequired,
  pristine: PropTypes.bool.isRequired,
  onCancel: PropTypes.func.isRequired,
  onRemoteSubmit: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
};

ReplaceUsersModal.defaultProps = {};

export default ReplaceUsersModal;
