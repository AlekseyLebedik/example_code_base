import React from 'react';
import PropTypes from 'prop-types';
import { reduxForm, reset } from 'redux-form';
import { compose } from 'redux';
import { connect } from 'react-redux';
import Tooltip from '@material-ui/core/Tooltip';
import Icon from '@material-ui/core/Icon';
import ModalForm from 'dw/core/components/ModalForm';
import ModalHandlers from 'dw/core/components/ModalHandlers';
import { OpenModalButton } from 'dw/core/components/ModalForm/components';

import ActivityForm from './components/ActivityForm';

import { initialValuesSelector } from '../../selectors';
import { PUBLISH_TYPE, FORM_NAME } from '../../constants';

const DisabledTooltip = props => {
  const { componentProps, disabled, title, disabledTooltip, icon } = props;
  return disabled ? (
    <Tooltip title={disabledTooltip}>
      <Icon color="disabled">{icon}</Icon>
    </Tooltip>
  ) : (
    <OpenModalButton {...componentProps} title={title} icon={icon} />
  );
};

DisabledTooltip.propTypes = {
  componentProps: PropTypes.object.isRequired,
  disabled: PropTypes.bool.isRequired,
  disabledTooltip: PropTypes.string.isRequired,
  icon: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
};

const ActivityFormDialog = ({
  disabled,
  disabledTooltip,
  form,
  handleCreation,
  handleSubmit,
  icon,
  initialValues,
  onCancel,
  title,
  ...props
}) => {
  const onSubmit = values => {
    const { activityType, dateType } = values;
    handleCreation(activityType, dateType);
    onCancel();
  };
  const formProps = {
    ...props,
    disabled,
    fullWidth: true,
    maxWidth: 'md',
    onSubmit: handleSubmit(onSubmit),
    onRemoteSubmit: handleSubmit(onSubmit),
    FormComponent: ActivityForm,
    formName: form,
    OpenModalComponent: componentProps =>
      icon ? (
        <DisabledTooltip
          componentProps={componentProps}
          disabled={disabled}
          title={title}
          disabledTooltip={disabledTooltip}
          icon={icon}
        />
      ) : null,
    title,
  };

  return <ModalForm {...formProps} />;
};

const mapStateToProps = state => ({
  initialValues: initialValuesSelector(state),
});

const mapDispatchToProps = (dispatch, { form }) => ({
  onCancel: () => {
    dispatch(reset(form));
    dispatch(ModalHandlers.close(form));
  },
});

ActivityFormDialog.propTypes = {
  disabled: PropTypes.bool.isRequired,
  disabledTooltip: PropTypes.string.isRequired,
  form: PropTypes.string.isRequired,
  handleCreation: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  icon: PropTypes.string.isRequired,
  initialValues: PropTypes.object.isRequired,
  onCancel: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
};

const withReduxForm = reduxForm({
  form: FORM_NAME,
  initialValues: {
    dateType: PUBLISH_TYPE.start,
    activityType: null,
  },
  enableReinitialize: true,
});

const ActivityFormDialogConnected = connect(
  mapStateToProps,
  mapDispatchToProps
)(ActivityFormDialog);

export default compose(withReduxForm)(ActivityFormDialogConnected);
