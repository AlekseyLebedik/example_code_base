import { useCallback, useContext, useEffect, useMemo } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import hash from 'object-hash';
import { useApolloClient, useMutation, useQuery } from '@apollo/client';
import isEqual from 'lodash/isEqual';
import { SERVICE_NAMES } from '@demonware/devzone-core/access/ServiceAvailability/constants';
import { useCompare, usePrevious, useQueryParam } from 'dw/core/hooks';
import { plainProjectsSelector } from 'dw/core/helpers/title-env-selectors';
import { useEnvironments } from 'dw/core/components/TitleEnvSelect/hooks';
import {
  GET_CONFIGURATION_QUERY,
  GET_DEFINITIONS_QUERY,
  GET_DIFF_QUERY,
  GET_DRAFT_EDITS_DIFFS_QUERY,
  GET_DRAFT_DETAILS_QUERY,
  GET_DRAFTS_QUERY,
  GET_EVENTS_QUERY,
  GET_POPULATIONS_QUERY,
  GET_POPULATIONS_DISPAY_VALUES_QUERY,
  GET_SCOPES_QUERY,
  GET_EVENT_EDITS_QUERY,
  GET_ASSIGNED_OBFUSCATION_ALGORITHMS_QUERY,
  GET_INSTANCED_OBFUSCATION_ALGORITHMS_QUERY,
} from './queries';
import {
  ARCHIVE_DEFINITIONS_MUTATION,
  CREATE_CLEAR_POPULATION_MUTATION,
  CREATE_SCOPE_MUTATION,
  CREATE_DEFINITION_MUTATION,
  CREATE_DRAFT_MUTATION,
  CREATE_EDIT_MUTATION,
  DELETE_DRAFT_MUTATION,
  DELETE_DRAFTS_EDIT_MUTATION,
  RELEASE_DRAFT_MUTATION,
  RESTORE_DEFINITIONS_MUTATION,
  UPDATE_DEFINITION_MUTATION,
  PROPAGATE_CONFIGURATION_MUTATION,
  PROPAGATE_DEFINITIONS_MUTATION,
} from './mutations';

import { RefetchQueries } from '../context';

import {
  GLOBAL_PLAYERS,
  DEFAULT_POPULATIONS,
  PLAYER,
  POPULATION_TYPE_LABELS,
} from '../constants';

export const useEnvScopeUri = () => {
  const { titleId, env, scopeURI } = useParams();
  const envScopeUri = scopeURI
    ? scopeURI.split(':').slice(0, 3).join(':')
    : null;
  const projects = useSelector(plainProjectsSelector, isEqual);
  const options = useMemo(() => {
    return projects?.find(
      e => String(e.title.id) === titleId && e.environment.shortType === env
    )?.environment?.options;
  }, [projects, titleId, env]);
  const result = useMemo(
    () => ({
      optionsLoading: options === undefined,
      envScopeUri: options?.scopeURI || envScopeUri,
    }),
    [projects]
  );
  return result;
};

export const useTitleEnvByScopeUri = scopeURI => {
  const envScopeUri = useMemo(
    () => (scopeURI ? scopeURI.split(':').slice(0, 3).join(':') : scopeURI),
    [scopeURI]
  );
  const { environments } = useEnvironments({
    serviceName: SERVICE_NAMES.GVS,
  });
  return useMemo(() => {
    if (!envScopeUri) return {};
    const project = environments.find(
      p => p?.environment?.options?.scopeURI === envScopeUri
    );
    if (!project) return {};
    return {
      titleId: String(project?.title?.id),
      env: project?.environment?.shortType,
      envScopeUri,
    };
  }, [environments, envScopeUri]);
};

