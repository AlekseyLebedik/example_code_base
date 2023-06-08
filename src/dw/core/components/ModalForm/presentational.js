import React from 'react';
import PropTypes from 'prop-types';

import Button from '@material-ui/core/Button';
import Dialog from 'dw/core/components/Dialog';

/* ************************************************** MODALFORM CONTRACT **************************************************
ModalForm requires the following to work properly:
  - You must provide the parameter formName, which will be used to create the redux-form related parameters using ModalHandlers
    The redux-form related p[arameters are: _visible, _onCancel, _loading, _pristine and _onRemoteSubmit,
  - The onSubmit event of the FormComponent should be send as "onFormSubmit"
  - Any other extra properties that the Form component may need should be passed to the ModalForm and they
    will be send down to the Form component
  - If you need to override the redux-form related properties you can do so by sending the parameter without the _
    (to override _visible, send the parameter visible to ModalForm)
  - If you provide an OpenModalComponent, it is suggested that htis component is a Button type or a Component that has an onClick
    event, so that it uses the ModalHandler open() function to open the Modal
*/
function ModalForm(props) {
  const {
    _loading,
    _onCancel,
    _visible,
    _onRemoteSubmit,
    _openModal,
    FormComponent,
    onFormSubmit,
    OpenModalComponent,
    openModalComponentProps,
    primaryButtonProps,
    submitText,
    submittingText,
    title,
    fullWidth,
    maxWidth,
    wrapperClassName,
    dialogContentStyle,
    cancelOnBackdropClick,
    invalid,
    disableEnforceFocus,
  } = props;

  const footerButtons = [
    <Button key="cancel" onClick={_onCancel} className="cancelModal__button">
      Cancel
    </Button>,
    <Button
      className="submitModal__button"
      color="primary"
      disabled={_loading || invalid}
      focusRipple
      onClick={_onRemoteSubmit}
      key="primary"
      {...primaryButtonProps}
    >
      {_loading ? submittingText : submitText}
    </Button>,
  ];

  return (
    <>
      <div className={wrapperClassName}>
        <Dialog
          title={title}
          actions={footerButtons}
          modal
          cancelOnBackdropClick={cancelOnBackdropClick}
          open={_visible}
          onRequestClose={_onCancel}
          fullWidth={fullWidth}
          {...(Number.isInteger(maxWidth)
            ? { PaperProps: { style: { maxWidth } } }
            : { maxWidth })}
          contentStyle={dialogContentStyle}
          data-cy="modalForm"
          disableEnforceFocus={disableEnforceFocus}
        >
          <FormComponent onSubmit={onFormSubmit} {...props} />
        </Dialog>
      </div>
      {OpenModalComponent && (
        <OpenModalComponent
          onClick={_openModal}
          className="openModal__container"
          {...openModalComponentProps}
        />
      )}
    </>
  );
}

ModalForm.propTypes = {
  _visible: PropTypes.bool.isRequired,
  _onCancel: PropTypes.func.isRequired,
  _loading: PropTypes.bool.isRequired,
  _onRemoteSubmit: PropTypes.func.isRequired,
  _openModal: PropTypes.func.isRequired,
  FormComponent: PropTypes.oneOfType([PropTypes.string, PropTypes.elementType])
    .isRequired,
  OpenModalComponent: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.elementType,
  ]),
  openModalComponentProps: PropTypes.object,
  onFormSubmit: PropTypes.func,
  title: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
  primaryButtonProps: PropTypes.object,
  submittingText: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
  submitText: PropTypes.string,
  fullWidth: PropTypes.bool,
  maxWidth: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  wrapperClassName: PropTypes.string,
  dialogContentStyle: PropTypes.object,
  cancelOnBackdropClick: PropTypes.bool,
  invalid: PropTypes.bool,
  disableEnforceFocus: PropTypes.bool,
};

ModalForm.defaultProps = {
  onFormSubmit: () => {},
  title: 'Default Modal Title',
  primaryButtonProps: null,
  submittingText: 'Submitting...',
  submitText: 'Submit',
  fullWidth: false,
  maxWidth: null,
  wrapperClassName: '',
  dialogContentStyle: {},
  OpenModalComponent: null,
  openModalComponentProps: {},
  cancelOnBackdropClick: false,
  invalid: false,
  disableEnforceFocus: false,
};

export default ModalForm;
