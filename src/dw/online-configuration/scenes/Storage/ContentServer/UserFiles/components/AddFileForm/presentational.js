import React from 'react';
import PropTypes from 'prop-types';
import { Field, Form } from 'redux-form';
import { Row, Col } from 'antd';
import Input from 'dw/core/components/FormFields/Input';
import Upload from 'dw/core/components/FormFields/Upload';
import { UserAutoCompleteFormField as UserInput } from 'dw/online-configuration/components/UserAutoComplete';
import * as V from 'dw/core/components/FormFields/validation';

import './presentational.css';

const renderUploadField = props => (
  <Row>
    <Col span={24}>{Upload(props)}</Col>
  </Row>
);

const AddUserFileForm = props => {
  const { handleSubmit, externalSubmit } = props;

  return (
    <div className="add-file-form user-files">
      <Form onSubmit={handleSubmit(externalSubmit)}>
        <Field
          name="userId"
          component={UserInput}
          label="User ID"
          validate={[V.required]}
        />
        <Field
          name="category"
          component={Input}
          type="number"
          label="Category"
          min={0}
          validate={[V.required, V.nonNegativeInt]}
          fullWidth
        />
        <Field
          name="fileSlot"
          component={Input}
          type="number"
          label="File Slot"
          min={0}
          validate={[V.required, V.nonNegativeInt]}
          fullWidth
        />
        <Field
          name="fileData"
          type="text"
          component={renderUploadField}
          label="Choose file"
          validate={[V.required]}
        />
        <Field
          name="fileName"
          component={Input}
          label="New filename"
          fullWidth
        />
      </Form>
    </div>
  );
};

AddUserFileForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  externalSubmit: PropTypes.func.isRequired,
};

export default AddUserFileForm;
