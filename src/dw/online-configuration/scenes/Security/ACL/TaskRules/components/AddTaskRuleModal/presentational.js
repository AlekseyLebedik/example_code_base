import React from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import Dialog from 'dw/core/components/Dialog';

import AddTaskRuleForm from '../AddTaskRuleForm';

const AddTaskRuleModal = props => {
  const { visible, submitting, onCancel, onSubmit } = props;

  const footerButtons = [
    <Button key="cancel" onClick={onCancel} disabled={submitting}>
      Cancel
    </Button>,
    <Button
      key="primary"
      color="primary"
      focusRipple
      onClick={onSubmit}
      disabled={submitting}
    >
      {submitting ? 'Adding...' : 'Add'}
    </Button>,
  ];

  return (
    <div className="add-modal task-rule">
      <Dialog
        title="Add Task Rule"
        actions={footerButtons}
        modal
        open={visible}
        onRequestClose={onCancel}
        contentStyle={{ width: '500px' }}
      >
        <AddTaskRuleForm {...props} externalSubmit={onSubmit} />
      </Dialog>
    </div>
  );
};

AddTaskRuleModal.propTypes = {
  visible: PropTypes.bool.isRequired,
  submitting: PropTypes.bool.isRequired,
  onCancel: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
};

export default AddTaskRuleModal;
