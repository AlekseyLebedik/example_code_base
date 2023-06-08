import React from 'react';
import PropTypes from 'prop-types';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';

const DialogComponent = ({
  title,
  actions,
  modal,
  onRequestClose,
  children,
  open,
  contentStyle,
  classes,
  fullWidth,
  maxWidth,
  cancelOnBackdropClick,
  ...props
}) => (
  <Dialog
    disableBackdropClick={!cancelOnBackdropClick && modal}
    onClose={onRequestClose}
    open={open}
    classes={classes}
    PaperProps={{ style: { position: 'initial' } }}
    fullWidth={fullWidth}
    maxWidth={maxWidth}
    {...props}
  >
    {title && <DialogTitle>{title}</DialogTitle>}
    <DialogContent style={contentStyle}>{children}</DialogContent>
    <DialogActions>{actions}</DialogActions>
  </Dialog>
);

DialogComponent.propTypes = {
  title: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
  actions: PropTypes.arrayOf(PropTypes.object).isRequired,
  modal: PropTypes.bool,
  onRequestClose: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
  contentStyle: PropTypes.object,
  classes: PropTypes.object,
  children: PropTypes.node,
  fullWidth: PropTypes.bool,
  maxWidth: PropTypes.string,
  cancelOnBackdropClick: PropTypes.bool,
};

DialogComponent.defaultProps = {
  title: null,
  modal: true,
  contentStyle: {},
  classes: {},
  fullWidth: false,
  maxWidth: 'sm',
  children: null,
  cancelOnBackdropClick: false,
};

export default DialogComponent;
