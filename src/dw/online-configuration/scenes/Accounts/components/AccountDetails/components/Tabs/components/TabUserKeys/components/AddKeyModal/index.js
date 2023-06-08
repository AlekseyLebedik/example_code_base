import React from 'react';
import PropTypes from 'prop-types';

import Button from '@material-ui/core/Button';
import Dialog from 'dw/core/components/Dialog';

import AddKeyForm from '../AddKeyForm';

const AddKeyModal = props => {
  const { visible, loading, title, onCancel, onRemoteSubmit, onSubmit } = props;

  const footerButtons = [
    <Button key="cancel" onClick={onCancel}>
      Cancel
    </Button>,
    <Button key="save" color="primary" focusRipple onClick={onRemoteSubmit}>
      {loading ? 'Saving...' : 'Save'}
    </Button>,
  ];

  return (
    <div className="account-details__tabs__user-keys__add-key-modal">
      <Dialog
        title={title}
        actions={footerButtons}
        modal
        open={visible}
        onRequestClose={onCancel}
        contentStyle={{ width: '500px' }}
      >
        <AddKeyForm onSubmit={onSubmit} />
      </Dialog>
    </div>
  );
};
AddKeyModal.propTypes = {
  title: PropTypes.string.isRequired,
  visible: PropTypes.bool.isRequired,
  loading: PropTypes.bool.isRequired,
  onCancel: PropTypes.func.isRequired,
  onRemoteSubmit: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
};

export default AddKeyModal;
