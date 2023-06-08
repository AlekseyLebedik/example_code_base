// Custom Hooks.
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useLocation } from 'react-router-dom';
import debounce from 'lodash/debounce';
import isEqual from 'lodash/isEqual';
import queryString from 'query-string';
import * as GlobalSnackBarActions from '@demonware/devzone-core/components/GlobalSnackBar/actions';
import { usePermissions as useNewPermissions } from '@demonware/devzone-core/access/CheckPermissions';
import { projectByTitleIDSelector } from 'dw/core/helpers/selectors';
import { makeCancelable } from 'dw/core/helpers/promise';
import { hasData } from 'dw/core/helpers/object';
import {
  currentProject as currentProjectSelector,
  currentEnvDetailsSelector,
  currentCompaniesDetailsSelector,
} from 'dw/core/helpers/title-env-selectors';
import { formatDateTimeSelector } from '../helpers/date-time';

export const usePrevious = value => {
  const ref = useRef();
  useEffect(() => {
    ref.current = value;
  }, [value]);
  return ref.current;
};

export const useCompare = value => {
  const ref = useRef();
  if (!isEqual(value, ref.current)) {
    ref.current = value;
  }
  return ref.current;
};

/*
parsePermissionHelper(result) -> bool
*/
function parsePermissionHelper(predicates, result) {
  return Array.isArray(predicates)
    ? Object.values(result.data).some(v => v)
    : result.data.permission;
}
/*
useCurrentEnvPermission(predicate, resultOnly) -> bool | [loading, error, result]
*/
export function useCurrentEnvPermission(predicates, resultOnly = true) {
  const currentEnv = useSelector(currentEnvDetailsSelector);
  const [loading, error, result] = useNewPermissions(
    predicates,
    `titleenv.${currentEnv.id}`
  );
  if (!result?.data && resultOnly) return false;
  return resultOnly
    ? parsePermissionHelper(predicates, result)
    : [loading, error, result];
}
/*
useCurrentProjectPermission(predicate, resultOnly) -> bool | [loading, error, result]
*/
export function useCurrentProjectPermission(predicates, resultOnly = true) {
  const currentProject = useSelector(currentProjectSelector);
  const [loading, error, result] = useNewPermissions(
    predicates,
    `project.${currentProject.id}`
  );
  if (!result?.data && resultOnly) return false;
  return resultOnly
    ? parsePermissionHelper(predicates, result)
    : [loading, error, result];
}

/*
useABTestingProjectID(titleID) -> string|projectID
*/
export function useABTestingProjectID(titleID) {
  const projectByTitle = useSelector(state =>
    projectByTitleIDSelector(state, titleID)
  );
  return hasData(projectByTitle) ? projectByTitle[0].id : undefined;
}

/*
useABTestingProjectPermission(predicate, titleID, resultOnly) -> bool | [loading, error, result]
*/
export function useABTestingProjectPermission(
  predicates,
  titleID,
  resultOnly = true
) {
  const projectID = useABTestingProjectID(titleID);
  const [loading, error, result] = useNewPermissions(
    predicates,
    `project.${projectID}`
  );
  if (!result?.data && resultOnly) return false;
  return resultOnly
    ? parsePermissionHelper(predicates, result)
    : [loading, error, result];
}
/*
useUserCompaniesPermission(predicate, resultOnly) -> bool | [loading, error, result]
*/
export function useUserCompaniesPermission(predicates, resultOnly = true) {
  const companies = useSelector(currentCompaniesDetailsSelector);
  const objects = companies.map(c => `company.${c.id}`);
  const [loading, error, result] = useNewPermissions(predicates, objects);
  if (!result?.data && resultOnly) return false;
  return resultOnly
    ? parsePermissionHelper(predicates, result)
    : [loading, error, result];
}

/*
useSnackbar() -> {
  info(msg),
  success(msg),
  error(msg)
}
*/
export const useSnackbar = () => {
  const dispatch = useDispatch();
  const success = msg => dispatch(GlobalSnackBarActions.show(msg, 'success'));
  const error = msg => dispatch(GlobalSnackBarActions.show(msg, 'error'));
  const info = msg => dispatch(GlobalSnackBarActions.show(msg, 'info'));
  return { success, error, info };
};

export const useCancellablePromise = () => {
  const promises = useRef([]);
  const callApi = useCallback((api, ...args) => {
    const promise = makeCancelable(api(...args));
    promises.current.push(promise);
    return promise.promise;
  }, []);
  useEffect(
    () => () =>
      promises.current.forEach(promise => promise && promise.cancel()),
    []
  );
  return callApi;
};

const DEFAULT_DELAY = 500;

const debouncedCallback = (callback, delay) =>
  debounce((...args) => callback(...args), delay);

export const useDebouncedCallback = (callback, delay = DEFAULT_DELAY) =>
  useMemo(() => debouncedCallback(callback, delay), [callback, delay]);

