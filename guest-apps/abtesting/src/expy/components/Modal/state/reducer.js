import { OPEN_MODAL, CLOSE_MODAL, SET_MODAL_VIEW } from './actionTypes';

const initialState = {
  isOpen: false,
  view: '',
  props: null,
};

export default function modalReducer(state = initialState, action) {
  switch (action.type) {
    case OPEN_MODAL: {
      const { view, props } = action.payload;
      return {
        ...state,
        view,
        isOpen: true,
        props,
      };
    }

    case CLOSE_MODAL: {
      return {
        ...state,
        view: '',
        isOpen: false,
        props: null,
      };
    }

    case SET_MODAL_VIEW: {
      const { view, props } = action.payload;
      return {
        ...state,
        view,
        props,
      };
    }

    default:
      return state;
  }
}
