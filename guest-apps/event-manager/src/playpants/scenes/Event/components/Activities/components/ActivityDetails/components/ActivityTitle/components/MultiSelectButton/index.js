import React from 'react';
import PropTypes from 'prop-types';

import IconButton from 'dw/core/components/IconButton';
import { getTitleEnvsFromTitles } from 'playpants/scenes/Event/components/Activities/components/ActivityDetails/helpers';

const MultiSelectButton = ({ onTitlesChange, selectedActivity, titles }) => {
  const titleEnvIds = getTitleEnvsFromTitles(titles);
  const onMultiButtonClick = allTitlesSelected => {
    if (!allTitlesSelected) {
      onTitlesChange(titleEnvIds);
    } else {
      onTitlesChange([]);
    }
  };
  const allTitlesSelected =
    titleEnvIds.filter(
      titleId => selectedActivity.title_envs.indexOf(titleId) === -1
    ).length === 0;

  return (
    <IconButton
      icon={allTitlesSelected ? 'backspace' : 'done_all'}
      tooltip={allTitlesSelected ? 'Remove All Titles' : 'Select All Titles'}
      iconProps={{ color: allTitlesSelected ? 'secondary' : 'primary' }}
      onClick={() => onMultiButtonClick(allTitlesSelected)}
    />
  );
};

MultiSelectButton.propTypes = {
  titles: PropTypes.arrayOf(PropTypes.object).isRequired,
  selectedActivity: PropTypes.object.isRequired,
  onTitlesChange: PropTypes.func.isRequired,
};

export default MultiSelectButton;
