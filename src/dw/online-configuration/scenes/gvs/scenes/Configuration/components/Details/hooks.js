import React, {
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import cn from 'classnames';
import last from 'lodash/last';
import startsWith from 'lodash/startsWith';
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import { useQueryParam } from 'dw/core/hooks';
import { useParams } from 'react-router-dom';
import { useApolloClient } from '@apollo/client';
import { CurrentDraftContext, ConfigurationFiltersContext } from '@gvs/context';
import { POPULATION_TYPE_LABELS, PLAYER } from '@gvs/constants';
import { useDrafts, usePopulationType } from '@gvs/graphql/hooks';
import { GET_POPULATION_QUERY } from '@gvs/graphql/queries';
import styles from './hooks.module.css';

export const useDraft = () => {
  const { drafts, loading } = useDrafts();
  const [draftId, setDraftId] = useQueryParam('draftId');
  const [, setCurrentDraftId] = useContext(CurrentDraftContext);

  const onChangeDraft = useCallback(
    newDraftId => {
      const value = newDraftId === '--' ? undefined : newDraftId;
      setDraftId(value);
      setCurrentDraftId(value);
    },
    [setDraftId]
  );

  const draftOptions = useMemo(() => {
    const options = [{ value: '--', label: 'Live Configuration' }];
    if (!drafts)
      return draftId
        ? options.concat([{ value: draftId, label: draftId }])
        : options;
    drafts.forEach(d => {
      options.push({
        value: d.id,
        label: d.name,
      });
    });
    return options;
  }, [drafts]);
  const formatedDraftOptions = useMemo(
    () => [
      draftOptions[0],
      {
        label: 'Drafts',
        options: draftOptions.slice(1),
      },
    ],
    [draftOptions]
  );

  const [currentDraft, currentDraftName] = useMemo(() => {
    const draft = draftOptions.find(o => String(o.value) === draftId);
    return [draft?.value || null, draft?.label || 'Live Configuration'];
  }, [draftId, draftOptions]);

  useEffect(() => {
    if (loading) return;
    if (draftId && !currentDraft) onChangeDraft(currentDraft);
  }, [draftId, currentDraft, onChangeDraft, loading]);

  return {
    draftId: currentDraft,
    draftName: currentDraftName,
    draftOptions: formatedDraftOptions,
    onChangeDraft,
    loading,
  };
};

export const useExternalFilters = ({
  gridApi,
  populationOverride = undefined,
  config,
}) => {
  const [configurationFilters, setConfigurationFilters] = useContext(
    ConfigurationFiltersContext
  );
  const defaultFilters = useMemo(
    () => (populationOverride ? { population: populationOverride } : null),
    [populationOverride]
  );
  const { scopeURI, population = populationOverride } = useParams();
  const populationType = usePopulationType(population);
  const { draftId } = useDraft();
  const [currentFilters, setCurrentFilters] = useState(() => ({
    ...defaultFilters,
    ...configurationFilters,
  }));
  const filtersRef = useRef(currentFilters);
  const client = useApolloClient();
  const { scopes, populations } = useMemo(() => {
    const [t] = population.split(':');
    const options = {
      scopes: [scopeURI],
      populations: t === 'global' ? [] : [population],
    };
    if (!config) return options;
    config.variables.forEach(({ valuesPerPlatform }) => {
      valuesPerPlatform.forEach(({ source }) => {
        if (!source) return;
        const platformScopeURI = source.scopeURI || scopeURI;
        if (!options.scopes.includes(platformScopeURI))
          options.scopes.push(platformScopeURI);
        if (source.populationType === 'global' || !source.populationType)
          return;
        const platformPopulation = `${source.populationType}:${source.populationValue}`;
        if (!options.populations.includes(platformPopulation))
          options.populations.push(platformPopulation);
      });
    });
    options.scopes.sort();
    options.populations.sort(a => {
      if (startsWith(a, 'group')) return -1;
      return 1;
    });
    if (options.populations.length) {
      options.populations = options.populations.map(p => {
        const [type, value = PLAYER] = p.split(':');
        const cache = client.readQuery({
          query: GET_POPULATION_QUERY,
          variables: {
            type,
            value,
          },
        });
        if (!cache) return p;
        const {
          Population: { displayValue },
        } = cache;
        return { value: p, label: displayValue || value };
      });
      options.populations = [`global:${populationType}`].concat(
        options.populations
      );
    }
    return options;
  }, [config]);
  useEffect(() => {
    const filters = {
      ...defaultFilters,
      ...configurationFilters,
    };
    if (
      filters.population &&
      !populations.find(p =>
        startsWith(p, 'global')
          ? p === filters.population
          : p.value === filters.population
      )
    ) {
      filters.population = undefined;
    }
    if (filters.scope && !scopes.includes(filters.scope)) {
      filters.scope = undefined;
    }
    setCurrentFilters(filters);
    filtersRef.current = filters;
    if (gridApi) gridApi.onFilterChanged();
  }, [scopes, populations, gridApi]);
  const applyFilters = useCallback(
    rawFilters => {
      const filtersList = Object.entries(rawFilters || {}).filter(
        ([, value]) => value !== undefined
      );
      const filters =
        filtersList.length > 0 ? Object.fromEntries(filtersList) : null;

      filtersRef.current = filters;
      setCurrentFilters(filters);
      setConfigurationFilters(filters);
      setTimeout(() => gridApi.onFilterChanged(), 100);
    },
    [gridApi, setConfigurationFilters]
  );
  const isExternalFilterPresent = useCallback(
    () => Boolean(filtersRef.current),
    []
  );
  const doesExternalFilterPass = useCallback(
    ({ data }) => {
      if (!(data && filtersRef.current)) return true;
      const {
        scope,
        population: filterPopulation,
        draftOnly,
      } = filtersRef.current;
      if (
        draftOnly &&
        Object.values(data.valuesPerPlatform).some(
          v => v?.source?.isUncommitted
        )
      ) {
        return true;
      }
      const draftID = draftId && draftOnly ? draftId : null;
      if (data?.isUncommitted) {
        if (
          (!scope || scope === scopeURI) &&
          (!filterPopulation || filterPopulation === population)
        )
          return true;
      }
      return Object.values(data.valuesPerPlatform).some(({ source }) => {
        const { scopeURI: platformScopeURI, population: platformPopulation } =
          source;
        return (
          (!draftID || source.draftID === draftID) &&
          (!scope || scope === platformScopeURI) &&
          (!filterPopulation || filterPopulation === platformPopulation)
        );
      });
    },
    [scopeURI, population, draftId]
  );
  const FiltersComponent = useMemo(() => {
    if (populationOverride || !config) return null;
    return (
      <div className={styles.container}>
        <Button
          className={styles.button}
          onClick={() => applyFilters(null)}
          disabled={!currentFilters}
          size="small"
        >
          No filters
        </Button>
        {scopes.length > 1 ? (
          <ButtonGroup variant="text" size="small">
            {scopes.map(s => {
              const displayValue = last(s.split(':'));
              const selected = currentFilters?.scope === s;
              return (
                <Button
                  key={s}
                  className={cn({ [styles.selected]: selected })}
                  classes={{
                    root: cn(styles.button, styles.scopeButton),
                  }}
                  onClick={() => {
                    applyFilters({
                      ...currentFilters,
                      scope: selected ? undefined : s,
                    });
                  }}
                >
                  {displayValue}
                </Button>
              );
            })}
          </ButtonGroup>
        ) : null}
        {populations.length > 0 ? (
          <ButtonGroup variant="text" size="small">
            {populations.map(p => {
              let value = p;
              let displayValue;
              if (p.label) {
                ({ value, label: displayValue } = p);
              } else {
                displayValue = startsWith(p, 'global')
                  ? POPULATION_TYPE_LABELS[p]
                  : last(p.split(':'));
              }
              const selected = currentFilters?.population === value;
              return (
                <Button
                  key={value}
                  className={cn({ [styles.selected]: selected })}
                  classes={{
                    root: cn(styles.button, {
                      [styles.globalPopulationButton]: startsWith(
                        value,
                        'global'
                      ),
                      [styles.currentPopulationButton]:
                        !startsWith(value, 'global') && value === population,
                      [styles.connectedPopulationButton]:
                        !startsWith(value, 'global') && value !== population,
                    }),
                  }}
                  onClick={() => {
                    applyFilters({
                      ...currentFilters,
                      population: selected ? undefined : value,
                    });
                  }}
                >
                  {displayValue}
                </Button>
              );
            })}
          </ButtonGroup>
        ) : null}
        {draftId ? (
          <ButtonGroup variant="text" size="small">
            <Button
              className={cn({ [styles.selected]: currentFilters?.draftOnly })}
              classes={{
                root: cn(styles.button, styles.draftButton),
              }}
              onClick={() => {
                applyFilters({
                  ...currentFilters,
                  draftOnly: currentFilters?.draftOnly ? undefined : true,
                });
              }}
            >
              changes only
            </Button>
          </ButtonGroup>
        ) : null}
      </div>
    );
  }, [
    config,
    currentFilters,
    setCurrentFilters,
    scopes,
    populations,
    applyFilters,
    populationOverride,
  ]);
  return { isExternalFilterPresent, doesExternalFilterPass, FiltersComponent };
};
