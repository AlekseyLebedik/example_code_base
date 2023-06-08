import { SubmissionError } from 'redux-form';
import uniq from 'lodash/uniq';
import { getFormError } from '../../helpers/form-error';
import * as API from '../../services/user';
import { findEnvironmentFromId, normalizeSettings } from './helpers';

const SET_USER_PROFILE = 'devzone/SET_USER_PROFILE';
const FETCH_USER_PROFILE = 'devzone/FETCH_USER_PROFILE';
const FETCH_USER_PROFILE_SUCCESS = 'devzone/FETCH_USER_PROFILE_SUCCESS';
const FETCH_USER_PROFILE_FAILED = 'devzone/FETCH_USER_PROFILE_FAILED';
const FETCH_USER_PROFILE_SETTINGS = 'devzone/FETCH_USER_PROFILE_SETTINGS';
const FETCH_USER_PROFILE_SETTINGS_SUCCESS =
  'devzone/FETCH_USER_PROFILE_SETTINGS_SUCCESS';
const FETCH_USER_PROFILE_SETTINGS_FAILED =
  'devzone/FETCH_USER_PROFILE_SETTINGS_FAILED';
const FETCH_USER_PROJECTS = 'devzone/FETCH_USER_PROJECTS';
const FETCH_USER_PROJECTS_SUCCESS = 'devzone/FETCH_USER_PROJECTS_SUCCESS';
const FETCH_USER_PROJECTS_FAILED = 'devzone/FETCH_USER_PROJECTS_FAILED';
const UPDATE_USER_PROFILE = 'devzone/UPDATE_USER_PROFILE';
const UPDATE_USER_PROFILE_SUCCESS = 'devzone/UPDATE_USER_PROFILE_SUCCESS';
const UPDATE_USER_PROFILE_FAILED = 'devzone/UPDATE_USER_PROFILE_FAILED';
const UPDATE_USER_PROFILE_SETTING = 'devzone/UPDATE_USER_PROFILE_SETTING';
const UPDATE_USER_PROFILE_SETTING_SUCCESS =
  'devzone/UPDATE_USER_PROFILE_SETTING_SUCCESS';
const UPDATE_USER_PROFILE_SETTING_FAILED =
  'devzone/UPDATE_USER_PROFILE_SETTING_FAILED';
const CREATE_USER_PROFILE_SETTING = 'devzone/CREATE_USER_PROFILE_SETTING';
const CREATE_USER_PROFILE_SETTING_SUCCESS =
  'devzone/CREATE_USER_PROFILE_SETTING_SUCCESS';
const CREATE_USER_PROFILE_SETTING_FAILED =
  'devzone/CREATE_USER_PROFILE_SETTING_FAILED';
const LOGOUT_USER = 'devzone/LOGOUT_USER';

const BOOKMARKS_ADD = 'devzone/USER/BOOKMARKS_ADD';
const BOOKMARKS_ADD_SUCCESS = 'devzone/USER/BOOKMARKS_ADD_SUCCESS';
const BOOKMARK_COUNTER_RESET = 'devzone/USER/BOOKMARK_COUNTER_RESET';

const BOOKMARKS_DELETE = 'devzone/USER/BOOKMARKS_DELETE';
const BOOKMARKS_DELETE_SUCCESS = 'devzone/USER/BOOKMARKS_DELETE_SUCCESS';

const FAVORITE_PLAYER_ADD = 'devzone/USER/FAVORITE_PLAYER_ADD';
const FAVORITE_PLAYER_ADD_SUCCESS = 'devzone/USER/FAVORITE_PLAYER_ADD_SUCCESS';

const FAVORITE_PLAYER_DELETE = 'devzone/USER/FAVORITE_PLAYER_DELETE';
const FAVORITE_PLAYER_DELETE_SUCCESS =
  'devzone/USER/FAVORITE_PLAYER_DELETE_SUCCESS';

