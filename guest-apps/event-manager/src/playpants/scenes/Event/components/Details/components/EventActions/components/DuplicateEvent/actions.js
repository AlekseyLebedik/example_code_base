import { nonCriticalHTTPError } from '@demonware/devzone-core/helpers/errors';
import * as GlobalSnackBarActions from '@demonware/devzone-core/components/GlobalSnackBar/actions';
import ModalHandlers from 'dw/core/components/ModalHandlers';
import { DUPLICATE_EVENT_FORM_NAME } from 'playpants/components/DuplicateEventForm/constants';
import * as AT from './actionTypes';

export const duplicateEvent = (
  baseUrl,
  sourceEvent,
  mods,
  history,
  formName
) => ({
  type: AT.DUPLICATE_EVENT,
  baseUrl,
  sourceEvent,
  mods,
  history,
  formName,
});

export const duplicateEventSuccess = (baseUrl, event) => dispatch => {
  dispatch(
    GlobalSnackBarActions.show(
      `Event "${event.title}" successfully duplicated.`
    ),
    'success'
  );
  dispatch({
    type: `${AT.DUPLICATE_EVENT}_SUCCESS`,
  });
  dispatch(ModalHandlers.close(DUPLICATE_EVENT_FORM_NAME));
};

export const duplicateEventRightClickSuccess = (baseUrl, event) => dispatch => {
  dispatch(
    GlobalSnackBarActions.show(
      `Event "${event.title}" successfully duplicated.`
    ),
    'success'
  );
  dispatch({
    type: `${AT.DUPLICATE_EVENT}_SUCCESS`,
  });
};

export const duplicateEventFailed = error => dispatch =>
  dispatch(nonCriticalHTTPError(error));
