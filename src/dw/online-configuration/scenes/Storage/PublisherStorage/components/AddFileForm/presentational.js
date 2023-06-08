import React from 'react';
import PropTypes from 'prop-types';
import { Field, Form } from 'redux-form';
import { Row, Col } from 'antd';
import Input from 'dw/core/components/FormFields/Input';
import Upload from 'dw/core/components/FormFields/Upload';
import * as V from 'dw/core/components/FormFields/validation';

const renderUploadField = props => (
  <Row>
    <Col span={24}>{Upload(props)}</Col>
  </Row>
);

const AddFileForm = props => {
  const { handleSubmit, externalSubmit } = props;

  return (
    <div className="publisher-storage__add-file-form">
      <Form onSubmit={handleSubmit(externalSubmit)}>
        <Field
          name="context"
          component={Input}
          type="text"
          label="Context"
          fullWidth
        />
        <Field
          name="fileData"
          type="text"
          component={renderUploadField}
          label="Choose file"
          validate={[V.required]}
          data-cy="chooseFileButton"
        />
        <Field
          name="fileName"
          component={Input}
          label="New filename"
          fullWidth
        />
        <Field name="comment" component={Input} label="Comment" fullWidth />
      </Form>
    </div>
  );
};
AddFileForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  externalSubmit: PropTypes.func.isRequired,
};

export default AddFileForm;
