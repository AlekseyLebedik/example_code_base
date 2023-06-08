// Playpants Custom React Hooks
import { useEffect, useMemo, useRef } from 'react';
import { useSelector } from 'react-redux';
import * as PERMISSIONS from '@demonware/devzone-core/access/PermissionCheck/permissions';
import { usePermissions } from '@demonware/devzone-core/access/CheckPermissions';
import { currentProjectIdSelector } from 'playpants/components/App/components/ProjectSelector/selectors';
import { getNowTimestamp } from 'playpants/helpers/dateTime';
import { prettyPrint } from 'playpants/helpers/json';

// run hook only on componentDidUpdate and not componentDidMount (prevents a hook from running on initial render)
export const useDidUpdateEffect = (fn, inputs) => {
  const didMountRef = useRef(false);

  useEffect(() => {
    if (didMountRef.current) fn();
    else didMountRef.current = true;
  }, inputs);
};

// sets and clears an interval to run callback on mount for delay in seconds
export const useInterval = (callback, delay) => {
  const savedCallback = useRef();

  // Remember the latest callback.
  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  // Set up the interval.
  useEffect(() => {
    const id = setInterval(() => {
      savedCallback.current();
    }, delay);
    return () => clearInterval(id);
  }, [delay]);
};

// updates a specified timestamp from user.profile.settings on mount
export const useUpdateUserTimestamp = (
  key,
  id,
  type,
  userLastVisits,
  updateUserProfileSetting,
  useProfileSettings = true
) => {
  useEffect(() => {
    if (id && useProfileSettings) {
      const value = prettyPrint({
        ...userLastVisits,
        [type]: getNowTimestamp(),
      });
      updateUserProfileSetting(`${key}${id}`, { value });
    }
  }, []);
};

const PERMISSION_MAP = {
  adminPermission: PERMISSIONS.PLAYPANTS_PROJECT_ADMIN,
  eventWritePermission: PERMISSIONS.PLAYPANTS_WRITE_EVENT,
  pubvarsWritePermission: PERMISSIONS.PLAYPANTS_WRITE_ACTIVITY_PUBVARS,
  pyscriptWritePermission: PERMISSIONS.PLAYPANTS_WRITE_ACTIVITY_PYSCRIPT,
  pubstorageWritePermission: PERMISSIONS.PLAYPANTS_WRITE_ACTIVITY_PUBSTORAGE,
  achievementWritePermission: PERMISSIONS.PLAYPANTS_WRITE_ACTIVITY_ACHIEVEMENT,
  publisherObjectsWritePermission:
    PERMISSIONS.PLAYPANTS_WRITE_ACTIVITY_PUBLISHER_OBJECTS,
  tpDeploymentWritePermission:
    PERMISSIONS.PLAYPANTS_WRITE_ACTIVITY_TP_DEPLOYMENT,
  gvsPublishPermission: PERMISSIONS.GVS_PUBLISH_CONFIGURATION,
};

export const useEMPermissions = () => {
  const predicates = Object.values(PERMISSION_MAP);
  const currentProjectId = useSelector(currentProjectIdSelector);
  const [loading, error, result] = usePermissions(
    predicates,
    `project.${currentProjectId}`
  );

  const permissions = useMemo(
    () => ({
      adminPermission: result?.data[PERMISSION_MAP.adminPermission] || false,
      eventWritePermission:
        result?.data[PERMISSION_MAP.eventWritePermission] || false,
      pubvarsWritePermission:
        result?.data[PERMISSION_MAP.pubvarsWritePermission] || false,
      pyscriptWritePermission:
        result?.data[PERMISSION_MAP.pyscriptWritePermission] || false,
      pubstorageWritePermission:
        result?.data[PERMISSION_MAP.pubstorageWritePermission] || false,
      achievementWritePermission:
        result?.data[PERMISSION_MAP.achievementWritePermission] || false,
      publisherObjectsWritePermission:
        result?.data[PERMISSION_MAP.publisherObjectsWritePermission] || false,
      tpDeploymentWritePermission:
        result?.data[PERMISSION_MAP.tpDeploymentWritePermission] || false,
      gvsPublishPermission:
        result?.data[PERMISSION_MAP.gvsPublishPermission] || false,
      wipPermission: true,
      staffUser: true,
    }),
    [result]
  );

  return [loading, error, permissions];
};

export const useEMPermissionsResult = () => {
  const [, , permissions] = useEMPermissions();
  return permissions;
};

export const useActivityPermissions = () => {
  const permissions = useEMPermissionsResult();
  return {
    ae: permissions.achievementWritePermission,
    motd: permissions.wipPermission,
    playlist: permissions.wipPermission,
    publisher_objects: permissions.publisherObjectsWritePermission,
    pubstorage: permissions.pubstorageWritePermission,
    pubvars: permissions.pubvarsWritePermission,
    pyscript: permissions.pyscriptWritePermission,
    tp_deployment: permissions.tpDeploymentWritePermission,
    gvs: permissions.gvsPublishPermission,
  };
};
