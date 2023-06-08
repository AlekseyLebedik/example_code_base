import React, { useContext, useEffect } from 'react';

import { useParams } from 'react-router-dom';

import { makeStyles } from '@material-ui/core/styles';
import Portal from '@material-ui/core/Portal';

import { CompareDiff } from '@gvs/scenes/Drafts/components/DraftDiffs';
import { BreadcrumbsContext } from 'dw/online-configuration/scenes/gvs/context';
import { useQueryParam } from 'dw/core/hooks';
import TitleEnvSelect from './components/TitleEnvSelect';
import PropagateButton from './components/PropagateButton';
import PopulationSelector from './components/PopulationSelector';

const useStyles = makeStyles(theme => ({
  actions: {
    display: 'flex',
    alignItems: 'center',
    minHeight: '42px',
    marginRight: theme.spacing(2),
  },
  text: {
    fontWeight: 600,
    color: theme.palette.primary.main,
    marginRight: theme.spacing(3),
    whiteSpace: 'nowrap',
  },
  compareText: {
    flexGrow: 1,
    fontWeight: 600,
    color: theme.palette.primary.main,
    whiteSpace: 'nowrap',
    textAlign: 'center',
  },
  populationsContainer: {
    display: 'flex',
    justifyContent: 'space-between',
    marginRight: theme.spacing(8),
    marginTop: -theme.spacing(1),
  },
  populationContainer: {
    display: 'flex',
    alignItems: 'center',
  },
}));

const Compare = () => {
  const classes = useStyles();
  const { scopeURI } = useParams();
  const [targetScopeURI, setTargetScopeURI] = useQueryParam('targetScopeURI');
  const { actionsContainer } = useContext(BreadcrumbsContext);
  useEffect(() => {
    if (!targetScopeURI) setTargetScopeURI(scopeURI);
  }, [targetScopeURI, scopeURI, setTargetScopeURI]);
  if (!targetScopeURI) return null;
  return (
    <>
      <Portal container={actionsContainer}>
        <div className={classes.compareText}>COMPARE TO</div>
        <div className={classes.actions}>
          <TitleEnvSelect />
        </div>
        <PropagateButton />
      </Portal>
      <div className={classes.populationsContainer}>
        <div className={classes.populationContainer}>
          <div className={classes.text}>FOR</div>
          <PopulationSelector
            scopeURI={scopeURI}
            paramName="sourcePopulation"
          />
        </div>
        <div className={classes.populationContainer}>
          <div className={classes.text}>FOR</div>
          <PopulationSelector
            scopeURI={targetScopeURI}
            paramName="targetPopulation"
          />
        </div>
      </div>
      <CompareDiff />
    </>
  );
};
export default Compare;
