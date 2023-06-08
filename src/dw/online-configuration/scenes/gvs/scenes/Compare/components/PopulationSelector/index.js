import React from 'react';

import { makeStyles } from '@material-ui/core/styles';

import Select from 'dw/core/components/Select';
import { usePopulationOptions } from '@gvs/graphql/hooks';
import { GLOBAL_PLAYERS, PLAYER } from '@gvs/constants';
import { useQueryParam } from 'dw/core/hooks';

const useStyles = makeStyles(theme => ({
  selectedPopulation: {
    display: 'flex',
    flexWrap: 'nowrap',
    borderRadius: '4px',
    border: '1px solid rgba(0, 0, 0, 0.35)',
    '& > div': {
      minWidth: '210px',
    },
    '& > div:first-child': {
      minWidth: '100px',
      borderRight: '1px solid rgba(0, 0, 0, 0.35)',
    },
  },
  selectComponent: {
    paddingLeft: theme.spacing(1),
    paddingTop: '3px',
    paddingBottom: '3px',
    ...theme.typography.subtitle2,
  },
}));

const PopulationSelector = ({ paramName, scopeURI }) => {
  const classes = useStyles();
  const [population, setPopulation] = useQueryParam(paramName, GLOBAL_PLAYERS);
  const { populations, options, populationType } = usePopulationOptions({
    scopeURI,
    population,
  });

  if (!populations) return null;
  return (
    <div className={classes.selectedPopulation}>
      <Select
        value={populationType}
        onChange={e => setPopulation(`global:${e.target.value}`)}
        options={[
          { value: PLAYER, label: 'Players' },
          { value: 'dedi', label: 'Dedis' },
          { value: 'udp', label: 'UDP Relay' },
        ]}
        InputProps={{
          disableUnderline: true,
        }}
        SelectProps={{ classes: { select: classes.selectComponent } }}
      />
      <Select
        options={options[populationType]}
        value={population}
        onChange={e => setPopulation(e.target.value)}
        InputProps={{
          disableUnderline: true,
        }}
        SelectProps={{ classes: { select: classes.selectComponent } }}
      />
    </div>
  );
};

PopulationSelector.propTypes = {
  scopeURI: PropTypes.string.isRequired,
  paramName: PropTypes.string.isRequired,
};

export default PopulationSelector;
