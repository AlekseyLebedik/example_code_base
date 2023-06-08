import React from 'react';
import PropTypes from 'prop-types';

import Button from '@material-ui/core/Button';
import Dialog from 'dw/core/components/Dialog';

function ModalWrapperStateless(props) {
  const {
    _onCancel,
    _onPrimaryAction,
    _onSecondaryAction,
    _openModal,
    _visible,
    blockPrimaryAction,
    cancelOnBackdropClick,
    Component,
    dialogClassName,
    dialogContentStyle,
    fullWidth,
    maxWidth,
    OpenModalComponent,
    primaryActionIcon,
    primaryActionProps,
    primaryActionText,
    secondaryActionProps,
    secondaryActionText,
    title,
    wrapperClassName,
    onCancel,
  } = props;

  const footerButtons = [
    <Button
      key="secondary"
      onClick={_onSecondaryAction}
      {...secondaryActionProps}
    >
      {secondaryActionText}
    </Button>,
    ...(blockPrimaryAction
      ? []
      : [
          primaryActionProps.href ? (
            <a key="primary" onClick={_onPrimaryAction} {...primaryActionProps}>
              <Button focusRipple color={primaryActionProps.color || 'primary'}>
                {primaryActionText}
                {primaryActionIcon}
              </Button>
            </a>
          ) : (
            <Button
              key="primary"
              focusRipple
              onClick={_onPrimaryAction}
              {...primaryActionProps}
            >
              {primaryActionText}
              {primaryActionIcon}
            </Button>
          ),
        ]),
  ];

  return (
    <>
      <div className={wrapperClassName}>
        <Dialog
          actions={footerButtons}
          cancelOnBackdropClick={cancelOnBackdropClick}
          className={dialogClassName}
          contentStyle={dialogContentStyle}
          fullWidth={fullWidth}
          maxWidth={maxWidth}
          modal
          onClose={onCancel || _onSecondaryAction}
          onRequestClose={_onCancel}
          open={_visible}
          title={title}
        >
          <Component {...props} />
        </Dialog>
      </div>
      {OpenModalComponent && (
        <OpenModalComponent
          className="openModal__container"
          onClick={_openModal}
        />
      )}
    </>
  );
}

ModalWrapperStateless.propTypes = {
  _onCancel: PropTypes.func.isRequired,
  _onPrimaryAction: PropTypes.func.isRequired,
  _onSecondaryAction: PropTypes.func.isRequired,
  _openModal: PropTypes.func.isRequired,
  _visible: PropTypes.bool.isRequired,
  blockPrimaryAction: PropTypes.bool,
  cancelOnBackdropClick: PropTypes.bool,
  Component: PropTypes.oneOfType([PropTypes.string, PropTypes.elementType])
    .isRequired,
  dialogClassName: PropTypes.string,
  dialogContentStyle: PropTypes.object,
  fullWidth: PropTypes.bool,
  maxWidth: PropTypes.string,
  onCancel: PropTypes.func,
  OpenModalComponent: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.elementType,
  ]),
  primaryActionIcon: PropTypes.object,
  primaryActionProps: PropTypes.object,
  primaryActionText: PropTypes.string,
  secondaryActionProps: PropTypes.object,
  secondaryActionText: PropTypes.string,
  title: PropTypes.string,
  wrapperClassName: PropTypes.string,
};

ModalWrapperStateless.defaultProps = {
  blockPrimaryAction: false,
  cancelOnBackdropClick: false,
  dialogClassName: '',
  dialogContentStyle: {},
  fullWidth: false,
  maxWidth: null,
  onCancel: null,
  OpenModalComponent: null,
  primaryActionIcon: null,
  primaryActionProps: {},
  primaryActionText: 'View',
  secondaryActionProps: {},
  secondaryActionText: 'Cancel',
  title: undefined,
  wrapperClassName: '',
};

export default ModalWrapperStateless;
