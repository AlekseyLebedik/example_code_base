import { AUTH_SERVICE_PROVIDER_HOST } from '../config';
import axios from '../axios';

const RESOURCE = 'users/self';

export const fetchUserCompanyMemberships = ({ userID, ...params } = {}) =>
  axios.get(
    `/${userID ? RESOURCE.replace('self', userID) : RESOURCE}/memberships/`,
    { params }
  );

export const changeUserMemberships = (userID, companies) =>
  axios.put(`users/${userID}/memberships/`, {
    companies: companies.map(companyId => ({ id: companyId })),
  });

export const getUserSelfProfile = params =>
  axios.get(`/${RESOURCE}/profile/`, { params });

export const getUserSelfProfileSettings = (key = '') =>
  axios.get(`/${RESOURCE}/profile/settings/${key}`);

export const createUserSelfProfileSetting = data =>
  axios.post(`/${RESOURCE}/profile/settings/`, data);

export const updateUserSelfProfileSetting = (key, data) =>
  axios.patch(`/${RESOURCE}/profile/settings/${key}/`, data);

export const getUserSelfProjects = params =>
  axios.get(`/${RESOURCE}/projects/`, { params });

export function updateProfile(data) {
  return axios.patch(`/${RESOURCE}/profile/`, data);
}

export function logoutProfile() {
  return axios.get(`${AUTH_SERVICE_PROVIDER_HOST}/logout`);
}

export function addBookmark(params) {
  return axios.put(`/${RESOURCE}/favorites/`, params);
}

export function deleteBookmark(payload) {
  return axios.delete(`/${RESOURCE}/favorites/`, { data: { ...payload } });
}

export function addFavoritePlayer(params) {
  return axios.put(`/${RESOURCE}/favorite-players/`, params);
}

export function deleteFavoritePlayer(payload) {
  return axios.delete(`/${RESOURCE}/favorite-players/`, {
    data: { ...payload },
  });
}