export const useScopes = scopeURIOverride => {
  const { titleId: currentTitleId, env: currentTitleEnv } = useParams();
  const titleEnvByScopeUri = useTitleEnvByScopeUri(scopeURIOverride);
  const { optionsLoading: envLoading, envScopeUri } = useEnvScopeUri();

  const { optionsLoading, scopeURI, titleId, env } = useMemo(() => {
    if (scopeURIOverride)
      return {
        optionsLoading: false,
        scopeURI: scopeURIOverride,
        ...titleEnvByScopeUri,
      };
    return {
      optionsLoading: envLoading,
      scopeURI: envScopeUri,
      titleId: currentTitleId,
      env: currentTitleEnv,
    };
  }, [
    scopeURIOverride,
    envLoading,
    envScopeUri,
    titleEnvByScopeUri,
    currentTitleId,
    currentTitleEnv,
  ]);
  const { error, loading, data, refetch } = useQuery(GET_SCOPES_QUERY, {
    variables: { titleId, env, scopeURI },
    skip: !scopeURI,
  });
  return useMemo(() => {
    if (loading || optionsLoading) return { loading: true, refetch };
    if (error) return { error };
    const { gvsScopes: scopes } = data;
    const envScope = scopes.find(scope => scope.scopeURI === scopeURI);
    const buildScopes = scopes.filter(
      scope => scope.parentScopeURI === scopeURI
    );
    return { envScope, buildScopes, refetch };
  }, [loading, optionsLoading, error, data, refetch, scopeURI]);
};

export const usePopulations = scopeURIOverride => {
  const { scopeURI: paramsScopeURI } = useParams();
  const {
    titleId,
    env,
    envScopeUri: scopeURI,
  } = useTitleEnvByScopeUri(scopeURIOverride || paramsScopeURI);
  const { error, loading, data } = useQuery(GET_POPULATIONS_QUERY, {
    variables: { titleId, env, scopeURI },
    skip: !scopeURI,
    fetchPolicy: 'cache-and-network',
  });
  return useMemo(() => {
    if (!data && loading) return { loading: true };
    if (error) return { error };
    const { gvsPopulations: scopes } = data || {};
    const { populations } =
      scopes?.find(scope => scope.scopeURI === scopeURI) || {};
    return { populations, loading: false };
  }, [loading, error, data, scopeURI]);
};

export const usePopulationsDisplayValues = populations => {
  const { titleId, env } = useParams();
  const { data } = useQuery(GET_POPULATIONS_DISPAY_VALUES_QUERY, {
    variables: { titleId, env, populations },
    skip: populations.length === 0,
  });
  return useMemo(() => {
    if (!data)
      return { populations: populations.length > 0 ? undefined : populations };
    const { gvsPopulationsDisplayValues } = data;
    return {
      populations: (gvsPopulationsDisplayValues || populations || []).map(p => {
        const population = `${p.type}:${p.value}`;
        return p.type === 'global'
          ? { ...p, displayValue: POPULATION_TYPE_LABELS[population] }
          : p;
      }),
    };
  }, [data, populations]);
};

export const usePopulationType = population => {
  const [type, value = PLAYER] = population.split(':');
  if (type === 'global') return value;
  return PLAYER;
};

export const usePopulationOptions = ({ scopeURI, population }) => {
  const { populations, loading, error } = usePopulations(scopeURI);
  const playerOptions = useMemo(() => {
    if (!populations) return [{ value: GLOBAL_PLAYERS, label: 'global' }];
    return populations
      .filter(p => p.type !== 'global' || p.value === PLAYER)
      .map(p => {
        const value = `${p.type}:${p.value || PLAYER}`;
        return {
          value,
          label:
            p.displayValue || (value === GLOBAL_PLAYERS ? 'global' : value),
        };
      });
  }, [populations]);
  const options = useMemo(
    () => ({ ...DEFAULT_POPULATIONS, player_p: playerOptions }),
    [playerOptions]
  );
  const populationType = usePopulationType(population);

  return useMemo(
    () => ({ populations, options, populationType, loading, error }),
    [populations, options, populationType, loading, error]
  );
};

export const useNameMapping = () => {
  const { envScopeUri } = useEnvScopeUri();
  const projects = useSelector(plainProjectsSelector, isEqual);
  const titleName = useSelector(
    state => state.Components.TitleSelector.currentTitle?.name
  );
  const projectName = useSelector(
    state => state.Components.TitleSelector.currentProject?.name
  );
  const [, game, title] = useMemo(
    () => (envScopeUri ? envScopeUri.split(':').map(v => v.toUpperCase()) : []),
    [envScopeUri]
  );
  return useMemo(
    () => ({
      [game]: projectName,
      [title]: titleName,
      ...projects.reduce(
        (acc, p) => ({
          ...acc,
          [String(p.title.id)]: p.title.name,
        }),
        {}
      ),
    }),
    [game, title, projectName, titleName, projects]
  );
};

