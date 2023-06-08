import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import ModalForm from 'dw/core/components/ModalForm';
import ThunderpantsDeploymentForm from 'playpants/scenes/Event/components/Activities/components/ActivityDetails/components/ThunderpantsDetails/components/Forms/ThunderpantsDeploymentForm';
import { THUNDERPANTS_PARAMS_FORM_NAME } from 'playpants/scenes/Event/components/Activities/components/ActivityDetails/components/ThunderpantsDetails/components/Forms/ThunderpantsDeploymentForm/constants';
import { formTypeSelector } from 'playpants/scenes/Event/components/Activities/components/ActivityDetails/components/ThunderpantsDetails/selectors';

export const DeploymentModalFormBase = ({
  formType,
  handleSubmit,
  ...restProps
}) => {
  const isFormDeploymentType = formType === 'deploy';

  return (
    <ModalForm
      {...restProps}
      cancelOnBackdropClick
      dialogContentStyle={{ minHeight: '800px', display: 'grid' }}
      FormComponent={ThunderpantsDeploymentForm}
      formName={THUNDERPANTS_PARAMS_FORM_NAME}
      fullWidth
      isFormDeploymentType={isFormDeploymentType}
      onFormSubmit={handleSubmit}
      pristine={false}
      submitText={isFormDeploymentType ? 'Schedule' : 'Edit'}
      submittingText={isFormDeploymentType ? 'Scheduling...' : 'Editing...'}
      primaryButtonProps={{
        form: THUNDERPANTS_PARAMS_FORM_NAME,
        onClick: null,
        type: 'submit',
      }}
      title={isFormDeploymentType ? 'Deploy Build' : 'Edit Build'}
    />
  );
};

DeploymentModalFormBase.propTypes = {
  formType: PropTypes.string.isRequired,
  handleSubmit: PropTypes.func.isRequired,
};

const stateToProps = state => ({
  formType: formTypeSelector(state),
});

export default connect(stateToProps, null)(DeploymentModalFormBase);
