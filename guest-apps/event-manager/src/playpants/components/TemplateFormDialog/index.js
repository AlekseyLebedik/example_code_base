import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'dw/core/helpers/component';
import { reduxForm, reset, formValueSelector } from 'redux-form';
import ModalForm from 'dw/core/components/ModalForm';
import ModalHandlers from 'dw/core/components/ModalHandlers';
import { OpenModalButton } from 'dw/core/components/ModalForm/components';
import { ENV_TYPES } from 'playpants/scenes/Templates/constants';
import TemplateForm from './components/TemplateForm';
import { TEMPLATE_FORM_NAME } from './constants';
import * as actions from './actions';

const TemplateFormDialog = ({
  action,
  form,
  handleSubmit,
  icon,
  initialValues,
  onCancel,
  onCreateTemplate,
  onPatchTemplate,
  onSaveAsTemplate,
  title,
  ...props
}) => {
  const submitTypes = {
    save: onSaveAsTemplate,
    create: onCreateTemplate,
    patch: onPatchTemplate,
  };
  const onSubmit = submitTypes[action];
  return (
    <ModalForm
      {...props}
      action={action}
      FormComponent={TemplateForm}
      formName={form}
      initialValues={initialValues}
      onCancel={() => onCancel(form)}
      onRemoteSubmit={handleSubmit(onSubmit)}
      onSubmit={handleSubmit(onSubmit)}
      OpenModalComponent={componentProps => (
        <OpenModalButton
          data-cy="open-template-dialog-button"
          title={title}
          icon={icon}
          {...componentProps}
        />
      )}
      maxWidth="sm"
      title={title}
      pristine={false}
      cancelOnBackdropClick
    />
  );
};

TemplateFormDialog.propTypes = {
  action: PropTypes.string.isRequired,
  baseUrl: PropTypes.string,
  form: PropTypes.string.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  icon: PropTypes.string.isRequired,
  initialValues: PropTypes.object.isRequired,
  onCancel: PropTypes.func.isRequired,
  onCreateTemplate: PropTypes.func.isRequired,
  onPatchTemplate: PropTypes.func.isRequired,
  onSaveAsTemplate: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
};
TemplateFormDialog.defaultProps = { baseUrl: '' };

const mapStateToProps = (state, { form }) => ({
  hasEndDate: formValueSelector(form)(state, 'hasEndDate'),
  isSchedule: formValueSelector(form)(state, 'is_schedule'),
});

const mapDispatchToProps = (dispatch, { baseUrl, form, history }) => ({
  onCancel: () => {
    dispatch(reset(form));
    dispatch(ModalHandlers.close(form));
    dispatch(actions.clearError());
  },
  onCreateTemplate: values =>
    dispatch(
      actions.createTemplate(values, form, id =>
        history.push(`${baseUrl}templates/${id}`)
      )
    ),
  onPatchTemplate: values => dispatch(actions.patchTemplate(values, form)),
  onSaveAsTemplate: values => dispatch(actions.saveAsTemplate(values, form)),
});

export default reduxForm({
  form: TEMPLATE_FORM_NAME,
  initialValues: {
    description: '',
    name: '',
    env_type: ENV_TYPES.Development,
    restrict_activities: false,
    is_schedule: false,
    hasEndDate: false,
    duration: {
      d: 3,
      h: 0,
      m: 0,
      s: 0,
    },
  },
  pristine: false,
  enableReinitialize: true,
})(connect(mapStateToProps, mapDispatchToProps, TemplateFormDialog));
