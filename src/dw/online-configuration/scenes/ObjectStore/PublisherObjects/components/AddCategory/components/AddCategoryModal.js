import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from 'dw/core/components/Dialog';

import Form from './AddCategoryForm';

const AddCategoryModal = props => {
  const {
    visible,
    submitting,
    onCancel,
    onRemoteSubmit,
    onSubmit,
    categories,
  } = props;

  const footerButtons = [
    <Button key="cancel" disabled={submitting} onClick={onCancel}>
      Cancel
    </Button>,
    <Button
      key="add"
      disabled={submitting}
      color="primary"
      focusRipple
      onClick={onRemoteSubmit}
    >
      {submitting ? 'Creating...' : 'Add'}
    </Button>,
  ];

  return (
    <div className="publisher-objects__add-category-modal">
      <Dialog
        title="Add Object Category"
        actions={footerButtons}
        modal
        open={visible}
        onRequestClose={onCancel}
        contentStyle={{ width: '500px' }}
      >
        <Form externalSubmit={onSubmit} categories={categories} />
      </Dialog>
    </div>
  );
};

export default AddCategoryModal;
