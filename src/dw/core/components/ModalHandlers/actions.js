import * as AT from './actionTypes';

export const openModalHandler = modalId => ({
  type: AT.MODAL_OPEN,
  modalId,
});

export const closeModalHandler = modalId => ({
  type: AT.MODAL_CLOSE,
  modalId,
});

export const submitModalHandler = modalId => ({
  type: AT.MODAL_SUBMIT,
  modalId,
});

export const stopSubmittingModalHandler = modalId => ({
  type: AT.MODAL_STOP_SUBMITTING,
  modalId,
});
