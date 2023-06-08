import React from 'react';
import PropTypes from 'prop-types';

import MenuItem from '@material-ui/core/MenuItem';
import { FormControl, InputLabel, Select } from '@material-ui/core';
import { PRIVACY_LEVELS } from 'dw/clans/constants';

const PrivacyLevelSelector = ({
  hideLabel,
  privacyLevel,
  setPrivacyLevel,
  variant,
}) => (
  <FormControl variant={variant} margin="dense">
    {!hideLabel && <InputLabel>Privacy Level</InputLabel>}
    <Select
      label="Privacy Level"
      value={privacyLevel}
      onChange={({ target: { value } }) => setPrivacyLevel(value)}
    >
      {Object.keys(PRIVACY_LEVELS).map(k => (
        <MenuItem key={k} value={k}>
          {k}
        </MenuItem>
      ))}
    </Select>
  </FormControl>
);

PrivacyLevelSelector.propTypes = {
  hideLabel: PropTypes.bool,
  privacyLevel: PropTypes.string.isRequired,
  setPrivacyLevel: PropTypes.func.isRequired,
  variant: PropTypes.string,
};
PrivacyLevelSelector.defaultProps = {
  hideLabel: false,
  variant: 'standard',
};

export default PrivacyLevelSelector;
