import React from 'react';
import PropTypes from 'prop-types';

import Button from '@material-ui/core/Button';
import Dialog from 'dw/core/components/Dialog';

import Form from '../AddQuotaUsageForm';
import { ADD_QUOTA_USAGE_MODAL_TITLE } from '../../constants';

const AddQuotaUsageFormModal = props => {
  const { visible, loading, onCancel, onRemoteSubmit, onSubmit } = props;

  const footerButtons = [
    <Button key="cancel" onClick={onCancel}>
      Cancel
    </Button>,
    <Button key="add" color="primary" focusRipple onClick={onRemoteSubmit}>
      {loading ? 'Adding...' : 'Add'}
    </Button>,
  ];

  return (
    <div className="upload-listItem-modal quota-usage">
      <Dialog
        title={ADD_QUOTA_USAGE_MODAL_TITLE}
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
AddQuotaUsageFormModal.propTypes = {
  visible: PropTypes.bool.isRequired,
  onCancel: PropTypes.func.isRequired,
  onRemoteSubmit: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  loading: PropTypes.bool,
};
AddQuotaUsageFormModal.defaultProps = {
  loading: false,
};

export default AddQuotaUsageFormModal;
