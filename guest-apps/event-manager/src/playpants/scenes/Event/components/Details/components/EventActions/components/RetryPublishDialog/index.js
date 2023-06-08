import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { reduxForm, reset } from 'redux-form';
import ModalForm from 'dw/core/components/ModalForm';
import ModalHandlers from 'dw/core/components/ModalHandlers';
import { OpenModalButton } from 'dw/core/components/ModalForm/components';
import { editEvent } from 'playpants/scenes/Event/actions';
import { prettyPrint } from 'playpants/helpers/json';
import RetryPublishForm from '../RetryPublishForm';
import { RETRY_PUBLISH_MODAL_ID } from '../../constants';

const RetryPublishDialog = ({
  form,
  handleSubmit,
  icon,
  initialValues,
  onCancel,
  onRetryPublish,
  title,
  ...props
}) => (
  <ModalForm
    {...props}
    FormComponent={RetryPublishForm}
    formName={form}
    initialValues={initialValues}
    onCancel={() => onCancel(form)}
    onRemoteSubmit={handleSubmit(onRetryPublish)}
    onSubmit={handleSubmit(onRetryPublish)}
    OpenModalComponent={componentProps => (
      <OpenModalButton title={title} icon={icon} {...componentProps} />
    )}
    maxWidth="sm"
    title={title}
    pristine={false}
    cancelOnBackdropClick
  />
);

RetryPublishDialog.propTypes = {
  form: PropTypes.string.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  icon: PropTypes.string.isRequired,
  initialValues: PropTypes.object.isRequired,
  onCancel: PropTypes.func.isRequired,
  onRetryPublish: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
};

const mapDispatchToProps = (dispatch, { form, eventId }) => ({
  onCancel: () => {
    dispatch(reset(form));
    dispatch(ModalHandlers.close(form));
  },
  onRetryPublish: values => {
    dispatch(
      editEvent(eventId, {
        status: 'published',
        settings: prettyPrint({
          publish: values,
        }),
      })
    );
    dispatch(ModalHandlers.close(form));
  },
});

const withReduxForm = reduxForm({
  form: RETRY_PUBLISH_MODAL_ID,
  initialValues: {
    skip_published_activities: true,
    break_on_exception: true,
  },
  enableReinitialize: true,
});

const withConnect = connect(null, mapDispatchToProps);

const ConnectedRetryPublishDialog = compose(
  withReduxForm,
  withConnect
)(RetryPublishDialog);

export default ConnectedRetryPublishDialog;