export const actionTypes = {
  SET_USER_PROFILE,

  FETCH_USER_PROFILE,
  FETCH_USER_PROFILE_SUCCESS,

  FETCH_USER_PROFILE_SETTINGS,
  FETCH_USER_PROFILE_SETTINGS_SUCCESS,

  FETCH_USER_PROJECTS,
  FETCH_USER_PROJECTS_SUCCESS,

  UPDATE_USER_PROFILE,
  UPDATE_USER_PROFILE_SUCCESS,
  UPDATE_USER_PROFILE_FAILED,

  UPDATE_USER_PROFILE_SETTING,
  UPDATE_USER_PROFILE_SETTING_SUCCESS,
  UPDATE_USER_PROFILE_SETTING_FAILED,

  CREATE_USER_PROFILE_SETTING,
  CREATE_USER_PROFILE_SETTING_SUCCESS,
  CREATE_USER_PROFILE_SETTING_FAILED,

  LOGOUT_USER,

  BOOKMARKS_ADD,
  BOOKMARKS_ADD_SUCCESS,
  BOOKMARK_COUNTER_RESET,

  BOOKMARKS_DELETE,
  BOOKMARKS_DELETE_SUCCESS,

  FAVORITE_PLAYER_ADD,
  FAVORITE_PLAYER_ADD_SUCCESS,

  FAVORITE_PLAYER_DELETE,
  FAVORITE_PLAYER_DELETE_SUCCESS,
};

// Only for test purpose
function setUserProfile(data) {
  return { type: SET_USER_PROFILE, data };
}

function fetchUserProfile() {
  return { type: FETCH_USER_PROFILE };
}

function fetchUserProfileSuccess(data) {
  return {
    type: FETCH_USER_PROFILE_SUCCESS,
    profile: {
      id: data.id,
      name: data.name,
      userName: data.username,
      email: data.email,
      companies: data.companies,
      isStaff: data.isStaff,
      isHijacked: data.isHijacked,
      defaultTitleEnv: data.defaultTitleEnv,
      timezone: data.timezone,
      permissions: data.permissions,
      allObjectPermissions: data.allObjectPermissions,
      favoriteSections: data.favoriteSections,
      favoritePlayers: data.favoritePlayers,
    },
  };
}

function fetchUserProfileFailed() {
  return { type: FETCH_USER_PROFILE_FAILED };
}

function fetchUserProfileSettings() {
  return { type: FETCH_USER_PROFILE_SETTINGS };
}

function fetchUserProfileSettingsSuccess(data) {
  return {
    type: FETCH_USER_PROFILE_SETTINGS_SUCCESS,
    settings: data.results,
  };
}

function fetchUserProfileSettingsFailed() {
  return { type: FETCH_USER_PROFILE_SETTINGS_FAILED };
}

function fetchUserProjects() {
  return { type: FETCH_USER_PROJECTS };
}

function fetchUserProjectsSuccess(data) {
  return {
    type: FETCH_USER_PROJECTS_SUCCESS,
    projects: data.data,
  };
}

function fetchUserProjectsFailed() {
  return { type: FETCH_USER_PROJECTS_FAILED };
}

function updateUserProfileSuccess(values) {
  return (dispatch, getState) => {
    const { projects } = getState().user;

    // Find the full defaultTitleEnv field format from the environment ID
    const envId = Number(values.defaultTitleEnv);
    const defaultTitleEnv = findEnvironmentFromId(projects, envId);

    dispatch({
      type: UPDATE_USER_PROFILE_SUCCESS,
      values: {
        ...values,
        defaultTitleEnv,
      },
    });
  };
}

function updateUserProfileFailed(error) {
  return { type: UPDATE_USER_PROFILE_FAILED, error };
}

function updateUserProfile(values) {
  return async dispatch => {
    try {
      const newValues = {
        ...values,
        timezone: values.timezone === '-' ? null : values.timezone,
      };
      await API.updateProfile(newValues);
      dispatch(updateUserProfileSuccess(newValues));
    } catch (e) {
      const validationErrors = getFormError(e);
      if (validationErrors === undefined) {
        dispatch(updateUserProfileFailed(e));
      } else {
        throw new SubmissionError(validationErrors);
      }
    }
  };
}

