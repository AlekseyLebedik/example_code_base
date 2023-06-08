import * as Actions from './actions';
import * as Selectors from './selectors';

export { default as reducer } from './reducer';
export { Actions as actions, Selectors as selectors };

export default {
  close: Actions.closeModalHandler,
  open: Actions.openModalHandler,
  submit: Actions.submitModalHandler,
  stopSubmitting: Actions.stopSubmittingModalHandler,
  ...Selectors,
};
