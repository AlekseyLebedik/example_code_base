/* eslint-disable no-param-reassign */

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { event as eventAPI } from 'playpants/services';

export const fetchEventConflicts = createAsyncThunk(
  'fetchEventConflicts',
  async eventId => {
    const { data } = await eventAPI.fetchEventConflicts(eventId);
    const response = { data: data?.results, eventId };
    return response;
  }
);

const initialData = {};

const titleInfoSlice = createSlice({
  name: 'titleInfo',
  initialState: initialData,
  reducers: {},
  extraReducers: {
    [fetchEventConflicts.pending]: (state, action) => {
      const {
        meta: { arg: eventId },
      } = action;
      state[eventId] = {
        ...state[eventId],
        loading: true,
        fetched: true,
      };
    },
    [fetchEventConflicts.fulfilled]: (state, action) => {
      const {
        payload: { data, eventId },
      } = action;
      state[eventId] = {
        ...state[eventId],
        conflicts: data,
        loading: false,
      };
    },
  },
});

// reducer
export default titleInfoSlice.reducer;
