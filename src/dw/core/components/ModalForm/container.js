import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { submit, isSubmitting, isPristine } from 'redux-form';

import ModalHandlers from 'dw/core/components/ModalHandlers';
import ModalForm from './presentational';

const stateToProps = (state, { formName, loading, pristine, visible }) => ({
  _visible:
    visible !== undefined
      ? visible
      : ModalHandlers.isVisibleSelector(state, formName),
  _loading: loading !== undefined ? loading : isSubmitting(formName)(state),
  _pristine: pristine !== undefined ? pristine : isPristine(formName)(state),
});

const dispatchToProps = (
  dispatch,
  { formName, openModal, onCancel, onRemoteSubmit }
) => ({
  _openModal: openModal || (() => dispatch(ModalHandlers.open(formName))),
  _onCancel: onCancel || (() => dispatch(ModalHandlers.close(formName))),
  _onRemoteSubmit:
    onRemoteSubmit ||
    (() => {
      dispatch(submit(formName));
    }),
});

const ModalFormConnected = connect(stateToProps, dispatchToProps)(ModalForm);

ModalFormConnected.propTypes = {
  formName: PropTypes.string.isRequired,
  loading: PropTypes.bool,
  pristine: PropTypes.bool,
  visible: PropTypes.bool,
  openModal: PropTypes.func,
  onCancel: PropTypes.func,
  onRemoteSubmit: PropTypes.func,
};

export default ModalFormConnected;
