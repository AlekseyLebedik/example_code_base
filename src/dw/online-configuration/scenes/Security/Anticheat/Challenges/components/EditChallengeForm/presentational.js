import React from 'react';
import PropTypes from 'prop-types';

import { Field, Form } from 'redux-form';
import { Row, Col } from 'antd';
import Input from 'dw/core/components/FormFields/Input';
import MenuItem from '@material-ui/core/MenuItem';
import Select from 'dw/core/components/FormFields/Select';
import { getEditColumns } from '../../constants';

import './presentational.css';

const renderField = column => {
  const { key, type, title, choices } = column;
  let fieldType = type;
  if (choices !== undefined) {
    fieldType = column.multiple ? 'multi-select' : 'select';
  } else if (type === 'string') fieldType = 'text';
  const commonProps = {
    key,
    name: key,
    label: title,
    fullWidth: true,
  };
  const selectChoicesFormatter = item => {
    let value = item;
    let label = item;
    if (Array.isArray(item)) {
      [value, label] = item;
    }
    return { value, label };
  };
  switch (fieldType) {
    case 'number':
    case 'text':
      return (
        <Field
          component={Input}
          {...commonProps}
          type={fieldType}
          InputLabelProps={{ shrink: true }}
        />
      );
    case 'select':
    case 'multi-select':
      return (
        <Field
          component={Select}
          {...commonProps}
          multiple={fieldType === 'multi-select'}
        >
          {choices.map(item => {
            const { value, label } = selectChoicesFormatter(item);
            return (
              <MenuItem value={value} key={value}>
                {label}
              </MenuItem>
            );
          })}
        </Field>
      );
    default:
      return null;
  }
};

const renderFieldGroups = (columns, index) => {
  const span = 24 / columns.length;
  return (
    <Row key={index} gutter={25}>
      {columns.map(column => (
        <Col span={span} key={column.key}>
          {renderField(column)}
        </Col>
      ))}
    </Row>
  );
};

const EditChallengeForm = props => {
  const { handleSubmit, externalSubmit, monitoringGroups } = props;
  const COLUMNS = getEditColumns(monitoringGroups);
  return (
    <div className="edit-challenge-form">
      <Form onSubmit={handleSubmit(externalSubmit)}>
        {COLUMNS.map(renderFieldGroups)}
      </Form>
    </div>
  );
};
EditChallengeForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  externalSubmit: PropTypes.func.isRequired,
  monitoringGroups: PropTypes.object.isRequired,
};

export default EditChallengeForm;
