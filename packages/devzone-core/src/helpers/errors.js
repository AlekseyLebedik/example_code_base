import React from 'react';
import Icon from '@material-ui/core/Icon';
import * as GlobalSnackBarActions from '../components/GlobalSnackBar/actions';
import * as GlobalProgressActions from '../components/GlobalProgress/actions';

const DW_TRACING_URL = 'https://tracing.las.demonware.net/jaeger/trace/';

const CRITICAL_ERROR = 'ERRORS.CRITICAL_ERROR';

const INITIAL_STATE = {
  criticalError: null,
};

export default function reducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case CRITICAL_ERROR:
      return { ...state, criticalError: action.msg };
    default:
      return state;
  }
}

/**
 * An action which triggers a non recoverable error
 */
export function criticalError(msg = "Couldn't fetch remote data") {
  return {
    type: CRITICAL_ERROR,
    msg,
  };
}

export function nonCriticalError(msg) {
  return dispatch => {
    dispatch(GlobalProgressActions.done());
    dispatch(GlobalSnackBarActions.show(msg));
  };
}

/* eslint-disable react/no-array-index-key */
export const nonCriticalHTTPErrorComponent = (
  statusCode,
  msg,
  tr = undefined
) => (
  <div className="non-critical-error">
    <Icon fontSize="small" className="icon">
      warning
    </Icon>
    HTTP Error: {statusCode}
    <br />
    {Array.isArray(msg) ? msg.map((m, i) => <p key={i}>{m}</p>) : msg}
    <br />
    {tr && <span>Transaction: {tr}</span>}
  </div>
);
/* eslint-enable react/no-array-index-key */

export function nonCriticalHTTPError(error) {
  const tr =
    error?.response?.headers && error.response.headers['dw-transaction'];
  const statusCode = error.statusCode || error?.response?.status;
  const msg =
    error?.response?.data?.error?.msg ||
    error?.error?.error?.msg ||
    (error.error &&
      (typeof error.error === 'string' || error.error instanceof String) &&
      error.response.toJSON()) ||
    'Unhandled Error';

  const errorLog =
    error?.response?.data || error?.error?.error || error?.response?.toJSON();
  // eslint-disable-next-line
  console.log(error, errorLog, tr ? `Transaction: ${tr}` : '');
  // eslint-disable-next-line
  tr && console.log(`${DW_TRACING_URL}${tr}`);

  return nonCriticalError(nonCriticalHTTPErrorComponent(statusCode, msg, tr));
}