function createUserProfileSettingSuccess(data) {
  return {
    type: CREATE_USER_PROFILE_SETTING_SUCCESS,
    setting: data.data,
  };
}

function createUserProfileSettingFailed(error) {
  return { type: CREATE_USER_PROFILE_SETTING_FAILED, error };
}

function createUserProfileSetting(setting) {
  return async dispatch => {
    try {
      const data = await API.createUserSelfProfileSetting(setting);
      dispatch(createUserProfileSettingSuccess(data));
    } catch (e) {
      dispatch(createUserProfileSettingFailed(e));
    }
  };
}

function updateUserProfileSettingSuccess(data) {
  return {
    type: UPDATE_USER_PROFILE_SETTING_SUCCESS,
    setting: data.data,
  };
}

function updateUserProfileSettingFailed(error) {
  return { type: UPDATE_USER_PROFILE_SETTING_FAILED, error };
}

function updateUserProfileSetting(key, value) {
  return async dispatch => {
    try {
      const data = await API.updateUserSelfProfileSetting(key, value);
      dispatch(updateUserProfileSettingSuccess(data));
    } catch (e) {
      dispatch(updateUserProfileSettingFailed(e));
    }
  };
}

function logoutUser() {
  return { type: LOGOUT_USER };
}

function addBookmark(params) {
  return { type: BOOKMARKS_ADD, params };
}

function addBookmarkSuccess(params) {
  return { type: BOOKMARKS_ADD_SUCCESS, params };
}

function deleteBookmark(params) {
  return { type: BOOKMARKS_DELETE, params };
}

function deleteBookmarkSuccess(params) {
  return { type: BOOKMARKS_DELETE_SUCCESS, params };
}

function bookmarkCounterReset() {
  return { type: BOOKMARK_COUNTER_RESET };
}

function addFavoritePlayer(params) {
  return { type: FAVORITE_PLAYER_ADD, params };
}

function addFavoritePlayerSuccess(params) {
  return { type: FAVORITE_PLAYER_ADD_SUCCESS, params };
}

function deleteFavoritePlayer(params) {
  return { type: FAVORITE_PLAYER_DELETE, params };
}

function deleteFavoritePlayerSuccess(params) {
  return { type: FAVORITE_PLAYER_DELETE_SUCCESS, params };
}

export const actions = {
  setUserProfile,

  fetchUserProfile,
  fetchUserProfileSuccess,
  fetchUserProfileFailed,

  fetchUserProfileSettings,
  fetchUserProfileSettingsSuccess,
  fetchUserProfileSettingsFailed,

  fetchUserProjects,
  fetchUserProjectsSuccess,
  fetchUserProjectsFailed,

  updateUserProfile,
  updateUserProfileSetting,
  createUserProfileSetting,

  logoutUser,

  addBookmark,
  addBookmarkSuccess,

  deleteBookmark,
  deleteBookmarkSuccess,
  bookmarkCounterReset,

  addFavoritePlayer,
  addFavoritePlayerSuccess,

  deleteFavoritePlayer,
  deleteFavoritePlayerSuccess,
};

export const INITIAL_STATE = {
  loading: false,
  fetchFailed: false,
  projects: [],
  profile: {},
  bookmarkCount: 0,
  loadingKeys: [],
};