export const useRefreshConfigQueries = (
  draftId,
  excludeCurrentPopulation = false
) => {
  const { populations } = usePopulations();
  const { titleId, env, scopeURI, population } = useParams();
  const [refetchQueries, setRefetchQueries] = useContext(RefetchQueries);
  const client = useApolloClient();
  return useCallback(
    extraQueries => {
      const newRefetchQueries = [...refetchQueries];
      extraQueries?.forEach(key => {
        if (!newRefetchQueries.includes(key)) newRefetchQueries.push(key);
      });
      populations?.forEach(({ type, value }) => {
        const current = `${type}:${value || PLAYER}`;
        if (excludeCurrentPopulation && population === current) return;
        const result = client.readQuery({
          query: GET_CONFIGURATION_QUERY,
          variables: {
            titleId,
            env,
            scopeURI,
            draftId,
            populationType: type,
            populationValue: value,
          },
        });
        if (result) {
          const cacheKey = hash({
            titleId,
            env,
            scopeURI,
            draftId,
            populationType: type,
            populationValue: value,
          });
          if (!newRefetchQueries.includes(cacheKey))
            newRefetchQueries.push(cacheKey);
        }
      });

      if (!isEqual(refetchQueries, newRefetchQueries)) {
        setRefetchQueries(newRefetchQueries);
      }
    },
    [
      refetchQueries,
      setRefetchQueries,
      populations,
      client,
      titleId,
      env,
      scopeURI,
      draftId,
      population,
    ]
  );
};

export const useConfiguration = ({
  draftId = null,
  populationOverride = undefined,
  fetchPolicy = 'cache-only',
  edits: rawEdits = null,
}) => {
  const {
    titleId,
    env,
    scopeURI,
    population = populationOverride,
    eventId,
  } = useParams();

  const edits = !rawEdits || rawEdits.length === 0 ? undefined : rawEdits;

  const variables = useMemo(() => {
    if (!(scopeURI && population)) return null;
    const [populationType, populationValue = PLAYER] = population.split(':');
    return {
      titleId,
      env,
      scopeURI,
      populationType,
      populationValue,
      draftId: draftId || undefined,
      eventId,
      edits,
    };
  }, [titleId, env, scopeURI, population, draftId, eventId, edits]);
  const {
    error,
    loading,
    data: rawData,
    refetch,
    client,
  } = useQuery(GET_CONFIGURATION_QUERY, {
    fetchPolicy,
    variables,
    notifyOnNetworkStatusChange: true,
    skip: !(scopeURI && population),
  });
  const data = useCompare(rawData);
  return useMemo(() => {
    if (loading || error) return { error, loading, refetch };
    const { gvsConfigurations: scopes } = data || {};
    return {
      data: scopes?.find(scope => scope.scopeURI === scopeURI),
      refetch,
      client,
    };
  }, [error, loading, data, refetch, client]);
};

export const useDrafts = ({ fetchPolicy, scopeURIOverride } = {}) => {
  const { envScopeUri } = useEnvScopeUri();
  const {
    titleId,
    env,
    envScopeUri: scopeURI,
  } = useTitleEnvByScopeUri(scopeURIOverride || envScopeUri);

  const { error, loading, data, refetch } = useQuery(GET_DRAFTS_QUERY, {
    fetchPolicy,
    variables: { titleId, env, scopeURI },
    skip: !scopeURI,
    notifyOnNetworkStatusChange: true,
  });
  return useMemo(() => {
    if (loading) return { loading };
    if (error) return { error };
    const { gvsDrafts: scopes } = data;
    const { drafts } = scopes.find(scope => scope.scopeURI === scopeURI) || {
      drafts: [],
    };
    return { drafts, refetch };
  }, [loading, error, data, scopeURI, refetch]);
};

