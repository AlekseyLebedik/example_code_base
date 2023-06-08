import React from 'react';
import PropTypes from 'prop-types';
import { Field, Form, reduxForm, formValues } from 'redux-form';
import Button from '@material-ui/core/Button';
import Icon from '@material-ui/core/Icon';
import Tooltip from '@material-ui/core/Tooltip';
import InputAdornment from '@material-ui/core/InputAdornment';
import Input from 'dw/core/components/FormFields/Input';
import { LocalizedFormFieldDateTimePicker as DateTimePicker } from 'dw/core/components/DateTimePicker';

import { FORM_NAME } from './constants';

import styles from './presentational.module.css';

const TimeRangeFormValues = ({ startDate, endDate }) => (
  <div className={styles.fieldGroup}>
    <div className={styles.field}>
      <Field
        name="startDate"
        clearable
        label="Period From"
        component={DateTimePicker}
        maxDate={endDate || 'now'}
        returnTimestamp
        fullWidth
      />
    </div>
    <div className={styles.field}>
      <Field
        name="endDate"
        clearable
        label="Period To"
        component={DateTimePicker}
        minDate={startDate}
        returnTimestamp
        fullWidth
      />
    </div>
  </div>
);

TimeRangeFormValues.propTypes = {
  startDate: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  endDate: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
};

TimeRangeFormValues.defaultProps = {
  startDate: undefined,
  endDate: undefined,
};

const TimeRange = formValues('startDate', 'endDate')(TimeRangeFormValues);
const SearchAuditLogsStateless = props => {
  const { onSearch, error, handleSubmit, submitting, UserInputComponent } =
    props;
  return (
    <div className={styles.container}>
      <Form onSubmit={handleSubmit(onSearch)}>
        <TimeRange />

        {UserInputComponent ? (
          <div className={styles.field}>
            <Field
              name="username"
              label="UserID | Username"
              component={UserInputComponent}
            />
          </div>
        ) : (
          <div className={styles.field}>
            <Field
              name="username"
              label="UserID | Username"
              component={Input}
            />
          </div>
        )}

        {props.showTitleIDField ? (
          <div className={styles.field}>
            <Field name="titleID" label="Title ID" component={Input} />
          </div>
        ) : null}
        {props.showEnvField ? (
          <div className={styles.field}>
            <Field name="env" label="Env" component={Input} fullWidth />
          </div>
        ) : null}

        <div className={styles.field}>
          <Field
            name="userType"
            label="User Type"
            component={Input}
            multiline
            fullWidth
          />
        </div>
        <div className={styles.field}>
          <Field
            name="entityID"
            label="Entity ID"
            component={Input}
            multiline
            fullWidth
          />
        </div>
        <div className={styles.field}>
          <Field
            name="entityName"
            label="Entity Name"
            component={Input}
            multiline
            fullWidth
          />
        </div>
        <div className={styles.field}>
          <Field
            name="category"
            label="Category"
            component={Input}
            multiline
            fullWidth
          />
        </div>

        <div className={styles.field}>
          <Field
            name="context"
            label="Context"
            component={Input}
            multiline
            fullWidth
          />
        </div>
        <div className={styles.field}>
          <Field
            name="sourceName"
            label="Source Name"
            component={Input}
            multiline
            fullWidth
          />
        </div>

        <div className={styles.field}>
          <Field
            name="extra"
            label="Extra"
            component={Input}
            multiline
            fullWidth
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <Tooltip title="Please enter in format (key:value)">
                    <Icon fontSize="small">help_outline</Icon>
                  </Tooltip>
                </InputAdornment>
              ),
            }}
          />
        </div>

        {error && <div className={styles.error}>{error}</div>}
        <div className={styles.footer}>
          <Button
            className={styles.searchButton}
            key="primary"
            color="primary"
            type="submit"
            variant="contained"
            disabled={submitting}
            focusRipple
          >
            Show The Results
          </Button>
        </div>
      </Form>
    </div>
  );
};
SearchAuditLogsStateless.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  onSearch: PropTypes.func.isRequired,
  error: PropTypes.string,
  submitting: PropTypes.bool,
  showTitleIDField: PropTypes.bool,
  UserInputComponent: PropTypes.elementType,
  showEnvField: PropTypes.bool,
};

SearchAuditLogsStateless.defaultProps = {
  error: null,
  submitting: false,
  showTitleIDField: false,
  UserInputComponent: undefined,
  showEnvField: false,
};

export default reduxForm({
  form: FORM_NAME,
  enableReinitialize: true,
  keepDirtyOnReinitialize: true,
})(SearchAuditLogsStateless);