export default function reducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case SET_USER_PROFILE:
      return { ...state, ...action.data };
    case FETCH_USER_PROFILE_SUCCESS:
      return {
        ...state,
        profile: {
          ...state.profile,
          ...action.profile,
        },
      };
    case FETCH_USER_PROFILE_SETTINGS_SUCCESS:
      return {
        ...state,
        profile: {
          ...state.profile,
          settings: normalizeSettings(action.settings),
        },
      };
    case FETCH_USER_PROJECTS_SUCCESS:
      return { ...state, projects: action.projects };
    case FETCH_USER_PROFILE_FAILED:
    case FETCH_USER_PROJECTS_FAILED:
      return { ...state, fetchFailed: true };
    case UPDATE_USER_PROFILE_SUCCESS:
      return {
        ...state,
        profile: {
          ...state.profile,
          defaultTitleEnv: {
            ...action.values.defaultTitleEnv,
          },
          timezone: action.values.timezone,
        },
      };
    case CREATE_USER_PROFILE_SETTING_SUCCESS:
    case UPDATE_USER_PROFILE_SETTING_SUCCESS:
      return {
        ...state,
        profile: {
          ...state.profile,
          settings: {
            ...state.profile.settings,
            [action.setting.key]: JSON.parse(action.setting.value),
          },
        },
      };
    case BOOKMARKS_ADD:
      return {
        ...state,
        loading: true,
        loadingKeys: [
          ...state.loadingKeys,
          action.params.key,
          ...action.params.children.map(child => child.key),
        ],
      };
    case BOOKMARK_COUNTER_RESET:
      return {
        ...state,
        bookmarkCount: 0,
      };
    case BOOKMARKS_ADD_SUCCESS: {
      const newKeys = [
        action.params.key,
        ...action.params.children.map(child => child.key),
      ];
      const newSections = state.profile.favoriteSections.find(
        sec => sec.key === action.params.key
      )
        ? []
        : [{ ...action.params, parentBookmark: action.params.parent_bookmark }];
      const newCount = state.bookmarkCount + action.params.children.length;
      return {
        ...state,
        loading: false,
        profile: {
          ...state.profile,
          favoriteSections: [
            ...newSections,
            ...state.profile.favoriteSections.map(section =>
              section.key === action.params.key
                ? {
                    ...section,
                    children: [...section.children, ...action.params.children],
                    parentBookmark: action.params.parent_bookmark,
                  }
                : section
            ),
          ],
        },
        bookmarkCount: newCount < 0 ? 0 : newCount,
        loadingKeys: state.loadingKeys.filter(key => !newKeys.includes(key)),
      };
    }
    case BOOKMARKS_DELETE:
      return {
        ...state,
        loading: true,
        loadingKeys: [
          ...state.loadingKeys,
          action.params.key,
          ...action.params.children.map(child => child.key),
        ],
      };
    case BOOKMARKS_DELETE_SUCCESS: {
      const deletedChildren = action.params.children.map(child => child.key);
      const deletedKeys = [action.params.key, ...deletedChildren];
      const newCount = state.bookmarkCount - action.params.children.length;
      return {
        ...state,
        profile: {
          ...state.profile,
          favoriteSections: state.profile.favoriteSections.reduce(
            (acc, item) => {
              if (
                action.params.parentBookmark &&
                item.key === action.params.key
              )
                return acc;

              const newItem = { ...item };
              if (item.key === action.params.key) {
                newItem.children = newItem.children
                  ? newItem.children.filter(
                      child => !deletedChildren.includes(child.key)
                    )
                  : [];
              }
              if (newItem.children.length > 0) {
                return [...acc, newItem];
              }
              return acc;
            },
            []
          ),
        },
        bookmarkCount: newCount < 0 ? 0 : newCount,
        loadingKeys: state.loadingKeys.filter(
          key => !deletedKeys.includes(key)
        ),
      };
    }
    case FAVORITE_PLAYER_ADD:
    case FAVORITE_PLAYER_DELETE: {
      return {
        ...state,
        loading: true,
      };
    }
    case FAVORITE_PLAYER_ADD_SUCCESS: {
      return {
        ...state,
        loading: false,
        profile: {
          ...state.profile,
          favoritePlayers: uniq([
            ...state.profile.favoritePlayers,
            action.params,
          ]),
        },
      };
    }
    case FAVORITE_PLAYER_DELETE_SUCCESS: {
      return {
        ...state,
        loading: false,
        profile: {
          ...state.profile,
          favoritePlayers: state.profile.favoritePlayers.filter(
            fp =>
              fp.username !== action.params.username &&
              fp.accountId !== action.params.account_id
          ),
        },
      };
    }
    default:
      return state;
  }
}