export const useDraftDetails = (draftIdOverride, fetchPolicy) => {
  const { envScopeUri: scopeURI } = useEnvScopeUri();
  const { titleId, env, draftId: paramsDraftId } = useParams();
  const draftId = draftIdOverride || paramsDraftId;
  const cacheKey = useMemo(() => {
    return hash(`DraftDetails-${draftId}`);
  }, [draftId]);
  const [refetchQueries, setRefetchQueries] = useContext(RefetchQueries);
  const { error, loading, data, refetch } = useQuery(GET_DRAFT_DETAILS_QUERY, {
    fetchPolicy,
    variables: { titleId, env, scopeURI, draftId },
    notifyOnNetworkStatusChange: true,
    skip: !draftId,
  });
  useEffect(() => {
    if (refetchQueries.includes(cacheKey)) {
      setRefetchQueries(refetchQueries.filter(q => q !== cacheKey));
      refetch();
    }
  }, [refetchQueries, setRefetchQueries, cacheKey, refetch]);
  return useMemo(() => {
    if (loading || refetchQueries.includes(cacheKey))
      return { loading: true, refetch };
    if (error) return { error, refetch };
    const { gvsDraftDetails } = data || {};
    return { ...(gvsDraftDetails || { diffs: [] }), refetch };
  }, [loading, error, data, refetch, refetchQueries, cacheKey]);
};

export const useDraftEditsDiffs = () => {
  const { titleId, env, draftId } = useParams();
  const cacheKey = useMemo(() => hash(`DraftEditsDiff-${draftId}`), [draftId]);
  const [refetchQueries, setRefetchQueries] = useContext(RefetchQueries);
  const { error, loading, data, refetch } = useQuery(
    GET_DRAFT_EDITS_DIFFS_QUERY,
    {
      variables: { titleId, env, draftId },
      notifyOnNetworkStatusChange: true,
      skip: !draftId,
    }
  );
  useEffect(() => {
    if (refetchQueries.includes(cacheKey)) {
      setRefetchQueries(refetchQueries.filter(q => q !== cacheKey));
      refetch();
    }
  }, [refetchQueries, setRefetchQueries, cacheKey, refetch]);
  return useMemo(() => {
    if (loading || refetchQueries.includes(cacheKey))
      return { loading: true, refetch };
    if (error) return { error, refetch };
    const { gvsDraftEditsDiffs } = data || {};
    return { ...(gvsDraftEditsDiffs || { edits: [] }), refetch };
  }, [loading, error, data, draftId, refetch, refetchQueries, cacheKey]);
};

export const useEventEditsDiffs = fetchPolicy => {
  const { titleId, env, eventId } = useParams();
  const cacheKey = useMemo(() => hash(`EventEditsDiff-${eventId}`), [eventId]);
  const [refetchQueries, setRefetchQueries] = useContext(RefetchQueries);
  const { error, loading, data, refetch } = useQuery(GET_EVENT_EDITS_QUERY, {
    fetchPolicy,
    variables: { titleId, env, eventId },
    notifyOnNetworkStatusChange: true,
    skip: !eventId,
  });
  useEffect(() => {
    if (refetchQueries.includes(cacheKey)) {
      setRefetchQueries(refetchQueries.filter(q => q !== cacheKey));
      refetch();
    }
  }, [refetchQueries, setRefetchQueries, cacheKey, refetch]);
  return useMemo(() => {
    if (loading || refetchQueries.includes(cacheKey))
      return { loading: true, refetch };
    if (error) return { error, refetch };
    const { gvsEventEdits } = data || {};
    return { ...(gvsEventEdits || { edits: [] }), refetch };
  }, [loading, error, data, eventId, refetch, refetchQueries, cacheKey]);
};

