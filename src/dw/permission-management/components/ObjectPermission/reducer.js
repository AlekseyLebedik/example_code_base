import * as actionTypes from './actionTypes';

export const INITIAL_STATE = {
  contentTypePermissions: {},
  objectPermissions: {},
  relatedPermissions: [],
  companies: [],
  companyGroups: [],
  Components: {
    ObjectPermissionManager: {
      initializationError: null,
    },
  },
};

export default function reducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case actionTypes.CONTENT_TYPE_FETCH_SUCCESS:
      return {
        ...state,
        contentTypePermissions: {
          ...state.contentTypePermissions,
          [action.id]: action.data,
        },
      };
    case actionTypes.COMPANIES_FETCH_SUCCESS:
      return {
        ...state,
        companies: action.append
          ? [...state.companies, ...action.data]
          : action.data,
      };
    case actionTypes.COMPANY_GROUPS_FETCH_SUCCESS:
      return {
        ...state,
        companyGroups: action.data,
      };
    case actionTypes.OBJECT_PERMISSIONS_FETCH_SUCCESS:
      return {
        ...state,
        objectPermissions: {
          ...state.objectPermissions,
          [action.ctypeId]: {
            ...state.objectPermissions[action.ctypeId],
            [action.entityType]: action.data,
          },
        },
      };
    case actionTypes.FETCH_RELATED_PERMISSONS_SUCCESS:
      return {
        ...state,
        relatedPermissions: [...action.data.data],
      };
    case actionTypes.COMPANIES_FETCH_FAIL:
    case actionTypes.COMPANY_GROUPS_FETCH_FAIL:
    case actionTypes.CONTENT_TYPE_FETCH_FAIL:
    case actionTypes.OBJECT_PERMISSIONS_FETCH_FAIL:
      return {
        ...state,
        Components: {
          ...state.Components,
          ObjectPermissionManager: { initializationError: action.error },
        },
      };
    default:
      return state;
  }
}
