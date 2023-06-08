import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import ModalHandlers from 'dw/core/components/ModalHandlers';
import ModalWrapperStateless from './presentational';

const stateToProps = (state, { baseModalId, visible }) => ({
  _visible:
    visible !== undefined
      ? visible
      : ModalHandlers.isVisibleSelector(state, baseModalId),
});

const dispatchToProps = (
  dispatch,
  { baseModalId, openModal, onCancel, onPrimaryAction, onSecondaryAction }
) => ({
  _openModal: openModal || (() => dispatch(ModalHandlers.open(baseModalId))),
  _onCancel: onCancel || (() => dispatch(ModalHandlers.close(baseModalId))),
  _onSecondaryAction:
    onSecondaryAction || (() => dispatch(ModalHandlers.close(baseModalId))),
  _onPrimaryAction:
    onPrimaryAction || (() => dispatch(ModalHandlers.close(baseModalId))),
});

const ModalWrapperConnected = connect(
  stateToProps,
  dispatchToProps
)(ModalWrapperStateless);

ModalWrapperConnected.propTypes = {
  baseModalId: PropTypes.string.isRequired,
  visible: PropTypes.bool,
  openModal: PropTypes.func,
  onCancel: PropTypes.func,
};

export default ModalWrapperConnected;
