import React from 'react';
import PropTypes from 'prop-types';

import Button from '@material-ui/core/Button';
import Dialog from 'dw/core/components/Dialog';

import Form from '../AddQuotaAllowanceForm';
import { ADD_QUOTA_ALLOWANCE_MODAL_TITLE } from '../../constants';

const AddQuotaAllowanceFormModal = props => {
  const { visible, loading, onCancel, onRemoteSubmit, onSubmit } = props;

  const footerButtons = [
    <Button key="cancel" onClick={onCancel}>
      Cancel
    </Button>,
    <Button key="primary" color="primary" focusRipple onClick={onRemoteSubmit}>
      {loading ? 'Adding...' : 'Add'}
    </Button>,
  ];

  return (
    <div className="upload-listItem-modal quota-allowance">
      <Dialog
        title={ADD_QUOTA_ALLOWANCE_MODAL_TITLE}
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
AddQuotaAllowanceFormModal.propTypes = {
  visible: PropTypes.bool.isRequired,
  loading: PropTypes.bool,
  onCancel: PropTypes.func.isRequired,
  onRemoteSubmit: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
};
AddQuotaAllowanceFormModal.defaultProps = {
  loading: false,
};

export default AddQuotaAllowanceFormModal;
