import React from 'react';
import PropTypes from 'prop-types';

import { Field, Form } from 'redux-form';
import Select from 'dw/core/components/FormFields/Select';
import MenuItem from '@material-ui/core/MenuItem';
import DateTimePicker from 'dw/core/components/DateTimePickerV2/LocalizedFormFieldDateTimePicker';
import * as validation from 'dw/core/components/FormFields/validation';

const DuplicateEventFormStateless = props => {
  const {
    availableEnvs,
    availablePlatforms,
    handleSubmit,
    onSubmit,
    publishAtMaxDate,
    publishAtMinDate,
    setTargetEnvironment,
    setTargetPlatforms,
    targetEnvironment,
    targetPlatforms,
  } = props;
  const formEnvironmentField = (
    <Field
      component={Select}
      fullWidth
      label="Environments"
      name="formEnvironment"
      onChange={e => setTargetEnvironment(e.target ? e.target.value : e)}
      validate={[validation.required]}
      value={targetEnvironment}
    >
      {availableEnvs.map(env => (
        <MenuItem key={env} value={env}>
          {env}
        </MenuItem>
      ))}
    </Field>
  );

  const formDateTime = (
    <Field
      autoComplete="off"
      clearable
      component={DateTimePicker}
      footerLabel="Confirm"
      fullWidth
      label="Start Date"
      margin="normal"
      maxDate={publishAtMaxDate}
      minDate={publishAtMinDate}
      name="formDateTime"
      ranged
      rangeLabels={{
        startDate: 'Start Date',
        endDate: 'End Date (Optional)',
      }}
      returnTimestamp
      validate={[validation.required]}
    />
  );

  const formPlatformsField = (
    <Field
      component={Select}
      fullWidth
      label="Platforms"
      multiple
      name="formPlatforms"
      onChange={e => setTargetPlatforms(e.target ? e.target.value : e)}
      validate={[validation.required]}
      value={targetPlatforms}
    >
      {availablePlatforms.map(platform => (
        <MenuItem key={platform} value={platform}>
          {platform}
        </MenuItem>
      ))}
    </Field>
  );

  return (
    <Form name="duplicate-event-form" onSubmit={handleSubmit(onSubmit)}>
      {formEnvironmentField}
      {formDateTime}
      {formPlatformsField}
    </Form>
  );
};

DuplicateEventFormStateless.propTypes = {
  availableEnvs: PropTypes.arrayOf(PropTypes.string).isRequired,
  availablePlatforms: PropTypes.arrayOf(PropTypes.string).isRequired,
  handleSubmit: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  publishAtMaxDate: PropTypes.number,
  publishAtMinDate: PropTypes.number.isRequired,
  setTargetEnvironment: PropTypes.func.isRequired,
  setTargetPlatforms: PropTypes.func.isRequired,
  targetEnvironment: PropTypes.string.isRequired,
  targetPlatforms: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.string),
    PropTypes.object,
  ]).isRequired,
};

DuplicateEventFormStateless.defaultProps = {
  publishAtMaxDate: null,
};

export default DuplicateEventFormStateless;
