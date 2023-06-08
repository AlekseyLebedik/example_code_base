import * as AT from './actionTypes';

const INITIAL_STATE = [];

const setSubmitting = (state, modalId, value) => {
  const targetModal = state.find(modal => modal.id === modalId);
  if (!targetModal) return state;

  targetModal.submitting = value;
  const rest = state.filter(modal => modal.id !== modalId);
  return [...rest, targetModal];
};

export default function reducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case AT.MODAL_OPEN:
      return [
        ...state,
        {
          id: action.modalId,
          submitting: false,
        },
      ];
    case AT.MODAL_CLOSE:
      return state.filter(modal => modal.id !== action.modalId);
    case AT.MODAL_SUBMIT:
      return setSubmitting(state, action.modalId, true);
    case AT.MODAL_STOP_SUBMITTING:
      return setSubmitting(state, action.modalId, false);
    default:
      return state;
  }
}
