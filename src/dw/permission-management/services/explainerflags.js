import axios from 'dw/core/axios';

export const getFeatureFlag = ({ userID, sortType }) =>
  axios.get(`/feature-switches/user/${userID}?sort=${sortType}`);
export const getPermissionExplainer = ({ userID, permissionID, objectType }) =>
  axios.get(
    `/permission-explain/user/${userID}/permission/${permissionID}/object/${objectType}/`
  );
