import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Field } from 'redux-form';
import { required } from 'dw/core/components/FormFields/validation';
import Input from 'dw/core/components/FormFields/Input';
import { isValidNameSelector } from 'playpants/components/TemplateFormDialog/selectors';

const NameField = ({ isValidName }) => (
  <Field
    data-cy="template-name-field"
    component={Input}
    fullWidth
    label="Template Name"
    name="name"
    validate={[required]}
    error={!isValidName}
    helperText={
      !isValidName
        ? 'A template with that name already exists for this project'
        : ''
    }
    required
  />
);

NameField.propTypes = {
  isValidName: PropTypes.bool.isRequired,
};

const mapStateToProps = state => ({
  isValidName: isValidNameSelector(state),
});

export default connect(mapStateToProps)(NameField);
