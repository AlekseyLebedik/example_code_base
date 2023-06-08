import * as AT from './actionTypes';

export const openRequestErrorDialog = () => ({
  type: AT.OPEN_REQUEST_ERROR_DIALOG,
});

export const closeRequestErrorDialog = () => ({
  type: AT.CLOSE_REQUEST_ERROR_DIALOG,
});
