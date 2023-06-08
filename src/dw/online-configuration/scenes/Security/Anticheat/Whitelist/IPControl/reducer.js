import * as AT from './actionTypes';

const INITIAL_STATE = {
  ipControl: null,
  q: undefined,
  addModalVisible: false,
  addModalSubmitting: false,
  nextPageToken: null,
};

const reducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case AT.IP_CONTROL_SEARCH:
      return {
        ...state,
        q: action.q,
      };
    case AT.IP_CONTROL_FETCH_SUCCESS: {
      const existing = action.payload.data.map(v => v.ipInt);
      return {
        ...state,
        ipControl:
          action.append && state.ipControl
            ? [
                ...state.ipControl.filter(v => !existing.includes(v.ipInt)),
                ...action.payload.data,
              ]
            : action.payload.data,
        nextPageToken: action.payload.nextPageToken,
      };
    }
    case AT.WHITELISTED_USERS_FETCH_SUCCESS: {
      const existing = action.payload.data.map(v => v.userId);
      return {
        ...state,
        whitelistedUsers: action.append
          ? [
              ...state.whitelistedUsers.filter(
                v => !existing.includes(v.userId)
              ),
              ...action.payload.data,
            ]
          : action.payload.data,
        nextPageToken: action.payload.nextPageToken,
      };
    }
    case AT.IP_CONTROL_FETCH_GROUPS_SUCCESS: {
      return {
        ...state,
        ipGroups: action.payload.data,
      };
    }
    case AT.IP_CONTROL_FETCH_NOTES_SUCCESS: {
      return {
        ...state,
        ipNotes: action.payload.data,
      };
    }
    case AT.IP_CONTROL_ADD_NOTE_SUCCESS: {
      return {
        ...state,
        ipControl: state.ipControl.map(ip =>
          ip.ipAddr === action.payload.ipAddr &&
          ip.ipRange === action.payload.ipRange
            ? {
                ...ip,
                noteID: action.payload.noteID,
                note: action.payload.note,
                updatedAt: action.payload.updatedAt,
                groupID: action.payload.groupID,
                group: action.payload.group,
              }
            : ip
        ),
      };
    }
    case AT.IP_CONTROL_UPDATE_NOTE_SUCCESS: {
      return {
        ...state,
        ipControl: state.ipControl.map(ip =>
          ip.noteID === action.payload.noteID
            ? {
                ...ip,
                noteID: action.payload.noteID,
                note: action.payload.note,
                updatedAt: action.payload.updatedAt,
                groupID: action.payload.groupID,
                group: action.payload.group,
              }
            : ip
        ),
      };
    }
    case AT.IP_CONTROL_DELETE_NOTE_SUCCESS: {
      return {
        ...state,
        ipControl: state.ipControl.map(ip =>
          ip.noteID === action.payload.noteID
            ? {
                ...ip,
                noteID: null,
                note: null,
                updatedAt: null,
                groupID: null,
                group: null,
              }
            : ip
        ),
      };
    }
    case AT.IP_CONTROL_ADD_GROUP_SUCCESS: {
      return {
        ...state,
        ipGroups: [...state.ipGroups, action.payload],
      };
    }
    case AT.IP_CONTROL_FETCH_ALL_SUCCESS: {
      return {
        ...state,
        ipControl:
          action.append && state.ipControl
            ? [...state.ipControl, ...action.payload.data]
            : action.payload.data,
        nextPageToken: null,
      };
    }
    case AT.IP_CONTROL_ADD_MODAL_OPEN:
      return {
        ...state,
        addModalVisible: true,
      };
    case AT.IP_CONTROL_ADD_MODAL_CLOSE:
      return {
        ...state,
        addModalVisible: false,
      };
    case AT.IP_CONTROL_ADD:
      return {
        ...state,
        addModalSubmitting: true,
      };
    case AT.IP_CONTROL_ADD_SUCCESS: {
      const existing = state.ipControl ? state.ipControl.map(v => v.ipInt) : [];
      return {
        ...state,
        ipControl: state.ipControl
          ? [
              ...state.ipControl,
              ...action.payload.filter(v => !existing.includes(v.ipInt)),
            ]
          : action.payload,
        addModalVisible: false,
        addModalSubmitting: false,
      };
    }
    case AT.IP_CONTROL_ADD_FAILED:
      return {
        ...state,
        addModalVisible: false,
        addModalSubmitting: false,
      };
    case AT.IP_CONTROL_DELETE_SUCCESS:
      return {
        ...state,
        ipControl: state.ipControl.filter(
          item => !action.ips.includes(item.ipInt)
        ),
      };
    default:
      return state;
  }
};

export default reducer;
