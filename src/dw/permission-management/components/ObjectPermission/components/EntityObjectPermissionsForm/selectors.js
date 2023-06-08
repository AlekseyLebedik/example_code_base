import groupBy from 'lodash/groupBy';
import get from 'lodash/get';
import { createSelector } from 'reselect';
import * as entityTypes from '../../entityTypes';

const entityTypeIdAttribute = {
  [entityTypes.COMPANY]: 'companyId',
  [entityTypes.GROUP]: 'companyGroupId',
  [entityTypes.USER]: 'userEmail',
};

const entityTypeNameAttribute = {
  [entityTypes.COMPANY]: 'companyName',
  [entityTypes.GROUP]: 'companyGroupName',
  [entityTypes.USER]: 'userEmail',
};

export const objectPermissionsSelector = (state, props) =>
  get(state.Core.ObjectPermissionManager.objectPermissions, props.ctypeId, {
    [entityTypes.COMPANY]: [],
    [entityTypes.GROUP]: [],
    [entityTypes.USER]: [],
  });

export const entityTypeSelector = (state, props) => props.entityType;

export const entityPermissionsSelector = createSelector(
  [entityTypeSelector, objectPermissionsSelector],
  (entityType, objectPermissions) => {
    const nameAttr = entityTypeNameAttribute[entityType];
    const idAttr = entityTypeIdAttribute[entityType];

    const permissionsByEntity = groupBy(objectPermissions[entityType], idAttr);
    return Object.keys(permissionsByEntity).map(entityId => ({
      [idAttr]: entityId,
      name: get(permissionsByEntity, `${entityId}[0].${nameAttr}`, entityId),
      permissions: get(permissionsByEntity, entityId, []).map(
        i => i.permissionId
      ),
    }));
  }
);