export const useDiffs = diffInput => {
  const cacheKey = useMemo(() => {
    const { target = {} } = diffInput || {};
    const { type, value: draftId } = target;
    if (type !== 'draft') return null;
    return hash(`DraftDiff-${draftId}`);
  }, [diffInput]);
  const [refetchQueries, setRefetchQueries] = useContext(RefetchQueries);
  const { titleId, env } = useParams();
  const { error, loading, data, refetch } = useQuery(GET_DIFF_QUERY, {
    fetchPolicy: 'network-only',
    variables: { titleId, env, diffInput },
    notifyOnNetworkStatusChange: true,
    skip: !diffInput,
  });
  useEffect(() => {
    if (refetchQueries.includes(cacheKey)) {
      setRefetchQueries(refetchQueries.filter(q => q !== cacheKey));
      refetch();
    }
  }, [refetchQueries, setRefetchQueries, cacheKey, refetch]);
  return useMemo(() => {
    if (loading || refetchQueries.includes(cacheKey))
      return { loading: true, refetch };
    if (error) return { error, refetch };
    const { gvsDiffs } = data || {};
    return { ...(gvsDiffs || { diffs: null }), refetch };
  }, [loading, error, data, refetch, refetchQueries, cacheKey]);
};

export const useDefinitions = (targetScopeURI, { fetchPolicy } = {}) => {
  const { envScopeUri } = useEnvScopeUri();
  const prevEnvScopeURI = usePrevious(envScopeUri);
  const { titleId, env, scopeURI } = useParams();
  const { error, loading, data, refetch } = useQuery(GET_DEFINITIONS_QUERY, {
    fetchPolicy,
    variables: { titleId, env, scopeURI },
    skip: !scopeURI || (prevEnvScopeURI && envScopeUri !== prevEnvScopeURI),
  });
  return useMemo(() => {
    if (loading) return { loading: true };
    if (error) return { error };
    const { gvsDefinitions: scopes } = data || {};
    if (!scopes) return {};
    if (targetScopeURI) {
      return {
        ...(scopes.find(scope => scope.scopeURI === targetScopeURI) || {}),
        refetch,
      };
    }
    const scope = scopes[scopes.length - 1];
    const definitions = scopes.reduce(
      (acc, s) => [...acc, ...s.definitions],
      []
    );
    return { ...scope, definitions, refetch };
  }, [loading, error, data, targetScopeURI, refetch]);
};

export const useDefinitionsKeyTypeMapping = () => {
  const { definitions } = useDefinitions();
  return useMemo(() => {
    if (!definitions) return {};
    return definitions.reduce(
      (acc, { key, type }) => ({ ...acc, [key]: type }),
      {}
    );
  }, [definitions]);
};

export const useFormatValue = () => {
  const { definitions } = useDefinitions();
  const formatValue = useCallback(
    (key, rawValue) => {
      const value = String(rawValue);
      if (['__UNSET__', 'null'].includes(value)) return value;
      const definition = definitions.find(d => d.key === key);
      if (!definition) return value;
      const { type } = definition;
      switch (type) {
        case 'bool':
          return ['1', 'true'].includes(value.toLowerCase()) ? 'true' : 'false';
        default:
          return value;
      }
    },
    [definitions]
  );
  return definitions ? formatValue : undefined;
};

export const useEvents = fetchPolicy => {
  const { titleId, env, scopeURI } = useParams();
  const { error, loading, data, refetch, fetchMore } = useQuery(
    GET_EVENTS_QUERY,
    {
      fetchPolicy,
      variables: { titleId, env, scopeURI },
      skip: !scopeURI,
      notifyOnNetworkStatusChange: true,
    }
  );

  return useMemo(() => {
    if (loading) return { loading };
    if (error) return { error };
    const {
      gvsEvents: { events, nextPageToken },
    } = data;
    return { events, refetch, fetchMore, nextPageToken };
  }, [loading, error, data, scopeURI, refetch, fetchMore]);
};

/*
 * MUTATIONS
 */

export const useCreateScope = scopeURI => {
  const { titleId, env } = useParams();
  const { envScopeUri } = useEnvScopeUri();
  const [mutateFunction, { loading }] = useMutation(CREATE_SCOPE_MUTATION, {
    variables: {
      titleId,
      env,
      parentScopeUri: scopeURI || envScopeUri,
    },
  });
  return [
    useCallback(
      (scopeName, algorithmID) => {
        return mutateFunction({
          variables: {
            scopeName,
            algorithmID,
          },
        });
      },
      [mutateFunction]
    ),
    { loading },
  ];
};

