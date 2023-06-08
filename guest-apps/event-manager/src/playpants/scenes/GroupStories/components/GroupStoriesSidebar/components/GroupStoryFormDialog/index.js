import React from 'react';
import PropTypes from 'prop-types';
import { reduxForm, reset } from 'redux-form';
import { compose } from 'redux';
import { connect } from 'dw/core/helpers/component';
import { joinPath } from 'dw/core/helpers/path';
import ModalForm from 'dw/core/components/ModalForm';
import ModalHandlers from 'dw/core/components/ModalHandlers';
import { OpenModalButton } from 'dw/core/components/ModalForm/components';

import { getBaseURL } from 'playpants/components/App/selectors';
import GroupStoryForm from './components/GroupStoryForm';
import asyncValidate from './asyncValidate';
import * as actions from './actions';

export const GroupStoryFormDialogBase = ({
  action,
  currentProject,
  form,
  handleSubmit,
  icon,
  initialValues,
  onCancel,
  title,
  onCreateGroupStory,
  onPatchGroupStory,
  ...props
}) => {
  const submitTypes = {
    create: onCreateGroupStory,
    patch: onPatchGroupStory,
  };
  const onSubmit = submitTypes[action];
  const formProps = {
    ...props,
    FormComponent: GroupStoryForm,
    formName: form,
    initialValues,
    onCancel: () => onCancel(form),
    onRemoteSubmit: handleSubmit(onSubmit),
    onSubmit: handleSubmit(onSubmit),
    OpenModalComponent: componentProps =>
      icon ? (
        <OpenModalButton {...componentProps} title={title} icon={icon} />
      ) : null,
    maxWidth: 'sm',
    title,
  };

  return <ModalForm {...formProps} />;
};

GroupStoryFormDialogBase.propTypes = {
  action: PropTypes.string.isRequired,
  currentProject: PropTypes.object.isRequired,
  form: PropTypes.string.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  icon: PropTypes.string,
  initialValues: PropTypes.object.isRequired,
  onCancel: PropTypes.func.isRequired,
  onCreateGroupStory: PropTypes.func.isRequired,
  onPatchGroupStory: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
};

GroupStoryFormDialogBase.defaultProps = {
  icon: undefined,
};

const mapStateToProps = state => ({
  baseUrl: getBaseURL(state),
});

const mapDispatchToProps = (dispatch, { form, history }) => ({
  onCancel: () => {
    dispatch(reset(form));
    dispatch(ModalHandlers.close(form));
  },
  onCreateGroupStory: (values, baseUrl) =>
    dispatch(
      actions.createGroupStory(values, form, id =>
        history.push(joinPath(baseUrl, id))
      )
    ),
  onPatchGroupStory: values => dispatch(actions.patchGroupStory(values, form)),
});

const mergeProps = (stateProps, dispatchProps, ownProps) => ({
  ...stateProps,
  ...dispatchProps,
  ...ownProps,
  onCreateGroupStory: values =>
    dispatchProps.onCreateGroupStory(
      values,
      joinPath(stateProps.baseUrl, 'stories')
    ),
});

const withReduxForm = reduxForm({
  initialValues: {
    name: '',
    description: '',
  },
  asyncValidate,
  asyncBlurFields: ['name'],
  enableReinitialize: true,
});

const GroupStoryFormDialogConnected = connect(
  mapStateToProps,
  mapDispatchToProps,
  GroupStoryFormDialogBase,
  mergeProps
);

export default compose(withReduxForm)(GroupStoryFormDialogConnected);
