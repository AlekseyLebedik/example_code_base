import axios from 'dw/core/axios';

export const getUsers = ({ nextPage, ...params }) =>
  axios.get(nextPage || 'users/', { params });

export const getAvailableGroups = params =>
  axios.get(`company-groups/`, { params });

export const getAssignedGroups = ({ userID, ...params }) =>
  axios.get(`users/${userID}/company-groups/`, { params });

export const addUserToGroup = (userID, groups) =>
  axios.put(`users/${userID}/company-groups/`, {
    groups: groups.map(group => ({ id: group })),
  });

export const exportUsers = ({ id, isGroup }) => {
  const headers = { Accept: 'text/csv' };
  if (isGroup) {
    return axios.get(`company-groups/${id}/users/`, { headers });
  }
  return axios.get('users/', { params: { companyId: id }, headers });
};
