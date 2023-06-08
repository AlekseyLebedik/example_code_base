const FETCH_USER_MEMBERSHIPS = 'devzone/FETCH_USER_MEMBERSHIPS';
const FETCH_USER_MEMBERSHIPS_SUCCESS = 'devzone/FETCH_USER_MEMBERSHIPS_SUCCESS';
const FETCH_USER_MEMBERSHIPS_FAILED = 'devzone/FETCH_USER_MEMBERSHIPS_FAILED';

export const actionTypes = {
  FETCH_USER_MEMBERSHIPS,
  FETCH_USER_MEMBERSHIPS_SUCCESS,
  FETCH_USER_MEMBERSHIPS_FAILED,
};

function fetchUserMemberships() {
  return {
    type: FETCH_USER_MEMBERSHIPS,
  };
}

function fetchUserMembershipsSuccess(memberships) {
  return { type: FETCH_USER_MEMBERSHIPS_SUCCESS, memberships };
}

function fetchUserMembershipsFailed() {
  return { type: FETCH_USER_MEMBERSHIPS_FAILED };
}

export const actions = {
  fetchUserMemberships,
  fetchUserMembershipsSuccess,
  fetchUserMembershipsFailed,
};

export const INITIAL_STATE = {
  fetchFailed: false,
  memberships: null,
};

export default function reducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case FETCH_USER_MEMBERSHIPS:
      return {
        ...state,
        loading: true,
      };
    case FETCH_USER_MEMBERSHIPS_SUCCESS:
      return {
        ...state,
        memberships: action.memberships,
        loading: false,
      };
    case FETCH_USER_MEMBERSHIPS_FAILED:
      return { ...state, memberships: [], fetchFailed: true, loading: false };
    default:
      return state;
  }
}
