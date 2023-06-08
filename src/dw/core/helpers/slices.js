/* eslint-disable no-param-reassign */
export const initialState = {
  data: undefined,
  loading: false,
  error: undefined,
  nextPageToken: undefined,
};

// Actions
export const startLoading = state => {
  state.loading = true;
};

export const stopLoading = state => {
  state.loading = false;
};

export const loadingFailed = (state, { payload: { error } }) => {
  state.loading = false;
  state.error = error;
};

export const fetchSuccess = (state, { payload: { data } }) => {
  state.loading = false;
  if (!data) {
    return;
  }
  state.data = data;
};

export const addSuccess = (state, { payload: { data } }) => {
  state.loading = false;
  if (!data) {
    return;
  }
  state.data = data;
};

export const deleteSuccess = (state, { payload: { data } }) => {
  state.loading = false;
  if (
    !data ||
    !state.data ||
    (Array.isArray(state.data) && state.data.length === 0)
  ) {
    return;
  }
  state.data = data;
};

// Thunks
export const createAddThunk =
  ({ actions, apiCallFn, formatter = payload => payload }) =>
  payload =>
  async dispatch => {
    try {
      dispatch(actions.addStart());
      const { data } = await apiCallFn(formatter(payload));
      dispatch(actions.addSuccess({ data }));
    } catch (err) {
      dispatch(actions.addFailed({ error: err.toString() }));
    }
  };

export const createDeleteThunk =
  ({ actions, apiCallFn, formatter = payload => payload }) =>
  payload =>
  async dispatch => {
    try {
      dispatch(actions.deleteStart());
      const { data } = await apiCallFn(formatter(payload));
      dispatch(actions.deleteSuccess({ data }));
    } catch (err) {
      dispatch(actions.deleteFailed({ error: err.toString() }));
    }
  };