export const useCreateEditDefinition = (targetScopeURI, isEdit = false) => {
  const { titleId, env } = useParams();
  const mutation = useMemo(
    () => (isEdit ? UPDATE_DEFINITION_MUTATION : CREATE_DEFINITION_MUTATION),
    [isEdit]
  );
  const [mutateFunction, { loading, error }] = useMutation(mutation, {
    variables: {
      titleId,
      env,
      scopeURI: targetScopeURI,
    },
  });
  return [
    useCallback(
      definitionData => {
        return mutateFunction({
          variables: {
            definitionData,
          },
        });
      },
      [mutateFunction]
    ),
    { loading, error },
  ];
};

export const useArchiveRestoreDefinitions = (
  targetScopeURI,
  isRestore = false
) => {
  const { titleId, env } = useParams();
  const mutation = useMemo(
    () =>
      isRestore ? RESTORE_DEFINITIONS_MUTATION : ARCHIVE_DEFINITIONS_MUTATION,
    [isRestore]
  );
  const [mutateFunction] = useMutation(mutation, {
    variables: {
      titleId,
      env,
      scopeURI: targetScopeURI,
    },
  });
  return useCallback(
    keys => {
      return mutateFunction({
        variables: {
          keys,
        },
      });
    },
    [mutateFunction]
  );
};

export const useCreateDraft = () => {
  const { envScopeUri: scopeURI } = useEnvScopeUri();
  const { titleId, env } = useParams();
  const [mutateFunction, { loading }] = useMutation(CREATE_DRAFT_MUTATION, {
    variables: {
      titleId,
      env,
      scopeURI,
    },
    refetchQueries: [
      {
        query: GET_DRAFTS_QUERY,
        variables: { titleId, env, scopeURI },
      },
    ],
  });
  return [
    useCallback(
      ({ draftData, editData = null, restoreData = null, edits = [] }) => {
        return mutateFunction({
          variables: {
            draftData,
            editData,
            restoreData,
            edits,
          },
        });
      },
      [mutateFunction, scopeURI, titleId, env]
    ),
    { loading },
  ];
};

export const useDeleteDraft = () => {
  const { envScopeUri: scopeURI } = useEnvScopeUri();
  const { titleId, env } = useParams();
  const [mutateFunction] = useMutation(DELETE_DRAFT_MUTATION, {
    variables: {
      titleId,
      env,
    },
    refetchQueries: [
      {
        query: GET_DRAFTS_QUERY,
        variables: { titleId, env, scopeURI },
      },
    ],
  });
  return useCallback(
    draftId => {
      return mutateFunction({
        variables: {
          draftId,
        },
      });
    },
    [mutateFunction, titleId, env]
  );
};

export const useDeleteDraftsEdit = () => {
  const { titleId, env } = useParams();
  const [mutateFunction] = useMutation(DELETE_DRAFTS_EDIT_MUTATION, {
    variables: {
      titleId,
      env,
    },
  });
  return useCallback(
    (draftId, editId) => {
      return mutateFunction({
        variables: {
          draftId,
          editId,
        },
      });
    },
    [mutateFunction, titleId, env]
  );
};

export const useCreateEdit = () => {
  const { envScopeUri } = useEnvScopeUri();
  const { titleId, env, scopeURI } = useParams();
  const [draftId] = useQueryParam('draftId');
  const [mutateFunction] = useMutation(CREATE_EDIT_MUTATION, {
    variables: {
      titleId,
      env,
      scopeURI,
      draftId,
    },
    refetchQueries: [
      {
        query: GET_DRAFTS_QUERY,
        variables: { titleId, env, scopeURI: envScopeUri },
      },
    ],
  });
  return useCallback(
    (edits, comment) => {
      return mutateFunction({
        variables: {
          comment,
          edits,
        },
      });
    },
    [mutateFunction]
  );
};

export const useClearPopulationEdit = () => {
  const { envScopeUri } = useEnvScopeUri();
  const { titleId, env, scopeURI } = useParams();
  const [draftId] = useQueryParam('draftId');
  const [mutateFunction, { loading }] = useMutation(
    CREATE_CLEAR_POPULATION_MUTATION,
    {
      variables: {
        titleId,
        env,
        scopeURI,
        draftId,
      },
      refetchQueries: [
        'GetPopulations',
        {
          query: GET_DRAFTS_QUERY,
          variables: { titleId, env, scopeURI: envScopeUri },
        },
      ],
    }
  );
  return [
    useCallback(
      editData => {
        return mutateFunction({
          variables: {
            editData,
          },
        });
      },
      [mutateFunction]
    ),
    { loading },
  ];
};

