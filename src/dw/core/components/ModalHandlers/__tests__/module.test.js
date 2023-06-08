import reducer from '../reducer';
import * as AT from '../actionTypes';
import * as actions from '../actions';

const uniqueModalId = 'unique_modal_id';
const openModalAction = actions.openModalHandler(uniqueModalId);
const closeModalAction = actions.closeModalHandler(uniqueModalId);
const submitModalAction = actions.submitModalHandler(uniqueModalId);
const stopSubmittingModalAction =
  actions.stopSubmittingModalHandler(uniqueModalId);

describe('ModalHandlers', () => {
  describe('Actions', () => {
    it('MODAL_OPEN', () => {
      expect(openModalAction).toHaveProperty('type', AT.MODAL_OPEN);
      expect(openModalAction).toHaveProperty('modalId', uniqueModalId);
    });

    it('MODAL_CLOSE', () => {
      expect(closeModalAction).toHaveProperty('type', AT.MODAL_CLOSE);
      expect(closeModalAction).toHaveProperty('modalId', uniqueModalId);
    });

    it('MODAL_SUBMIT', () => {
      expect(submitModalAction).toHaveProperty('type', AT.MODAL_SUBMIT);
      expect(submitModalAction).toHaveProperty('modalId', uniqueModalId);
    });

    it('MODAL_STOP_SUBMITTING', () => {
      expect(stopSubmittingModalAction).toHaveProperty(
        'type',
        AT.MODAL_STOP_SUBMITTING
      );
      expect(stopSubmittingModalAction).toHaveProperty(
        'modalId',
        uniqueModalId
      );
    });
  });

  describe('Reducer', () => {
    it('returns initial state', () => {
      expect(reducer([], {})).toMatchSnapshot();
    });

    it('handles MODAL_OPEN', () => {
      expect(reducer([], openModalAction)).toMatchSnapshot();
    });

    it('handles MODAL_CLOSE', () => {
      expect(reducer([], closeModalAction)).toMatchSnapshot();

      const state = reducer([], openModalAction);
      expect(reducer(state, closeModalAction)).toMatchSnapshot();
    });

    it('handles MODAL_SUBMIT', () => {
      expect(reducer([], submitModalAction)).toMatchSnapshot();

      const state = reducer([], openModalAction);
      expect(reducer(state, submitModalAction)).toMatchSnapshot();
    });

    it('handles AT.MODAL_STOP_SUBMITTING', () => {
      expect(reducer([], stopSubmittingModalAction)).toMatchSnapshot();

      const state = reducer([], submitModalAction);
      expect(reducer(state, stopSubmittingModalAction)).toMatchSnapshot();
    });
  });
});
