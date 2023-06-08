import React from 'react';
import PropTypes from 'prop-types';
import isEmpty from 'lodash/isEmpty';
import startCase from 'lodash/startCase';

import Select from 'dw/core/components/Select';
import InputAdornment from '@material-ui/core/InputAdornment';
import MenuItem from '@material-ui/core/MenuItem';

const TitleSelector = ({
  allowMultiTitles,
  disabled,
  onTitlesChange,
  selectedActivity,
  titles,
}) => {
  const { activity, title_envs: selectedTitles, type } = selectedActivity;
  const isTitleSelectorDisabled = () => {
    if (!allowMultiTitles && !isEmpty(selectedTitles)) {
      if (type === 'pubvars') {
        return !isEmpty(
          activity.variable_sets.filter(set => !isEmpty(set.variables))
        );
      }
      return !isEmpty(activity[Object.keys(activity)[0]]);
    }
    return false;
  };

  return (
    <Select
      data-cy="titleEnvSelector"
      multiple={allowMultiTitles}
      value={selectedTitles}
      onChange={e =>
        !disabled ? onTitlesChange(e.target ? e.target.value : e) : undefined
      }
      InputProps={{
        startAdornment: (
          <InputAdornment position="start">
            {allowMultiTitles ? 'Titles' : 'Title'}
          </InputAdornment>
        ),
      }}
      disabled={disabled || isTitleSelectorDisabled()}
    >
      <MenuItem value="" disabled>
        Select a Title
      </MenuItem>
      {titles.map(({ env, id, name }) => (
        <MenuItem
          key={`titleEnv/${env.id}`}
          value={env.id}
          data-cy="titleEnvSelectorOption"
        >
          {`(${id}) ${name}-${startCase(env.shortType)}`}
        </MenuItem>
      ))}
    </Select>
  );
};

TitleSelector.propTypes = {
  allowMultiTitles: PropTypes.bool.isRequired,
  disabled: PropTypes.bool.isRequired,
  onTitlesChange: PropTypes.func.isRequired,
  selectedActivity: PropTypes.object.isRequired,
  titles: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default TitleSelector;
