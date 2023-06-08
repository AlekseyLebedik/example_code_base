import React, { useCallback, useContext, useEffect, useMemo } from 'react';
import { makeStyles } from '@material-ui/core/styles';

import {
  useHistory,
  generatePath,
  useLocation,
  useRouteMatch,
  Prompt,
  matchPath,
} from 'react-router-dom';
import { useCompare, useQueryParam } from 'dw/core/hooks';
import Master from './components/Master';
import Details from './components/Details';
import {
  useConfiguration,
  useDraftDetails,
  usePopulationsDisplayValues,
} from '../../graphql/hooks';
import { GLOBAL_PLAYERS, gvsUrlPattern, SCENES, PLAYER } from '../../constants';
import { CurrentDraftContext } from '../../context';
import { useUncommittedEdits } from './hooks';

const useStyles = makeStyles(theme => ({
  masterDetails: {
    display: 'flex',
    flexGrow: 1,
    overflow: 'hidden',
    flexWrap: 'nowrap',
  },
  master: {
    width: '300px',
    display: 'flex',
    flexDirection: 'column',
    overflow: 'hidden',
    borderRight: '1px solid rgba(0,0,0,0.35)',
    paddingRight: theme.spacing(2),
  },
  details: {
    flexGrow: 1,
    display: 'flex',
    flexDirection: 'column',
    overflow: 'hidden',
    marginLeft: theme.spacing(2),
  },
}));

const Configuration = () => {
  const classes = useStyles();
  const history = useHistory();
  const location = useLocation();
  const match = useRouteMatch();
  const { population } = match.params;
  const [queryDraftId = null] = useQueryParam('draftId');
  const [currentDraftId] = useContext(CurrentDraftContext);
  const draftId = useMemo(
    () => queryDraftId || currentDraftId,
    [queryDraftId, currentDraftId]
  );
  useEffect(() => {
    if (queryDraftId || !currentDraftId) return;
    history.push({
      pathname: location.pathname,
      search: `draftId=${draftId}`,
    });
  }, [draftId, queryDraftId, currentDraftId, history, location]);

  const { refetch: refetchDraft } = useDraftDetails(draftId, 'network-only');

  const { allEdits, otherEdits, currentEdits, setEdits, reset } =
    useUncommittedEdits();

  const {
    data,
    error,
    refetch: refetchConfiguration,
  } = useConfiguration({
    draftId,
    populationOverride: population,
    fetchPolicy: 'network-only',
    edits: otherEdits,
  });

  const populations = useMemo(() => {
    if (!(data && population)) return [];
    const [pType, pValue = PLAYER] = population.split(':');
    const result = [];
    data.variables.forEach(({ valuesPerPlatform }) => {
      valuesPerPlatform.forEach(({ source }) => {
        let type;
        let value;
        if ([null, undefined].includes(source?.populationType)) {
          type = pType;
          value = pValue;
        } else {
          ({ populationType: type, populationValue: value } = source);
        }
        if (!result.find(p => p.type === type && p.value === value)) {
          result.push({ type, value });
        }
      });
    });
    return result;
  }, [data, population]);

  usePopulationsDisplayValues(useCompare(populations));

  const onPopulationChange = useCallback(
    newPopulation => {
      if (match.params.population === newPopulation) return;
      history.push({
        pathname: generatePath(match.path, {
          ...match.params,
          population: newPopulation,
        }),
        search: location.search,
      });
    },
    [history, match.params, location]
  );
  useEffect(() => {
    if (!population || population === 'global')
      onPopulationChange(GLOBAL_PLAYERS);
  }, [population, onPopulationChange]);
  if (!population || population === 'global' || (draftId && !queryDraftId))
    return null;

  return (
    <div className={classes.masterDetails}>
      <Prompt
        when={allEdits.length > 0}
        message={({ pathname: newLocation }) => {
          const m = matchPath(newLocation, { path: gvsUrlPattern });
          if (m?.params?.scene !== SCENES.CONFIGURATION) {
            return [
              'Are you sure you want to navigate away?',
              'All unsaved edits would be lost.',
              '',
              'If you want to save the changes, please click "Cancel" button and hit the "Save" icon on the top right corner of the screen.',
            ].join('\n');
          }
          return true;
        }}
      />
      <div className={classes.master}>
        <Master onChange={onPopulationChange} allEdits={allEdits} />
      </div>
      <div className={classes.details}>
        <Details
          data={data}
          error={error}
          edits={allEdits}
          currentEdits={currentEdits}
          setEdits={setEdits}
          reset={reset}
          refetchConfiguration={refetchConfiguration}
          refetchDraft={refetchDraft}
        />
      </div>
    </div>
  );
};

export default Configuration;
