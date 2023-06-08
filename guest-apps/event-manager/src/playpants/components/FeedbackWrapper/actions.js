import * as AT from './actionTypes';

export const startLoading = () => ({
  type: AT.START_LOADING,
});

export const stopLoading = () => ({
  type: AT.STOP_LOADING,
});

export const trySaving = () => ({
  type: AT.TRY_SAVING,
});

export const saveSuccess = () => ({
  type: AT.SAVE_SUCCESS,
});

export const saveFailed = error => ({
  type: AT.SAVE_FAILED,
  error,
});

export const resetFeedback = () => ({
  type: AT.RESET_FEEDBACK,
});
