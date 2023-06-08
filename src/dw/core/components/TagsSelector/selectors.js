import { createSelector } from 'reselect';

export const tagsSelector = createSelector(
  state => state.Core.TagsSelector.tags,
  (_, props) => props.ensureTags || [],
  (allTags, ensureTags) => {
    if (!allTags) return allTags;
    const tags = allTags.map(t => t.name);
    ensureTags.forEach(t => {
      if (!tags.includes(t)) tags.push(t);
    });
    tags.sort();
    return tags.map(t => ({ value: t, label: t }));
  }
);

export const valueSelector = createSelector(
  (_, props) => props.value,
  value =>
    !value
      ? value || []
      : value.map(v => (typeof v === 'string' ? { value: v, label: v } : v))
);
