import { createFetch } from '@demonware/devzone-core/helpers/actions';
import * as GlobalSnackBarActions from '@demonware/devzone-core/components/GlobalSnackBar/actions';

export const fetchAvailableUsers =
  type =>
  (params = {}) =>
    createFetch(type, null, { ...params, sort: 'name' }, params.nextPage);

export const fetchGroups =
  type =>
  (params = {}, append) =>
    createFetch(type, null, { ...params }, params.nextPage || append);

export const createGroup = type => group => ({ type, group });

export const deleteGroup = type => (groupId, params, callback) => ({
  type,
  groupId,
  params,
  callback,
});

export const createGroupSuccess = (type, group) => dispatch => {
  dispatch(
    GlobalSnackBarActions.show(`Group "${group.name}" successfully created.`),
    'success'
  );
  dispatch({ type, group });
};
