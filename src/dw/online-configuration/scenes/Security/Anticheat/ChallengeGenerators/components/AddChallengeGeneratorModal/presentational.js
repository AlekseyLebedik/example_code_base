import React from 'react';
import PropTypes from 'prop-types';

import Button from '@material-ui/core/Button';
import Dialog from 'dw/core/components/Dialog';

import Form from '../AddChallengeGeneratorForm';
import { ADD_CHALLENGE_GENERATOR_MODAL_TITLE } from './constants';

const AddChallengeGeneratorModalStateless = props => {
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
    <Dialog
      className="common-modal-dialog add-challengeGenerator"
      title={ADD_CHALLENGE_GENERATOR_MODAL_TITLE}
      actions={footerButtons}
      modal
      open={visible}
      onRequestClose={onCancel}
    >
      <Form externalSubmit={onSubmit} />
    </Dialog>
  );
};
AddChallengeGeneratorModalStateless.propTypes = {
  visible: PropTypes.bool.isRequired,
  submitting: PropTypes.bool.isRequired,
  onCancel: PropTypes.func.isRequired,
  onRemoteSubmit: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
};

export default AddChallengeGeneratorModalStateless;
