import mockState from 'playpants/testUtils/mockState';
import * as selectors from '../selectors';

describe('FeedbackWrapper selectors:', () => {
  it('should select the entire feedback wrapper', () => {
    const feedback = selectors.feedbackSelector(mockState);
    expect(feedback).toEqual(mockState.errors.feedback);
  });
  it('should select feedback loading', () => {
    const loading = selectors.feedbackLoadingSelector(mockState);
    expect(loading).toEqual(mockState.errors.feedback.loading);
  });
  it('should select feedback error', () => {
    const error = selectors.feedbackErrorSelector(mockState);
    expect(error).toEqual(mockState.errors.feedback.error);
  });
  it('should select feedback saved', () => {
    const saved = selectors.feedbackSavedSelector(mockState);
    expect(saved).toEqual(mockState.errors.feedback.saved);
  });
});
