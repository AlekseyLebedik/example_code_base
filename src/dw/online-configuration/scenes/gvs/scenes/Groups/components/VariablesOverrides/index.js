import React, { useMemo } from 'react';
import { generatePath, Link, useParams, useRouteMatch } from 'react-router-dom';
import { makeStyles } from '@material-ui/core';
import Accordion from '@material-ui/core/Accordion';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import Icon from '@material-ui/core/Icon';

import Loading from 'dw/core/components/Loading';
import Empty from 'dw/core/components/Empty';
import Details from 'dw/online-configuration/scenes/gvs/scenes/Configuration/components/Details';
import { gvsUrlPattern } from 'dw/online-configuration/scenes/gvs/constants';
import { useConfiguration } from '@gvs/graphql/hooks';
import { useQueryParam } from 'dw/core/hooks';
import { useConnectedPopulations } from '../../../Configuration/components/Master/hooks';

const useStyles = makeStyles(theme => ({
  container: {
    width: '100%',
    height: '100%',
  },
  root: { marginTop: `${theme.spacing(3)}px !important` },
  summary: {
    minHeight: '48px',
    '&.Mui-expanded': {
      minHeight: '48px',
      marginBottom: -theme.spacing(2),
    },
  },
  summaryContent: {
    alignItems: 'center',
    margin: '12px 0 !important',
    marginLeft: `${theme.spacing(3)}px !important`,
    fontSize: '0.77rem',
  },
  heading: {
    fontWeight: 'bold',
    flexBasis: '33.33%',
    flexShrink: 0,
  },
  secondaryHeading: {
    color: 'rgba(0, 0, 0, 0.35)',
    alignSelf: 'center',
  },
  details: props => ({
    height: '548px',
    flexDirection: 'column',
    paddingBottom: 0,
    paddingTop: 0,
    '& .ag-theme-material': {
      display: props.hasOverrides ? 'unset' : 'none',
    },
    '& .gvs-configuration-filters': {
      display: props.hasOverrides ? 'flex' : 'none',
    },
  }),
  noOverrides: {
    display: 'flex',
    flexDirection: 'column',
  },
}));

const populationType = 'groups';

const VariablesOverrides = () => {
  const { id: populationValue } = useParams();
  const match = useRouteMatch(gvsUrlPattern);
  const population = useMemo(
    () => `${populationType}:${populationValue}`,
    [populationValue]
  );
  const configURL = useMemo(
    () =>
      `${generatePath(gvsUrlPattern, {
        ...match.params,
        scene: 'configuration',
      })}/${population}`,
    [match, population]
  );
  const connectedPopulations = useConnectedPopulations(
    population,
    'network-only'
  );
  const hasOverrides = useMemo(
    () => connectedPopulations.includes(population),
    [connectedPopulations, population]
  );
  const classes = useStyles({ hasOverrides });

  const [draftId] = useQueryParam('draftId');

  const { data, error } = useConfiguration({
    draftId,
    populationOverride: population,
    fetchPolicy: 'network-only',
  });
  if (connectedPopulations.length === 0) return <Loading />;
  return (
    <div className={classes.container}>
      <Accordion defaultExpanded className={classes.root}>
        <AccordionSummary
          classes={{ root: classes.summary, content: classes.summaryContent }}
          expandIcon={<Icon>expand_more</Icon>}
          aria-controls="panel1bh-content"
          id="panel1bh-header"
        >
          <span className={classes.heading}>Variables Overrides</span>
        </AccordionSummary>
        <AccordionDetails className={classes.details}>
          <Details
            populationOverride={population}
            data={data}
            error={error}
            editable={false}
          />
          {!hasOverrides && (
            <Empty className={classes.noOverrides}>
              <span>This group has no overrides yet</span>
              <span>
                Use the <Link to={configURL}>Configuration</Link> page to add
                some
              </span>
            </Empty>
          )}
        </AccordionDetails>
      </Accordion>
    </div>
  );
};

export default VariablesOverrides;
