import get from 'lodash/get';
import extend from 'lodash/extend';
import { nest } from 'dw/core/helpers/arrays';
import { createSelector } from 'reselect';

import { contentTypesSelector } from '@demonware/devzone-core/modules/contentType/selectors';
import { relatedObjectTransform } from './helpers';

export const companiesSelector = state =>
  get(state, 'Core.ObjectPermissionManager.companies', []);

export const companyGroupsSelector = state =>
  get(state, 'Core.ObjectPermissionManager.companyGroups', []);

export const permissionsSelector = (state, props) => {
  const contentTypePermissions = get(
    state,
    'Core.ObjectPermissionManager.contentTypePermissions',
    []
  );
  return get(contentTypePermissions, props.ctypeId, []);
};

const relatedObjectPermissionsSelector = createSelector(
  state => get(state, 'Core.ObjectPermissionManager.relatedPermissions', []),
  relatedObjects => {
    const result = relatedObjectTransform(relatedObjects);
    return result;
  }
);

const contentTypeSelectorById = createSelector(
  contentTypesSelector,
  contentTypes => {
    const groupById = contentTypes.reduce(
      (target, { id, model }) => ({
        ...target,
        [id]: model,
      }),
      {}
    );
    return groupById;
  }
);
export const relatedObjectPermissionMain = createSelector(
  relatedObjectPermissionsSelector,
  contentTypeSelectorById,
  (relatedObjects, contentTypes) => {
    const relatedObjectsWithContentType = relatedObjects.map(item =>
      extend(item, { contentTypeName: contentTypes[item.contentTypeId] })
    );
    return nest(relatedObjectsWithContentType, [
      'contentTypeName',
      'objectDisplayName',
    ]);
  }
);
