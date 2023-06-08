import React from 'react';
import PropTypes from 'prop-types';
import { Field } from 'redux-form';
import CassetteSelect from 'playpants/components/FormFields/CassetteSelect';
import { required } from 'dw/core/components/FormFields/validation';

const TypeField = ({ eventTypeSettings }) => (
  <Field
    component={CassetteSelect}
    fullWidth
    label="Type"
    name="eventType"
    options={[...eventTypeSettings]
      .sort((a, b) => a.name.localeCompare(b.name))
      .map(({ key: value, name: label }) => ({ value, label }))}
    validate={[required]}
  />
);

TypeField.propTypes = {
  eventTypeSettings: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default TypeField;
