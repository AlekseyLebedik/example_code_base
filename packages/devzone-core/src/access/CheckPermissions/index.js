import { useEffect, useState, useRef } from 'react';
import PropTypes from 'prop-types';

import axios from '../../axios';
import { API_BASE_URL } from '../../config';
import { useCompare, memoizeFn } from '../../helpers/hooks';

const BASE_URL = `${API_BASE_URL}/users/self/check-permissions/`;

function fetchPermissionsFn(predicates, objects) {
  let objectsList = objects;
  let predicatesList = predicates;
  if (!Array.isArray(predicates) && typeof predicates === 'string') {
    predicatesList = [predicates];
  }
  if (!Array.isArray(objects) && typeof objects === 'string') {
    objectsList = [objects];
  }
  if (predicatesList.length > 1 && objectsList.length > 1) {
    throw new Error(
      'Checking multiple predicates against multiple objects is not supported'
    );
  }
  const predicatesParams = predicatesList
    .map(predicate => `predicates=${predicate}`)
    .join('&');
  const objectsParams = objectsList.map(obj => `objects=${obj}`).join('&');
  // TODO: handle non 200 responses and populate error
  return axios.get(`${BASE_URL}?${predicatesParams}&${objectsParams}`);
}

export const fetchPermissions = memoizeFn(fetchPermissionsFn);

export function usePermissions(inputPredicates, inputObjects) {
  const [result, setResult] = useState(null);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  const predicates = useCompare(inputPredicates);
  const objects = useCompare(inputObjects);

  const isMounted = useRef(true);

  useEffect(
    () => () => {
      isMounted.current = false;
    },
    []
  );

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      try {
        const r = await fetchPermissions(predicates, objects);
        if (isMounted.current) setResult(r);
      } catch (e) {
        if (isMounted.current) setError(e);
      } finally {
        if (isMounted.current) setLoading(false);
      }
    };
    load();
  }, [predicates, objects]);

  return [loading, error, result];
}

export function CheckPermission({
  children,
  predicate,
  object,
  noPermissionsComponent,
}) {
  const [loading, , result] = usePermissions([predicate], [object]);
  if (result?.data?.permission) {
    return children;
  }
  if (loading) {
    return null;
  }
  return noPermissionsComponent ? noPermissionsComponent() : null;
}

CheckPermission.propTypes = {
  object: PropTypes.string.isRequired,
  predicate: PropTypes.string.isRequired,
  children: PropTypes.oneOfType([PropTypes.func, PropTypes.node]).isRequired,
  noPermissionsComponent: PropTypes.elementType,
};
CheckPermission.defaultProps = { noPermissionsComponent: undefined };
