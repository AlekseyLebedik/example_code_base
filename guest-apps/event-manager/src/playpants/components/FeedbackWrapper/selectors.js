import { createSelector } from 'reselect';

/** General selectors */
export const feedbackSelector = state => state.errors.feedback;

/** error/feedback */
export const feedbackLoadingSelector = createSelector(
  feedbackSelector,
  feedback => feedback.loading
);

export const feedbackErrorSelector = createSelector(
  feedbackSelector,
  feedback => feedback.error.msg || ''
);

export const feedbackSavedSelector = createSelector(
  feedbackSelector,
  feedback => feedback.saved
);
