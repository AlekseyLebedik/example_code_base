import Notification from '../Notifications';
import { GLOBAL_SNACK_BAR_SHOW, GLOBAL_SNACK_BAR_HIDE } from './actionTypes';

export const show = (msg, type = 'default') => {
  let message;
  switch (type) {
    case 'error':
      message = { message: Notification(type, msg), type };
      break;
    case 'info':
      message = { message: Notification(type, msg), type };
      break;
    case 'success':
      message = { message: Notification(type, msg), type };
      break;
    default:
      message = { message: msg, type };
  }
  return {
    type: GLOBAL_SNACK_BAR_SHOW,
    message,
  };
};

export const hide = message => ({
  type: GLOBAL_SNACK_BAR_HIDE,
  message,
});
