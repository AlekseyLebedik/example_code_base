import { recordSaga } from '@demonware/devzone-core/helpers/sagas';
import * as permissionApi from 'dw/permission-management/services/permissions';
import * as helperActions from '@demonware/devzone-core/helpers/actions';
import {
  createEditObjectPermissionsSuccess,
  createFetchObjectPermissionsSuccess,
  editObjectPermissionsFailed,
  fetchObjectPermissionsFailed,
} from 'dw/permission-management/scenes/actionCreators';
import {
  createFetchContentTypes,
  createFetchContentDetail,
  createEditObjectPermissions,
  createFetchObjectPermissions,
  createObjectPermissionsSaga,
} from 'dw/permission-management/scenes/sagaCreators';
import {
  contentTypes,
  contentTypeDetails,
  permissions,
  objectPermissionsGroups,
} from 'dw/permission-management/services/mock/permissions';
import { CONTENT_TYPES } from '../constants';

jest.mock('dw/permission-management/services/permissions');
jest.mock('@demonware/devzone-core/helpers/errors', () => ({
  nonCriticalHTTPError: () => ({}),
}));

describe('Sagas Creators', () => {
  const prefix = 'prefix';
  const resourceType = 'groups';
  beforeEach(() => {
    permissionApi.getContentTypes = jest.fn(() => contentTypes);
    permissionApi.getContentTypeDetail = jest.fn(() => contentTypeDetails);
    permissionApi.getPermissionsByContentType = jest.fn(() => permissions);
    permissionApi.editObjectPermissions = jest.fn(() => ({
      data: [],
    }));
    permissionApi.getObjectPermissionsById = jest.fn(
      () => objectPermissionsGroups
    );
    helperActions.fetchFailed = jest.fn(() => []);
    jest.clearAllMocks();
  });

  describe('creatorsFunctions', () => {
    it('createFetchContentTypes', () => {
      const fetchContentTypes = createFetchContentTypes(prefix, resourceType);

      expect(fetchContentTypes).toBeInstanceOf(Function);
    });

    it('createFetchContentDetail', () => {
      const fetchContentTypeDetail = createFetchContentDetail(prefix);

      expect(fetchContentTypeDetail).toBeInstanceOf(Function);
    });

    it('createFetchObjectPermissions', () => {
      const fetchObjectPermissions = createFetchObjectPermissions(
        prefix,
        resourceType
      );

      expect(fetchObjectPermissions).toBeInstanceOf(Function);
    });

    it('createEditObjectPermissions', () => {
      const editObjectPermissions = createEditObjectPermissions(
        prefix,
        resourceType
      );

      expect(editObjectPermissions).toBeInstanceOf(Function);
    });

    it('createObjectPermissionsSaga', () => {
      const objectPermissionsSaga = createObjectPermissionsSaga(
        prefix,
        resourceType
      );

      expect(objectPermissionsSaga).toBeInstanceOf(Function);
    });
  });

  describe('fetchContentTypes', () => {
    it('success flow', async () => {
      const initialAction = {};
      const fetchContentTypes = createFetchContentTypes(
        `${prefix}${CONTENT_TYPES}`,
        resourceType
      );

      const dispatched = await recordSaga(fetchContentTypes, initialAction);

      const resultSuccess = helperActions.fetchSuccess(
        `${prefix}${CONTENT_TYPES}`,
        contentTypes.data
      );

      expect(permissionApi.getContentTypes).toHaveBeenCalled();
      expect(dispatched).toMatchObject([
        {
          ...resultSuccess,
          data: resultSuccess.data.map(contentType => ({
            ...contentType,
          })),
        },
      ]);
    });

    it('error flow', async () => {
      const initialAction = {};
      const error = new Error('error');

      permissionApi.getContentTypes = jest.fn(() => {
        throw error;
      });
      const fetchContentTypes = createFetchContentTypes(prefix, resourceType);

      const dispatched = await recordSaga(fetchContentTypes, initialAction);
      const resultFailed = helperActions.fetchFailed(
        `${prefix}${CONTENT_TYPES}`,
        error
      );

      expect(dispatched).toContainEqual(resultFailed);
    });
  });

  describe('fetchContentDetails', () => {
    it('success flow', async () => {
      const contentType = {
        id: 1,
        Links: {
          self: {
            href: 'test/bla',
          },
        },
      };
      const fetchContentTypeDetail = createFetchContentDetail(prefix);

      const dispatched = await recordSaga(fetchContentTypeDetail, {
        cType: contentType,
        companyIds: ['13'],
      });

      expect(permissionApi.getContentTypeDetail).toHaveBeenCalledWith(
        contentType.Links.self.href,
        { companyId: '13' }
      );

      expect(dispatched).toEqual([]);
    });

    it('error flow', async () => {
      const contentType = {
        id: 1,
        Links: {
          self: {
            href: 'test/bla',
          },
        },
      };
      permissionApi.getContentTypeDetail = jest.fn(() => {
        throw new Error('error');
      });
      const fetchContentTypeDetail = createFetchContentDetail(prefix);

      const dispatched = await recordSaga(fetchContentTypeDetail, contentType);
      const resultFailed = helperActions.fetchFailed(
        `${prefix}${CONTENT_TYPES}`,
        'error'
      );

      expect(dispatched).toContainEqual(resultFailed);
    });
  });

  describe('editObjectPermissions', () => {
    it('success flow', async () => {
      const action = {
        id: 1,
        data: [1, 2],
      };
      const editObjectPermissions = createEditObjectPermissions(
        prefix,
        resourceType
      );

      const dispatched = await recordSaga(editObjectPermissions, action);

      const resultSuccessFn = createEditObjectPermissionsSuccess(prefix);

      expect(permissionApi.editObjectPermissions).toHaveBeenCalledWith(
        action.id,
        action.data,
        resourceType
      );

      expect(dispatched).toContainEqual(resultSuccessFn(action.id));
    });

    it('error flow', async () => {
      const action = {
        id: 1,
        data: [1, 2],
      };
      const error = new Error('error');
      permissionApi.editObjectPermissions = jest.fn(() => {
        throw error;
      });
      const editObjectPermissions = createEditObjectPermissions(
        prefix,
        resourceType
      );

      const dispatched = await recordSaga(editObjectPermissions, action);

      expect(dispatched).toContainEqual(
        editObjectPermissionsFailed(prefix, action.id)
      );
    });
  });

  describe('fetchObjectPermissions', () => {
    it('success flow', async () => {
      const action = {
        id: 1,
      };
      const fetchObjectPermissions = createFetchObjectPermissions(
        prefix,
        resourceType
      );

      const dispatched = await recordSaga(fetchObjectPermissions, action);

      const resultSuccessFn = createFetchObjectPermissionsSuccess(prefix);

      expect(permissionApi.getObjectPermissionsById).toHaveBeenCalledWith(
        action.id,
        resourceType
      );

      expect(dispatched).toContainEqual(
        resultSuccessFn(action.id, objectPermissionsGroups.data)
      );
    });

    it('error flow', async () => {
      const action = {
        id: 1,
      };
      const error = new Error('error');
      permissionApi.getObjectPermissionsById = jest.fn(() => {
        throw error;
      });
      const fetchObjectPermissions = createFetchObjectPermissions(
        prefix,
        resourceType
      );

      const dispatched = await recordSaga(fetchObjectPermissions, action);

      expect(dispatched).toContainEqual(
        fetchObjectPermissionsFailed(prefix, action.id)
      );
    });
  });
});
