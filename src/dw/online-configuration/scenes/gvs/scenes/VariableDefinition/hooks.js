import { useCallback, useMemo } from 'react';
import { useParams } from 'react-router-dom';
import { useSnackbar } from 'dw/core/hooks';

const BAD_REQUEST_STATUS_CODE = 400;
const CONFLICT_STATUS_CODE = 409;

export const useScopeURI = () => {
  const { scopeURI } = useParams();
  return useMemo(() => {
    if (!scopeURI) return null;
    const [franchise, game] = scopeURI.split(':');
    return `${franchise}:${game}`;
  }, [scopeURI]);
};

export const useHandleConflictError = (errorOnly = false) => {
  const snackbar = useSnackbar();
  return useCallback(
    e => {
      if (!errorOnly) {
        // eslint-disable-next-line
        console.error(e);
      }
      let msg = String(e);
      const { error, status_code: statusCode } = JSON.parse(e.message);
      if (statusCode === CONFLICT_STATUS_CODE) {
        msg = (
          <>
            {error.msg}
            <ul>
              {error.keys.map(({ key, error: err }) => (
                <li key={key}>
                  <strong>{key}</strong>: {err}
                </li>
              ))}
            </ul>
          </>
        );
        if (!errorOnly) snackbar.error(msg);
      }
      if (statusCode === BAD_REQUEST_STATUS_CODE) {
        msg = (
          <>
            {error.msg}
            <ul>
              {error.invalid.map(({ msg: err }) => (
                <li key={err}>{err}</li>
              ))}
            </ul>
          </>
        );
        if (!errorOnly) snackbar.error(msg);
      }
      return msg;
    },
    [snackbar, errorOnly]
  );
};
