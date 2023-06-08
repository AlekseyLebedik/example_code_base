import { useCallback, useEffect, useMemo, useState } from 'react';
import isEqual from 'lodash/isEqual';
import { useParams } from 'react-router-dom';
import { uuid } from 'dw/core/helpers/uuid';
import { useDrafts as useDraftsHook } from 'dw/online-configuration/scenes/gvs/graphql/hooks';

export const useLocalStorage = draftId => {
  const { scopeURI } = useParams();
  const [refreshKey, setRefreshKey] = useState();
  const cachedDrafts = useMemo(() => {
    const rawValue = JSON.parse(
      localStorage.getItem('GVS:CachedDrafts') || '{}'
    );
    const drafts = rawValue[scopeURI] || {};
    return draftId ? drafts[draftId] || [] : drafts;
  }, [scopeURI, refreshKey, draftId]);
  const save = useCallback(
    (values, refresh = true) => {
      const rawValue = JSON.parse(
        localStorage.getItem('GVS:CachedDrafts') || '{}'
      );
      const cached = rawValue[scopeURI] || {};
      rawValue[scopeURI] = {
        ...cached,
        ...values.reduce(
          (acc, { id, edits = [] }) => ({
            ...acc,
            [id]:
              edits === null ? undefined : edits.map(e => (e.id ? e.id : e)),
          }),
          {}
        ),
      };
      localStorage.setItem('GVS:CachedDrafts', JSON.stringify(rawValue));
      if (refresh) setRefreshKey(uuid());
    },
    [scopeURI]
  );
  return { cache: cachedDrafts, save };
};

export const useDrafts = ({ fetchPolicy } = {}) => {
  const { loading, error, drafts } = useDraftsHook({ fetchPolicy });
  const { cache: cachedDrafts, save } = useLocalStorage();
  useEffect(() => {
    if (!drafts || loading) return;
    const newDrafts = Object.entries(cachedDrafts).reduce(
      (acc, [id, edits]) => ({
        ...acc,
        [id]: drafts.find(d => d.id === id) ? edits : null,
      }),
      {}
    );
    if (!isEqual(cachedDrafts, newDrafts))
      save(Object.entries(newDrafts).map(([id, edits]) => ({ id, edits })));
  }, [cachedDrafts, drafts, loading]);
  const formatted = useMemo(() => {
    if (!drafts) return drafts;
    return drafts.map(draft => {
      const cachedEdits = cachedDrafts[draft.id] || [];
      const added = draft.edits
        ? draft.edits.filter(
            e =>
              moment().subtract(7, 'd') < moment.unix(e.createdAt) &&
              !cachedEdits.includes(e.id)
          )
        : [];
      const removed = draft.edits
        ? cachedEdits.filter(editId => !draft.edits.find(e => e.id === editId))
        : [];
      return { ...draft, added, removed };
    });
  }, [cachedDrafts, drafts]);
  return { loading, error, drafts: formatted, updateCache: save };
};
