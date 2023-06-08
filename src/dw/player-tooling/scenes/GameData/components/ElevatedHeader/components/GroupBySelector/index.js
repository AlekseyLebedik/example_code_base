import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Select from 'dw/core/components/Select';

const useStyles = makeStyles({
  root: { '& label': { fontSize: '1rem' } },
  select: { padding: 10, fontSize: 14 },
});

const OPTIONS = [
  { value: 'services', label: 'Service' },
  { value: 'titles', label: 'Title' },
];

export default function GroupBySelector({ groupBy, setGroupBy }) {
  const classes = useStyles();
  return (
    <Select
      classes={{ root: classes.root }}
      data-cy="playerViewSelectGroupBy"
      label="Group by"
      onChange={({ target: { value } }) => setGroupBy(value)}
      options={OPTIONS}
      SelectProps={{ classes: { select: classes.select } }}
      value={groupBy}
      variant="outlined"
    />
  );
}

GroupBySelector.propTypes = {
  groupBy: PropTypes.string.isRequired,
  setGroupBy: PropTypes.func.isRequired,
};
