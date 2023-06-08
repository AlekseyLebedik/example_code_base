import { createSelector } from 'reselect';
import get from 'lodash/get';

import { userMembershipsSelector } from '../user/selectors';
import { contentTypesByIdSelector } from '../contentType/selectors';

const computePermissionKey = (permission, objectId, objectContentTypeId) =>
  [permission, objectId, objectContentTypeId].join('-');

const userProfilePermissionsSelector = state =>
  get(state, 'user.profile.permissions', []);

const userProfileAllObjectPermissionsSelector = state =>
  get(state, 'user.profile.allObjectPermissions', []);

export const userPermissionsSelector = createSelector(
  [
    userMembershipsSelector,
    userProfilePermissionsSelector,
    userProfileAllObjectPermissionsSelector,
  ],
  (memberships, userPermissions, allObjectPermissions) => {
    // if (memberships.length === 0) return null;
    const permissionsSet = new Set();

    // Now the permissions are collected at once in the backend
    allObjectPermissions.forEach(permission =>
      permissionsSet.add(
        computePermissionKey(
          permission.permission,
          permission.objectPk,
          permission.contentTypeId
        )
      )
    );
    // collect all permissions from all user's memberships
    memberships.forEach(membership => {
      // collect all permissions granted to the groups that the authenticated user is member of
      membership.groups.forEach(group => {
        group.permissions.forEach(permission =>
          permissionsSet.add(
            computePermissionKey(
              permission.codename,
              permission.objectId,
              permission.contentTypeId
            )
          )
        );
      });

      // collect all permissions directly granted to the authenticated user's membership
      membership.permissions.forEach(permission =>
        permissionsSet.add(
          computePermissionKey(
            permission.codename,
            permission.objectId,
            permission.contentTypeId
          )
        )
      );
    });

    // collect directly associated permissions
    userPermissions.forEach(permission =>
      permissionsSet.add(
        computePermissionKey(
          permission.codename,
          permission.objectId,
          permission.contentTypeId
        )
      )
    );
    return permissionsSet;
  }
);

export default userPermissionsSelector;

export const userPermissionsByModel = createSelector(
  userProfileAllObjectPermissionsSelector,
  contentTypesByIdSelector,
  (allObjectPermissions, contentTypes) => {
    const permByModel = {};
    allObjectPermissions.forEach(i => {
      if (i.contentTypeId in contentTypes) {
        const contentType = contentTypes[i.contentTypeId];
        const model = `${contentType.appLabel}.${contentType.model}`;
        const modelPermissions = get(permByModel, model, []);
        modelPermissions.push(i);
        permByModel[model] = modelPermissions;
      }
    });
    return permByModel;
  }
);
