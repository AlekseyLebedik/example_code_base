import React from 'react';
import PropTypes from 'prop-types';
import { Field, FieldArray } from 'redux-form';

import Tooltip from '@material-ui/core/Tooltip';
import Icon from '@material-ui/core/Icon';
import Paper from '@material-ui/core/Paper';
import IconButton from '@material-ui/core/IconButton';
import FormControl from '@material-ui/core/FormControl';
import FormHelperText from '@material-ui/core/FormHelperText';
import DateTimePicker from 'dw/core/components/DateTimePicker/LocalizedFormFieldDateTimePicker';
import * as V from 'dw/core/components/FormFields/validation';

import AddConfig from '../AddConfig/index';
import ConfigField from '../ConfigField';
import styles from './index.module.css';
import { FORM_MODE_ENUM } from '../../constants';

const renderConfigs = ({
  fields,
  formMode,
  cohortName,
  meta: { submitFailed, error },
}) => (
  <>
    <FormControl
      className={styles.configs}
      error={Boolean(submitFailed && error)}
    >
      {submitFailed && error && <FormHelperText>{error}</FormHelperText>}
      {fields.map((config, index) => (
        <Field
          key={config}
          name={config}
          component={ConfigField}
          label="configs"
          className={styles.configSelect}
          onDelete={() => fields.remove(index)}
          disabled={
            formMode === FORM_MODE_ENUM.PROPAGATE ||
            formMode === FORM_MODE_ENUM.VIEW
          }
        />
      ))}
    </FormControl>
    <AddConfig
      name={fields.name}
      cohortName={cohortName}
      onAdd={config => fields.push(config)}
      isVisible={
        formMode !== FORM_MODE_ENUM.PROPAGATE &&
        formMode !== FORM_MODE_ENUM.VIEW
      }
      selectedConfigIDs={fields.map((_, index) => fields.get(index).configID)}
    />
  </>
);

renderConfigs.propTypes = {
  fields: PropTypes.object.isRequired,
  formMode: PropTypes.string.isRequired,
  meta: PropTypes.object.isRequired,
  cohortName: PropTypes.string,
};

renderConfigs.defaultProps = {
  cohortName: undefined,
};

const validateConfigs = values => {
  if (!values || values.length === 0) {
    return 'Config is required';
  }
  return undefined;
};

