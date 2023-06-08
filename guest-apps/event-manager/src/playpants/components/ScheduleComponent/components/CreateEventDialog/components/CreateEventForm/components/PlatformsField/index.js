import React from 'react';
import PropTypes from 'prop-types';
import { Field } from 'redux-form';
import { required } from 'dw/core/components/FormFields/validation';
import CassetteSelect from 'playpants/components/FormFields/CassetteSelect';
import { PlatformIcon } from 'dw/core/components';

const PlatformsField = ({ platformSettings }) => (
  <Field
    avatarRenderer={platform => (
      <PlatformIcon color="#616161" platform={platform} size={15} />
    )}
    component={CassetteSelect}
    fullWidth
    label="Platforms"
    multiple
    name="eventPlatforms"
    validate={[required]}
    options={platformSettings.map(value => ({ value, label: value }))}
  />
);

PlatformsField.propTypes = {
  platformSettings: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default PlatformsField;
