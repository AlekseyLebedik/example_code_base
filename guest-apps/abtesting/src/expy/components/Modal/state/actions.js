import { OPEN_MODAL, CLOSE_MODAL, SET_MODAL_VIEW } from './actionTypes';

export function openModal({ view, props }) {
  return { type: OPEN_MODAL, payload: { view, props } };
}

export function closeModal() {
  return { type: CLOSE_MODAL };
}

export function setModalView({ view, props }) {
  return { type: SET_MODAL_VIEW, payload: { view, props } };
}
