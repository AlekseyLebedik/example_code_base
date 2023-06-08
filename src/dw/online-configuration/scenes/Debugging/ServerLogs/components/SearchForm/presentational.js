import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { Field, Form, reduxForm, formValues } from 'redux-form';
import flowRight from 'lodash/flowRight';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Input from 'dw/core/components/FormFields/Input';
import Accordion from '@material-ui/core/Accordion';
import Icon from '@material-ui/core/Icon';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import Checkbox from 'dw/core/components/FormFields/Checkbox';
import { LocalizedFormFieldDateTimePicker as DateTimePicker } from 'dw/core/components/DateTimePicker';
import { UserAutoCompleteFormField as UserInput } from 'dw/online-configuration/components/UserAutoComplete';

import { FORM_NAME, LOG_LEVELS, SOURCE_TYPES } from './constants';

import styles from './presentational.module.css';

const RenderLogLevelField = ({ logLevel, classes, ...props }) => (
  <Field
    name={logLevel}
    label={logLevel}
    component={Checkbox}
    className={styles.logLevelCheckbox}
    formControlProps={{
      className: classNames(styles.logLevel, {
        [classes[logLevel]]: props[logLevel],
      }),
    }}
    labelProps={{ className: styles.logLevelLabel }}
  />
);

RenderLogLevelField.propTypes = {
  logLevel: PropTypes.string.isRequired,
  classes: PropTypes.object.isRequired,
};

const RenderSourceField = ({ source, classes, ...props }) => (
  <Field
    name={source}
    label={source}
    component={Checkbox}
    className={styles.logLevelCheckbox}
    formControlProps={{
      className: classNames(styles.logLevel, {
        [classes[source]]: props[source],
      }),
    }}
    labelProps={{ className: styles.logLevelLabel }}
  />
);

RenderSourceField.propTypes = {
  source: PropTypes.string.isRequired,
  classes: PropTypes.object.isRequired,
};

const LogLevelFieldStyled = withStyles(theme => ({
  ...(theme.logLevels || {}),
}));

const LogLevelFieldWithValues = formValues(...LOG_LEVELS);

const LogLevelField = flowRight(
  LogLevelFieldStyled,
  LogLevelFieldWithValues
)(RenderLogLevelField);

const SourceFieldWithValues = formValues(...SOURCE_TYPES);
const SourceFieldStyled = withStyles(theme => ({
  ...(theme.source || {}),
}));
const SourceField = flowRight(
  SourceFieldStyled,
  SourceFieldWithValues
)(RenderSourceField);

const RenderTimeRange = ({ startDate, endDate }) => (
  <div className={styles.fieldGroup}>
    <div className={styles.field}>
      <Field
        name="startDate"
        label="Period From"
        clearable
        component={DateTimePicker}
        maxDate={endDate || null}
        returnTimestamp
        fullWidth
      />
    </div>
    <div className={styles.field}>
      <Field
        name="endDate"
        label="Period To"
        clearable
        component={DateTimePicker}
        minDate={startDate || 'now'}
        returnTimestamp
        fullWidth
      />
    </div>
  </div>
);

RenderTimeRange.propTypes = {
  startDate: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  endDate: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
};

RenderTimeRange.defaultProps = {
  startDate: undefined,
  endDate: undefined,
};

const TimeRange = formValues('startDate', 'endDate')(RenderTimeRange);

const SearchFormStateless = props => {
  const { onSearch, error, handleSubmit, submitting } = props;
  return (
    <div className={styles.container}>
      <Form onSubmit={handleSubmit(onSearch)}>
        <div className={styles.field}>
          <Field name="userId" component={UserInput} label="User ID" />
        </div>

        <div className={styles.field}>
          <Field
            name="connId"
            label="Connection ID"
            component={Input}
            fullWidth
          />
        </div>
        <div className={styles.field}>
          <Field
            name="transId"
            label="Transaction ID"
            component={Input}
            fullWidth
          />
        </div>
        <div className={styles.field}>
          <Field name="message" label="Message" component={Input} fullWidth />
        </div>

        <TimeRange />
        <p className={styles.textHeading}>Advanced Filters</p>
        <Field
          name="dwThcnagios"
          label="Include dw_thcnagios logs"
          component={Checkbox}
          labelProps={{ className: styles.searchFormLabel }}
        />
        <Accordion>
          <AccordionSummary expandIcon={<Icon>expand_more</Icon>}>
            Log Levels
          </AccordionSummary>
          <AccordionDetails>
            <div className={styles.logFieldGroup}>
              {LOG_LEVELS.map(logLevel => (
                <LogLevelField key={logLevel} logLevel={logLevel} />
              ))}
            </div>
          </AccordionDetails>
        </Accordion>

        <Accordion>
          <AccordionSummary expandIcon={<Icon>expand_more</Icon>}>
            Sources
          </AccordionSummary>
          <AccordionDetails>
            <div className={styles.dateFieldGroup}>
              {SOURCE_TYPES.map(source => (
                <SourceField key={source} source={source} />
              ))}
            </div>
          </AccordionDetails>
        </Accordion>

        {error && <div className={styles.error}>{error}</div>}
        <div className={styles.footer}>
          <Button
            key="primary"
            color="primary"
            type="submit"
            className={styles.submitButton}
            variant="contained"
            disabled={submitting}
            focusRipple
          >
            Search
          </Button>
        </div>
      </Form>
    </div>
  );
};

SearchFormStateless.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  onSearch: PropTypes.func.isRequired,
  error: PropTypes.string,
  submitting: PropTypes.bool,
};

SearchFormStateless.defaultProps = {
  error: null,
  submitting: false,
};

export default reduxForm({
  form: FORM_NAME,
  enableReinitialize: true,
  keepDirtyOnReinitialize: true,
})(SearchFormStateless);
