import uniqBy from 'lodash/uniqBy';
import flatMap from 'lodash/flatMap';

export const transformToObjectPermission = values =>
  uniqBy(
    values.contentTypes.reduce(
      (array, { selections, cTypeId }) => [
        ...array,
        ...selections.reduce(
          (permArray, { permissions, selectedDetails }) => [
            ...permArray,
            ...flatMap(
              selectedDetails
                ? selectedDetails.map(detail =>
                    permissions.map(perm => ({
                      permissionId: perm,
                      contentTypeId: cTypeId,
                      objectPk: detail,
                    }))
                  )
                : []
            ),
          ],
          []
        ),
      ],
      []
    ),
    item => `${item.permissionId}.${item.contentTypeId}.${item.objectPk}`
  ).filter(item => item.contentTypeId && item.permissionId && item.objectPk);
