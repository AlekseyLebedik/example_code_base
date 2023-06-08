import React, { useState } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import MenuItem from '@material-ui/core/MenuItem';
import Select from 'dw/core/components/FormFields/Select';

import { prettyPrint } from 'playpants/helpers/json';
import { platformSettingsSelector } from 'playpants/components/App/selectors';

export const PlatformsBase = ({
  platformSettings,
  eventData,
  onSave,
  disabled,
}) => {
  const [helperText, setHelperText] = useState(null);
  const handleChange = value => {
    // save changes only if at least one platform is selected
    if (value.length > 0 && !disabled) {
      onSave('platforms', prettyPrint(value));
      setHelperText(null);
    } else {
      setHelperText('At least one platform must be selected');
    }
  };

  return (
    <Select
      data-cy="eventDetailsPlatforms"
      disabled={disabled}
      fullWidth
      helperText={helperText}
      label="Platforms"
      multiple
      onChange={e => handleChange(e.target ? e.target.value : e)}
      value={eventData.platforms}
    >
      {platformSettings.map(p => (
        <MenuItem key={p} value={p}>
          {p}
        </MenuItem>
      ))}
    </Select>
  );
};

const mapStateToProps = state => ({
  platformSettings: platformSettingsSelector(state),
});

PlatformsBase.propTypes = {
  platformSettings: PropTypes.arrayOf(PropTypes.string).isRequired,
  eventData: PropTypes.object.isRequired,
  onSave: PropTypes.func.isRequired,
  disabled: PropTypes.bool.isRequired,
};

export default connect(mapStateToProps)(PlatformsBase);
