/* eslint-disable no-param-reassign */
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { createApiUrl } from './helpers';
import {
  getTitleInfoStats,
  getTitleInfoMMP,
  getTitleInfoEnv,
  getTitleInfoCluster,
  getTitleInfoMarketplace,
  getTitleInfoAchievements,
  getTitleInfoObjectStore,
  getMatchmaking,
  getSocialService,
} from './api';
import * as C from './constants';

const tasks = [
  { name: C.PROP_NAMES.STATS, fn: baseUrl => getTitleInfoStats(baseUrl) },
  { name: C.PROP_NAMES.MMP, fn: baseUrl => getTitleInfoMMP(baseUrl) },
  { name: C.PROP_NAMES.ENV, fn: baseUrl => getTitleInfoEnv(baseUrl) },
  {
    name: C.PROP_NAMES.MARKETPLACE,
    fn: baseUrl => getTitleInfoMarketplace(baseUrl),
  },
  {
    name: C.PROP_NAMES.ACHIEVEMENTS,
    fn: baseUrl => getTitleInfoAchievements(baseUrl),
  },
  {
    name: C.PROP_NAMES.OBJECT_STORE,
    fn: baseUrl => getTitleInfoObjectStore(baseUrl),
  },
  { name: C.PROP_NAMES.CLUSTER, fn: baseUrl => getTitleInfoCluster(baseUrl) },
  { name: C.PROP_NAMES.MATCHMAKING, fn: baseUrl => getMatchmaking(baseUrl) },
  {
    name: C.PROP_NAMES.SOCIAL_SERVICE,
    fn: baseUrl => getSocialService(baseUrl),
  },
];
export const fetchTitleInfoData = createAsyncThunk(
  'fetchTitleInfoData',
  async ({ name, fn, baseUrl }) => {
    const response = {};
    const { data } = await fn(baseUrl);
    response[name] = data;
    return response;
  }
);

export const fetchTitleInfo = createAsyncThunk(
  'fetchTitleInfo',
  (_, { dispatch, getState }) => {
    const state = getState();
    const baseUrl = createApiUrl(state);
    tasks.forEach(({ name, fn }) =>
      dispatch(fetchTitleInfoData({ name, fn, baseUrl }))
    );
  }
);

const initialData = {
  titleInfo: {},
  loading: false,
};
const titleInfoSlice = createSlice({
  name: 'titleInfo',
  initialState: initialData,
  reducers: {},
  extraReducers: {
    [fetchTitleInfoData.pending]: state => {
      state.loading = true;
    },
    [fetchTitleInfoData.fulfilled]: (state, action) => {
      state.titleInfo = { ...state.titleInfo, ...action.payload };
      state.loading = false;
    },
  },
});

// reducer
export default titleInfoSlice.reducer;
