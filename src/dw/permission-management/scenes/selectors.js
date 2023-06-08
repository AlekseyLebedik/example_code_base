import memoizeOne from 'memoize-one';
import { createSelector } from 'reselect';
import groupBy from 'lodash/groupBy';
import isEmpty from 'lodash/isEmpty';
import sortedUniq from 'lodash/sortedUniq';

export const selectedItemIdSelector = (_, props) => props.match.params.id;
const selectItemFn = (id, items) =>
  items && id
    ? items.find(item => item.id.toString() === id.toString())
    : undefined;

export const createSelectedItemSelector = list =>
  createSelector(selectedItemIdSelector, list, selectItemFn);

/**
 * Extracts single attribute from all objects retuned by the given selector
 *
 * @param {selector} objectsSelector
 * @returns {selector} selector function
 *
 * @example
 *
 *    const objectsSelector = createCompaniesSelector(state =>  state.Scenes.Users.Companies.data || [])
 *    const companyIDsSelector = createAttrSelector(companiesSelector, 'id')
 *    const companyIDs = companyIDsSelector(state)
 */
export const createAttrSelector = (objectsSelector, attr) =>
  createSelector(objectsSelector, objects => objects.map(x => x[attr]));

export const createIsLoadingDetailsSelector = (
  isLoadingContentTypesSelector,
  objectPermissionsSelector,
  selectedItemSelector
) =>
  createSelector(
    isLoadingContentTypesSelector,
    objectPermissionsSelector,
    selectedItemSelector,
    (loadingContentType, objectPermissions, selectedItem) => {
      const selectedObjectPermission = selectedItem
        ? objectPermissions[selectedItem.id]
        : null;
      if (!selectedObjectPermission) {
        return loadingContentType;
      }
      return loadingContentType || selectedObjectPermission.loading;
    }
  );

const groupSelectedPermission = memoizeOne(
  (field, selectedItem, objectPermissions) => {
    const selectedObjectPermission = selectedItem
      ? objectPermissions[selectedItem.id]
      : null;
    if (!selectedObjectPermission) {
      return {};
    }

    return groupBy(selectedObjectPermission.data, field);
  }
);

export const createInitialValuesSelector = (
  selectedItemSelector,
  objectPermissionsSelector,
  contentTypesSelector,
  usersSelector = () => undefined
) =>
  createSelector(
    selectedItemSelector,
    objectPermissionsSelector,
    contentTypesSelector,
    usersSelector,
    (selectedItem, objectPermissions, contentTypes, users) => {
      const objectPermByContent = groupSelectedPermission(
        'contentTypeId',
        selectedItem,
        objectPermissions
      );

      const objectPermByDetail = groupSelectedPermission(
        'objectPk',
        selectedItem,
        objectPermissions
      );

      if (
        isEmpty(objectPermByContent) ||
        isEmpty(objectPermByDetail) ||
        objectPermByDetail.length === 0
      ) {
        return {
          users,
          contentTypes: contentTypes.map(x => ({
            cTypeId: x.id,
            selections: [],
          })),
        };
      }

      return {
        users,
        contentTypes: contentTypes.map(c => {
          if (objectPermByContent[c.id]) {
            const detailsGroupedBySelections = objectPermByContent[c.id].reduce(
              (selections, objPerm) => {
                const objPk = parseInt(objPerm.objectPk, 10);
                const detailSelections = sortedUniq(
                  objectPermByDetail[objPk]
                    .filter(x => x.contentTypeId === c.id)
                    .map(x => x.permissionId)
                ).join('.');
                if (!selections[detailSelections]) {
                  return {
                    ...selections,
                    [detailSelections]: [objPk],
                  };
                }
                if (!selections[detailSelections].includes(objPk)) {
                  return {
                    ...selections,
                    [detailSelections]: [
                      ...selections[detailSelections],
                      objPk,
                    ],
                  };
                }
                return selections;
              },
              {}
            );
            return {
              selections: Object.entries(detailsGroupedBySelections).map(
                ([permissionIds, details]) => ({
                  permissions: permissionIds
                    .split('.')
                    .map(id => parseInt(id, 10)),
                  selectedDetails: details,
                })
              ),
              cTypeId: c.id,
            };
          }

          return {
            selections: [],
            cTypeId: c.id,
          };
        }),
      };
    }
  );

export const companiesDataSelector = state =>
  (!state.Scenes.companies.loading && state.Scenes.companies.data) || [];

export const companiesSelector = createSelector(
  companiesDataSelector,
  companies => companies
);

export const companyIDsSelector = createAttrSelector(companiesSelector, 'id');