const renderTreatments = ({
  fields,
  formMode,
  disabled,
  cohortIndex,
  handleToTreatmentDates,
  handleFromTreatmentDates,
  selectedCatchStart,
  selectedCatchEnd,
  cohortName,
}) => (
  <>
    {formMode !== FORM_MODE_ENUM.PROPAGATE &&
    formMode !== FORM_MODE_ENUM.VIEW ? (
      <Tooltip title="Add Treatment">
        <IconButton
          className={styles.addButton}
          onClick={() => fields.push({})}
        >
          <Icon>playlist_add</Icon>
        </IconButton>
      </Tooltip>
    ) : null}

    {fields.map((treatment, index) => {
      const treatmentInstance = fields.get(index);
      return (
        <Paper key={treatment} className={styles.treatmentsProps}>
          {formMode !== FORM_MODE_ENUM.PROPAGATE &&
          formMode !== FORM_MODE_ENUM.VIEW ? (
            <Tooltip title="Delete Treatment">
              <IconButton
                color="secondary"
                className={styles.deleteButton}
                onClick={() => {
                  fields.remove(index);
                }}
              >
                <Icon className={styles.deleteIcon}>highlight_off</Icon>
              </IconButton>
            </Tooltip>
          ) : null}
          <div className={styles.enrollmentContainer}>
            <Field
              name={`${treatment}.start`}
              component={DateTimePicker}
              clearable
              label="From"
              classes={{ input: styles.treatmentInput }}
              minDate="now"
              maxDate={treatmentInstance.end || null}
              validate={[V.required]}
              returnTimestamp
              disabled={disabled}
            />
            {!selectedCatchStart ? null : (
              <p
                className={
                  !fields.getAll()[index].start ||
                  fields.getAll()[index].start !== selectedCatchStart
                    ? styles.enrollmentCopyGrey
                    : styles.enrollmentCopyBlack
                }
                data-cy="treatmentFrom"
                onClick={() => handleFromTreatmentDates(cohortIndex, index)}
              >
                <Icon>date_range</Icon>
                {fields.getAll()[index].start &&
                fields.getAll()[index].start === selectedCatchStart ? (
                  <span>Enrollment From Date Added</span>
                ) : (
                  <span>Click to add Enrollment From Date</span>
                )}
              </p>
            )}
          </div>

          <div className={styles.enrollmentContainer}>
            <Field
              name={`${treatment}.end`}
              component={DateTimePicker}
              clearable
              label="To"
              classes={{ input: styles.treatmentInput }}
              minDate={treatmentInstance.start || 'now'}
              validate={[V.required]}
              returnTimestamp
              disabled={disabled}
            />
            {!selectedCatchEnd ? null : (
              <p
                className={
                  !fields.getAll()[index].end ||
                  fields.getAll()[index].end !== selectedCatchEnd
                    ? styles.enrollmentCopyGrey
                    : styles.enrollmentCopyBlack
                }
                data-cy="treatmentTo"
                onClick={() => handleToTreatmentDates(cohortIndex, index)}
              >
                <Icon>date_range</Icon>
                {fields.getAll()[index].end &&
                fields.getAll()[index].end === selectedCatchEnd ? (
                  <span>Enrollment To Date Added</span>
                ) : (
                  <span>Click to add Enrollment To Date</span>
                )}
              </p>
            )}
          </div>
          <FieldArray
            className={styles.treatmentInput}
            name={`${treatment}.configs`}
            component={renderConfigs}
            validate={validateConfigs}
            formMode={formMode}
            cohortName={cohortName}
          />
        </Paper>
      );
    })}
  </>
);

renderTreatments.propTypes = {
  fields: PropTypes.object.isRequired,
  handleFromTreatmentDates: PropTypes.func,
  handleToTreatmentDates: PropTypes.func,
  cohortIndex: PropTypes.number,
  selectedCatchStart: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  selectedCatchEnd: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  formMode: PropTypes.string.isRequired,
  disabled: PropTypes.bool,
  cohortName: PropTypes.string,
};

renderTreatments.defaultProps = {
  disabled: false,
  cohortName: undefined,
  handleFromTreatmentDates: null,
  handleToTreatmentDates: null,
  selectedCatchStart: null,
  selectedCatchEnd: null,
  cohortIndex: null,
};

const AddTreatment = props => {
  const {
    cohort,
    cohortName,
    formMode,
    disabled,
    cohortIndex,
    handleToTreatmentDates,
    handleFromTreatmentDates,
    selectedCatchStart,
    selectedCatchEnd,
  } = props;
  return (
    <FieldArray
      name={`${cohort}.treatments`}
      formMode={formMode}
      props={{
        handleToTreatmentDates,
        handleFromTreatmentDates,
        selectedCatchStart,
        selectedCatchEnd,
        cohortIndex,
      }}
      disabled={disabled}
      component={renderTreatments}
      cohortName={cohortName}
    />
  );
};

AddTreatment.propTypes = {
  cohort: PropTypes.string.isRequired,
  formMode: PropTypes.string.isRequired,
  handleFromTreatmentDates: PropTypes.func,
  handleToTreatmentDates: PropTypes.func,
  cohortIndex: PropTypes.number,
  selectedCatchStart: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  selectedCatchEnd: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  disabled: PropTypes.bool,
  cohortName: PropTypes.string,
};

AddTreatment.defaultProps = {
  disabled: false,
  cohortName: undefined,
  selectedCatchStart: null,
  cohortIndex: null,
  selectedCatchEnd: null,
  handleFromTreatmentDates: null,
  handleToTreatmentDates: null,
};

export default AddTreatment;
