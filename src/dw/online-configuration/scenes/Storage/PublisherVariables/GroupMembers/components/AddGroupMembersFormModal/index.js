import React from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import Dialog from 'dw/core/components/Dialog';

import AddGroupMemberForm from '../AddGroupMembersForm';
import { ADD_GROUP_MEMBERS_MODAL_TITLE, FORM_NAME } from '../../constants';

const AddGroupMembersFormModal = props => {
  const {
    visible,
    submitting,
    onCancel,
    onRemoteSubmit,
    onSubmit,
    initialValues,
    formNameSuffix,
  } = props;

  const footerButtons = [
    <Button key="cancel" onClick={onCancel}>
      Cancel
    </Button>,
    <Button key="add" color="primary" focusRipple onClick={onRemoteSubmit}>
      {submitting ? 'Adding...' : 'Add'}
    </Button>,
  ];
  const formName = `${FORM_NAME}${formNameSuffix || ''}`;

  return (
    <Dialog
      title={ADD_GROUP_MEMBERS_MODAL_TITLE}
      actions={footerButtons}
      modal
      open={visible}
      onRequestClose={onCancel}
      contentStyle={{ width: '500px' }}
    >
      <AddGroupMemberForm
        form={formName}
        formName={formName}
        initialValues={initialValues}
        externalSubmit={onSubmit}
      />
    </Dialog>
  );
};
AddGroupMembersFormModal.propTypes = {
  visible: PropTypes.bool,
  submitting: PropTypes.bool,
  onCancel: PropTypes.func.isRequired,
  onRemoteSubmit: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  initialValues: PropTypes.object,
  formNameSuffix: PropTypes.string,
};
AddGroupMembersFormModal.defaultProps = {
  visible: false,
  submitting: false,
  formNameSuffix: '',
  initialValues: {},
};

export default AddGroupMembersFormModal;
