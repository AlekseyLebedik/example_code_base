import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import MaterialModal from '@material-ui/core/Modal';

import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';

import { closeModal } from './state/actions';

import { useStyles } from './styles';

const Modal = () => {
  const classes = useStyles();
  const isOpen = useSelector(state => state.Expy.modal.isOpen);
  const view = useSelector(state => state.Expy.modal.view);
  const props = useSelector(state => state.Expy.modal.props);

  const dispatch = useDispatch();

  return (
    <MaterialModal open={isOpen} onClose={() => dispatch(closeModal())}>
      <div className={classes.paper}>
        <div className={classes.closeBtn}>
          <IconButton size="small" onClick={() => dispatch(closeModal())}>
            <CloseIcon />
          </IconButton>
        </div>
        {view && React.createElement(view, props)}
      </div>
    </MaterialModal>
  );
};

export default Modal;
