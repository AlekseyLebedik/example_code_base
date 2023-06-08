import * as AT from './actionTypes';

const INITIAL_STATE = {
  data: [],
  nextPageToken: undefined,
  impUploadModalVisible: false,
  impUploadModalLoading: false,
};

export const reducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case AT.IMPS_FETCH_SUCCESS:
      return {
        ...state,
        data: action.append ? [...state.data, ...action.data] : action.data,
        nextPageToken: action.nextPageToken,
        q: action.q,
      };
    case AT.IMP_OPEN_UPLOAD_MODAL:
      return {
        ...state,
        impUploadModalVisible: true,
      };
    case AT.IMP_UPLOAD:
      return {
        ...state,
        impUploadModalLoading: true,
      };
    case AT.IMP_CLOSE_UPLOAD_MODAL:
    case AT.IMP_UPLOAD_SUCCESS:
      return {
        ...state,
        impUploadModalVisible: false,
        impUploadModalLoading: false,
      };
    default:
      return state;
  }
};
