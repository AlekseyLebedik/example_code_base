import { useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useCompare } from 'dw/core/hooks';

import { BreadcrumbsContext } from 'dw/online-configuration/scenes/gvs/context';

const formatEdits = edits => {
  const result = edits.reduce((acc, edit) => {
    const group = acc.find(
      g =>
        g.scopeURI === edit.source.scopeURI &&
        g.populationType === edit.source.populationType &&
        g.populationValue === edit.source.populationValue
    ) || {
      scopeURI: edit.source.scopeURI,
      populationType: edit.source.populationType,
      populationValue: edit.source.populationValue,
      variablesPerPlatform: {},
    };
    return [
      ...acc.filter(g => g !== group),
      {
        ...group,
        variablesPerPlatform: {
          ...group.variablesPerPlatform,
          [edit.platform]: [
            ...(group.variablesPerPlatform[edit.platform] || []),
            {
              key: edit.key,
              value: edit.unset ? undefined : edit.value,
              unset: edit.unset,
            },
          ],
        },
      },
    ];
  }, []);
  return result.map(g => ({
    ...g,
    variablesPerPlatform: Object.entries(g.variablesPerPlatform).map(
      ([platform, values]) => ({ platform, values })
    ),
  }));
};

export const useUncommittedEdits = () => {
  const { population, scopeURI } = useParams();
  const [edits, setEdits] = useState([]);

  const currentEdits = useCompare(
    useMemo(
      () =>
        edits.filter(
          e =>
            e.source.scopeURI === scopeURI && e.source.population === population
        ),
      [edits, scopeURI, population]
    )
  );

  const otherEdits = useCompare(
    useMemo(
      () =>
        formatEdits(
          edits.filter(
            e =>
              e.source.scopeURI !== scopeURI ||
              e.source.population !== population
          )
        ).map(e => ({ changesPerLayer: [e] })),
      [edits, scopeURI, population]
    )
  );

  const allEdits = useCompare(useMemo(() => formatEdits(edits), [edits]));

  const {
    editMode: { enabled: editModeEnabled },
  } = useContext(BreadcrumbsContext);

  const reset = useCallback(() => {
    setEdits(e => (e.length === 0 ? e : []));
  }, []);

  useEffect(() => {
    reset();
  }, [editModeEnabled]);

  return {
    allEdits,
    otherEdits,
    currentEdits,
    setEdits,
    reset,
    skip: false,
  };
};
