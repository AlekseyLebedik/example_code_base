import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import ModalForm from 'dw/core/components/ModalForm';
import PasswordCheckForm from 'playpants/scenes/Event/components/Activities/components/ActivityDetails/components/ThunderpantsDetails/components/Forms/PasswordCheckForm';
import { THUNDERPANTS_PASSWORD_CHECK_FORM_NAME } from 'playpants/scenes/Event/components/Activities/components/ActivityDetails/components/ThunderpantsDetails/components/Forms/PasswordCheckForm/constants';
import { formTypeSelector } from 'playpants/scenes/Event/components/Activities/components/ActivityDetails/components/ThunderpantsDetails/selectors';

export const PasswordCheckModalFormBase = ({
  formType,
  handleSubmit,
  ...restProps
}) => {
  let displayProps = {};
  switch (formType) {
    case 'setLock':
      displayProps = {
        submitText: 'Set',
        submittingText: 'Setting...',
        title: 'Set a Password',
      };
      break;
    case 'unsetLock':
      displayProps = {
        submitText: 'Unset',
        submittingText: 'Unsetting...',
        title: 'Unset a Password',
      };
      break;
    default:
      displayProps = {
        submitText: 'Check',
        submittingText: 'Checking...',
        title: 'Enter Deployment Password',
      };
  }
  return (
    <ModalForm
      {...restProps}
      {...displayProps}
      cancelOnBackdropClick
      FormComponent={PasswordCheckForm}
      formName={THUNDERPANTS_PASSWORD_CHECK_FORM_NAME}
      fullWidth
      maxWidth="sm"
      onFormSubmit={handleSubmit}
      pristine={false}
      primaryButtonProps={{
        form: THUNDERPANTS_PASSWORD_CHECK_FORM_NAME,
        onClick: null,
        type: 'submit',
      }}
    />
  );
};

PasswordCheckModalFormBase.propTypes = {
  formType: PropTypes.string.isRequired,
  handleSubmit: PropTypes.func.isRequired,
};

const stateToProps = state => ({
  formType: formTypeSelector(state),
});

export default connect(stateToProps, null)(PasswordCheckModalFormBase);
