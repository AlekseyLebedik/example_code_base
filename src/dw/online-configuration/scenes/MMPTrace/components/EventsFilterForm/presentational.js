import React from 'react';
import Button from '@material-ui/core/Button';
import {
  Field,
  Form,
  propTypes as reduxFormPropTypes,
  formValues,
} from 'redux-form';
import { Icon, Typography } from '@material-ui/core';
import * as V from 'dw/core/components/FormFields/validation';
import DateTimePicker from 'dw/core/components/DateTimePicker/LocalizedFormFieldDateTimePicker';
import { UserAutoCompleteFormField as UserInput } from 'dw/online-configuration/components/UserAutoComplete';
import styles from './presentational.module.css';

const StyledField = props => {
  return (
    <div className={styles.inputMargin}>
      {props.labelTag && (
        <Typography className={styles.labelTag}>{props.labelTag}</Typography>
      )}
      <Field {...props} />
    </div>
  );
};

StyledField.propTypes = {
  labelTag: PropTypes.string,
};

StyledField.defaultProps = {
  labelTag: null,
};

const EventsFilterForm = ({ start, end, onFilter, handleSubmit, loading }) => (
  <Form onSubmit={handleSubmit(onFilter)} className="login-form">
    <StyledField
      name="playerId"
      component={UserInput}
      regularInputMode
      placeholder="Player ID | Party ID"
      validate={[V.required]}
    />
    <StyledField
      name="start"
      component={DateTimePicker}
      fullWidth
      clearable
      maxDate={end || null}
      returnTimestamp
      validate={[V.required]}
      labelTag="from"
      CustomEndAdornment={() => <Icon>calendar_month_icon</Icon>}
    />
    <StyledField
      name="end"
      component={DateTimePicker}
      labelTag="to"
      fullWidth
      clearable
      minDate={start || 'now'}
      returnTimestamp
      validate={[V.required]}
      CustomEndAdornment={() => <Icon>calendar_month_icon</Icon>}
    />

    <Button
      type="submit"
      className="button-submit"
      variant="contained"
      color="primary"
      disabled={loading}
      classes={{ label: styles.buttonSubmitText }}
    >
      {loading ? 'Loading...' : 'Search'}
    </Button>
  </Form>
);

EventsFilterForm.propTypes = {
  ...reduxFormPropTypes.handleSubmit,
  ...reduxFormPropTypes.onSubmit,
};

EventsFilterForm.defaultProps = {};

export default formValues('start', 'end')(EventsFilterForm);
