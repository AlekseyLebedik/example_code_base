import React from 'react';
import PropTypes from 'prop-types';
import { Typeahead as ReactTypeahead } from 'react-bootstrap-typeahead';

import { useStyles } from './styles';

const Typeahead = ({ placeholder, options, selected, setSelected }) => {
  const classes = useStyles();

  const hasOptions = options.length !== 0;

  return (
    <ReactTypeahead
      className={classes.typeahead}
      id="userTypeahead"
      labelKey="user"
      multiple
      isLoading={!hasOptions}
      options={options.map(o => o.name)}
      onChange={s => setSelected(s)}
      disabled={!hasOptions}
      placeholder={placeholder}
      selected={selected}
    />
  );
};

Typeahead.defaultProps = {
  placeholder: 'Search',
};

Typeahead.propTypes = {
  placeholder: PropTypes.string,
  options: PropTypes.array.isRequired,
  selected: PropTypes.array.isRequired,
  setSelected: PropTypes.func.isRequired,
};

export default Typeahead;
