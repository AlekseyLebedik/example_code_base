import { useMemo } from 'react';
import { useParams } from 'react-router-dom';
import groupBy from 'lodash/groupBy';
import orderBy from 'lodash/orderBy';
import { useQueryParam } from 'dw/core/hooks';
import { useConfiguration, useDraftDetails } from '@gvs/graphql/hooks';

import { GLOBAL_NON_PLAYER, PLAYER, GLOBAL_PLAYERS } from '@gvs/constants';

export const useConnectedPopulations = (populationOverride, fetchPolicy) => {
  const { population = populationOverride } = useParams();
  const [draftId] = useQueryParam('draftId');
  const { data } = useConfiguration({
    draftId,
    populationOverride,
    fetchPolicy,
  });
  return useMemo(() => {
    if (!data) return [];
    return data.variables.reduce((acc, variable) => {
      return variable.valuesPerPlatform.reduce((platformAcc, value) => {
        let platformPopulation = population;
        if (value.source && value.source.populationType)
          platformPopulation = `${value.source.populationType}:${
            value.source.populationValue || PLAYER
          }`;
        return platformAcc.includes(platformPopulation)
          ? platformAcc
          : [...platformAcc, platformPopulation];
      }, acc);
    }, []);
  }, [data]);
};

const getPopulations = (acc, { populationType, populationValue }) =>
  acc.find(p => p.type === populationType && p.value === populationValue) ||
  GLOBAL_NON_PLAYER.includes(`${populationType}:${populationValue}`)
    ? acc
    : [
        ...acc,
        {
          type: populationType,
          value: populationValue,
          population: `${populationType}:${populationValue || PLAYER}`,
        },
      ];

export const useDraftPopulations = allEdits => {
  const { scopeURI } = useParams();
  const [draftId] = useQueryParam('draftId');
  const { diffs } = useDraftDetails(draftId);
  const populations = useMemo(
    () =>
      allEdits
        ? allEdits
            .filter(edit => edit?.scopeURI === scopeURI)
            .reduce(getPopulations, [])
        : [],
    [allEdits, scopeURI]
  );
  return useMemo(() => {
    if (!diffs && populations.length === 0) return [];
    return diffs.reduce(getPopulations, populations);
  }, [diffs, populations]);
};

export const useFormatPopulations = ({
  allPopulations,
  draftPopulations,
  showDraftOnly,
  query,
  populationType,
}) => {
  const populations = useMemo(() => {
    let result = allPopulations;
    if (showDraftOnly && draftPopulations.length > 0)
      result = result.filter(p =>
        draftPopulations.find(dp => p.type === dp.type && p.value === dp.value)
      );
    return result
      .filter(
        p =>
          !query ||
          p.type.toLowerCase().includes(query.toLowerCase()) ||
          (p.value && p.value.toLowerCase().includes(query.toLowerCase())) ||
          (p.displayValue &&
            p.displayValue.toLowerCase().includes(query.toLowerCase()))
      )
      .map(p => ({
        ...p,
        label: p.type === 'global' ? 'Global Group' : p.displayValue || p.value,
        value: `${p.type}:${p.value || PLAYER}`,
      }));
  }, [allPopulations, draftPopulations, showDraftOnly, query]);
  const grouped = useMemo(() => {
    const result = groupBy(populations, 'type');
    Object.values(result).forEach(values => {
      values.sort((a, b) =>
        a.label.toLowerCase() > b.label.toLowerCase() ? 1 : -1
      );
    });
    return {
      ...result,
      ...(populationType === PLAYER
        ? {
            global: result?.global || [
              {
                type: 'global',
                label: 'Global Group',
                value: GLOBAL_PLAYERS,
              },
            ],
            user: result?.user || [],
            groups: result?.groups || [],
          }
        : {}),
    };
  }, [populations]);
  const groups = useMemo(
    () => orderBy(Object.keys(grouped), g => (g === 'global' ? 'AAA' : g)),
    [grouped]
  );
  return { populations, grouped, groups };
};
