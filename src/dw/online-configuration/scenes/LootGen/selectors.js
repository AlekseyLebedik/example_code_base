import { createSelector } from 'reselect';

export const scriptListSelector = state => state.Scenes.LootGen.Scripts.data;

export const selectedItemSelector = createSelector(
  (_, props) => props.match.params.id,
  scriptListSelector,
  (id, items) =>
    items && id
      ? items.find(item => item.id.toString() === id.toString())
      : undefined
);
export const nextPageTokenSelector = state =>
  state.Scenes.LootGen.Scripts.nextPageToken;

export const isUploadingSelector = state =>
  state.Scenes.LootGen.Scripts.uploading;
