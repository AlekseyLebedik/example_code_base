import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import ModalForm from 'dw/core/components/ModalForm';
import ConfirmActionForm from 'playpants/scenes/Event/components/Activities/components/ActivityDetails/components/ThunderpantsDetails/components/Forms/ConfirmActionForm';
import { THUNDERPANTS_CONFIRM_ACTION_FORM_NAME } from 'playpants/scenes/Event/components/Activities/components/ActivityDetails/components/ThunderpantsDetails/components/Forms/ConfirmActionForm/constants';
import { formTypeSelector } from 'playpants/scenes/Event/components/Activities/components/ActivityDetails/components/ThunderpantsDetails/selectors';

export const ConfirmActionModalFormBase = ({ formType, handleSubmit }) => {
  let displayProps = {};
  switch (formType) {
    case 'undeploy':
      displayProps = {
        submitText: 'Undeploy',
        submittingText: 'Undeploying...',
        title: 'Confirm Build Undeployment',
      };
      break;
    case 'clear':
      displayProps = {
        submitText: 'Clear',
        submittingText: 'Clearing...',
        title: 'Confirm Build Clear',
      };
      break;
    default:
  }
  return (
    <ModalForm
      {...displayProps}
      cancelOnBackdropClick
      FormComponent={ConfirmActionForm}
      formName={THUNDERPANTS_CONFIRM_ACTION_FORM_NAME}
      onFormSubmit={handleSubmit}
      pristine={false}
      primaryButtonProps={{
        form: THUNDERPANTS_CONFIRM_ACTION_FORM_NAME,
        onClick: null,
        type: 'submit',
      }}
    />
  );
};

ConfirmActionModalFormBase.propTypes = {
  formType: PropTypes.string.isRequired,
  handleSubmit: PropTypes.func.isRequired,
};

const stateToProps = state => ({
  formType: formTypeSelector(state),
});

export default connect(stateToProps, null)(ConfirmActionModalFormBase);
