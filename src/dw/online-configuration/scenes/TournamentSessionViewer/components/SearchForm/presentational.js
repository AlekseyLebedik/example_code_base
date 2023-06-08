import React from 'react';
import PropTypes from 'prop-types';
import Input from 'dw/core/components/FormFields/Input';
import Button from '@material-ui/core/Button';
import classNames from 'classnames';
import { LocalizedFormFieldDateTimePicker as DateTimePicker } from 'dw/core/components/DateTimePicker';
import { Field, Form, reduxForm } from 'redux-form';
import { withStyles } from '@material-ui/core/styles';
import { FORM_NAME } from './constants';
import styles from './presentational.module.css';

const componentStyles = {
  input: {
    color: 'white',
  },
  label: {
    color: '#cccccc',
  },
};
const SearchFormStateless = ({
  classes,
  onSearch,
  handleSubmit,
  submitting,
}) => (
  <div className={styles.container}>
    <Form onSubmit={handleSubmit(onSearch)}>
      <div className={styles.field}>
        <Field
          name="tournament_id"
          label="Tournament ID"
          component={Input}
          variant="filled"
          InputProps={{
            className: classNames(classes.input),
          }}
          InputLabelProps={{
            classes: { root: classes.label, focused: classes.label },
          }}
          fullWidth
        />
      </div>
      <div className={styles.field}>
        <Field
          name="start"
          label="Start Date / Time"
          variant="filled"
          returnTimestamp
          InputProps={{
            className: classNames(classes.root, classes.input),
          }}
          InputLabelProps={{
            classes: { root: classes.label, focused: classes.label },
          }}
          clearable
          component={DateTimePicker}
          fullWidth
        />
      </div>
      <div className={styles.field}>
        <Field
          name="end"
          label="End Date / Time"
          variant="filled"
          returnTimestamp
          InputProps={{
            className: classNames(classes.root, classes.input),
          }}
          InputLabelProps={{
            classes: { root: classes.label, focused: classes.label },
          }}
          clearable
          component={DateTimePicker}
          fullWidth
        />
      </div>
      <div className={styles.field}>
        <Button
          key="primary"
          type="submit"
          className={styles.submitButton}
          disabled={submitting}
          focusRipple
        >
          Search
        </Button>
      </div>
    </Form>
  </div>
);
SearchFormStateless.propTypes = {
  classes: PropTypes.object.isRequired,
  onSearch: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  submitting: PropTypes.bool,
};
SearchFormStateless.defaultProps = {
  submitting: false,
};

const SearchFormStatelessStyled =
  withStyles(componentStyles)(SearchFormStateless);
export default reduxForm({
  form: FORM_NAME,
  enableReinitialize: true,
  keepDirtyOnReinitialize: true,
})(SearchFormStatelessStyled);
