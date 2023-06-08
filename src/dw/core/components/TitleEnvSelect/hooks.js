import { useEffect, useMemo, useState } from 'react';
import { useSelector } from 'react-redux';
import isEqual from 'lodash/isEqual';

import {
  currentEnvSelector,
  serviceEnabledEnvsListSelector,
} from 'dw/core/helpers/title-env-selectors';
import { useCancellablePromise } from 'dw/core/hooks';
import { getEnvsAccess as getEnvsAccessAPI } from './services';

const LIVE_ENV = 'Live';

export const useEnvironments = ({
  serviceName,
  requiredPermission,
  excludeCurrent,
  displayEnvsFromCurrentProject,
  excludeLive,
  sameProjectOnTop,
}) => {
  const currentEnv = useSelector(currentEnvSelector, isEqual);
  const allEnvironments = useSelector(
    state => serviceEnabledEnvsListSelector(state)(serviceName),
    isEqual
  );
  const filteredEnvs = useMemo(() => {
    const projectId =
      typeof displayEnvsFromCurrentProject === 'number'
        ? displayEnvsFromCurrentProject
        : currentEnv?.project;
    const excludeCurrentFn = excludeCurrent
      ? e => e.environment.id !== currentEnv.id
      : () => true;
    const displayCurrentProjectFn = displayEnvsFromCurrentProject
      ? e => e.project.id === projectId
      : () => true;
    const excludeLiveFn = excludeLive
      ? e => e.environment.type !== LIVE_ENV
      : () => true;

    const result = allEnvironments
      .filter(excludeCurrentFn)
      .filter(displayCurrentProjectFn)
      .filter(excludeLiveFn);

    if (sameProjectOnTop) {
      result.sort((x, y) => {
        const { project: currentProject } = currentEnv;
        if (x.project.id === currentProject) {
          return -1;
        }
        if (y.project.id === currentProject) {
          return 1;
        }
        return 0;
      });
    }
    return result;
  }, [allEnvironments, sameProjectOnTop]);
  const allEnvIds = useMemo(
    () => filteredEnvs.map(e => e.environment.id),
    [filteredEnvs]
  );

  const [permittedEnvIds, setPermittedEnvIds] = useState(
    requiredPermission ? null : allEnvIds
  );
  const [error, setError] = useState();

  const cancellablePromise = useCancellablePromise();

  useEffect(() => {
    if (requiredPermission && permittedEnvIds === null) {
      setError(null);
      const fetchEnvsAccess = async (permission, env) => {
        try {
          const { data } = await cancellablePromise(getEnvsAccessAPI, {
            permission,
            env,
          });
          setPermittedEnvIds(data);
        } catch (e) {
          if (e.isCanceled) return;
          // eslint-disable-next-line
          console.log(e);
          setError.error('Something went wrong. See console logs for details.');
        }
      };
      fetchEnvsAccess(requiredPermission, allEnvIds);
    }
  }, [requiredPermission, permittedEnvIds, allEnvIds]);
  return {
    loading: permittedEnvIds === null,
    environments: useMemo(() => {
      return permittedEnvIds
        ? filteredEnvs.filter(e => permittedEnvIds.includes(e.environment.id))
        : [];
    }, [filteredEnvs, permittedEnvIds]),
    error,
  };
};
