import React from 'react';
import PropTypes from 'prop-types';
import { Field, Form } from 'redux-form';
import { Row, Col } from 'antd';
import MenuItem from '@material-ui/core/MenuItem';
import Checkbox from 'dw/core/components/FormFields/Checkbox';
import Input from 'dw/core/components/FormFields/Input';
import Select from 'dw/core/components/FormFields/Select';
import Upload from 'dw/core/components/FormFields/Upload';
import { UserAutoCompleteFormField as UserInput } from 'dw/online-configuration/components/UserAutoComplete';
import * as V from 'dw/core/components/FormFields/validation';
import { ACCOUNT_TYPES } from 'dw/online-configuration/scenes/constants';

const renderUploadField = props => (
  <Row>
    <Col span={24}>{Upload(props)}</Col>
  </Row>
);

const AddFileForm = props => {
  const { contextsList, handleSubmit, externalSubmit } = props;

  return (
    <div className="user-context-storage__add-file-form">
      <Form onSubmit={handleSubmit(externalSubmit)}>
        <Field
          name="accountType"
          component={Select}
          label="Account type"
          fullWidth
        >
          <MenuItem key="account-type" value="" />
          {ACCOUNT_TYPES.map(a => (
            <MenuItem key={`account-type-${a.value}`} value={a.value}>
              {a.label}
            </MenuItem>
          ))}
        </Field>
        <Field name="context" component={Select} label="Context" fullWidth>
          <MenuItem key="context" value="" />
          {contextsList.map(c => (
            <MenuItem key={`account-type-${c}`} value={c}>
              {c}
            </MenuItem>
          ))}
        </Field>
        <Field
          name="userId"
          component={UserInput}
          label="User ID"
          validate={[V.required]}
        />
        <Field
          name="fileName"
          component={Input}
          label="New filename"
          fullWidth
        />
        <Field
          name="fileData"
          type="text"
          component={renderUploadField}
          label="Choose file"
          validate={[V.required]}
        />
        <Field name="isPrivate" component={Checkbox} label="Is private" />
      </Form>
    </div>
  );
};

AddFileForm.propTypes = {
  contextsList: PropTypes.arrayOf(PropTypes.string),
  handleSubmit: PropTypes.func.isRequired,
  externalSubmit: PropTypes.func.isRequired,
};

AddFileForm.defaultProps = {
  contextsList: [],
};

export default AddFileForm;
