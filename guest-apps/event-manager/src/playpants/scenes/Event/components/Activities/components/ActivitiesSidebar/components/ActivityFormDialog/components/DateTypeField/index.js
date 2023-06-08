import React from 'react';
import PropTypes from 'prop-types';
import { Field } from 'redux-form';
import { required } from 'dw/core/components/FormFields/validation';
import CassetteSelect from 'playpants/components/FormFields/CassetteSelect';
import { PUBLISH_TYPE } from 'playpants/scenes/Event/components/Activities/components/ActivitiesSidebar/constants';

const DATE_TYPES = disabled => [
  { value: PUBLISH_TYPE.start, label: 'Start' },
  { value: PUBLISH_TYPE.end, label: 'End', disabled },
];
const DateTypeField = ({ detachedEvent, disabled }) => (
  <Field
    component={CassetteSelect}
    fullWidth
    helperText="Publish Date Type"
    name="dateType"
    options={DATE_TYPES(disabled)}
    validate={[required]}
    disabled={detachedEvent}
  />
);

DateTypeField.propTypes = {
  detachedEvent: PropTypes.bool.isRequired,
  disabled: PropTypes.bool,
};

DateTypeField.defaultProps = {
  disabled: false,
};

export default DateTypeField;
