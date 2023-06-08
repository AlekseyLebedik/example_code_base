import { SET_OPEN_DRAWER, SET_CLOSE_DRAWER } from './actionTypes';

export const setCloseDrawer = () => ({ type: SET_CLOSE_DRAWER });

export function setOpenDrawer(view, props) {
  return {
    type: SET_OPEN_DRAWER,
    payload: {
      view,
      props,
    },
  };
}
