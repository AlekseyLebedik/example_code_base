export const isVisibleSelector = (state, modalId) =>
  state.Core.ModalHandlers.find(m => m.id === modalId) !== undefined;

export const submittingSelector = (state, modalId) => {
  const target = state.Core.ModalHandlers.find(m => m.id === modalId);
  return target ? target.submitting : false;
};