/** Hook to delay actual value change on input element.
 * @param {Number}            [delay=500]
 *   The time in milliseconds to delay value change
 * @param {Object}            [options]
 *   Configuration params
 * @param {Function | String} [options.initial='']
 *   The initial value to use.
 *   If function passed it will be executed and return value would be used as initial value
 * @param {String}            [options.queryParamName]
 *   The name of parameter to use in location query string
 * @returns {[String, Function, String]} [inputValue, setInputValue, debouncedValue]
 *   The inputValue and setInputValue should be used as value and onChange within input element.
 */
export const useDebouncedInput = (delay = DEFAULT_DELAY, options) => {
  const { initial, queryParamName } = options || {};
  const location = useLocation();
  const history = useHistory();
  const initialValue = useMemo(() => {
    if (initial !== undefined) {
      if (typeof initial === 'function') return initial();
      return initial;
    }
    if (queryParamName) {
      const { [queryParamName]: q } = queryString.parse(location.search);
      return q || '';
    }
    return '';
  }, []);
  const [inputValue, setInputValue] = useState(initialValue);
  const [query, setQuery] = useState(initialValue);
  const changeInputValue = useCallback(
    (value, immediate = false) => {
      setInputValue(value);
      if (immediate) setQuery(value);
    },
    [setInputValue, setQuery]
  );
  const changeQuery = useDebouncedCallback(setQuery, delay);
  useEffect(() => changeQuery(inputValue), [inputValue, changeQuery]);
  useEffect(() => {
    if (!queryParamName) return;
    const queryParams = queryString.parse(location.search);
    if (query.length > 0) {
      queryParams[queryParamName] = query;
    } else {
      queryParams[queryParamName] = undefined;
    }
    history.push({
      pathname: location.pathname,
      search: queryString.stringify(queryParams),
    });
  }, [query]);
  return [inputValue, changeInputValue, query];
};

/** Hook to debounce value change
 * @param {ANY}
 *   The changing value;
 * @param {Number}            [delay=500]
 *   The time in milliseconds to delay value change
 * @returns {ANY}
 *   The delayed value
 */
export const useDebounced = (value, delay = 200) => {
  const [debouncedValue, setValue] = useState(value);
  const setDebouncedValue = useMemo(() => debounce(setValue, delay), [delay]);
  useEffect(() => {
    setDebouncedValue(value);
  }, [setDebouncedValue, value]);
  return debouncedValue;
};

export const useGraphMutationSnackbar = () => {
  const snackbar = useSnackbar();
  const success = action => snackbar.success(`${action} successful`);
  const warning = action => snackbar.error(`${action} unsuccessful`);
  const error = err => {
    if (err?.networkError) {
      const { result, statusCode } = err.networkError;
      let message;
      if (result?.error) {
        const { name: errName, msg } = result.error;
        message = `${errName}: ${msg}`;
      } else if (result?.errors) {
        // eslint-disable-next-line prefer-destructuring
        ({ message } = result.errors[0]);
      }
      snackbar.error(`Network Error (${statusCode}) ${message}`);
    } else if (err?.graphQLErrors) {
      const messages = err.graphQLErrors.map(e => e.message ?? e);
      snackbar.error(
        <>
          Query Errors:
          {messages.map((m, i) => (
            // eslint-disable-next-line react/no-array-index-key
            <div key={i}>{m}</div>
          ))}
        </>
      );
    }
  };
  return { success, warning, error };
};

/** Hook to simplify read and write of query string parameters.
 * @param {String | Object} [options]
 *   The configuration options. Simplified version accepts paramName as the first argument using default options;
 * @param {String} options.name
 *   The parameter name
 * @param {Boolean} [options.remove = true]
 *   If true the param won't be added to query string if it's value is falsy
 * @param {String} [defaultValue = undefined]
 *   Default value to be used
 * @returns {[String, Function]} [paramValue, setParamValue]
 *   The paramValue is a value from queryString, setParamValue should be called to set a new value..
 */
export const useQueryParam = (configOptions, defaultValue) => {
  const defaultOptions = {
    remove: true,
  };
  const options =
    typeof configOptions === 'string'
      ? {
          ...defaultOptions,
          name: configOptions,
        }
      : { ...defaultOptions, ...configOptions };
  const { name, remove } = options;
  const location = useLocation();
  const history = useHistory();
  const paramValue = useMemo(() => {
    const query = queryString.parse(location.search);
    return query[name];
  }, [location.search, name]);
  const setParamValue = useCallback(
    value => {
      const query = queryString.parse(location.search);
      query[name] = remove && !value ? undefined : value;
      history.push({
        pathname: location.pathname,
        search: queryString.stringify(query),
      });
    },
    [history, location]
  );
  useEffect(() => {
    if (defaultValue && !paramValue) setParamValue(defaultValue);
  }, [defaultValue]);
  return [paramValue || defaultValue, setParamValue];
};

/** Hook to get date time formatting function
 * @returns {Function}
 *   The function to format date time to the human readable value
 */
export const useFormatDateTime = () => {
  return useSelector(formatDateTimeSelector);
};
