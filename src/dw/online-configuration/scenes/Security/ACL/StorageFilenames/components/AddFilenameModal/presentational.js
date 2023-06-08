import React from 'react';
import PropTypes from 'prop-types';

import Button from '@material-ui/core/Button';
import Dialog from 'dw/core/components/Dialog';

import Form from '../AddFilenameForm';
import { ADD_FILENAME_MODAL_TITLE } from './constants';

const AddFilenameModalStateless = props => {
  const { visible, submitting, onCancel, onRemoteSubmit, onSubmit } = props;

  const footerButtons = [
    <Button key="cancel" onClick={onCancel}>
      Cancel
    </Button>,
    <Button key="primary" color="primary" focusRipple onClick={onRemoteSubmit}>
      {submitting ? 'Adding...' : 'Add'}
    </Button>,
  ];

  return (
    <div className="add-filename-modal">
      <Dialog
        title={ADD_FILENAME_MODAL_TITLE}
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
AddFilenameModalStateless.propTypes = {
  visible: PropTypes.bool.isRequired,
  submitting: PropTypes.bool.isRequired,
  onCancel: PropTypes.func.isRequired,
  onRemoteSubmit: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
};

export default AddFilenameModalStateless;
