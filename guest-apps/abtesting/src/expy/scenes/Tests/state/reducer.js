import { SET_OPEN_DRAWER, SET_CLOSE_DRAWER } from './actionTypes';

const initialState = {
  isOpen: false,
  view: '',
  props: null,
};

export default function drawerReducer(state = initialState, action) {
  switch (action.type) {
    case SET_OPEN_DRAWER: {
      const { view, props } = action.payload;
      return {
        ...state,
        view,
        props,
        isOpen: true,
      };
    }

    case SET_CLOSE_DRAWER: {
      return {
        ...state,
        view: '',
        props: null,
        isOpen: false,
      };
    }

    default:
      return state;
  }
}