export const useReleaseDraft = () => {
  const { envScopeUri: scopeURI } = useEnvScopeUri();
  const { titleId, env } = useParams();
  const [mutateFunction] = useMutation(RELEASE_DRAFT_MUTATION, {
    variables: {
      titleId,
      env,
    },
    refetchQueries: [
      'GetPopulations',
      {
        query: GET_DRAFTS_QUERY,
        variables: { titleId, env, scopeURI },
      },
    ],
  });
  return useCallback(
    (draftId, OCCToken, comment, sendPushMessage = true) => {
      const event = {
        type: 'release',
        draftId,
        comment,
        ifMatch: OCCToken || 'NOT_SET_YET',
      };
      const notificationSettings = {
        sendPushMessage,
      };
      return mutateFunction({
        variables: {
          event,
          notificationSettings,
        },
      });
    },
    [mutateFunction]
  );
};

export const usePropagateConfiguration = () => {
  const { env, titleId, scopeURI } = useParams();
  const [targetScopeURI] = useQueryParam('targetScopeURI');
  const {
    env: targetEnv,
    titleId: targetTitleId,
    envScopeUri,
  } = useTitleEnvByScopeUri(targetScopeURI);
  const [mutateFunction, { loading, error, data }] = useMutation(
    PROPAGATE_CONFIGURATION_MUTATION,
    {
      refetchQueries: [
        {
          query: GET_DRAFTS_QUERY,
          variables: {
            titleId: targetTitleId,
            env: targetEnv,
            scopeURI: envScopeUri,
          },
        },
      ],
    }
  );
  return [
    useCallback(
      (draftName, syncSource, force) => {
        return mutateFunction({
          variables: {
            sourceEnv: { env, titleId, scopeURI },
            targetEnv: {
              env: targetEnv,
              titleId: targetTitleId,
              scopeURI: targetScopeURI,
            },
            draftName,
            syncSource,
            force,
          },
        });
      },
      [
        mutateFunction,
        env,
        titleId,
        scopeURI,
        targetEnv,
        targetTitleId,
        targetScopeURI,
      ]
    ),
    { loading, error, data },
  ];
};

export const usePropagateDefinitions = targetScopeURI => {
  const { env, titleId, scopeURI } = useParams();
  const { env: targetEnv, titleId: targetTitleId } =
    useTitleEnvByScopeUri(targetScopeURI);
  const [mutateFunction, { loading, error }] = useMutation(
    PROPAGATE_DEFINITIONS_MUTATION
  );
  return [
    useCallback(
      (definitionKeys, force, dryRun) => {
        const gameScope = scope => scope.split(':').slice(0, 2).join(':');
        return mutateFunction({
          variables: {
            sourceEnv: { env, titleId, scopeURI: gameScope(scopeURI) },
            targetEnv: {
              env: targetEnv,
              titleId: targetTitleId,
              scopeURI: gameScope(targetScopeURI),
            },
            definitionKeys,
            force,
            dryRun,
          },
        });
      },
      [
        mutateFunction,
        env,
        titleId,
        scopeURI,
        targetEnv,
        targetTitleId,
        targetScopeURI,
      ]
    ),
    { loading, error },
  ];
};

export const useAssignedObfuscationAlgorithms = filterAlgorithmType => {
  const { titleId, env, scopeURI } = useParams();

  return useQuery(GET_ASSIGNED_OBFUSCATION_ALGORITHMS_QUERY, {
    variables: { titleId, env, scopeURI, filterAlgorithmType },
    skip: !scopeURI,
    notifyOnNetworkStatusChange: true,
  });
};

export const useInstancedObfuscationAlgorithms = filterAlgorithmType => {
  const { titleId, env } = useParams();

  return useQuery(GET_INSTANCED_OBFUSCATION_ALGORITHMS_QUERY, {
    variables: { titleId, env, filterAlgorithmType },
    notifyOnNetworkStatusChange: true,
  });
};
