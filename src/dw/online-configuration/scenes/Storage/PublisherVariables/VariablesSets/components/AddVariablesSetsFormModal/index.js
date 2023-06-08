import React from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import Dialog from 'dw/core/components/Dialog';

import AddVariablesSetForm from '../AddVariablesSetsForm';
import { ADD_VARIABLES_SETS_MODAL_TITLE } from '../../constants';

const AddVariablesSetsFormModal = props => {
  const { visible, submitting, onCancel, onRemoteSubmit, onSubmit } = props;

  const footerButtons = [
    <Button key="cancel" onClick={onCancel}>
      Cancel
    </Button>,
    <Button key="add" color="primary" focusRipple onClick={onRemoteSubmit}>
      {submitting ? 'Adding...' : 'Add'}
    </Button>,
  ];

  return (
    <div className="upload-listItem-modal variables-sets">
      <Dialog
        title={ADD_VARIABLES_SETS_MODAL_TITLE}
        actions={footerButtons}
        modal
        open={visible}
        onRequestClose={onCancel}
        contentStyle={{ width: '500px' }}
        bodyClassName="variables-sets__modal-body"
      >
        <AddVariablesSetForm externalSubmit={onSubmit} />
      </Dialog>
    </div>
  );
};
AddVariablesSetsFormModal.propTypes = {
  visible: PropTypes.bool,
  submitting: PropTypes.bool,
  onCancel: PropTypes.func.isRequired,
  onRemoteSubmit: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
};
AddVariablesSetsFormModal.defaultProps = {
  visible: false,
  submitting: false,
};

export default AddVariablesSetsFormModal;
