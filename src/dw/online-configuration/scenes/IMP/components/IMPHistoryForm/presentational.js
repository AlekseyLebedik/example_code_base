import React from 'react';
import PropTypes from 'prop-types';

import { Field, Form } from 'redux-form';
import { Row, Col } from 'antd';
import Upload from 'dw/core/components/FormFields/Upload';
import * as V from 'dw/core/components/FormFields/validation';

const renderUploadField = props => (
  <Row>
    <Col span={24}>{Upload(props)}</Col>
  </Row>
);

const AddUserFileForm = props => {
  const { handleSubmit, externalSubmit } = props;

  return (
    <div className="add-to-imp-history-form">
      <Form onSubmit={handleSubmit(externalSubmit)}>
        <Field
          name="fileData"
          type="text"
          component={renderUploadField}
          label="Choose file"
          validate={[V.required]}
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
